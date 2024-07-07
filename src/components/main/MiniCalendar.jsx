import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const MiniCalendar = () => {
  return (
    <div style={{ width: '300px', margin: 'auto', fontSize: '0.8em'}}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: ''
        }}
        dateClick={(info) => alert('Date: ' + info.dateStr)}
      />
    </div>
  );
};

export default MiniCalendar;
