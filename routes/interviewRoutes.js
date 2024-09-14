import express from 'express';
import { createInterview } from '../controllers/interviewControllers.js';

const router = express.Router();

// POST request to store mock interview data
router.post('/create-interview', createInterview);

export default router;
