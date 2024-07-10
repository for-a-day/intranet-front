import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Avatar, Box, Grid } from "@mui/material";
import instance from "../../axiosConfig";
import { useSelector } from "react-redux";

const UserCard = ({ scheduleCount }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [levelName, setLevelName] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { mydraft = [] } = useSelector((state) => state?.approval);

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
    console.log(scheduleCount);
    userData();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 345,
        backgroundColor: "#56cddd",
        color: "white",
        padding: "33px",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            alt={employeeName}
            sx={{ width: 140, height: 140, marginBottom: "20px", backgroundColor: "#ddd" }}
          />
          <Typography variant="h5" component="div">
            <span style={{ fontSize: "20px" }}>
              {" "}
              <strong>
                {" "}
                {userInfo?.name} {userInfo?.level}
              </strong>
            </span>
          </Typography>
          <Box>
            <Typography variant="h5" sx={{ mt: 1, mb: 2, fontWeight: "bold" }}>
              {userInfo?.department}
            </Typography>
          </Box>
          <Box sx={{ marginTop: "5px", textAlign: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={3} lg={8}>
                <Typography variant="h5">기안 문서</Typography>
              </Grid>
              <Grid item xs={9} lg={3}>
                <Typography variant="h5">{mydraft.length}</Typography>
              </Grid>
              <Grid item xs={3} lg={8}>
                <Typography variant="h5">오늘의 일정</Typography>
              </Grid>
              <Grid item xs={3} lg={3}>
                <Typography variant="h5">{scheduleCount}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default UserCard;
