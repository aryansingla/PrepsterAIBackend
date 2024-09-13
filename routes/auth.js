import express from 'express';
import passport from 'passport';
import { registerUser,loginUser, googleAuthCallback , logoutUser } from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Google Auth route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Auth callback route
router.get('/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);

// Logout route
router.post('/logout', logoutUser);

export default router;
