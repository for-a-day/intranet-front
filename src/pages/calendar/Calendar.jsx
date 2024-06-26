import { Typography } from "@mui/material";
import React from "react";
import CalendarList from "../../components/calendar/CalendarList";

const Calendar = () => {
  return (
    <div>
      <Typography variant="h1">캘린더입니다</Typography>
      <CalendarList />
    </div>
  );
};

export default Calendar;
