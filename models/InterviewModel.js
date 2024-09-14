import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
    mockId: { type: String, required: true },
    jobPosition: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobExperience: { type: String, required: true },
    jsonMockResponse: { type: Object, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: String, required: true }
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
