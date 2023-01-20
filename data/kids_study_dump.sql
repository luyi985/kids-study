drop function if exists public.get_math_day_record(int, math_calc_type, int);
drop function if exists public.upsert_math_day_record(int, math_calc_type, int, math_day_status_type json);
drop function if exists public.get_math_days_status(math_calc_type, int);
DROP INDEX IF exists public_math_records_day_user_index;
DROP INDEX IF exists public_users_index;
drop table if exists public.users cascade;
drop table if exists public.math_records cascade;
DROP TYPE IF EXISTS math_calc_type;
DROP TYPE IF EXISTS math_day_status_type;

REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM APP_USER;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM APP_USER;
REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM APP_USER;
REVOKE ALL PRIVILEGES ON SCHEMA public FROM APP_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM APP_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM APP_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM APP_USER;
REVOKE USAGE ON SCHEMA public FROM APP_USER;

DROP USER IF EXISTS APP_USER;

CREATE USER APP_USER LOGIN PASSWORD 'qazzaq123';
CREATE SCHEMA IF NOT EXISTS public AUTHORIZATION APP_USER;


--- Tables
CREATE TYPE math_calc_type AS ENUM ('addition', 'subtract', 'divide', 'multiply');
CREATE TYPE math_day_status_type AS ENUM ('incomplete', 'complete', 'notstart');

create table public.users(
  id SERIAL PRIMARY KEY,
  name text NOT NULL default 'new user'
);
create table public.math_records(
  id SERIAL PRIMARY KEY,
  day int not null default 0,
  details json not null default '[]',
  user_id int not null,
  status math_day_status_type not null default 'notstart',
  type math_calc_type not null default 'addition',
  created_at timestamp without time zone default (now() at time zone 'utc'),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER SEQUENCE IF EXISTS public.users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS public.math_records_id_seq RESTART WITH 1;

CREATE UNIQUE INDEX public_math_records_day_user_index ON public.math_records(day, user_id, type);
CREATE UNIQUE INDEX public_users_index ON public.users(name);


GRANT USAGE ON SCHEMA public TO APP_USER;
GRANT ALL ON public.math_records TO APP_USER;
GRANT ALL ON public.users TO APP_USER;
GRANT ALL ON public.users_id_seq TO APP_USER;
GRANT ALL ON public.math_records_id_seq TO APP_USER;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO APP_USER;

--- triggers
drop trigger if exists set_updated_at_math_records on public.math_records;
drop function if exists public.set_updated_at_math_records_fn();
create function public.set_updated_at_math_records_fn()
returns trigger
as $$
begin
 if new.status != 'complete' then
  new.updated_at = now();
 end if;
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_math_records 
before UPDATE on public.math_records
FOR EACH ROW
execute function public.set_updated_at_math_records_fn();

--- custom function
create or replace function public.get_math_day_record(day_arg int, type_arg math_calc_type, user_id_arg int) 
returns setof public.math_records
 as $$
  select * from public.math_records 
  where 
    math_records.day = day_arg and 
    math_records.type = type_arg and
    math_records.user_id = user_id_arg;
$$ language sql;


create or replace function public.upsert_math_day_record(day_arg int, type_arg math_calc_type, user_id_arg int, status_arg math_day_status_type ,details_arg json) 
returns public.math_records 
as $$
  insert into public.math_records(day, type, user_id, status, details)
  values (day_arg, type_arg, user_id_arg, status_arg, details_arg)
  on conflict (day, type, user_id)
  DO UPDATE SET (details, status) = (excluded.details, excluded.status)
  returning *;
$$ language sql;

alter table public.math_records
drop column if exists updated_at,
add column updated_at timestamp without time zone default (now() at time zone 'utc');


create or replace function public.get_math_days_status(type_arg math_calc_type, user_id_arg int) 
returns TABLE(day int, status math_day_status_type)
 as $$
 begin
  return query
    select mr.day, mr.status from public.math_records mr
    where 
      mr.type = type_arg and
      mr.user_id = user_id_arg;
end
$$ LANGUAGE plpgsql;
