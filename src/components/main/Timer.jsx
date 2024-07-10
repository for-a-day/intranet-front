import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Button, LinearProgress } from "@mui/material";
import Cookies from "js-cookie";

const Timer = () => {
  const [remainingTime, setRemainingTime] = useState(getInitialRemainingTime());
  const [startTime, setStartTime] = useState(Cookies.get("startTime") || "미등록");
  const [endTime, setEndTime] = useState(Cookies.get("endTime") || "미등록");
  const [isTimerRunning, setIsTimerRunning] = useState(Cookies.get("isTimerRunning") === "true");

  useEffect(() => {
    if (!isTimerRunning) return;

    const intervalId = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);
      Cookies.set("remainingTime", JSON.stringify(newRemainingTime), { expires: 1 });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  function getInitialRemainingTime() {
    const remainingTime = Cookies.get("remainingTime");
    if (remainingTime) {
      return JSON.parse(remainingTime);
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  function calculateRemainingTime() {
    const now = new Date();
    const start = Cookies.get("startTime");
    let targetTime;
    if (start && start !== "미등록") {
      const [startHour, startMinute, startSecond] = start.split(":").map(Number);
      targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour + 8,
        startMinute,
        startSecond,
      ); // 8시간 후 퇴근 시간
    } else {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    const diff = targetTime - now;

    if (diff < 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const remainingHours = Math.floor(diff / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  }

  function calculateElapsedTime() {
    const now = new Date();
    const start = Cookies.get("startTime");
    if (start && start !== "미등록") {
      const [startHour, startMinute, startSecond] = start.split(":").map(Number);
      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        startMinute,
        startSecond,
      );
      const diff = now - startTime;
      const elapsedHours = Math.floor(diff / (1000 * 60 * 60));
      const elapsedMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const elapsedSeconds = Math.floor((diff % (1000 * 60)) / 1000);

      return {
        hours: elapsedHours,
        minutes: elapsedMinutes,
        seconds: elapsedSeconds,
      };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const handleStartTime = () => {
    const now = new Date().toLocaleTimeString("ko-KR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    Cookies.set("startTime", now, { expires: 1 });
    setStartTime(now);
    setIsTimerRunning(true);
    const newRemainingTime = calculateRemainingTime();
    setRemainingTime(newRemainingTime);
    Cookies.set("remainingTime", JSON.stringify(newRemainingTime), { expires: 1 });
    Cookies.set("isTimerRunning", "true", { expires: 1 });
    Cookies.remove("endTime"); // 출근 버튼 클릭 시 퇴근 시간 쿠키 삭제
    setEndTime("미등록");
  };

  const handleEndTime = () => {
    if (isTimerRunning) {
      const remaining = calculateRemainingTime();
      if (remaining.hours > 0 || remaining.minutes > 0 || remaining.seconds > 0) {
        alert("아직 근무시간입니다.");
        return;
      }
    }

    const now = new Date().toLocaleTimeString("ko-KR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    Cookies.set("endTime", now, { expires: 1 });
    setEndTime(now);
    setIsTimerRunning(false);
    Cookies.remove("startTime");
    Cookies.remove("remainingTime");
    Cookies.remove("isTimerRunning");
    setStartTime("미등록");
    setRemainingTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const elapsed = calculateElapsedTime();
  const elapsedPercentage =
    ((elapsed.hours * 60 + elapsed.minutes + elapsed.seconds / 60) / (8 * 60)) * 100;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <Card elevation={0} sx={{ maxWidth: 300, margin: "auto", padding: 1.5 }}>
      <CardContent>
        <Typography variant="h4" component="div" sx={{ mb: 2, fontWeight: "600" }}>
          근태관리
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {formattedDate}
        </Typography>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          {`${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", margin: "13px 0" }}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress
              variant="determinate"
              value={elapsedPercentage}
              sx={{ height: 15, borderRadius: 3 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                출근
              </Typography>
              <Typography variant="body2" color="text.secondary">
                퇴근
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", marginTop: 3, marginBottom: 2 }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            출근시간
          </Typography>
          <Typography variant="body2">{startTime}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            퇴근시간
          </Typography>
          <Typography variant="body2">{endTime}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartTime}
            disabled={isTimerRunning}
          >
            출근하기
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEndTime}
            disabled={!isTimerRunning}
          >
            퇴근하기
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Timer;
