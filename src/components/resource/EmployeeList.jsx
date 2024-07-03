import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';
import EmployeeModal from './EmployeeModal'; // 모달 컴포넌트 import

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // 선택된 직원
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
  const [isDeleteMode, setIsDeleteMode] = useState(false); // 삭제 모드 상태
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log(token);
    axios.get('http://localhost:9000/app/employees/list', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      let employeesData = response.data.employees;

      // employeesData가 배열인지 확인하고 배열이 아니면 배열로 변환
      if (!Array.isArray(employeesData)) {
        employeesData = [employeesData];
      }

      const formattedEmployees = employeesData.map((employee, index) => {
        console.log(`Employee ID: ${employee.employeeId}`); // 로그 추가
        return {
          ...employee,
          birth: formatDate(employee.birth), // 날짜 데이터 포맷 변경
          dateEmployment: formatDate(employee.dateEmployment), // 날짜 데이터 포맷 변경
          key: `employee-${employee.employeeId}-${index}` // 고유한 키 설정
        };
      });

      setEmployees(formattedEmployees);
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
    <div>
      <div className="header">
        <h2>Employee List</h2>
        <Link to="/app/employees/register" className="register-button">
          등록
        </Link>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>성별</th>
            <th>생년월일</th>
            <th>입사날짜</th>
            <th>연락처</th>
            <th>주소</th>
            <th>이메일</th>
            <th>재직상태</th>
            <th>직급</th>
            <th>부서</th>
            <th>권한등급</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.key} onClick={() => handleRowClick(employee)}>
              <td>{employee.employeeId}</td>
              <td>{employee.name}</td>
              <td>{employee.gender}</td>
              <td>{employee.birth}</td>
              <td>{employee.dateEmployment}</td>
              <td>{employee.contact}</td>
              <td>{employee.address}</td>
              <td>{employee.emailAddress}</td>
              <td>{employee.employmentStatus}</td>
              <td>{employee.level}</td>
              <td>{employee.department}</td>
              <td>{employee.authority}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
        />
      )}
    </div>
  );
};

export default EmployeeList;
