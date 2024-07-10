import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import instance from "../../axiosConfig";
import SearchOffIcon from '@mui/icons-material/SearchOff';

const options = ["Action", "Another Action", "Something else here"];

const TodaySchedule = ({ onScheduleClick, selectedScheduleId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activities, setActivities] = useState([]);
  const [departmentCode, setDepartmentCode] = useState("");
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
        console.log("유저의 부서코드 : ", `${code}`);

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
      } catch (error) {
        console.error("오늘의 일정을 불러오지 못했습니다", error);
      }
    };

    if (departmentCode !== null) {
      fetchTodayActivities(departmentCode);
    }

    fetchTodayActivities();
  }, [departmentCode]);

  return (
    <Box>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "h4.fontSize", marginBottom: "0", pl: 3, pt: 3 }}
          gutterBottom
        >
          오늘의 일정
        </Typography>
        {activities.length === 0 ? (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%" pt={12}>
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
                  <TimelineOppositeContent sx={{ fontSize: "12px", fontWeight: "700", flex: "0" }}>
                    {activity.time}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" sx={{ borderColor: activity.color }} />
                    <TimelineConnector />
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
