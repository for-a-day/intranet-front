import React, { useState } from 'react';
import './EmployeeModal.css';
import axios from 'axios';


const EmployeeModal = ({ employee, isEditMode, isDeleteMode, onClose, onEdit, onDelete, onSave }) => {
  const [editEmployee, setEditEmployee] = useState({
    ...employee,
    reasonRetirement: employee.reasonRetirement || '',
    departmentName: employee.department,
    levelName: employee.level,
    dateRetirement: '',
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save API call (PUT request)
    axios.put(`http://localhost:9005/api/employees/${employee.employeeId}`, editEmployee)
      .then(response => {
        onSave(response.data);
        alert('수정하였습니다.');

        window.location.href = 'http://localhost:3000/api/employees';
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        alert('수정에 실패하였습니다.');
      });
  };

  const handeleDelete = () => {
      // 필드 유효성 검사
    if (!editEmployee.dateRetirement) {
        alert('퇴사 날짜를 입력해주세요.');
        return;
    }
    
    if (!editEmployee.reasonRetirement) {
        alert('퇴직 사유를 입력해주세요.');
        return;
    }

    if (window.confirm('정말 퇴직처리하시겠습니까?')) {
      //퇴직처리

      //퇴직테이블에 추가하는 api

      axios.post('http://localhost:9005/api/employees/exit', editEmployee)
      .then(response => {
        console.log('Employee registered successfully:', response.data);

        //사원테이블에서 삭제
        axios.delete(`http://localhost:9005/api/employees/${editEmployee.employeeId}`)
        .then(response => {
        alert('퇴직처리되었습니다.');

        window.location.href = 'http://localhost:3000/api/employees';
        })
        .catch(error => {
        console.error('Error deleting employee:', error);
        alert('삭제에 실패하였습니다.');
        });

      })
      .catch(error => {
        console.error('Error registering employee:', error);
        alert('등록에 실패하였습니다.');
      })        
    
    }
     
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {isEditMode ? (
        
          <div>
            <h2>수정 모드</h2>
            <table>
              <tbody>
                <tr>
                  <td><label>사번:</label></td>
                  <td><input type="text" name="employeeId" value={editEmployee.employeeId} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>이름:</label></td>
                  <td><input type="text" name="name" value={editEmployee.name} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>성별:</label></td>
                  <td>
                    <input type="radio" name="gender" value="남" checked={editEmployee.gender === '남'} onChange={handleChange} /> 남
                    <input type="radio" name="gender" value="여" checked={editEmployee.gender === '여'} onChange={handleChange} /> 여
                  </td>
                </tr>
                <tr>
                  <td><label>생년월일:</label></td>
                  <td><input type="date" name="birth" value={editEmployee.birth} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>입사날짜:</label></td>
                  <td><input type="date" name="dateEmployment" value={editEmployee.dateEmployment} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>연락처:</label></td>
                  <td><input type="text" name="contact" value={editEmployee.contact} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>주소:</label></td>
                  <td><input type="text" name="address" value={editEmployee.address} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>이메일:</label></td>
                  <td><input type="email" name="emailAddress" value={editEmployee.emailAddress} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>재직상태:</label></td>
                  <td><input type="text" name="employmentStatus" value={editEmployee.employmentStatus} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>직급:</label></td>
                  <td><input type="text" name="level" value={editEmployee.level} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>부서:</label></td>
                  <td><input type="text" name="department" value={editEmployee.department} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>권한등급:</label></td>
                  <td><input type="text" name="authority" value={editEmployee.authority} onChange={handleChange} /></td>
                </tr>
              </tbody>
            </table>
            <button className="save-button" onClick={handleSave}>저장</button>
          </div>
        ) : isDeleteMode ? (
            <div>
              <h2>삭제 모드</h2>
              <table>
              <tbody>
                <tr>
                  <td><label>사번:</label></td>
                  <td><input type="text" name="employeeId" value={editEmployee.employeeId} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>이름:</label></td>
                  <td><input type="text" name="name" value={editEmployee.name} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>성별:</label></td>
                  <td>
                    <input type="radio" name="gender" value="남" checked={editEmployee.gender === '남'} onChange={handleChange} disabled /> 남
                    <input type="radio" name="gender" value="여" checked={editEmployee.gender === '여'} onChange={handleChange} disabled /> 여
                  </td>
                </tr>
                <tr>
                  <td><label>생년월일:</label></td>
                  <td><input type="date" name="birth" value={editEmployee.birth} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>입사날짜:</label></td>
                  <td><input type="date" name="dateEmployment" value={editEmployee.dateEmployment} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>연락처:</label></td>
                  <td><input type="text" name="contact" value={editEmployee.contact} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>주소:</label></td>
                  <td><input type="text" name="address" value={editEmployee.address} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>이메일:</label></td>
                  <td><input type="email" name="emailAddress" value={editEmployee.emailAddress} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>직급:</label></td>
                  <td><input type="text" name="levelName" value={editEmployee.level} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>부서:</label></td>
                  <td><input type="text" name="departmentName" value={editEmployee.department} onChange={handleChange} disabled /></td>
                </tr>
                <tr>
                  <td><label>퇴사날짜:</label></td>
                  <td><input type='date' name="dateRetirement" value={editEmployee.dateRetirement} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label>퇴직사유:</label></td>
                  <td><input type="text" name="reasonRetirement" value={editEmployee.reasonRetirement} onChange={handleChange} required /></td>
                </tr>
              </tbody>
            </table>
              <p>정말로 이 직원을 삭제하시겠습니까?</p>
              <button className="delete-button" onClick={handeleDelete}>삭제</button>
            </div>
          ) : (
          <div>
            <h2>상세 정보</h2>
            <table>
              <tbody>
                <tr>
                  <td>사번:</td>
                  <td>{employee.employeeId}</td>
                </tr>
                <tr>
                  <td>이름:</td>
                  <td>{employee.name}</td>
                </tr>
                <tr>
                  <td>성별:</td>
                  <td>{employee.gender}</td>
                </tr>
                <tr>
                  <td>생년월일:</td>
                  <td>{employee.birth}</td>
                </tr>
                <tr>
                  <td>입사날짜:</td>
                  <td>{employee.dateEmployment}</td>
                </tr>
                <tr>
                  <td>연락처:</td>
                  <td>{employee.contact}</td>
                </tr>
                <tr>
                  <td>주소:</td>
                  <td>{employee.address}</td>
                </tr>
                <tr>
                  <td>이메일:</td>
                  <td>{employee.emailAddress}</td>
                </tr>
                <tr>
                  <td>재직상태:</td>
                  <td>{employee.employmentStatus}</td>
                </tr>
                <tr>
                  <td>직급:</td>
                  <td>{employee.level}</td>
                </tr>
                <tr>
                  <td>부서:</td>
                  <td>{employee.department}</td>
                </tr>
                <tr>
                  <td>권한등급:</td>
                  <td>{employee.authority}</td>
                </tr>
              </tbody>
            </table>
            <button className="edit-button" onClick={onEdit}>수정</button>
            <button className="delete-button" onClick={onDelete}>삭제</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeModal;
