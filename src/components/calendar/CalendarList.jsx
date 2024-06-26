import FullCalendar from "@fullcalendar/react";
import { Box, Stack, Typography, Grid } from "@mui/material";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarList = () => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={6} lg={12}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[
              { title: "아", date: "2024-06-01" },
              { title: "오", date: "2024-06-01" },
              { title: "집가고싶다", date: "2024-06-02" },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalendarList;
