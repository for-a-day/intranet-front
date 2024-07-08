import axios from 'axios';
import { isTokenExpired } from './utils'; // 유틸리티 함수 import

const instance = axios.create({
  baseURL: 'http://localhost:9000', // 기본 API URL 설정
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token'); // 토큰을 매 요청마다 가져옴
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await instance.post('/auth/refresh', { refreshToken });
          const { accessToken } = response.data;
          localStorage.setItem('token', accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (e) {
          console.error('Refresh token invalid:', e);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
