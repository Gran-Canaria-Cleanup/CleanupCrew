import express from 'express';
   import { Trash, User } from '../models/index.js';

   const router = express.Router();

   // Add waste collection for a user
   router.post('/collect', async (req, res) => {
     try {
       const { userId, glass, plastic, paper } = req.body;

       // Find user
       const user = await User.findByPk(userId);
       if (!user) {
         return res.status(404).json({ message: 'User not found' });
       }

       // Create new waste entry
       const waste = await Trash.create({
         user_id: userId,
         glass: glass || 0,
         plastic: plastic || 0,
         paper: paper || 0,
       });

       // Update user score (example: 1 point per unit of waste)
       user.score += (glass || 0) + (plastic || 0) + (paper || 0);
       await user.save();

       res.status(201).json({ message: 'Waste collected successfully', waste });
     } catch (error) {
       res.status(500).json({ message: 'Error collecting waste', error: error.message });
     }
   });

   // Get waste collection history for a user
   router.get('/:userId', async (req, res) => {
     try {
       const { userId } = req.params;

       const wasteEntries = await Trash.findAll({ where: { user_id: userId } });
       res.status(200).json(wasteEntries);
     } catch (error) {
       res.status(500).json({ message: 'Error fetching waste history', error: error.message });
     }
   });

   export default router;