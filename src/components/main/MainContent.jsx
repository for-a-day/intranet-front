import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Paper,
  Button,
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
        <Stack direction="column" spacing={1}>
          <Button sx={{ bgcolor: "#56CDDD", color: "white", fontSize: "20px", fontWeight: "bold" }}>
            외근/휴가신청
          </Button>
          <Button sx={{ bgcolor: "#56CDDD", color: "white", fontSize: "20px", fontWeight: "bold" }}>
            일정등록
          </Button>
          <Button sx={{ bgcolor: "#56CDDD", color: "white", fontSize: "20px", fontWeight: "bold" }}>
            버튼3
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Box>
          <Timer />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <TodayNote />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <TodaySchedule />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className="box" sx={{ height: 300 }}>
          <MiniCalendar />
        </Box>
      </Grid>
    </Grid>
  );
};
export default MainContent;
