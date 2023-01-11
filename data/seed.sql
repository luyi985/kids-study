insert into app_core.users (name)
values 
  ('Forest'),
  ('Lyndon');
      
insert into app_core.math_records(user_id, day, details, status)
values
  (1, 1, '[{"id": 0, "question": "1+1", "result": "2" }]', 'incomplete'),
  (1, 2, '[{"id": 0, "question": "1+1", "result": "2" }]', 'incomplete');