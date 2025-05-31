import express from 'express';
import { body, validationResult } from 'express-validator';
import Registration from '../models/Registration.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    try {
      const { name, email } = req.body;
      await Registration.create({ name, email });   
      res.status(200).json({ message: 'Registration successful' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
