import { Grid } from "@mui/material";
import React, { useState } from "react";
import CalendarList from "../../components/calendar/CalendarList";
import CalendarSide from "../../components/calendar/CalendarSide";

const Calendar = () => {
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);

  const selectCalendar = (calendarId) => {
    setSelectedCalendarId(calendarId);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={3} lg={2.2}>
        <CalendarSide onSelectCalendar={selectCalendar} />
      </Grid>
      <Grid xs={7} lg={9.8}>
        <CalendarList calendarId={selectedCalendarId} />
      </Grid>
    </Grid>
  );
};

export default Calendar;
