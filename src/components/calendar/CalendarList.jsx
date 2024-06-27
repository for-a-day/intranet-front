import FullCalendar from "@fullcalendar/react";
import { Box, Stack, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

const CalendarList = () => {
  const [selectDate, setSelectDate] = useState(null);

  const dateClick = (arg) => {
    setSelectDate(arg.dateStr);
  };

  const dateClickEvent = (eventInfo) => {
    if (eventInfo.event.extendedProps.isSelected) {
      return <div style={{ backgroundColor: "skyblue", height: "100%" }}></div>;
    }
    return null;
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={dateClick}
      events={
        selectDate
          ? [
              {
                title: "",
                start: selectDate,
                allDay: true,
                display: "background",
                extendedProps: { isSelected: true },
              },
            ]
          : []
      }
      eventContent={dateClickEvent}
    />
  );
};

export default CalendarList;
