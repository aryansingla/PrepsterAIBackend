import express from 'express';
import { createInterview, getInterviewDetails, getInterviewFeedback, getInterviewsForUser, submitAnswer } from '../controllers/interviewControllers.js';

const router = express.Router();

// POST request to store mock interview data
router.post('/create-interview', createInterview);
router.post('/get-interview-details', getInterviewDetails);

// New route for submitting an answer
router.post('/submit-answer', submitAnswer);

router.get('/interview-feedback/:interviewId', getInterviewFeedback);

router.get('/user-interviews/:userEmail', getInterviewsForUser);

export default router;
