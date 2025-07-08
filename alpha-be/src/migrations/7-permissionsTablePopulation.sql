INSERT INTO permission (entity, action, name)
VALUES
  ('user', 'create', 'createUser'),
  ('user', 'read', 'readUser'),
  ('user', 'update', 'updateUser'),
  ('user', 'delete', 'deleteUser'),

  ('merchant', 'create', 'createMerchant'),
  ('merchant', 'read', 'readMerchant'),
  ('merchant', 'update', 'updateMerchant'),
  ('merchant', 'delete', 'deleteMerchant'),

  ('role', 'create', 'createRole'),
  ('role', 'read', 'readRole'),
  ('role', 'update', 'updateRole'),
  ('role', 'delete', 'deleteRole');
