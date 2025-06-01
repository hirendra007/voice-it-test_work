import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate, onExpire }) => {
  const [customDate, setCustomDate] = useState(targetDate);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  function calculateTimeLeft(date) {
    const difference = +new Date(date) - +new Date();
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
      const newTime = calculateTimeLeft(customDate);
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [customDate]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setCustomDate(newDate);
  };

  const unitVariants = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <label htmlFor="datetime" className="text-white text-sm mr-2">
          Set Event Time:
        </label>
        <input
          id="datetime"
          type="datetime-local"
          className="px-2 py-1 rounded bg-white text-black text-sm"
          value={customDate.slice(0, 16)}
          onChange={handleDateChange}
        />
      </div>

      {!timeLeft ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 text-xl font-bold"
        >
          Registration Closed
        </motion.div>
      ) : (
        <motion.div
          className="text-center text-white space-x-4 text-3xl sm:text-5xl font-bold mb-4"
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
              <span className="text-indigo-400">{String(value).padStart(2, '0')}</span>
              <span className="text-sm ml-1 uppercase text-gray-400">{unit}</span>
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Countdown;
