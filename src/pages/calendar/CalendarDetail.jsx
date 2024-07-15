import { Grid, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import CalendarSide from "../../components/calendar/CalendarSide";
import CalendarForm from "../../components/calendar/CalendarForm";
import CalendarList from "../../components/calendar/CalendarList";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const CalendarDetail = ({ isCreate }) => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCalendarId, setSelectedCalendarId] = useState(
    location.state?.calendarId || null
  );
  const [showForm, setShowForm] = useState(false); // 새로운 상태 추가

  useEffect(() => {
    if (location.state?.calendarId) {
      setSelectedCalendarId(location.state.calendarId);
    }
  }, [location.state]);

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

  const handleFormComplete = (calendarId) => {
    setShowForm(false);
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
        }}
      >
        <CalendarSide
          onSelectCalendar={selectCalendar}
          onCreateClick={handleCreateClick}
        />
      </Grid>
      <Grid item xs={9} lg={9.4}>
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
            onComplete={handleFormComplete}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default CalendarDetail;
