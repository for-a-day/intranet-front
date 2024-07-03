import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import { ThemeProvider } from '@emotion/react';
import { baseTheme } from './assets/Theme-variable';
import FullLayout from './layout/FullLayout';
import EmployeeList from './components/resource/EmployeeList';
import EmployeeRegister from './components/resource/EmployeeRegister';
import Login from './components/login/Login';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute import
import ApprovalWrite from './pages/approval/ApprovalWrite';
import ApprovalDetail from './pages/approval/ApprovalDetail';

function App() {
  const theme = baseTheme;
  
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<FullLayout />} >
              <Route path='/' element={<Main />} />
              <Route path="/login" element={<Login />} />
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
              />
              <Route path='/approval/draft/form' element={<ApprovalWrite />} />
              <Route path='/approval/draft/detail/:id' element={<ApprovalDetail />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
