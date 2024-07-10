import React, { useState, useEffect } from 'react';
import './EmployeeRegister.css'; // 등록 폼 CSS 파일을 import
import {
  Paper,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Box,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import instance from '../../axiosConfig';

const EmployeeRegister = () => {
  const [employee, setEmployee] = useState({
    employeeId: '',
    name: '',
    gender: '',
    birth: '',
    dateEmployment: '',
    contact: '',
    address: '',
    emailAddress: '',
    employmentStatus: '',
    level: '', // 직급 초기값을 null로 설정
    department: '', // 부서 초기값을 null로 설정
    authority: '', // 권한 초기값을 null로 설정
  });

  const [levels, setLevels] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [currentUserDepartment, setCurrentUserDepartment] = useState(''); // 현재 사용자 부서 정보
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUserDepartment = async () => {
      try {
        const response = await instance.get('/app/employees/current');
        console.log('Current User Response:', response.data);
        setCurrentUserDepartment(response.data.department); // 현재 사용자 부서 정보 설정
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    fetchCurrentUserDepartment();
  }, [token]);

  useEffect(() => {
    if (!isLoading && currentUserDepartment !== '인사부') {
      alert('인사부 소속만 접근 가능합니다.');
      navigate('/'); // 홈화면으로 리디렉션
    }
  }, [isLoading, currentUserDepartment, navigate]);

  useEffect(() => {
    instance.get('/app/employees/register')
      .then(response => {
        setLevels(response.data.levels);
        setDepartments(response.data.departments);
        setAuthorities(response.data.authorities);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [token]); // token을 useEffect의 의존성 배열에 추가하여 토큰이 변경될 때마다 재요청

  // 전화번호 형식 변환 함수
  const formatPhoneNumber = (phone) => {
    phone = phone.replace(/\D/g, ''); // 숫자만 추출
    if (phone.length > 3) {
      phone = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'contact' ? formatPhoneNumber(value) : value;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      ...employee,
      levelCode: employee.level ? parseInt(employee.level) : null,
      departmentCode: employee.department ? parseInt(employee.department) : null,
      authorityCode: employee.authority ? parseInt(employee.authority) : null,
    };
    // 유효성 검사 -> 묶기(유효성검사 함수)
    if (!employee.employeeId) {
      alert('아이디를 입력하세요');
      return;
    }

    if (!employee.name) {
      alert('이름을 입력하세요');
      return;
    }

    if (!employee.gender) {
      alert('성별을 선택하세요');
      return;
    }
    if (!employee.birth) {
      alert('생년월일을 입력하세요');
      return;
    }
    if (!employee.dateEmployment) {
      alert('입사날짜를 입력하세요');
      return;
    }
    if (!employee.contact) {
      alert('연락처를 입력하세요');
      return;
    }
    if (!employee.emailAddress) {
      alert('이메일을 입력하세요');
      return;
    }
    if (!employee.address) {
      alert('주소를 입력하세요');
      return;
    }
    if (!employee.employmentStatus) {
      alert('재직상태를 입력하세요');
      return;
    }
    if (!employee.level) {
      alert('직급을 입력하세요');
      return;
    }
    if (!employee.department) {
      alert('부서를 입력하세요');
      return;
    }
    if (!employee.authority) {
      alert('권한을 입력하세요');
      return;
    }

    instance.post('/app/employees/register', requestData)
      .then(response => {
        console.log('Employee registered successfully:', response.data);
        alert('등록되었습니다.');

        // 페이지 이동
        window.location.href = 'http://localhost:3000/app/employees';
      })
      .catch(error => {
        console.error('Error registering employee:', error);
        alert('등록에 실패하였습니다.');
      });
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, mx: 'auto' }}>
       <Typography variant="h2" mb={3}>
          사원 등록
        </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="사번"
              name="employeeId"
              value={employee.employeeId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="이름"
              name="name"
              value={employee.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup row name="gender" value={employee.gender} onChange={handleChange} required>
                <FormControlLabel value="남" control={<Radio />} label="남" />
                <FormControlLabel value="여" control={<Radio />} label="여" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="생년월일"
              name="birth"
              value={employee.birth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="입사날짜"
              name="dateEmployment"
              value={employee.dateEmployment}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="연락처"
              name="contact"
              value={employee.contact}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="주소"
              name="address"
              value={employee.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="이메일"
              name="emailAddress"
              value={employee.emailAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="재직상태"
              name="employmentStatus"
              value={employee.employmentStatus}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="level-label">직급선택</InputLabel>
              <Select
                label="직급"
                name="level"
                value={employee.level}
                onChange={handleChange}
              >
                {levels.map(level => (
                  <MenuItem key={level.levelCode} value={level.levelCode}>
                    {level.levelName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="department-label">부서선택</InputLabel>
              <Select
                label="부서"
                name="department"
                value={employee.department}
                onChange={handleChange}
              >
                {departments.map(department => (
                  <MenuItem key={department.departmentCode} value={department.departmentCode}>
                    {department.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="authority-label">권한선택</InputLabel>
              <Select
                label="권한"
                name="authority"
                value={employee.authority}
                onChange={handleChange}
              >
                <MenuItem value="">권한선택</MenuItem>
                {authorities.map(authority => (
                  <MenuItem key={authority.authorityCode} value={authority.authorityCode}>
                    {authority.authorityName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 3 }}
          >
            사원 등록
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmployeeRegister;
