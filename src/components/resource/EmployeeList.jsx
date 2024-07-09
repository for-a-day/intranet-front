import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import EmployeeModal from './EmployeeModal'; // 모달 컴포넌트 import
import instance from '../../axiosConfig';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // 선택된 직원
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
  const [isDeleteMode, setIsDeleteMode] = useState(false); // 삭제 모드 상태
  const [levels, setLevels] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log(token);
    instance.get('/app/employees/list')
    .then(response => {
      const { employees, levels, departments, authorities } = response.data;

      const formattedEmployees = employees.map((employee, index) => {
        return {
          ...employee,
          birth: formatDate(employee.birth), // 날짜 데이터 포맷 변경
          dateEmployment: formatDate(employee.dateEmployment), // 날짜 데이터 포맷 변경
          key: `employee-${employee.employeeId}-${index}` // 고유한 키 설정
        };
      });

      setEmployees(formattedEmployees);
      setLevels(levels);
      setDepartments(departments);
      setAuthorities(authorities);
    })
    .catch(error => {
      console.error('Error fetching employees:', error);
    });
  }, [token]); // token을 useEffect의 의존성 배열에 추가하여 토큰이 변경될 때마다 재요청

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
    setIsEditMode(false); // 상세 모드로 설정
    setIsDeleteMode(false);
  };

  const handleEditClick = () => {
    setIsEditMode(true); // 수정 모드로 변경
  };

  const handleDeleteClick = () => {
    setIsDeleteMode(true); // 삭제 모드로 변경
  };

  return (
    <Box 
      sx={{ 
        width: '95%', 
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <h2>사원 리스트</h2>
      </Box>
      <Box sx={{backgroundColor:'#F5F5F5', height:80, borderRadius:1, alignItems: 'center', display:'flex', paddingLeft: 3}}>
      <Typography variant="h5" sx={{fontWeight:600}}>현재 사원 수</Typography>
      <Typography variant="h5" sx={{fontWeight:600, marginLeft:10}}>{employees.length}명</Typography>
      </Box>
      <Box>
      <Button
          sx={{mt:3, ml:2, mb:1}}
          component={Link}
          to="/app/employees/register"
          variant="contained"
          color="primary"
        >
          사원 등록
        </Button>
      </Box>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <TableHead sx={{borderBottom:'2px solid #d1cfcf'}}>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                아이디
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                이름
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                성별
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                생년월일
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                입사날짜
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                연락처
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                주소
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                이메일
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                재직상태
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                직급
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                부서
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                권한등급
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee.key} onClick={() => handleRowClick(employee)} sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }} >
               <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  align="center"
                >
                  {employee.employeeId}
                </Typography>
              </TableCell>
              <TableCell>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                      align="center"
                    >
                      {employee.name}
                    </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.gender}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.birth}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.dateEmployment}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.contact}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.address}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.emailAddress}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.employmentStatus}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.level}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  {employee.department}
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign:'center'}}>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: "primary.main",
                    color: "#fff",
                  }}
                  size="small"
                  label={employee.authority}
                ></Chip>
              </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <EmployeeModal
        employee={selectedEmployee}
        isEditMode={isEditMode}
        isDeleteMode={isDeleteMode}
        onClose={() => setIsModalOpen(false)}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onSave={(updatedEmployee) => {
          setEmployees(employees.map(emp => (emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp)));
          setIsModalOpen(false);
        }}
        levels={levels}
        departments={departments}
        authorities={authorities}
      />
      
      )}
    </Box>
  );
};

export default EmployeeList;
