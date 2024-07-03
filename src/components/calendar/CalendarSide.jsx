import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  Button,
  ListItemButton,
  ListItemText,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import Modal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
  },
  overlay: {
    zIndex: 1409, // overlay의 z-index 설정
  },
};

Modal.setAppElement("#root");

const CalendarSide = ({ onSelectCalendar, onViewClick, onCreateClick }) => {
  const [calendarName, setCalendarName] = useState("");
  const [departmentCode, setDepartmentCode] = useState(1);
  const [message, setMessage] = useState("");
  const [calendars, setCalendars] = useState([]);
  const [selectCalendar, setSelectCalendar] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [calendarId, setCalendarId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    listCalendar();
  }, []);

  const listCalendar = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/app/calendar/department/1"
      );
      if (
        response.data.status === "success" &&
        Array.isArray(response.data.data)
      ) {
        setCalendars(response.data.data);
      } else {
        console.error("Expected an array but got:", response.data);
        setCalendars([]);
      }
    } catch (error) {
      console.error("목록 불러오기 실패:", error);
      setMessage(`목록 불러오기 실패: ${error.message}`);
    }
  };

  const CalendarCreateSubmit = async (event) => {
    event.preventDefault();
    const calendarData = { calendarName, departmentCode };
    try {
      if (isEditMode) {
        // 수정 모드
        await axios.put(
          `http://localhost:9000/app/calendar/${calendarId}`,
          calendarData
        );
      } else {
        // 등록 모드
        await axios.post("http://localhost:9000/app/calendar", calendarData);
      }
      listCalendar(); // 리스트 갱신
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("등록 실패");
      setMessage(
        `등록 실패: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const openModal = (isEdit = false, calendar = null) => {
    setIsEditMode(isEdit);
    if (isEdit && calendar) {
      setCalendarId(calendar.calendarId);
      setCalendarName(calendar.calendarName);
      setDepartmentCode(calendar.departmentCode);
    } else {
      setCalendarId(null);
      setCalendarName("");
      setDepartmentCode(1);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCalendarName("");
    setDepartmentCode(1);
    setIsEditMode(false);
  };

  const calendarUpdate = (calendar) => {
    setCalendarName(calendar.calendarName);
    openModal();
  };

  const calendarDelete = async (calendarId) => {
    try {
      await axios.delete(`http://localhost:9000/app/calendar/${calendarId}`);
      setMessage("캘린더 삭제");
      listCalendar(); // 리스트 갱신
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  const scheduleCreate = () => {
    console.log("작업");
    navigate("/app/schedule/create");
  };

  const selectedCalendar = (calendar) => {
    onSelectCalendar(calendar.calendarId);
    setSelectCalendar(calendar);
    navigate("/app/calendar", { state: { calendarId: calendar.calendarId } });
  };

  return (
    <Box>
      <h2>캘린더</h2>
      <Button variant="contained" color="primary" onClick={scheduleCreate}>
        일정 상세 등록
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="캘린더 등록"
        style={customStyles}
        ariaHideApp={false}
        aria-labelledby="modal-modal-title"
      >
        <Typography id="modal-modal-title" variant="h2" component="h2">
          {isEditMode ? "캘린더 수정" : "캘린더 등록"}
        </Typography>
        <form onSubmit={CalendarCreateSubmit}>
          <TextField
            label="캘린더 이름"
            variant="outlined"
            fullWidth
            value={calendarName}
            onChange={(e) => setCalendarName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="부서 코드"
            variant="outlined"
            fullWidth
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {isEditMode ? "수정" : "등록"}
            </Button>
            <Button type="button" onClick={closeModal} sx={{ ml: 2 }}>
              취소
            </Button>
          </Box>
        </form>
      </Modal>

      <h3 style={{ paddingTop: 6 }}>부서별 캘린더</h3>
      <List>
        {calendars.map((calendar) => (
          <ListItem key={calendar.calendarId} disablePadding>
            <ListItemButton
              style={{ paddingTop: 8, paddingBottom: 6 }}
              onClick={() => selectedCalendar(calendar)}
            >
              <ListItemText primary={calendar.calendarName} />
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => openModal(true, calendar)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => calendarDelete(calendar.calendarId)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <span
        onClick={() => openModal(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "10px 20px", // 필요에 따라 추가
          borderRadius: "4px", // 필요에 따라 추가
        }}
      >
        <AddIcon style={{ marginRight: "8px" }} /> 캘린더 등록
      </span>
    </Box>
  );
};

export default CalendarSide;
