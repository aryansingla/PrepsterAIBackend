import mongoose from 'mongoose';

const userAnserSchema = new mongoose.Schema({
    mockIdRef: { type: String, required: true },
    question: { type: String, required: true },
    correctAns: { type: String},
    userAns: { type: String},
    feedback: { type: String},
    rating: { type: String},
    userEmail: { type: String},
    createdAt: { type: String, required: true }
});

const Interview = mongoose.model('UserAnswer', userAnserSchema);

export default Interview;
