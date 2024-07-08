import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../axiosConfig'; // Axios 인스턴스 import

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // 인증 상태를 저장하기 위한 상태

  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 액세스 토큰 가져오기

    const checkAuth = async () => {
      if (!token) {
        setIsAuth(false); // 토큰이 없으면 인증 상태를 false로 설정
        return;
      }

      try {
        // 액세스 토큰이 있는 경우, 토큰 유효성 확인
        const response = await axios.post('/auth/validate', null, { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.status === 200) {
          setIsAuth(true); // 유효한 토큰이면 인증 상태를 true로 설정
        } else {
          setIsAuth(false); // 유효하지 않은 토큰이면 인증 상태를 false로 설정
        }
      } catch (error) {
        console.error('Token validation failed', error);
        setIsAuth(false); // 인증 상태를 false로 설정
      }
    };

    checkAuth(); // 인증 상태 확인 함수 호출
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return isAuth ? children : <Navigate to="/login" />; // 인증 상태에 따라 페이지 이동
};

export default PrivateRoute;
