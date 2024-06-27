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

const CalendarSide = () => {
  const [calendarName, setCalendarName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [message, setMessage] = useState("");
  const [calendars, setCalendars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    listCalendar();
  }, []);

  const listCalendar = async () => {
    try {
      const response = await axios.get("http://localhost:9000/app/calendar");
      if (Array.isArray(response.data)) {
        setCalendars(response.data);
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
      const response = await axios.post(
        "http://localhost:9000/app/calendar",
        calendarData
      );
      setMessage("캘린더 등록 완료");
      listCalendar(); // 새로운 캘린더를 등록한 후 리스트 갱신
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("등록 실패");
      setMessage(
        `등록 실패: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCalendarName("");
    setDepartmentCode("");
  };

  const calendarUpdate = (calendar) => {
    setCalendarName(calendar.calendarName);
    openModal();
  };

  const calendarDelete = async (calendarId) => {
    try {
      await axios.delete("http://localhost:9000/app/calendar/${calendarId}");
      setMessage("캘린더 삭제");
      listCalendar(); // 리스트 갱신
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  return (
    <Box>
      <h2>캘린더</h2>
      <Button variant="contained" color="success" onClick={openModal}>
        캘린더 등록
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
          새 캘린더 추가
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
              등록
            </Button>
            <Button type="button" onClick={closeModal} sx={{ ml: 2 }}>
              취소
            </Button>
          </Box>
        </form>
        {message && <p>{message}</p>}
      </Modal>

      <h3 style={{ paddingTop: 6 }}>부서별 캘린더</h3>
      <List>
        {calendars.map((calendar) => (
          <ListItem key={calendar.calendarId} disablePadding>
            <ListItemButton style={{ paddingTop: 8, paddingBottom: 6 }}>
              <ListItemText primary={calendar.calendarName} />
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => calendarUpdate(calendar)}
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
    </Box>
  );
};

export default CalendarSide;
