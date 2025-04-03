import express from 'express';
import { Achievement, User, Category } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Add an achievement for a user (Protected)
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { userId, name, glass, plastic, paper, friends } = req.body;

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

    // Create associated category
    const category = await Category.create({
      glass: glass || 0,
      plastic: plastic || 0,
      paper: paper || 0,
      friends: friends || 0,
      achievement_id: achievement.id,
    });

    res.status(201).json({ message: 'Achievement added successfully', achievement, category });
  } catch (error) {
    res.status(500).json({ message: 'Error adding achievement', error: error.message });
  }
});

// Get achievements for a user (Protected)
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const achievements = await Achievement.findAll({
      where: { user_id: userId },
      include: [{ model: Category }], // Include associated Category
    });

    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
});

export default router;