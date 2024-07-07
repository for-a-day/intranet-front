import FullCalendar from "@fullcalendar/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
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
    zIndex: 1500,
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
  const navigate = useNavigate(); // useNavigate 훅 사용
  const locations = useLocation();
  const [endTimeErrorMessage, setEndTimeErrorMessage] = useState("");
  var calendarIds = locations?.state?.calendarId || null;

  useEffect(() => {
    if (calendarId) {
      scheduleList(calendarId);
    } else {
      scheduleList(calendarIds);
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
        const formattedEvents = response.data.schedule.map((schedule) => {
          return {
            scheduleId: schedule.scheduleId,
            title: schedule.subject,
            start: new Date(schedule.startDate).toISOString(),
            end: new Date(schedule.endDate).toISOString(),
            allDay: false,
            extendedProps: {
              startTime: schedule.startTime.slice(0, 5), // 초 단위 제거
              endTime: schedule.endTime.slice(0, 5), // 초 단위 제거
              scheduleId: schedule.id,
            },
          };
        });

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
    if (!calendarIds) {
      alert("캘린더를 선택하거나 추가해주세요.");
      return;
    }

    setSelectDate(arg.dateStr);
    setStartDate(arg.dateStr);
    setEndDate(arg.dateStr);
    setStartTime("09:00");
    setEndTime("18:00");
    setModalIsOpen(true);
  };

  const handleEndTimeChange = (time) => {
    if (time < startTime) {
      setEndTimeErrorMessage("종료 시간을 다시 설정해주세요.");
      setEndTime("");
    } else {
      setEndTimeErrorMessage("");
      setEndTime(time);
    }
  };

  const modalClose = () => {
    setModalIsOpen(false);
    setTitle("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
  };

  const scheduleSumbit = async () => {
    if (!title) {
      alert("일정 제목을 작성해주세요.");
      return;
    }
    if (!startDate) {
      alert("시작일을 작성해주세요.");
      return;
    }
    if (!endDate) {
      alert("종료일을 작성해주세요.");
      return;
    }
    if (!startTime) {
      alert("시작 시간을 작성해주세요.");
      return;
    }
    if (!endTime) {
      alert("종료 시간을 작성해주세요.");
      return;
    }

    // 새로운 일정 생성

    const newSchedule = {
      calendarId: calendarId || calendarIds,
      subject: title,
      content: "", // 내용은 빈 문자열로 설정
      startDate: startDate,
      endDate: endDate,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      location: location,
    };
    console.log(calendarIds);
    try {
      await axios.post("http://localhost:9000/app/schedule", newSchedule);
      console.log("일정 추가 성공");

      const response = await axios.get(
        `http://localhost:9000/app/schedule/${calendarIds}`
      );

      if (
        response.data.status === "success" &&
        Array.isArray(response.data.schedule)
      ) {
        const formattedEvents = response.data.schedule.map((schedule) => ({
          scheduleId: schedule.scheduleId,
          title: schedule.subject,
          start: new Date(schedule.startDate).toISOString(),
          end: new Date(schedule.endDate).toISOString(),
          allDay: false,
          extendedProps: {
            startTime: schedule.startTime.slice(0, 5), // 초 단위 제거
            endTime: schedule.endTime.slice(0, 5), // 초 단위 제거
            scheduleId: schedule.id,
          },
        }));

        setEvents(formattedEvents);
      } else {
        console.error("Expected an array but got:", response.data);
        setEvents([]);
      }
      modalClose();
    } catch (error) {
      console.error("일정 추가 실패", error);
    }
  };

  const eventClick = (info) => {
    const scheduleId = info.event.extendedProps.scheduleId;
    console.log("Event clicked:", info);
    console.log("Schedule ID:", info.event.extendedProps);
    navigate(`/app/schedule/detail/${scheduleId}`); // 일정 상세보기 페이지로 이동
  };

  const eventDidMount = (info) => {
    const { event: schedule } = info;
    const start = new Date(schedule.start);
    const end = new Date(schedule.end);
    const isMultiDay = (end - start) / (1000 * 60 * 60 * 24) > 1;

    if (isMultiDay) {
      info.el.classList.add("multi-day-event");
    } else {
      info.el.classList.add("single-day-event");
    }
  };

  const eventContent = (info) => {
    const { event: schedule } = info;
    const start = new Date(schedule.start);
    const end = new Date(schedule.end);
    const isMultiDay = (end - start) / (1000 * 60 * 60 * 24) >= 1;

    const textColor = isMultiDay ? "rgb(65, 61, 61)" : "inherit";

    return (
      <div
        className={isMultiDay ? "multi-day-event" : "single-day-event"}
        style={{ color: textColor, display: "flex", alignItems: "center" }}
      >
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "skyblue",
            marginRight: "5px",
          }}
        ></span>
        <div style={{ paddingRight: 5 }}>
          {schedule.extendedProps.startTime}
        </div>{" "}
        {/* 시간 텍스트를 추가 */}
        <b
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {schedule.title}
        </b>
      </div>
    );
  };

  return (
    <>
      <FullCalendar
        key={events.length}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={dateClick}
        events={events}
        locale={"ko"}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          meridiem: false,
        }}
        headerToolbar={{
          left: "dayGridMonth dayGridWeek",
          center: "prev title next today",
          right: "",
        }}
        buttonText={{
          today: "오늘",
          dayGridMonth: "월간",
          dayGridWeek: "주간",
        }}
        dayCellContent={(args) => {
          return { html: args.date.getDate().toString() }; // 숫자만 출력
        }}
        titleFormat={{ year: "numeric", month: "2-digit" }}
        eventClick={eventClick}
        eventDidMount={eventDidMount}
        eventContent={eventContent}
        className="height-calendar"
        eventOrder="startTime"
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalClose}
        style={modalStyle}
        shouldCloseOnOverlayClick={false}
      >
         <IconButton
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={modalClose}
          >
            <CloseIcon />
          </IconButton>
        <h2 style={{fontSize:'1.5rem', color: '#333'}}>일정 간편 등록</h2>
        <hr></hr>
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
              InputProps={{
                inputProps: { min: startDate },
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
              onChange={(e) => handleEndTimeChange(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!endTimeErrorMessage}
              helperText={endTimeErrorMessage}
            />
          </Grid>
        </Grid>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="location-label">장소</InputLabel>
          <Select
            label="장소"
            labelId="location-label"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            MenuProps={{
              style: {
                zIndex: 1501,
              },
            }}
          >
            <MenuItem value="본사 1층 공용 회의실">
              본사 1층 공용 회의실
            </MenuItem>
            <MenuItem value="4층 회의실">4층 회의실</MenuItem>
            <MenuItem value="5층 스튜디오">5층 스튜디오</MenuItem>
            <MenuItem value="3층 회의실">3층 회의실</MenuItem>
            <MenuItem value="미지정">미지정</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={scheduleSumbit}>
            추가
          </Button>
          <Button
            variant="contained"
            onClick={modalClose}
            sx={{ ml: 2, backgroundColor:'#dc3545', color:"white"}}
          >
            취소
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CalendarList;
