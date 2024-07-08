import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../axiosConfig'; // Axios 인스턴스 import
import { isTokenExpired } from '../utils'; // 유틸리티 함수 import

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // 인증 상태를 저장하기 위한 상태

  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 액세스 토큰 가져오기
    const refreshToken = localStorage.getItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 가져오기

    const checkAuth = async () => {
      if (!token || isTokenExpired(token)) {
        // 액세스 토큰이 없거나 만료된 경우
        if (!refreshToken || isTokenExpired(refreshToken)) {
          // 리프레시 토큰도 없거나 만료된 경우
          localStorage.removeItem('token'); // 로컬 스토리지에서 액세스 토큰 삭제
          localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 삭제
          setIsAuth(false); // 인증 상태를 false로 설정
        } else {
          // 리프레시 토큰이 유효한 경우
          try {
            const response = await axios.post('/auth/refresh', { refreshToken }); // 리프레시 토큰으로 새로운 액세스 토큰 요청
            const { accessToken } = response.data;
            localStorage.setItem('token', accessToken); // 로컬 스토리지에 새로운 액세스 토큰 저장
            setIsAuth(true); // 인증 상태를 true로 설정
          } catch (error) {
            console.error('Failed to refresh access token', error);
            localStorage.removeItem('token'); // 로컬 스토리지에서 액세스 토큰 삭제
            localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 삭제
            setIsAuth(false); // 인증 상태를 false로 설정
          }
        }
      } else {
        setIsAuth(true); // 액세스 토큰이 유효한 경우 인증 상태를 true로 설정
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
