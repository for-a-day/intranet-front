import React, { useState, useEffect } from 'react';
import { Modal, Paper, Typography, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Button, Grid, Box, Select, MenuItem, InputLabel } from '@mui/material';
import instance from '../../axiosConfig';

const EmployeeModal = ({ employee, isEditMode, isDeleteMode, onClose, onEdit, onDelete, onSave, levels, departments, authorities }) => {
  const [editEmployee, setEditEmployee] = useState({
    ...employee,
    reasonRetirement: employee.reasonRetirement || '',
    department: employee.department?.departmentCode || '',
    level: employee.level?.levelCode || '',
    authority: employee.authority?.authorityCode || '',
    dateRetirement: '',
  });

  useEffect(() => {
    if (employee) {
      setEditEmployee({
        ...employee,
        reasonRetirement: employee.reasonRetirement || '',
        department: employee.department?.departmentCode || '',
        level: employee.level?.levelCode || '',
        authority: employee.authority?.authorityCode || '',
        dateRetirement: '',
      });
    }
  }, [employee]);

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedEmployee = {
      ...editEmployee,
      levelCode: editEmployee.level,
      departmentCode: editEmployee.department,
      authorityCode: editEmployee.authority
    };

    instance.put(`/app/employees/${employee.employeeId}`, updatedEmployee)
      .then(response => {
        onSave(response.data);
        alert('수정하였습니다.');
        onClose();
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        alert('수정에 실패하였습니다.');
      });
  };

  const handleDelete = () => {
    if (!editEmployee.dateRetirement) {
      alert('퇴사 날짜를 입력해주세요.');
      return;
    }

    if (!editEmployee.reasonRetirement) {
      alert('퇴직 사유를 입력해주세요.');
      return;
    }

    if (window.confirm('정말 퇴직처리하시겠습니까?')) {
      instance.post('/app/employees/exit', editEmployee, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          instance.delete(`/app/employees/${editEmployee.employeeId}`)
            .then(response => {
              alert('퇴직처리되었습니다.');
              onClose();
            })
            .catch(error => {
              console.error('Error deleting employee:', error);
              alert('삭제에 실패하였습니다.');
            });
        })
        .catch(error => {
          console.error('Error registering employee:', error);
          alert('등록에 실패하였습니다.');
        });
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Paper sx={{ padding: 4, margin: 'auto', maxWidth: 600, mt: 4 }}>
        <h2 sx={{ fontSize: '1.5rem', color: '#333' }}>
          {isEditMode ? '사원 수정' : isDeleteMode ? '사원 삭제' : '상세 정보'}
        </h2>
        <hr style={{ marginBottom: '25px' }}></hr>
        {isEditMode ? (
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="사번"
                  name="employeeId"
                  value={editEmployee.employeeId}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="이름"
                  name="name"
                  value={editEmployee.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup row name="gender" value={editEmployee.gender} onChange={handleChange}>
                    <FormControlLabel value="남" control={<Radio />} label="남" />
                    <FormControlLabel value="여" control={<Radio />} label="여" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="생년월일"
                  name="birth"
                  value={editEmployee.birth}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="입사날짜"
                  name="dateEmployment"
                  value={editEmployee.dateEmployment}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="연락처"
                  name="contact"
                  value={editEmployee.contact}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="주소"
                  name="address"
                  value={editEmployee.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="이메일"
                  name="emailAddress"
                  value={editEmployee.emailAddress}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="재직상태"
                  name="employmentStatus"
                  value={editEmployee.employmentStatus}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="level-label">{employee.level}</InputLabel>
                  <Select
                    label="직급"
                    name="level"
                    value={editEmployee.level}
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
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="department-label">{employee.department}</InputLabel>
                  <Select
                    label="부서"
                    name="department"
                    value={editEmployee.department}
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
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="authority-label">{employee.authority}</InputLabel>
                  <Select
                    label="권한"
                    name="authority"
                    value={editEmployee.authority}
                    onChange={handleChange}
                  >
                    {authorities.map(authority => (
                      <MenuItem key={authority.authorityCode} value={authority.authorityCode}>
                        {authority.authorityName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleSave}
            >
              저장
            </Button>
          </Box>
        ) : isDeleteMode ? (
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="사번"
                  name="employeeId"
                  value={editEmployee.employeeId}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="이름"
                  name="name"
                  value={editEmployee.name}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup row name="gender" value={editEmployee.gender} onChange={handleChange} disabled>
                    <FormControlLabel value="남" control={<Radio />} label="남" disabled />
                    <FormControlLabel value="여" control={<Radio />} label="여" disabled />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="생년월일"
                  name="birth"
                  value={editEmployee.birth}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="입사날짜"
                  name="dateEmployment"
                  value={editEmployee.dateEmployment}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="연락처"
                  name="contact"
                  value={editEmployee.contact}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="주소"
                  name="address"
                  value={editEmployee.address}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="이메일"
                  name="emailAddress"
                  value={editEmployee.emailAddress}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="직급"
                  name="levelName"
                  value={employee.level?.levelName}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="부서"
                  name="departmentName"
                  value={employee.department?.departmentName}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="퇴사날짜"
                  name="dateRetirement"
                  value={editEmployee.dateRetirement}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="퇴직사유"
                  name="reasonRetirement"
                  value={editEmployee.reasonRetirement}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              정말로 이 직원을 삭제하시겠습니까?
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2, backgroundColor: '#dc3545' }}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Box>
        ) : (
          <Paper sx={{ padding: 3, backgroundColor: '#fffcfc', borderRadius: 2, boxShadow: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>사번 </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.employeeId}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>이름</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>성별</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.gender}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>생년월일</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.birth}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>입사날짜</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.dateEmployment}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>연락처</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.contact}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>주소</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.address}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>이메일</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.emailAddress}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>재직상태</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.employmentStatus}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>직급</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.level}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>부서</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.department}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5c5b5b' }}>권한등급</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{employee.authority}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={onEdit}
              >
                수정
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2, marginLeft: 1, backgroundColor: '#dc3545' }}
                onClick={onDelete}
              >
                삭제
              </Button>
            </Box>
          </Paper>
        )}
      </Paper>
    </Modal>
  );
};

export default EmployeeModal;
