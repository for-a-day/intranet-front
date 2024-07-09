import React, { useEffect, useState } from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import instance from "../../axiosConfig";
import PhoneIcon from "@mui/icons-material/Phone";
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
    <Box sx={{ width: "300px", overflowY: "auto", height: "355px" }}>
      <Box display="flex" alignItems="center" mb={2} pt={1} pl={1}>
        <Box sx={{ pb: 0.8, pl: 1 }}>
          <PhoneIcon />
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "h3.fontSize", marginBottom: "0" }}
            gutterBottom
          >
            전화번호부
          </Typography>
        </Box>
      </Box>
      <Grid>
        {employees.map((employee, index) => (
          <Grid item key={index} xs={10} md={12}>
            <Box sx={{ height: "100%" }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ minWidth: "130px", pl: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ pr: 3, pb: 1 }}>
                    {employee.name} {employee.level}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {employee.contact}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default PhoneBook;
