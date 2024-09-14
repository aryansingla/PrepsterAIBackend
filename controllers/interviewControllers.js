import Interview from '../models/InterviewModel.js';
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
            createdAt: moment().format('DD-MM-YYYY')
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
