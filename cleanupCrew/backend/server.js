/* global process */
import { sequelize } from './src/models/index.js';
import dotenv from 'dotenv';
   dotenv.config();

   import express from 'express';
   import authRoutes from './src/routes/authRoutes.js';
   import usersRoutes from './src/routes/usersRoutes.js'
   import wasteRoutes from './src/routes/wasteRoutes.js';
   import tipsRoutes from './src/routes/tipsRoutes.js';
   import questionsRoutes from './src/routes/questionsRoutes.js'
   import achievementsRoutes from './src/routes/achievementsRoutes.js';

   // Initialize Express app
   const app = express();

   // Middleware to parse JSON requests
   app.use(express.json());

   // Define routes
   app.use('/api/auth', authRoutes);
   app.use('/api/waste', wasteRoutes);
   app.use('/api/users', usersRoutes)
   app.use('/api/tips', tipsRoutes);
   app.use('/api/questions', questionsRoutes)
   app.use('/api/achievements', achievementsRoutes);

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
       app.listen(PORT, () => {
         console.log(`Server running on http://localhost:${PORT}`);
       });
     } catch (error) {
       console.error('Unable to connect to the database:', error);
     }
   };

   // Run the server
   startServer();