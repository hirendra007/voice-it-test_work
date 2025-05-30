import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Registration = ({ isFormDisabled }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-zinc-900 text-white max-w-md mx-auto p-6 rounded-xl shadow-lg space-y-4"
    >
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="text"
        name="name"
        disabled={isFormDisabled}
        placeholder="Your Name"
        onChange={handleChange}
        className={`bg-zinc-800 border border-zinc-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
          isFormDisabled ? 'opacity-30' : 'opacity-100'
        }`}
      />

      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="email"
        name="email"
        disabled={isFormDisabled}
        placeholder="Your Email"
        onChange={handleChange}
        className={`bg-zinc-800 border border-zinc-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
          isFormDisabled ? 'opacity-30' : 'opacity-100'
        }`}
      />

      <motion.button
        whileHover={!isFormDisabled && { scale: 1.05 }}
        whileTap={!isFormDisabled && { scale: 0.95 }}
        type="submit"
        disabled={isFormDisabled}
        className={`w-full py-2 rounded font-medium bg-blue-600 text-white transition ${
          isFormDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
      >
        Submit
      </motion.button>

      <AnimatePresence>
        {message && (
          <motion.p
            key="feedback"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`text-sm mt-2 text-center font-medium ${
              isFormDisabled ? 'text-red-500' : 'text-green-400'
            }`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default Registration;