import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const UserCard = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [levelName, setLevelName] = useState('');

  useEffect(() => {
    const userData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:9000/app/employees/token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const employee = response.data.employee;
          setEmployeeName(employee.name);
          setDepartmentName(employee.department.departmentName);
          setLevelName(employee.level.levelName);
        } catch (error) {
          console.error('유저 정보 못불러옴', error);
        }
      }
    };

    userData();
  }, []);

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#56cddd', color: 'white', padding: '20px', borderRadius:'10px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt={employeeName}
            sx={{ width: 100, height: 100, marginBottom: '20px', backgroundColor:'#ddd' }}
          />
          <Typography variant="h5" component="div">
            <span style={{fontSize:'19px'}}> <strong> {employeeName}  {levelName} </strong></span>
          </Typography>
          <Box>
          <Typography variant="h5" sx={{mt:1, fontWeight:"bold"}}>
            {departmentName}
          </Typography>
          </Box>
          <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ margin: '10px 0' }}>
              결재할 문서 0
            </Typography>
            <Typography variant="body2" sx={{ margin: '10px 0' }}>
              내 예약/대여 현황 0
            </Typography>
            <Typography variant="body2" sx={{ margin: '10px 0' }}>
              참여할 설문 0
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
