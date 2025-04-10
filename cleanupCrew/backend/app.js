/* global process */
import { sequelize } from './src/models/index.js';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors

dotenv.config();

import express from 'express';
import usersRoutes from './src/routes/usersRoutes.js';
import wasteRoutes from './src/routes/wasteRoutes.js';
import achievementsRoutes from './src/routes/achievementsRoutes.js';
import friendsRoutes from './src/routes/friendsRoutes.js';
import questionsRoutes from './src/routes/questionsRoutes.js';
import leaderboardsRoutes from './src/routes/leaderboardsRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import goalsRoutes from './src/routes/goalsRoutes.js';

// Initialize Express app
const app = express();

// Enable CORS for the frontend origin
app.use(cors({
  origin: 'https://0deafcb5-4438-4b5d-8c6b-92dc1abc7085.escritorios.ieselrincon.es', // Mise à jour avec l'origine correcte du frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON requests only if Content-Type is application/json
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    express.json()(req, res, next);
  } else {
    next();
  }
});

// Define routes
app.use('/api/waste', wasteRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/leaderboards', leaderboardsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/goals', goalsRoutes)

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, Clean Up Crew!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Define port
const PORT = process.env.PORT || 3000;

// Start the server and connect to the database
const startServer = async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Synchronize models with the database (create tables if they don't exist)
    await sequelize.sync({ force: false }); // Set to true to drop and recreate tables (useful for development)
    console.log('Models synchronized with the database.');

    // Start the server
    //app.listen(PORT, () => {
    //  console.log(`Server running on http://localhost:${PORT}`);
    //});
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Run the server
startServer();

export default app;