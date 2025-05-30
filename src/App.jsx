import { useState } from 'react';
import Countdown from './components/Countdown';
import RegistrationForm from './components/Registration';
import { motion } from 'framer-motion';

const App = () => {
  const [formDisabled, setFormDisabled] = useState(false);
  const eventDate = '2025-06-15T18:00:00';
  

  return (
    <div className="min-h-screen mx-auto p-6 text-center font-mono bg-black text-white">
      <motion.h1 className="text-2xl font-bold mb-4"
        initial={{ opacity: 0,y:-10 }}
        animate={{ opacity: 1,y:0, transition: { duration: 1 } }}>Awesome Event</motion.h1>
      <Countdown targetDate={eventDate} onExpire={() => setFormDisabled(true)} />
      <div className="mt-6">
        <RegistrationForm isFormDisabled={formDisabled} />
      </div>
    </div>
  );
};

export default App;
