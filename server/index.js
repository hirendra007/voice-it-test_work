import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import registerRoute from './routes/registerRoute.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

try {
  await mongoose.connect(process.env.MONGODB);
  console.log('MongoDB Connected');
} catch (err) {
  console.error('MongoDB connection error:', err);
}

app.use('/api/register', registerRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
export default app