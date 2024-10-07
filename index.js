import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth.js';
import interviewRoutes from './routes/interviewRoutes.js';
import dotenv from 'dotenv';


dotenv.config({ path: '.env.local' });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', interviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

