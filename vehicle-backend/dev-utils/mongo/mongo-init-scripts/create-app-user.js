db = db.getSiblingDB('admin');
db.auth('admin', 'password');

db = db.getSiblingDB('vehicle_db');
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [{ role: 'readWrite', db: 'vehicle_db' }],
});
