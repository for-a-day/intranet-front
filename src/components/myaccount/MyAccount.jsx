import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box, Grid, Typography } from '@mui/material';
import instance from '../../axiosConfig';

const MyAccount = () => {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    gender: '',
    birth: '',
    contact: '',
    address: '',
    emailAddress: '',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await instance.get('/app/employees/current');
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await instance.put(`/app/employees/update-password`, {
        employeeId: employee.id,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      alert(response.data.message);
      window.location.href = 'http://localhost:3000/app/home';
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('비밀번호 변경에 실패하였습니다.');
      }
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        개인정보 수정
      </Typography>
      {errorMessage && (
        <Typography variant="body1" color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="사번"
              name="id"
              value={employee.id}
              disabled
              InputLabelProps={{ style: { fontWeight: 'bold' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이름"
              name="name"
              value={employee.name}
              disabled
              InputLabelProps={{ style: { fontWeight: 'bold' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="성별"
              name="gender"
              value={employee.gender}
              disabled
              InputLabelProps={{ style: { fontWeight: 'bold' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="연락처"
              name="contact"
              value={employee.contact}
              disabled
              InputLabelProps={{ style: { fontWeight: 'bold' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="주소"
              name="address"
              value={employee.address}
              disabled
              InputLabelProps={{ style: { fontWeight: 'bold' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이메일"
              name="emailAddress"
              value={employee.emailAddress}
              disabled
              InputLabelProps={{ style: { fontWeight: 'bold' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="현재 비밀번호"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="새 비밀번호"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleChangePassword}
          sx={{ marginTop: 2, marginLeft: 2 }}
        >
          비밀번호 변경
        </Button>
      </Box>
    </Paper>
  );
};

export default MyAccount;
