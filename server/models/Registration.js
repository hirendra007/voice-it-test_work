import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
export default Registration;
