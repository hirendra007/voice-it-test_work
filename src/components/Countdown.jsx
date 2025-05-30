import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      onExpire(); // disable form
      return null;
    }

    return {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-500 text-xl font-bold"
      >
        Registration Closed
      </motion.div>
    );
  }

  const unitVariants = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 },
  };

  return (
    <motion.div
      className="text-center text-white space-x-4 text-3xl sm:text-5xl font-bold mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.span
          key={unit}
          variants={unitVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          <span className="text-blue-400">{String(value).padStart(2, '0')}</span>
          <span className="text-sm ml-1 uppercase text-gray-400">{unit}</span>
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Countdown;
