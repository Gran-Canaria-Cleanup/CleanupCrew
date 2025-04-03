/* global process */
import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  // The token should be in the format "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    // Attach the decoded user info (e.g., user ID) to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

export default authMiddleware;