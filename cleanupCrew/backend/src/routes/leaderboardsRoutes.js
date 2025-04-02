import express from 'express';
import { Leaderboard } from '../models'; // Asegúrate de importar el modelo

const router = express.Router();

// Crear un nuevo leaderboard
router.post('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.create(req.body);
    res.status(201).json(leaderboard);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el leaderboard', error });
  }
});

// Obtener todos los leaderboards
router.get('/', async (req, res) => {
  try {
    const leaderboards = await Leaderboard.findAll();
    res.status(200).json(leaderboards);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los leaderboards', error });
  }
});

// Obtener un leaderboard por su ID
router.get('/:id', async (req, res) => {
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

// Actualizar un leaderboard por su ID
router.put('/:id', async (req, res) => {
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

// Eliminar un leaderboard por su ID
router.delete('/:id', async (req, res) => {
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
