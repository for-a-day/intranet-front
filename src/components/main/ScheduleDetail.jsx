import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { AccessTime, LocationOn, Notes, ErrorOutline } from "@mui/icons-material";
import { grey, deepPurple, red } from "@mui/material/colors";
import instance from "../../axiosConfig";

const ScheduleDetail = ({ scheduleId }) => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchScheduleDetail = async () => {
      try {
        const response = await instance.get(
          `http://localhost:9000/app/schedule/detail/${scheduleId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.status === "success") {
          setSchedule(response.data.schedule[0]);
        } else {
          console.error("Failed to fetch schedule detail", response.data);
        }
      } catch (error) {
        console.error("Error fetching schedule detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (scheduleId) {
      fetchScheduleDetail();
    }
  }, [scheduleId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (!schedule) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        p={3}
      >
        <ErrorOutline sx={{ fontSize: 80, color: red[500] }} />
        <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
          일정 정보를 불러오지 못했습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Card elevation={0} sx={{ height: "310px" }}>
      <CardHeader
        title={schedule.subject}
        subheader={`시작 시간: ${schedule.startTime.slice(0, 5)}`}
        sx={{
          backgroundColor: grey[100],
          color: grey[900],
          borderBottom: `1px solid ${grey[300]}`,
        }}
      />
      <CardContent>
        <Box sx={{ height: "140px", maxHeight: "140px", minHeight: "140px" }}>
          <Typography variant="h6" gutterBottom>
            일정 내용
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
            {schedule.content}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Box display="flex" alignItems="center">
              <AccessTime sx={{ marginRight: 1, color: grey[700] }} />
              <Typography variant="body1">
                종료일: {new Date(schedule.endDate).toLocaleDateString()} /{" "}
                {schedule.endTime.slice(0, 5)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" alignItems="center">
              <LocationOn sx={{ marginRight: 1, color: grey[700] }} />
              <Typography variant="body1">장소: {schedule.location}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ScheduleDetail;
