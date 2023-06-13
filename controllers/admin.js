const UserModel = require('../models/User.js');

const adminUser = new User({
  username: 'admin',
  email: 'admin@israr.com',
  password: 'khan123',
  role: 'admin'
});

adminUserModel.save()
  .then(() => {
    console.log('Admin user created successfully');
  })
  .catch((error) => {
    console.error('Error creating admin user:', error);
  });

  module.exports = adminUser;
