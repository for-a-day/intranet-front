import React, { useState, useEffect } from 'react';

const Timer = () => {
  // 퇴근 시간 (오후 6시 = 18시)
  const endHour = 17;
  const endMinute = 0;
  const endSecond = 0;

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  function calculateRemainingTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let remainingHours = endHour - hours;
    let remainingMinutes = endMinute - minutes;
    let remainingSeconds = endSecond - seconds;

    if (remainingSeconds < 0) {
      remainingSeconds += 60;
      remainingMinutes -= 1;
    }
    if (remainingMinutes < 0) {
      remainingMinutes += 60;
      remainingHours -= 1;
    }
    if (remainingHours < 0) {
      remainingHours += 24;
    }

    return {
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  }

  return (
    <div className="countdown-timer">
      <h2>퇴근까지 남은 시간</h2>
      <div className="time-display">
        <span>{`${remainingTime.hours}시간 `}</span>
        <span>{`${remainingTime.minutes}분 `}</span>
        <span>{`${remainingTime.seconds}초`}</span>
      </div>
    </div>
  );
};

export default Timer;
