import { Grid, Box, Button } from "@mui/material";
import React, { useState } from "react";
import CalendarSide from "../../components/calendar/CalendarSide";
import CalendarForm from "../../components/calendar/CalendarForm";
import CalendarList from "../../components/calendar/CalendarList";
import { useParams, useNavigate } from "react-router-dom";

const CalendarDetail = ({ isCreate }) => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [showForm, setShowForm] = useState(false); // 새로운 상태 추가

  const selectCalendar = (calendarId) => {
    setSelectedCalendarId(calendarId);
    setShowForm(false);
  };

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleViewClick = (id) => {
    navigate(`/app/schedule/detail/${id}`);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={3} lg={2.2}>
        <CalendarSide
          onSelectCalendar={selectCalendar}
          onCreateClick={handleCreateClick}
        />
      </Grid>
      <Grid item xs={9} lg={9.2}>
        {selectedCalendarId && !showForm ? (
          <>
            <CalendarList
              calendarId={selectedCalendarId}
              onEventClick={handleViewClick}
            />
          </>
        ) : (
          <CalendarForm
            isCreate={isCreate}
            scheduleId={scheduleId}
            selectedCalendarId={selectedCalendarId}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default CalendarDetail;
