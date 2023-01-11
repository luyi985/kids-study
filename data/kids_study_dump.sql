DROP SCHEMA IF EXISTS app_core CASCADE;
DROP USER IF EXISTS APP_USER;
CREATE USER APP_USER LOGIN PASSWORD 'qazzaq123';

CREATE SCHEMA IF NOT EXISTS app_core AUTHORIZATION APP_USER;

DROP INDEX IF exists app_core_math_records_day_user_index;
DROP INDEX IF exists app_core_users_index;
drop table if exists app_core.users;
drop table if exists app_core.math_records;

create table app_core.users(
  id SERIAL PRIMARY KEY,
  name text NOT NULL default 'new user'
);
create table app_core.math_records(
  id SERIAL PRIMARY KEY,
  day int not null default 0,
  details json not null default '[]',
  user_id int not null,
  status text not null default 'incomplete',
  CONSTRAINT fk_user FOREIGN KEY (user_id) 
	REFERENCES app_core.users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX app_core_math_records_day_user_index ON app_core.math_records(day, user_id);
CREATE UNIQUE INDEX app_core_users_index ON app_core.users(name);

GRANT USAGE ON SCHEMA app_core TO APP_USER;
GRANT ALL ON app_core.math_records TO APP_USER;
GRANT ALL ON app_core.users TO APP_USER;
GRANT ALL ON app_core.users_id_seq TO APP_USER;
GRANT ALL ON app_core.math_records_id_seq TO APP_USER;DROP SCHEMA IF EXISTS app_core CASCADE;
DROP USER IF EXISTS APP_USER;
CREATE USER APP_USER LOGIN PASSWORD 'qazzaq123';

CREATE SCHEMA IF NOT EXISTS app_core AUTHORIZATION APP_USER;

DROP INDEX IF exists app_core_math_records_day_user_index;
DROP INDEX IF exists app_core_users_index;
drop table if exists app_core.users;
drop table if exists app_core.math_records;

create table app_core.users(
  id SERIAL PRIMARY KEY,
  name text NOT NULL default 'new user'
);
create table app_core.math_records(
  id SERIAL PRIMARY KEY,
  day int not null default 0,
  details json not null default '[]',
  user_id int not null,
  status text not null default 'incomplete',
  CONSTRAINT fk_user FOREIGN KEY (user_id) 
	REFERENCES app_core.users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX app_core_math_records_day_user_index ON app_core.math_records(day, user_id);
CREATE UNIQUE INDEX app_core_users_index ON app_core.users(name);

GRANT USAGE ON SCHEMA app_core TO APP_USER;
GRANT ALL ON app_core.math_records TO APP_USER;
GRANT ALL ON app_core.users TO APP_USER;
GRANT ALL ON app_core.users_id_seq TO APP_USER;
GRANT ALL ON app_core.math_records_id_seq TO APP_USER;