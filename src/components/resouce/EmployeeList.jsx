import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import
import './EmployeeList.css'; // CSS 파일을 import

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9005/api/employees/list')
      .then(response => {
        // 날짜 포맷팅 함수를 사용하여 날짜를 년월일 형식으로 변경
        const formattedEmployees = response.data.map(employee => ({
          ...employee,
          dateEmployment: formatDate(employee.dateEmployment),
        }));
        setEmployees(formattedEmployees);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // 한 자리 숫자일 경우 앞에 0을 붙여서 두 자리로 표시
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className="header">
        <h2>Employee List</h2>
        {/* 등록 버튼을 Link 컴포넌트로 추가 */}
        <Link to="/api/employees/register" className="register-button">
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
            <tr key={employee.employeeId}>
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
    </div>
  );
};

export default EmployeeList;
