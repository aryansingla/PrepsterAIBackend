import Interview from '../models/InterviewModel.js';
import UserAnswer from '../models/UserAnswerModel.js';

import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// Controller function for creating a new interview
export const createInterview = async (req, res) => {
    try {
        const { jobPosition, jobDescription, jobExperience, jsonMockResponse, createdBy } = req.body;

        const interview = new Interview({
            mockId: uuidv4(),
            jobPosition,
            jobDescription,
            jobExperience,
            jsonMockResponse,
            createdBy,
            createdAt: moment().format('DD-MM-YYYY HH:mm:ss')
        });

        const savedInterview = await interview.save();
        res.status(201).json({ 
            mockId: savedInterview.mockId,
            message: 'Interview Questions Fetched succesfully.'    
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving interview data' });
    }
};


export const getInterviewDetails = async (req, res) => {
    try {
        const { mockId } = req.body; 

        // Find the interview by mockId
        const interview = await Interview.findOne({ mockId });

        if (!interview) {
            return res.status(404).json({ error: 'Interview Details not found' });
        }

        // Return the matching interview details
        res.status(200).json({
            mockId: interview.mockId,
            jobPosition: interview.jobPosition,
            jobDescription: interview.jobDescription,
            jobExperience: interview.jobExperience,
            jsonMockResponse: interview.jsonMockResponse,
            createdBy: interview.createdBy,
            createdAt: interview.createdAt
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong in fetching interview data' });
    }
};

export const submitAnswer = async (req, res) => {
    try {
        const { mockId, question, correctAns, userAns, feedback, rating, userEmail } = req.body;

        // Create a new user answer record
        const newUserAnswer = new UserAnswer({
            mockIdRef: mockId,
            question,
            correctAns,
            userAns,
            feedback,
            rating,
            userEmail,
            createdAt: moment().format('DD-MM-YYYY HH:mm:ss')
        });

        // Save the answer in the database
        const savedAnswer = await newUserAnswer.save();

        res.status(201).json({
            message: 'User answer recorded successfully',
            savedAnswer
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving user answer' });
    }
}

// Controller function for getting interview feedback
export const getInterviewFeedback = async (req, res) => {
    try {
        const { interviewId } = req.params;

        // Fetch all answers related to the interviewId
        const feedbackList = await UserAnswer.find({ mockIdRef: interviewId }).sort({ _id: 1 });

        if (feedbackList.length === 0) {
            return res.status(404).json({ message: 'No feedback found for this interview.' });
        }

        res.status(200).json(feedbackList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching interview feedback' });
    }
};

// Controller function for fetching all interviews for a user
export const getInterviewsForUser = async (req, res) => {
    try {
        const { userEmail } = req.params;  // Get user's email from params

        // Find all interviews created by the user
        const interviewList = await Interview.find({ createdBy: userEmail }).sort({ _id: -1 });

        if (interviewList.length === 0) {
            return res.status(404).json({ message: 'No interviews found for this user.' });
        }

        res.status(200).json(interviewList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching interviews for user' });
    }
};