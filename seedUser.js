const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./model/user'); // ✅ Update the path if needed

mongoose.connect('mongodb://localhost:27017/auth_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createDummyUser() {
  try {
    const email = 'test@example.com';
    const plainPassword = '123456';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', existingUser.email);
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log('✅ Dummy user created:', user);
    process.exit();
  } catch (err) {
    console.error('❌ Error creating user:', err);
    process.exit(1);
  }
}

createDummyUser();
