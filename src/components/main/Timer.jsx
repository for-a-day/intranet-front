import { Card, CardContent, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
const Timer = () => {
  const endHour = 17;
  const endMinute = 0;
  const endSecond = 0;
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);
    return () => clearInterval(intervalId);
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
    <Card sx={{ maxWidth: 400, backgroundColor: "#FAFAFA", color: "black", borderRadius: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          오늘 날짜: {formattedDate}
        </Typography>
        <Typography variant="h4" component="div" sx={{ mb: 2 }}>
          퇴근까지 남은 시간
        </Typography>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold", fontSize: "2.5rem" }}>
          <span>{`${remainingTime.hours}시간 `}</span>
          <span>{`${remainingTime.minutes}분 `}</span>
          <span>{`${remainingTime.seconds}초`}</span>
        </Typography>
      </Box>
    </Card>
  );
};
export default Timer;
