import { Grid } from "@mui/material";
import React from "react";
import CalendarList from "../../components/calendar/CalendarList";
import CalendarSide from "../../components/calendar/CalendarSide";

const Calendar = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={3} lg={2.2}>
        <CalendarSide />
      </Grid>
      <Grid xs={7} lg={9.8}>
        <CalendarList />
      </Grid>
    </Grid>
  );
};

export default Calendar;
