const jwt = require('jsonwebtoken');
const User = require('../model/user');

const createAccessToken = (user) => {
  return jwt.sign({ id: user._id }, '5fc42b7c3d1cfa9704efeee8180ee7e005dea156849fef88a97f5fd91428ccd96e98045d09f5c359b7f5248d9001b3c34b8e5bec4b48d440afe236711e2905c', {
    expiresIn: '15m',
  });
};

const createRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, '5c6250e7b643405067dfba07d29248e766a44a187533f6d2516ae0e1d4f1fb31b298a09d26bc69dec00873200f688614ec40eabc777f50758cef94ef4d557e85', {
    expiresIn: '7d',
  });
};

// POST /api/auth/signup
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({ name, email, password }); // ✅ Include name
    await newUser.save();

    const accessToken = createAccessToken(newUser);
    const refreshToken = createRefreshToken(newUser);

res
  .cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax', 
    maxAge: 15 * 60 * 1000,
  })
  .cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  .status(201)
  .json({ success: true, message: 'User registered and logged in' });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Signup failed', error: err.message });
  }
};





exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  res.cookie("accessToken", accessToken, {
  httpOnly: true,
  secure: false,     
  sameSite: "lax",   
  maxAge: 15 * 60 * 1000,
})
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',

      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      success: true,
      message: 'Logged in',
      result: {
        token: accessToken,
        refreshToken: refreshToken,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });
};




exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'No token' });

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = createAccessToken({ _id: user.id });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.json({ success: true, message: 'Token refreshed' });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

exports.logout = (req, res) => {
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({ success: true, message: 'Logged out' });
};


exports.changePassword = async (req, res) => {
  const {  newPassword,email } = req.body;

  try {
    // Assuming you get user ID from auth middleware
    const user = await User.findOne({email:email});

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Set and save new password
    user.password = newPassword;
    await user.save(); 

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/auth/profile
exports.getProfile = async (req, res) => {
  try {
    const {email} = req.query; 
    console.log("req?.params?.email===>>>", req.query);
    const user = await User.findOne({ email }).select("name email");

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("getProfile error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// put /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { email, name } = req.body;
    console.log("req?.params?.email===>>>", req.query);

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },                
      { name, email },         
      { new: true, runValidators: true }
    ).select("name email");
console.log("updatedUser===>>>", updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true,  user: updatedUser });
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};
