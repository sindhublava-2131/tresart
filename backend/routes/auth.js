import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, street, landmark, city, state, pincode, nationality } = req.body;
    const user = new User({ name, email, password, phone, street, landmark, city, state, pincode, nationality });
    await user.save();
    
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || 'tresart_secret_key');
    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).send({ error: 'Registration failed. Please try again or use a different email.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || 'tresart_secret_key');
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Login failed' });
  }
});

// Get Current User
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

// Update Profile
router.put('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'phone', 'street', 'landmark', 'city', 'state', 'pincode', 'nationality', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
