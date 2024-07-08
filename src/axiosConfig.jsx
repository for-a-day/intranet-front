import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000', // 기본 API URL 설정
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  config => {
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
  error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
