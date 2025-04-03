import express from 'express';
import { Category, Achievement } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get category for an achievement (Protected)
router.get('/:achievementId', authMiddleware, async (req, res) => {
  try {
    const { achievementId } = req.params;

    const category = await Category.findOne({
      where: { achievement_id: achievementId },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found for this achievement' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});

// Update category for an achievement (Protected)
router.put('/:achievementId', authMiddleware, async (req, res) => {
  try {
    const { achievementId } = req.params;
    const { glass, plastic, paper, friends } = req.body;

    const category = await Category.findOne({
      where: { achievement_id: achievementId },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found for this achievement' });
    }

    // Update category fields
    category.glass = glass !== undefined ? glass : category.glass;
    category.plastic = plastic !== undefined ? plastic : category.plastic;
    category.paper = paper !== undefined ? paper : category.paper;
    category.friends = friends !== undefined ? friends : category.friends;

    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
});

export default router;