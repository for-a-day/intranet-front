import './App.css';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import Main from './pages/main/Main';
import Calendar from './pages/calendar/Calendar';
import { ThemeProvider } from '@emotion/react';
import {baseTheme} from './assets/Theme-variable'
import FullLayout from './layout/FullLayout';
import CalendarDetail from './pages/calendar/CalendarDetail';

function App() {
  const theme = baseTheme;
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<FullLayout />} >
                <Route path='/' element={<Main />} />
                <Route path='/app/calendar' element={<Calendar />} />
                <Route path='/app/schedule/detail/:scheduleId' element={<CalendarDetail isCreate={false} />} />
                <Route path='/app/schedule/create' element={<CalendarDetail isCreate={true}/>} />
            </Route> 
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
