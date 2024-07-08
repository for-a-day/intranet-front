import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000', // 기본 API URL 설정
  headers: { "Content-type": "application/json" }
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
  function (response) {
    console.log("response start", response);
    return response;
  },
  async (error) => {
    if(error.response.status === 401) {
      const originalRequest = error;
      const headers = {
          Authorization: localStorage.getItem("token"),
          RefreshToken: localStorage.getItem("refreshtoken")
      };
      const data = await axios.post('http://localhost:9000/auth/refresh', {refreshToken: localStorage.getItem("refreshToken")}, { headers });
      localStorage.setItem('token', data.data.accessToken);
      if(data.headers.refreshtoken) {
          localStorage.setItem("refreshtoken", data.data.refreshToken);
      }
      originalRequest.config.headers.authorization = "Bearer " + localStorage.getItem("token");
      return await axios(originalRequest.config);
      }
    }
);

export default instance;
