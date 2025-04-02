/* global process */
import express from 'express';
   import { User } from '../models/index.js';
   import bcrypt from 'bcryptjs';
   import jwt from 'jsonwebtoken';

   const router = express.Router();

   // Register a new user
   router.post('/register', async (req, res) => {
     try {
       const { name, email, password } = req.body;

       // Check if user already exists
       const existingUser = await User.findOne({ where: { email } });
       if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
       }

       // Hash the password
       const hashedPassword = await bcrypt.hash(password, 10);

       // Create new user
       const user = await User.create({
         name,
         email,
         password: hashedPassword,
         score: 0,
       });

       res.status(201).json({ message: 'User registered successfully', user });
     } catch (error) {
       res.status(500).json({ message: 'Error registering user', error: error.message });
     }
   });

   // Login a user
   router.post('/login', async (req, res) => {
     try {
       const { email, password } = req.body;

       // Find user by email
       const user = await User.findOne({ where: { email } });
       if (!user) {
         return res.status(400).json({ message: 'Invalid email or password' });
       }

       // Check password
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return res.status(400).json({ message: 'Invalid email or password' });
       }

       // Generate JWT token
       const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your_jwt_secret', {
         expiresIn: '1h',
       });

       res.status(200).json({ message: 'Login successful', token });
     } catch (error) {
       res.status(500).json({ message: 'Error logging in', error: error.message });
     }
   });

   export default router;