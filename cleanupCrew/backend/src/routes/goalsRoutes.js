import express from 'express';
import { Goal } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get user's daily goals (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Format: "2025-04-08"
    let goals = await Goal.findAll({
      where: {
        user_id: req.user.id,
        date: today,
      },
    });

    // If no goals exist for today, create default goals
    if (goals.length === 0) {
      const defaultGoals = [
        { type: 'glass', target: 20, date: today },
        { type: 'paper', target: 20, date: today },
        { type: 'plastic', target: 20, date: today },
      ];

      goals = await Promise.all(
        defaultGoals.map(goal =>
          Goal.create({ ...goal, user_id: req.user.id })
        )
      );
    }

    // Format the response
    const goalsMap = goals.reduce((acc, goal) => {
      acc[goal.type] = goal.target;
      return acc;
    }, {});

    res.status(200).json(goalsMap); // Ex: { "glass": 20, "paper": 20, "plastic": 20 }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
});

export default router;