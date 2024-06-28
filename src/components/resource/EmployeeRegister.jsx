import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeRegister.css'; // 등록 폼 CSS 파일을 import

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
    level: null, // 직급 초기값을 null로 설정
    department: null, // 부서 초기값을 null로 설정
    authority: null, // 권한 초기값을 null로 설정
  });

  const [levels, setLevels] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [authorities, setAuthorities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9005/api/employees/register')
      .then(response => {
        setLevels(response.data.levels);
        setDepartments(response.data.departments);
        setAuthorities(response.data.authorities);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
    //유효성 검사 -> 묶기(유효성검사 함수)
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
  alert('직급 입력하세요');
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

    axios.post('http://localhost:9005/api/employees/register', requestData)
      .then(response => {
        console.log('Employee registered successfully:', response.data);
        alert('등록되었습니다.');

        // 페이지 이동
        window.location.href = 'http://localhost:3000/api/employees';
      })
      .catch(error => {
        console.error('Error registering employee:', error);
        alert('등록에 실패하였습니다.');
      });
  };

  return (
    <div>
      <h2>Register Employee</h2>
      <table className="register-table">
        <tbody>
          <tr>
            <td><label>사번:</label></td>
            <td><input type="text" name="employeeId" value={employee.employeeId} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>이름:</label></td>
            <td><input type="text" name="name" value={employee.name} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>성별:</label></td>
            <td>
              <input type="radio" name="gender" value="남" checked={employee.gender === '남'} onChange={handleChange} required /> 남
              <input type="radio" name="gender" value="여" checked={employee.gender === '여'} onChange={handleChange} required /> 여
            </td>
          </tr>
          <tr>
            <td><label>생년월일:</label></td>
            <td><input type="date" name="birth" value={employee.birth} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>입사날짜:</label></td>
            <td><input type="date" name="dateEmployment" value={employee.dateEmployment} onChange={handleChange} required /></td>
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
            <td><label>이메일:</label></td>
            <td><input type="email" name="emailAddress" value={employee.emailAddress} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>재직상태:</label></td>
            <td><input type="text" name="employmentStatus" value={employee.employmentStatus} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>직급:</label></td>
            <td>
              <select name="level" value={employee.level} onChange={handleChange} required>
                <option value="">직급선택</option>
                {levels.map(level => (
                  <option key={level.levelCode} value={level.levelCode}>
                    {level.levelName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label>부서:</label></td>
            <td>
              <select name="department" value={employee.department} onChange={handleChange} required>
                <option value="">부서선택</option>
                {departments.map(department => (
                  <option key={department.departmentCode} value={department.departmentCode}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label>권한:</label></td>
            <td>
              <select name="authority" value={employee.authority} onChange={handleChange} required>
                <option value="">권한선택</option>
                {authorities.map(authority => (
                  <option key={authority.authorityCode} value={authority.authorityCode}>
                    {authority.authorityName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="register-button" onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default EmployeeRegister;
