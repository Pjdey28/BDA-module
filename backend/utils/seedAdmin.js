const bcrypt = require('bcryptjs');

const User = require('../models/User');

const seedAdmin = async () => {

  try {

    const adminExists = await User.findOne({
      email: 'admin@gmail.com'
    });

    if (adminExists) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword =
      await bcrypt.hash('123456', 10);

    await User.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin seeded');

  } catch (error) {

    console.log(error);

  }
};

module.exports = seedAdmin;