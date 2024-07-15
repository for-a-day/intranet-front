import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Avatar, Box, Grid } from "@mui/material";
import instance from "../../axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserCard = ({ scheduleCount }) => {
  const navigate = useNavigate();
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
    
    userData();
  }, []);

  const moveMyDraftHandler = () => {
    navigate("/approval/draft/list/mydraft", {state: {selected: "진행중"}});
  }

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
          <Box sx={{ minWidth:'200px', marginTop: "5px", textAlign: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={3} lg={8}>
                <Typography variant="h5">진행중인 기안문</Typography>
              </Grid>
              <Grid item xs={3} lg={3}>
                <Typography variant="h5" onClick={moveMyDraftHandler} sx={{cursor: "pointer", ":hover":{color: "#1a97f5", fontWeight: "700"}}}>{mydraft?.count}</Typography>
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
