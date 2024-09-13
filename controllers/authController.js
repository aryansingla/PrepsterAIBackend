import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      status: 200,
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({
      message: 'Invalid credentials'
    });

    const token = jwt.sign({ userId: user._id }, 'secretToken', { expiresIn: '1h' });

    res.json({
      status: 200,
      message: "Login Successful",
      token: token,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    // Simply remove the token from the client side to "log out"
    res.status(200).json({
      status: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Google OAuth Callback
export const googleAuthCallback = async (req, res) => {
  try {
    const { id, emails, displayName } = req.user;
    let user = await User.findOne({ googleId: id });

    if (!user) {
      user = new User({
        name: displayName,
        email: emails[0].value,
        googleId: id,
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, 'secretToken', { expiresIn: '1h' });
    res.redirect(`http://your-client-app-url.com?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
