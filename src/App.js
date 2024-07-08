import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Calendar from './pages/calendar/Calendar';
import { ThemeProvider } from '@emotion/react';
import { baseTheme } from './assets/Theme-variable';
import FullLayout from './layout/FullLayout';
import CalendarDetail from './pages/calendar/CalendarDetail';
import EmployeeList from './components/resource/EmployeeList';
import EmployeeRegister from './components/resource/EmployeeRegister';
import Login from './components/login/Login';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute import
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



function App() {
  const theme = baseTheme;
  const [count, setCount] = useState();
  const token = localStorage.getItem("token");

  // SSE
  let eventSource = undefined;

  useEffect(() => {
    if(token){
      isSSE();
    }

  }, []);

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
    const res = await axios.post("http://localhost:9000/app/auth/notice","",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setCount(res.data.data.unreadCount);
  }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<FullLayout />} >
              <Route path='/' element={<Main />} />
              <Route path='/app/calendar' element={ <PrivateRoute><Calendar /> </PrivateRoute>} />
              <Route path='/app/schedule/detail/:scheduleId' element={<CalendarDetail isCreate={false} />} />
              <Route path='/app/schedule/create' element={<CalendarDetail isCreate={true}/>} />
              <Route path='/' element={<Main />} />
              {/* <Route path='/app/employees' element={<EmployeeList />} />
              <Route path='/app/employees/register' element={<EmployeeRegister />} /> */}

              <Route
                path="/app/employees"
                element={
                  <PrivateRoute>
                    <EmployeeList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/app/employees/register"
                element={
                  <PrivateRoute>
                    <EmployeeRegister />
                  </PrivateRoute>
                }

              /> */}
              <Route path='/approval/draft/form' element={<ApprovalWrite />} />
              />
              <Route path='/franchisee' element={<Franchisee />} />
              <Route path='/warn' element={<Warning />} />
              <Route path='/close' element={<Closing />} />
              <Route path='/menu' element={<Menu />} />

              <Route path='/sales' element={<Sales />} />
              <Route path='/order' element={<Order />} />

              {/* 전자결재 */}     
              <Route path='/approval/draft' element={<ApprovalMain />} />                   
              <Route path='/approval/draft/form' element={<ApprovalWrite />} />
              <Route path='/approval/draft/detail/:id' element={<ApprovalDetail />} />
              <Route path='/approval/draft/list/:category' element={<ApprovalList />} />
              <Route path='/approval/draft/revise/:id' element={<ApprovalModify />} />
              <Route path='/approval/draft/reapply/:id' element={<ApprovalReApply />} />

            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Chat />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
