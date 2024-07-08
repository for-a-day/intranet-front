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



function App() {
  const theme = baseTheme;
  
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
              <Route path='/app/employees' element={<EmployeeList />} />
              <Route path='/app/employees/register' element={<EmployeeRegister />} />

              {/* <Route
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
              <Route path='/franchisee' element={<Franchisee />} />
              <Route path='/warn' element={<Warning />} />
              <Route path='/close' element={<Closing />} />
              <Route path='/menu' element={<Menu />} />

              <Route path='/sales' element={<Sales />} />
              <Route path='/order' element={<Order />} />

              {/* 전자결재 */}                       
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
