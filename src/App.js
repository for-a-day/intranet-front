import './App.css';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import Main from './pages/main/Main';
import { ThemeProvider } from '@emotion/react';
import {baseTheme} from './assets/Theme-variable'
import FullLayout from './layout/FullLayout';
import EmployeeList from './components/resource/EmployeeList';
import EmployeeRegister from './components/resource/EmployeeRegister';

function App() {
  const theme = baseTheme;
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<FullLayout />} >
              <Route path='/' element={<Main />} />
              <Route path="/api/employees" element={<EmployeeList />} />
              <Route path="/api/employees/register" element={<EmployeeRegister />} /> 
            </Route>
            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
