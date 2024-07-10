import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import instance from "../../axiosConfig";

const CalendarForm = ({ isCreate, scheduleId, selectedCalendarId, onComplete }) => {
  const navigate = useNavigate();
  const calendarLocation = useLocation();
  const [loading, setLoading] = useState(!isCreate);
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [calendarId, setCalendarId] = useState(selectedCalendarId || "");
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);
  const [endTimeErrorMessage, setEndTimeErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [calendarloading, setCalendarLoading] = useState(true);

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
    const userDataAndListCalendar = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await instance.get("/app/employees/token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const employee = response.data.employee;
          const deptCode = employee.department?.departmentCode;
          const deptName = employee.department?.departmentName;
          setDepartmentCode(deptCode);
          setDepartmentName(deptName);

          // 부서 코드로 캘린더 조회
          await listCalendar(deptCode);
        } catch (error) {
          console.error("유저 정보 못 불러옴", error);
        }
      }
    };

    userDataAndListCalendar();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setDepartmentCode(userInfo.departmentCode);
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
        }
      };

      listCalendar(departmentCode);
    }
  }, [departmentCode, token]);

  const listCalendar = async (departmentCode) => {
    try {
      const response = await instance.get(`/app/calendar/department/${departmentCode}`, {
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
    }
  };

  useEffect(() => {
    if (isCreate) {
      resetForm();
    }
  }, [isCreate]);

  useEffect(() => {
    if (!isCreate && scheduleId) {
      const detailSchedule = async () => {
        try {
          const response = await instance.get(`/app/schedule/detail/${scheduleId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.status === "success") {
            const event = response.data.schedule[0];
            setCalendarId(event.calendarId);
            setSubject(event.subject);
            setContent(event.content);
            setStartDate(event.startDate.split("T")[0]);
            setEndDate(event.endDate.split("T")[0]);
            setStartTime(event.startTime.slice(0, 5));
            setEndTime(event.endTime.slice(0, 5));
            setLocation(event.location);
            console.log("불러온 일정", event);
          } else {
            console.error("불러오기 실패", response.data);
          }
        } catch (error) {
          console.error("Error", error);
        } finally {
          setLoading(false);
        }
      };
      detailSchedule();
    }
  }, [scheduleId, isCreate]);

  useEffect(() => {
    if (selectedCalendarId) {
      const listEvent = async () => {
        try {
          const response = await instance.get(`/app/schedule/calendar/${selectedCalendarId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.status === "success") {
            const listEvent = response.data.schedule.map((event) => ({
              id: event.scheduleId,
              title: event.subject,
              start: event.startDate,
              end: event.endDate,
            }));
            setEvents(listEvent);
          } else {
            console.error("이벤트 불러오기 실패", response.data);
          }
        } catch (error) {
          console.error("이벤트 호출 실패", error);
        }
      };
      listEvent();
    }
  }, [selectedCalendarId]);

  const handleEndTimeChange = (time) => {
    if (time < startTime) {
      setEndTimeErrorMessage("종료 시간을 다시 설정해주세요.");
      setEndTime("");
    } else {
      setEndTimeErrorMessage("");
      setEndTime(time);
    }
  };

  const scheduleSubmit = async (e) => {
    if (!subject) {
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
    if (!calendarId) {
      alert("캘린더를 선택해주세요.");
      return;
    }

    e.preventDefault();
    const schedule = {
      calendarId,
      subject,
      content,
      startDate,
      endDate: endDate || startDate, // endDate가 없으면 startDate로 설정
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      location,
    };

    try {
      if (isCreate) {
        await instance.post("/app/schedule", schedule, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("등록이 완료되었습니다.");
      } else {
        await instance.put(`/app/schedule/${scheduleId}`, schedule, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("수정이 완료되었습니다.");
      }
      onComplete(calendarId);
      navigate("/app/calendar", { state: { calendarId: calendarId } });
    } catch (error) {
      console.error("저장 실패", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
    console.log(calendarId);
  };

  const scheduleDelete = async () => {
    if (window.confirm("일정을 삭제하시겠습니까?")) {
      try {
        await instance.delete(`/app/schedule/${scheduleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onComplete(calendarId);
        navigate("/app/calendar", { state: { calendarId: calendarId } });
      } catch (error) {
        console.error("삭제 실패", error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const currentCalendar = calendars.find((cal) => cal.calendarId === calendarId);

  const resetForm = () => {
    const today = new Date().toISOString().split("T")[0];
    setSubject("");
    setContent("");
    setStartDate(today);
    setEndDate(today);
    setStartTime("09:00");
    setEndTime("18:00");
    setLocation("");
    setCalendarId("");
  };

  return (
    <Box p={3}>
      <Typography variant="h3" mb={3}>
        {isCreate ? "일정 등록" : "일정 상세보기"}
      </Typography>
      <form onSubmit={scheduleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="일정 제목"
              variant="outlined"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="시작일"
              type="date"
              variant="outlined"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
              InputLabelProps={{
                shrink: true,
              }}
              error={!!endTimeErrorMessage}
              helperText={endTimeErrorMessage}
            />
          </Grid>
          <Grid item xs={12}>
            {isCreate ? (
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="calendar-label">캘린더 선택</InputLabel>
                <Select
                  label="캘린더 선택"
                  labelId="calendar-label"
                  value={calendarId}
                  onChange={(e) => setCalendarId(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        zIndex: 1501,
                      },
                    },
                  }}
                >
                  {calendars.map((calendar) => (
                    <MenuItem key={calendar.calendarId} value={calendar.calendarId}>
                      {calendar.calendarName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                label="캘린더 이름"
                variant="outlined"
                fullWidth
                value={currentCalendar ? currentCalendar.calendarName : ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="내용"
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="location-label">장소</InputLabel>
              <Select
                label="장소"
                labelId="location-label"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <MenuItem value="본사 1층 공용 회의실">본사 1층 공용 회의실</MenuItem>
                <MenuItem value="4층 회의실">4층 회의실</MenuItem>
                <MenuItem value="5층 스튜디오">5층 스튜디오</MenuItem>
                <MenuItem value="3층 회의실">3층 회의실</MenuItem>
                <MenuItem value="미지정">미지정</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            {isCreate ? "등록" : "수정"}
          </Button>
          {!isCreate && (
            <Button
              variant="contained"
              onClick={scheduleDelete}
              sx={{ ml: 2, backgroundColor: "#dc3545" }}
            >
              삭제
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};
export default CalendarForm;
