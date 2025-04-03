import express from 'express';
import { Leaderboard, User } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Create a new leaderboard (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const leaderboard = await Leaderboard.create(req.body);
    res.status(201).json(leaderboard);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el leaderboard', error });
  }
});

// Get all the leaderboards (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findAll({
      include: { model: User, attributes: ['id', 'name', 'score'] },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
});

// Get an leaderboard by ID (Protected)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const { id } = req.params;
    const entry = await Leaderboard.findByPk(id, {
      include: { model: User, attributes: ['id', 'name', 'score'] },
    });

    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard entry', error: error.message });
  }
});

// Update a leaderboard by id (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Leaderboard name is required' });
    }

    const newLeaderboard = await Leaderboard.create({ name });

    res.status(201).json({ message: 'Leaderboard created successfully', leaderboard: newLeaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Error creating leaderboard', error: error.message });
  }
});

// Add an user to the leaderboard you choose
router.post('/:leaderboardId/users', async (req, res) => {
  try {
    const { leaderboardId } = req.params;
    const { userId } = req.body;

    const leaderboard = await Leaderboard.findByPk(leaderboardId);
    const user = await User.findByPk(userId);

    if (!leaderboard) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await leaderboard.addUser(user);

    res.status(200).json({ message: 'User added to leaderboard successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user to leaderboard', error: error.message });
  }
});

// Get all the users in one leaderboard
router.get('/:leaderboardId/users', async (req, res) => {
  try {
    const { leaderboardId } = req.params;

    const leaderboard = await Leaderboard.findByPk(leaderboardId, {
      include: {
        model: User,
        attributes: ['id', 'name', 'score'],
        through: { attributes: [] },
      },
    });

    if (!leaderboard) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }

    res.status(200).json(leaderboard.Users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard users', error: error.message });
  }
});



// Delete a leaderboard entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Leaderboard.findByPk(id);

    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }

    await entry.destroy();
    res.status(200).json({ message: 'Leaderboard entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting leaderboard entry', error: error.message });
  }
});

export default router;
