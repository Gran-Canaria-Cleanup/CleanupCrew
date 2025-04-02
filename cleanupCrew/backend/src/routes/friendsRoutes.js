import express from 'express';
import { Friend, User } from '../models/index.js';

const router = express.Router();

// Add a friend for a user
router.post('/add', async (req, res) => {
  try {
    const { userId, name } = req.body;

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new friend
    const friend = await Friend.create({
      name,
      user_id: userId,
    });

    res.status(201).json({ message: 'Friend added successfully', friend });
  } catch (error) {
    res.status(500).json({ message: 'Error adding friend', error: error.message });
  }
});

// Get friends for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const friends = await Friend.findAll({
      where: { user_id: userId },
    });

    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friends', error: error.message });
  }
});

export default router;