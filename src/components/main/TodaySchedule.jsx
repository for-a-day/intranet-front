import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Menu, MenuItem, IconButton, Stack, Button } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import instance from "../../axiosConfig";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useNavigate } from "react-router-dom";

const options = ["Action", "Another Action", "Something else here"];

const TodaySchedule = ({ onScheduleClick, selectedScheduleId, onScheduleCountChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activities, setActivities] = useState([]);
  const [departmentCode, setDepartmentCode] = useState("");
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    if (userInfo) {
      setDepartmentCode(userInfo?.departmentCode);
    }
  }, [userInfo]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchTodayActivities = async (code) => {
      try {
        const response = await instance.get(`/app/schedule/${code}`);

        const schedules = response.data.schedule;

        const today = new Date()
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\. /g, "-")
          .replace(/\./g, "")
          .trim();

        const todayActivities = schedules
          .filter((schedule) => new Date(schedule.startDate).toISOString().split("T")[0] === today)
          .map((schedule) => ({
            id: schedule.scheduleId,
            calendarId: schedule.calendarId,
            time: schedule.startTime.slice(0, 5),
            color: "primary.main",
            text: schedule.subject,
          }));

        todayActivities.sort((a, b) => (a.time > b.time ? 1 : -1));

        setActivities(todayActivities);
        onScheduleCountChange(todayActivities.length);
      } catch (error) {
        console.error("오늘의 일정을 불러오지 못했습니다", error);
      }
    };

    if (departmentCode) {
      fetchTodayActivities(departmentCode);
    }
  }, [departmentCode]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          sx={{ fontWeight: "bold", fontSize: "h4.fontSize", marginBottom: "0", pl: 3, pt: 3 }}
          gutterBottom
        >
          오늘의 일정
        </Typography>
        <Button
          variant="h5"
          component="div"
          onClick={() => navigate("/app/calendar")}
          sx={{ pb: 0, pt: 0, mb: 0, mt: 3.1, mr: 2, fontWeight: "600", color: "primary.main" }}
        >
          더보기
        </Button>
      </Stack>

      {activities.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          pt={12}
        >
          <SearchOffIcon sx={{ fontSize: 80, color: "#BDBDBD" }} />
          <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
            오늘의 일정이 없습니다.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Box sx={{ pb: "0 !important" }}>
            <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
              <Timeline sx={{ pl: 1.5 }}>
                {activities.map((activity, index) => (
                  <TimelineItem
                    key={index}
                    onClick={() => onScheduleClick(activity.id, activity.calendarId)}
                  >
                    <TimelineOppositeContent
                      sx={{ fontSize: "14px", fontWeight: "700", flex: "0" }}
                    >
                      {activity.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot variant="outlined" sx={{ borderColor: activity.color }} />
                      {index < activities.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent
                      color="text.secondary"
                      sx={{
                        fontSize: "14px",
                        color: activity.id === selectedScheduleId ? "#2E2E2E" : null,
                        fontWeight: activity.id === selectedScheduleId ? "700" : null,
                        ":hover": { cursor: "pointer" },
                      }}
                    >
                      {activity.text}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TodaySchedule;
