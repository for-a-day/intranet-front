import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import instance from "../../axiosConfig";

const UserCard = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [levelName, setLevelName] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("token");
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

          console.log("user", response.data);
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
            sx={{ width: 100, height: 100, marginBottom: "20px", backgroundColor: "#ddd" }}
          />
          <Typography variant="h5" component="div">
            <span style={{ fontSize: "19px" }}>
              {" "}
              <strong>
                {" "}
                {userInfo?.name} {userInfo?.level}
              </strong>
            </span>
          </Typography>
          <Box>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}></Typography>
          </Box>
          <Box sx={{ marginTop: "20px", textAlign: "center" }}>
            <Typography variant="body2" sx={{ margin: "10px 0" }}>
              결재할 문서 0
            </Typography>
            <Typography variant="body2" sx={{ margin: "10px 0" }}>
              내 예약/대여 현황 0
            </Typography>
            <Typography variant="body2" sx={{ margin: "10px 0" }}>
              참여할 설문 0
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default UserCard;
