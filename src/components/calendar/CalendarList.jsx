import FullCalendar from "@fullcalendar/react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import axios from "axios";
import Modal from "react-modal";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "600px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1409,
  },
};

const CalendarList = ({ calendarId }) => {
  const [selectDate, setSelectDate] = useState(null); // 선택된 날짜 저장
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 창 열림/닫힘 상태
  const [title, setTitle] = useState(""); // 일정 제목
  const [startDate, setStartDate] = useState(""); // 시작일
  const [endDate, setEndDate] = useState(""); // 종료일
  const [startTime, setStartTime] = useState(""); // 시작 시간
  const [endTime, setEndTime] = useState(""); // 종료 시간
  const [location, setLocation] = useState(""); // 일정 장소
  const [events, setEvents] = useState([]); // 일정 목록

  useEffect(() => {
    if (calendarId) {
      scheduleList(calendarId);
    }
  }, [calendarId]);

  const scheduleList = async (calendarId) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/app/schedule/${calendarId}`
      );
      if (
        response.data.status === "success" &&
        Array.isArray(response.data.schedule)
      ) {
        // 이벤트 데이터 변환
        const formattedEvents = response.data.schedule.map((event) => ({
          title: event.subject,
          start: new Date(event.startDate).toISOString(),
          end: new Date(event.endDate).toISOString(),
          allDay: false,
        }));
        setEvents(formattedEvents);
      } else {
        console.error("Expected an array but got:", response.data);
        setEvents([]);
      }
    } catch (error) {
      console.error("일정 불러오기 실패", error);
      setEvents([]);
    }
  };

  // 날짜 클릭 시 등록 모달 창
  const dateClick = (arg) => {
    setSelectDate(arg.dateStr);
    setStartDate(arg.dateStr);
    setEndDate(arg.dateStr);
    setModalIsOpen(true);
  };

  const modalClose = () => {
    setModalIsOpen(false);
    setTitle("");
    setStartDate("");
    setEndDate("");
    setStartDate("");
    setEndTime("");
    setLocation("");
  };

  const scheduleSumbit = async () => {
    // 필수 입력값 확인
    if (!title || !startDate || !endDate || !startTime || !endTime) return;

    // 새로운 일정 생성

    const newSchedule = {
      calendarId,
      subject: title,
      content: "", // 내용은 빈 문자열로 설정
      startDate: startDate,
      endDate: endDate,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      location: location,
    };

    try {
      await axios.post("http://localhost:9000/app/schedule", newSchedule);
      scheduleList(calendarId);
      modalClose();
    } catch (error) {
      console.error("일정 추가 실패", error);
    }
  };

  // 이벤트 클릭 시
  const eventClick = (info) => {
    alert("Event: " + info.event.title);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={dateClick}
        events={events}
        eventTimeFormat={{
          // 시간을 숨기기 위해 시간 형식을 빈 문자열로 설정
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // 24시간 형식으로 표시
          meridiem: false,
        }}
        eventClick={eventClick}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalClose}
        style={modalStyle}
        shouldCloseOnOverlayClick={false}
      >
        <Typography variant="h3" component="h2">
          일정 간편 추가
        </Typography>
        <TextField
          label="일정 제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <TextField
              label="시작일"
              type="date"
              variant="outlined"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="시작 시간"
              type="time"
              variant="outlined"
              fullWidth
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="종료일"
              type="date"
              variant="outlined"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="종료 시간"
              type="time"
              variant="outlined"
              fullWidth
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <TextField
          label="장소"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={scheduleSumbit}>
            추가
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={modalClose}
            sx={{ ml: 2 }}
          >
            취소
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CalendarList;
