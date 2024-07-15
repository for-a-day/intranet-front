import React, { useState } from "react";
import "./Main.css";
import TodaySchedule from "./TodaySchedule";
import Timer from "./Timer";
import TodayNote from "./TodayNote";
import UserCard from "./UserCard";
import PhoneBook from "./PhoneBook";
import ScheduleDetail from "./ScheduleDetail";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { AccessTime, LocationOn, Notes, EventAvailable } from "@mui/icons-material";
import { grey, deepPurple, red } from "@mui/material/colors";
import ApprovalList from "../../pages/approval/ApprovalList";
import MainApproval from "./MainApproval";

const MainContent = () => {
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [scheduleCount, setScheduleCount] = useState(0);

  const handleScheduleClick = (scheduleId, calendarId) => {
    setSelectedScheduleId(scheduleId);
    setSelectedCalendarId(calendarId);
  };

  const handleScheduleCountChange = (count) => {
    setScheduleCount(count);
  };

  return (
    <Grid container spacing={2} sx={{ minWidth: "1500px" }}>
      <Grid item xs={2.5}>
        <Box className="box" sx={{ backgroundColor: "#56cddd", minWidth: "300px" }}>
          <UserCard scheduleCount={scheduleCount} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box className="box" sx={{ height: 400, minWidth: "500px" }}>
          <MainApproval />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box className="box" sx={{ minWidth: "300px" }}>
          <TodayNote />
        </Box>
      </Grid>
      <Grid item xs={2.5}>
        <Box className="box" sx={{ minWidth: "300px" }}>
          <Timer />
        </Box>
      </Grid>
      <Grid item xs={2.4}>
        <Box className="box" sx={{ minWidth: "200px" }}>
          <PhoneBook />
        </Box>
      </Grid>
      <Grid item xs={2.2}>
        <Box className="box" sx={{ height: "355px" }}>
          <TodaySchedule
            onScheduleClick={handleScheduleClick}
            selectedScheduleId={selectedScheduleId}
            onScheduleCountChange={handleScheduleCountChange}
          />
        </Box>
      </Grid>
      <Grid item xs={4.4}>
        <Box className="box" sx={{ height: "355px", minHeight: "355px", maxHeight: "355px" }}>
          {selectedScheduleId ? (
            <ScheduleDetail
              isCreate={false}
              scheduleId={selectedScheduleId}
              selectedCalendarId={selectedCalendarId}
              onComplete={() => {
                setSelectedScheduleId(null);
                setSelectedCalendarId(null);
              }}
            />
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
              p={3}
            >
              <EventAvailable sx={{ fontSize: 80, color: grey[400] }} />
              <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
                일정을 선택해주세요
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainContent;
