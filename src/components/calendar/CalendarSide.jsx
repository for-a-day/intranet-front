import React, { useState, useEffect } from "react";
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
import { useNavigate, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "./Calendar.css";
import instance from "../../axiosConfig";

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
  const [departmentCode, setDepartmentCode] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [calendars, setCalendars] = useState([]);
  const [selectCalendar, setSelectCalendar] = useState(null);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [calendarId, setCalendarId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await instance.get("/app/employees/current", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserInfo(response?.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    userData();
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      setDepartmentCode(userInfo.departmentCode);
      setDepartment(userInfo.department);
    }
  }, [userInfo]);

  useEffect(() => {
    if (departmentCode) {
      const listCalendar = async (departmentCode) => {
        try {
          const response = await instance.get(`app/calendar/department/${departmentCode}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.status === "success" && Array.isArray(response.data.data)) {
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

      listCalendar(departmentCode);
    }
  }, [departmentCode, token]);

  const listCalendar = async (departmentCode) => {
    try {
      const response = await instance.get(`app/calendar/department/${departmentCode}`);
      if (response.data.status === "success" && Array.isArray(response.data.data)) {
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
        await instance.put(`/app/calendar/${calendarId}`, calendarData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // 등록 모드
        await instance.post("/app/calendar", calendarData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      listCalendar(departmentCode); // 리스트 갱신
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("등록 실패");
      setMessage(`등록 실패: ${error.response?.data?.message || error.message}`);
    }
  };

  const openModal = (isEdit = false, calendar = null) => {
    setIsEditMode(isEdit);
    if (isEdit && calendar) {
      setCalendarId(calendar.calendarId);
      setCalendarName(calendar.calendarName);
    } else {
      setCalendarId(null);
      setCalendarName("");
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCalendarName("");
    setIsEditMode(false);
  };

  const calendarUpdate = (calendar) => {
    setCalendarName(calendar.calendarName);
    openModal();
  };

  const calendarDelete = async (calendarId) => {
    if (window.confirm("캘린더를 삭제하시겠습니까?")) {
      try {
        await instance.delete(`/app/calendar/${calendarId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("캘린더 삭제");
        listCalendar(departmentCode); // 리스트 갱신
      } catch (error) {
        console.error("삭제 실패", error);
      }
    }
  };

  const scheduleCreate = () => {
    if (calendars.length === 0) {
      alert("하나 이상의 캘린더가 있어야 합니다.");
      setModalIsOpen(true); // 캘린더가 없으면 모달 열기
    } else {
      navigate("/app/schedule/create");
    }
  };

  const selectedCalendar = (calendar) => {
    onSelectCalendar(calendar.calendarId);
    setSelectCalendar(calendar);
    navigate("/app/calendar", { state: { calendarId: calendar.calendarId } });
  };

  return (
    <Box>
      <Link to="/app/calendar" style={{ textDecoration: "none", color: "black" }}>
        <h2>캘린더</h2>
      </Link>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={scheduleCreate}
          sx={{
            pr: 8,
            pl: 8,
            pt: 1.5,
            pb: 1.5,
            mr: 2,
          }}
        >
          일정등록
        </Button>
      </Box>
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

      <h3 style={{ paddingTop: 6 }}>{userInfo?.department} 캘린더</h3>
      <List>
        {calendars.map((calendar) => (
          <ListItem key={calendar.calendarId} disablePadding>
            <ListItemButton
              style={{
                paddingTop: 6,
                paddingBottom: 6,
                backgroundColor:
                  selectCalendar?.calendarId === calendar.calendarId ? "#ddd" : "transparent",
              }}
              onClick={() => selectedCalendar(calendar)}
            >
              <ListItemText primary={calendar.calendarName} />
              <IconButton edge="end" aria-label="edit" onClick={() => openModal(true, calendar)}>
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
      <Box sx={{ textAlign: "center", paddingRight: 3 }}>
        <span onClick={() => openModal(false)} className="createCalendar">
          <AddIcon style={{ marginRight: "8px" }} /> 캘린더 등록
        </span>
      </Box>
    </Box>
  );
};

export default CalendarSide;
