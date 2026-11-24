import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// GET /api/users/profile
router.get('/profile', protect, (req, res) => res.json(req.user));

// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, bio, avatar, password } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    if (password) {
      if (password.length < 6)
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, phone: user.phone, bio: user.bio, avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
