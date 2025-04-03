import express from 'express';
import { Question } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Create a question (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { question, correctAnswer, points } = req.body;

    const newQuestion = await Question.create({ question, correctAnswer, points });

    res.status(201).json({ message: 'Question successfully created', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
});

// Get all questions (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
});

// Get a question by ID (Protected)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error: error.message });
  }
});

// Update a question (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { question, correctAnswer, points } = req.body;

    const existingQuestion = await Question.findByPk(id);
    if (!existingQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await existingQuestion.update({
      question: question || existingQuestion.question,
      correctAnswer: correctAnswer || existingQuestion.correctAnswer,
      points: points !== undefined ? points : existingQuestion.points,
    });

    res.status(200).json({ message: 'Question successfully updated', question: existingQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error updating question', error: error.message });
  }
});

// Delete a question by ID (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await question.destroy();
    res.status(200).json({ message: 'Question successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
});

export default router;
