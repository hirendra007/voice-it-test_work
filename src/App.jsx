import { useState } from 'react';
import Countdown from './components/Countdown';
import RegistrationForm from './components/Registration';
import { motion } from 'framer-motion';

const App = () => {
  const [formDisabled, setFormDisabled] = useState(false);
  const eventDate = '2025-06-15T18:00:00';

  return (
    <div className="p-6 min-h-screen bg-black text-center flex items-center justify-center font-mono text-white" >
    <motion.div
      className="fixed inset-0 "
      initial={{ opacity: 0, y: 1000 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        background:
          'radial-gradient(125% 125% at 50% 10%, #000 50%, #63e 140%)',
      }}
    >
      </motion.div>
      <div className="absolute">
        <motion.h2
          className="text-3xl font-extrabold mb-2 text-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Voice It
        </motion.h2>

        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Awesome Event
        </motion.h1>

        <Countdown targetDate={eventDate} onExpire={() => setFormDisabled(true)} />

        <div className="mt-6">
          <RegistrationForm isFormDisabled={formDisabled} />
        </div>
      </div>
    
    </div>
  );
};

export default App;
