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
    <Grid container spacing={0} sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      flexWrap: "nowrap",
    }}>
      <Grid
        item
        xs={12}
        sm={3}
        lg={2}
        sx={{
          minWidth: 220,
          flexShrink: 0,
          height: "100%", // 전체 높이 차지
          overflowY: "auto", // 스크롤바 추가
        }}
      >
        <CalendarSide onSelectCalendar={selectCalendar} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        lg={9.7}
        sx={{
          flexGrow: 1,
          minWidth:1000
        }}
      >
        <CalendarList calendarId={selectedCalendarId} />
      </Grid>
    </Grid>
  );
};

export default Calendar;
