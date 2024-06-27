import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeRegister.css'; // 등록 폼 CSS 파일을 import

const EmployeeRegister = () => {
  const [employee, setEmployee] = useState({
    name: '',
    gender: '',
    birth: '',
    dateEmployment: '',
    contact: '',
    address: '',
    emailAddress: '',
    employmentStatus: '',
    level: '', // 직급 입력 필드 추가
    department: '', // 부서 입력 필드 추가
    authority: '', // 권한 입력 필드 추가
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9005/api/employees/register', employee)
      .then(response => {
        console.log('Employee registered successfully:', response.data);
        // 등록 성공 후 필요한 처리 (예: 페이지 이동 등)
      })
      .catch(error => {
        console.error('Error registering employee:', error);
      });
  };

  return (
    <div>
      <h2>Register Employee</h2>
      <table className="register-table">
        <tbody>
          <tr>
            <td><label>이름:</label></td>
            <td><input type="text" name="name" value={employee.name} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>성별:</label></td>
            <td><input type="text" name="gender" value={employee.gender} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>생년월일: (YYYY-MM-DD):</label></td>
            <td><input type="text" name="birth" value={employee.birth} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>입사날짜: (YYYY-MM-DD):</label></td>
            <td><input type="text" name="dateEmployment" value={employee.dateEmployment} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>연락처:</label></td>
            <td><input type="text" name="contact" value={employee.contact} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>주소:</label></td>
            <td><input type="text" name="address" value={employee.address} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>연락처:</label></td>
            <td><input type="email" name="emailAddress" value={employee.emailAddress} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>재직상태:</label></td>
            <td><input type="text" name="employmentStatus" value={employee.employmentStatus} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>직급:</label></td>
            <td><input type="text" name="level" value={employee.level} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>부서:</label></td>
            <td><input type="text" name="department" value={employee.department} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>권한:</label></td>
            <td><input type="text" name="authority" value={employee.authority} onChange={handleChange} required /></td>
          </tr>
        </tbody>
      </table>
      <button className="register-button" onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default EmployeeRegister;
