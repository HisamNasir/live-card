import { useEffect, useState } from 'react';

function CountdownTimer({ endDate }) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTime = new Date(endDate).getTime();
      const timeDiff = Math.max(targetTime - currentTime, 0);

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });

      if (timeDiff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div id="countDiv" className="grid grid-cols-4 uppercase w-full text-white text-center font-ruluko text-2xl">
      <div className=' leading-loose'>
        <span className=" text-6xl font-light text-center">{timeRemaining.days}</span>
        <div className=" text-xs font-light text-center">Days</div>
      </div>
      <div className=' leading-loose'>
        <span className=" text-6xl font-light text-center">{timeRemaining.hours.toString().padStart(2, '0')}</span>
        <div className=" text-sm font-light text-center">Hours</div>
      </div>
      <div className=' leading-loose'>
        <span className=" text-6xl font-light text-center">{timeRemaining.minutes.toString().padStart(2, '0')}</span>
        <div className=" text-sm font-light text-center">Minutes</div>
      </div>
      <div className=' leading-loose'>
        <span className=" text-6xl font-light text-center">{timeRemaining.seconds.toString().padStart(2, '0')}</span>
        <div className=" text-sm font-light text-center">Seconds</div>
      </div>
    </div>
  );
}

export default CountdownTimer;
