import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [employeeId, setEmployeeId] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/login', {
                employeeId,
                employeePassword
            });
            console.log(response.data);
            // JWT 토큰을 로컬 스토리지에 저장
            localStorage.setItem('token', response.data.token);
            // 로그인 성공 후 처리 (예: 리디렉션)
            alert('로그인 성공');
            window.location.href = 'http://localhost:3000/app/home';

        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID: </label>
                    <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={employeePassword} onChange={(e) => setEmployeePassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
