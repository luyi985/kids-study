set role app_user;

insert into public.users (name)
values 
  ('Forest'),
  ('Lyndon')
  ('Daddy');
      
insert into public.math_records(user_id, day, details, status, type)
values
  (1, 1, '[{"id": 0, "question": "1+1", "result": "2" }]', 'incomplete', 'addition'),
  (2, 2, '[{"id": 0, "question": "1+1", "result": "2" }]', 'incomplete', 'addition');