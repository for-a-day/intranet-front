import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Main from './pages/main/Main';
import Calendar from './pages/calendar/Calendar';
import { ThemeProvider } from '@emotion/react';
import { baseTheme } from './assets/Theme-variable';
import FullLayout from './layout/FullLayout';
import CalendarDetail from './pages/calendar/CalendarDetail';
import EmployeeList from './components/resource/EmployeeList';
import EmployeeRegister from './components/resource/EmployeeRegister';
import Login from './components/login/Login';
import ApprovalWrite from './pages/approval/ApprovalWrite';
import Franchisee from './pages/franchisee/Franchisee';
import Warning from './pages/warning/Warning';
import Closing from './pages/closing/Closing';
import Menu from './pages/menu/Menu';
import ApprovalDetail from './pages/approval/ApprovalDetail';
import ApprovalList from './pages/approval/ApprovalList';
import ApprovalModify from './pages/approval/ApprovalModify';
import ApprovalReApply from './pages/approval/ApprovalReApply';
import Sales from './pages/sales/Sales';
import Order from './pages/order/Order';
import Chat from './components/chat/Chat';
import ApprovalMain from './pages/approval/ApprovalMain';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import instance from './axiosConfig';
import MyAccount from './components/myaccount/MyAccount';
import { isTokenExpired } from './utils'; // 유틸리티 함수 import

import NotFoundPage from './pages/error/NotFoundPage';


function App() {
  const theme = baseTheme;
  const [count, setCount] = useState(0);
  const [isAuth, setIsAuth] = useState(null); // 인증 상태를 저장하기 위한 상태
  const [notice, setNotice] = useState({});
  const token = localStorage.getItem("token");

  // SSE
  let eventSource = undefined;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 액세스 토큰 가져오기
      const refreshToken = localStorage.getItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 가져오기

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

  useEffect(() => {
    if(token){
      isSSE();
    }
  }, [token]);

  const isSSE = () => {
    eventSource = new EventSourcePolyfill(
      `http://localhost:9000/app/auth/notice`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        heartbeatTimeout: 1000 * 60 * 20,
      }
    );
    // console.log("구독성공");
    eventSource.addEventListener("sse", function (event) {
      (async () => {
        let data;
        if (event.data && typeof event.data === "string") {
          data = event.data;
        } else {
          data = JSON.parse(event.data);
        }
        // 브라우저 알림
        const showNotification = () => {
          const notification = new Notification(
            "알림이 도착했습니다.",
            {
              body: data.content,
            }
          );
          // console.log("알림성공");
          setTimeout(() => {
            notification.close();
          }, 10 * 1000);
        };
        // 브라우저 알림 허용 권한
        let granted = true;
        if (Notification.permission === "granted") {
          granted = true;
        } else if (Notification.permission !== "denied") {
          let permission = await Notification.requestPermission();
          granted = permission === "granted";
        }
        // 알림 보여주기
        if (granted === true) {
          getNotice();
          showNotification();
        }
      })();
    });
  };

  // 서버로부터 받아온 알림 갯수를 state에 저장
  const getNotice = async () => {
    setCount(0);
    const res = await instance.post("/app/auth/notice");
    if(res !== undefined){
      setCount(res.data.data.unreadCount);
      const _notice = res?.data?.data?.notificationResponses;
      if (_notice && _notice.length > 0) {
        const viewNotice = _notice[_notice.length-1];
        console.log(viewNotice);
        if(viewNotice.view === false){
          setNotice(viewNotice);
          await instance.patch(`/app/auth/notice/${viewNotice.id}`);
        }
      }
    }
  }

  if (isAuth === null) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<FullLayout />}>

              <Route
                path='/'
                element={<Main />}
              />
              <Route
                path='/app/home'
                element={<Main />}
              />
              <Route
                path='/app'
                element={<Main />}
              />
              <Route
                path='/app/calendar'
                element={<Calendar />}
              />
              <Route
                path='/app/schedule/detail/:scheduleId'
                element={<CalendarDetail isCreate={false} />}
              />
              <Route
                path='/app/schedule/create'
                element={<CalendarDetail isCreate={true} />}
              />
              <Route
                path="/app/my-account"
                element={<MyAccount />}
              />
              <Route
                path='/app/employees'
                element={<EmployeeList />}
              />
              <Route
                path='/app/employees/register'
                element={<EmployeeRegister />}
              />
              <Route
                path='/approval/draft/form'
                element={<ApprovalWrite />}
              />
              <Route
                path='/app/franchisee'
                element={<Franchisee />}
              />
              <Route
                path='/app/warn'
                element={<Warning />}
              />
              <Route
                path='/app/close'
                element={<Closing />}
              />
              <Route
                path='/app/menu'
                element={<Menu />}
              />
              <Route
                path='/app/sales'
                element={<Sales />}
              />
              <Route
                path='/app/order'
                element={<Order />}
              />
              <Route
                path='/approval/draft'
                element={<ApprovalMain />}
              />
              <Route
                path='/approval/draft/detail/:id'
                element={<ApprovalDetail />}
              />
              <Route
                path='/approval/draft/list/:category'
                element={<ApprovalList />}
              />
              <Route
                path='/approval/draft/revise/:id'
                element={<ApprovalModify />}
              />
              <Route
                path='/approval/draft/reapply/:id'
                element={<ApprovalReApply />}
              />
            </Route>

          </Routes>
          <Chat />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
