import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const options = ["Action", "Another Action", "Something else here"];

const TodaySchedule = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activities, setActivities] = useState([]);
  const [departmentCode, setDepartmentCode] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const userData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:9000/app/employees/token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const employee = response.data.employee;
          setDepartmentCode(employee.department.departmentCode);
        } catch (error) {
          console.error("유저 정보 못불러옴", error);
        }
      }
    };

    userData();
  }, []);

  useEffect(() => {
    const fetchTodayActivities = async (code) => {
      try {
        const response = await axios.get(`http://localhost:9000/app/schedule/${code}`);
        const schedules = response.data.schedule;
        console.log(`${code}`);
        console.log("왜안뜸", schedules);
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
            time: schedule.startTime.slice(0, 5),
            color: "primary.main",
            text: schedule.subject,
          }));
        setActivities(todayActivities);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    if (departmentCode !== null) {
      fetchTodayActivities(departmentCode);
    }

    fetchTodayActivities();
  }, [departmentCode]);

  return (
    <Card>
      <CardContent sx={{ pb: "0 !important" }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 5 }}>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "h3.fontSize", marginBottom: "0" }}
              gutterBottom
            >
              오늘의 일정
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            <IconButton
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{ "aria-labelledby": "long-button" }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {options.map((option) => (
                <MenuItem key={option} selected={option === "Pyxis"} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
        <Timeline sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent sx={{ fontSize: "12px", fontWeight: "700", flex: "0" }}>
                {activity.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" sx={{ borderColor: activity.color }} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent color="text.secondary" sx={{ fontSize: "14px" }}>
                {activity.text}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default TodaySchedule;
