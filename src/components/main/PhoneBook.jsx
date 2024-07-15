import React, { useEffect, useState } from "react";
import { Typography, Box, Card, CardContent, Grid, Avatar, IconButton } from "@mui/material";
import instance from "../../axiosConfig";
import PhoneIcon from "@mui/icons-material/Phone";
import { deepPurple } from "@mui/material/colors";

const PhoneBook = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    instance
      .get("/app/employees/list")
      .then((response) => {
        let employeesData = response.data.employees;
        if (!Array.isArray(employeesData)) {
          employeesData = [employeesData];
        }
        const formattedEmployees = employeesData.map((employee, index) => ({
          name: employee.name,
          contact: employee.contact,
          level: employee.level,
        }));
        setEmployees(formattedEmployees);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);
  return (
    <Box
      sx={{
        width: "300px",
        overflowY: "auto",
        height: "350px",
        maxHeight: "350px",
        minHeight: "350px",
      }}
    >
      <Typography variant="h4" component="div" sx={{ mb: 3, mt: 3.5, ml: 3, fontWeight: "600" }}>
        전화번호부
      </Typography>
      <Grid>
        {employees.map((employee, index) => (
          <Grid item key={index} xs={11} sx={{ mx: "auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: 5,
                mb: 1,
              }}
            >
              <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>{employee.name.charAt(0)}</Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {employee.name} {employee.level}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {employee.contact}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default PhoneBook;
