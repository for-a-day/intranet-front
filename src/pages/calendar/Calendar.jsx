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
      <Grid item xs={3} lg={1.9} md={3} sm={3}>
        <CalendarSide onSelectCalendar={selectCalendar} />
      </Grid>
      <Grid item xs={9} lg={9.4}>
        <CalendarList calendarId={selectedCalendarId} />
      </Grid>
    </Grid>
  );
};

export default Calendar;
