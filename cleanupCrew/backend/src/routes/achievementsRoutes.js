import express from 'express';
import { Achievement, User } from '../models/index.js';

const router = express.Router();

// Add an achievement for a user
router.post('/add', async (req, res) => {
  try {
    const { userId, name } = req.body;

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new achievement
    const achievement = await Achievement.create({
      name,
      user_id: userId,
    });

    res.status(201).json({ message: 'Achievement added successfully', achievement });
  } catch (error) {
    res.status(500).json({ message: 'Error adding achievement', error: error.message });
  }
});

// Get achievements for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const achievements = await Achievement.findAll({ where: { user_id: userId } });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
});

export default router;