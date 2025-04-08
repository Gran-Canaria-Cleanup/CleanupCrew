import express from 'express';
import { Trash, User } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get user's daily progress (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Format: "2025-04-08"
    let progress = await Trash.findOne({
      where: {
        user_id: req.user.id,
        date: today,
      },
    });

    // If no progress exists for today, create a default progress entry
    if (!progress) {
      progress = await Trash.create({
        user_id: req.user.id,
        glass: 0,
        plastic: 0,
        paper: 0,
        date: today,
      });
    }

    // Format the response
    const progressMap = {
      glass: progress.glass,
      paper: progress.paper,
      plastic: progress.plastic,
    };

    res.status(200).json(progressMap); // Ex: { "glass": 16, "paper": 9, "plastic": 15 }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
});

// Add a piece of trash (Protected)
router.post('/collect', authMiddleware, async (req, res) => {
  try {
    const { type, quantity } = req.body; // Ex: { "type": "glass", "quantity": 5 }

    // Validate trash type
    if (!['glass', 'paper', 'plastic'].includes(type)) {
      return res.status(400).json({ message: 'Invalid trash type' });
    }

    // Validate quantity (must be a positive integer)
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    const today = new Date().toISOString().split('T')[0]; // Format: "2025-04-08"
    let progress = await Trash.findOne({
      where: {
        user_id: req.user.id,
        date: today,
      },
    });

    if (!progress) {
      // Create a new progress entry if it doesn't exist
      progress = await Trash.create({
        user_id: req.user.id,
        glass: 0,
        plastic: 0,
        paper: 0,
        date: today,
      });
    }

    // Increment the collected count for the specified type by the quantity
    progress[type] = (progress[type] || 0) + parsedQuantity;
    await progress.save();

    // Add points to the user (1 point per item collected)
    const user = await User.findByPk(req.user.id);
    await user.update({ score: (user.score || 0) + parsedQuantity });

    // Format the response
    const progressMap = {
      glass: progress.glass,
      paper: progress.paper,
      plastic: progress.plastic,
    };

    res.status(200).json({ message: 'Trash added successfully', progress: progressMap });
  } catch (error) {
    res.status(500).json({ message: 'Error adding trash', error: error.message });
  }
});

// Get waste collection history for a user (Protected)
router.get('/history/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const wasteEntries = await Trash.findAll({ where: { user_id: userId } });
    res.status(200).json(wasteEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waste history', error: error.message });
  }
});

export default router;