import express from 'express';
import { Leaderboard } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Crear un nuevo leaderboard (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const leaderboard = await Leaderboard.create(req.body);
    res.status(201).json(leaderboard);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el leaderboard', error });
  }
});

// Obtener todos los leaderboards (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const leaderboards = await Leaderboard.findAll();
    res.status(200).json(leaderboards);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los leaderboards', error });
  }
});

// Obtener un leaderboard por su ID (Protected)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const leaderboard = await Leaderboard.findByPk(id);
    if (leaderboard) {
      res.status(200).json(leaderboard);
    } else {
      res.status(404).json({ message: 'Leaderboard no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el leaderboard', error });
  }
});

// Actualizar un leaderboard por su ID (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const leaderboard = await Leaderboard.findByPk(id);
    if (leaderboard) {
      await leaderboard.update(req.body);
      res.status(200).json(leaderboard);
    } else {
      res.status(404).json({ message: 'Leaderboard no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el leaderboard', error });
  }
});

// Eliminar un leaderboard por su ID (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const leaderboard = await Leaderboard.findByPk(id);
    if (leaderboard) {
      await leaderboard.destroy();
      res.status(200).json({ message: 'Leaderboard eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Leaderboard no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el leaderboard', error });
  }
});

export default router;
