import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import React from "react";
import "./Main.css";
import TodaySchedule from "./TodaySchedule";
import Timer from "./Timer";
import TodayNote from "./TodayNote";
import UserCard from "./UserCard";
import MiniCalendar from "./MiniCalendar";

const MainContent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box>
          <UserCard />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box className="box" sx={{ height: 400 }}>
        전자 결재 문서
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box className="box" sx={{ height: 300 }}>
          일정등록 바로가기 / 휴가 신청서 작성 바로가기
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className="box">
          <Timer />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className="box">
          <TodayNote />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className="box">
          <TodaySchedule />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className="box" sx={{ height: 300 }}>
          <MiniCalendar/>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainContent;
