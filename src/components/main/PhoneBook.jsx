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
      <Box>
        <Typography variant="h4" component="div" sx={{ mb: 3, mt: 3.5, ml: 3, fontWeight: "600" }}>
          전화번호부
        </Typography>
      </Box>
      <Grid>
        {employees.map((employee, index) => (
          <Grid item key={index} xs={10} md={12}>
            <Box sx={{ height: "100%" }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ minWidth: "130px", pl: 3 }}>
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
