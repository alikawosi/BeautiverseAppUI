import {useEffect, useState} from 'react';

const useCountdown = duration => {
  const countDownDate = new Date().getTime() + duration * 1000;
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(
        countDownDate - new Date().getTime() > 0
          ? countDownDate - new Date().getTime()
          : 0,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return getReturnValues(countDown);
};

const getReturnValues = countDown => {
  let x = [];
  if (countDown > 0) {
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    x = [minutes, seconds];
  } else {
    x = [0, 0];
  }
  return x;
};

export {useCountdown};
