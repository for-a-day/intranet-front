import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import { ThemeProvider } from '@emotion/react';
import {baseTheme} from './assets/Theme-variable'
import FullLayout from './layout/FullLayout';
import ApprovalWrite from './pages/approval/ApprovalWrite';
import Franchisee from './pages/franchisee/Franchisee';
import Warning from './pages/warning/Warning';
import Closing from './pages/closing/Closing';
import Menu from './pages/menu/Menu';
import SalesList from './components/sales/SalesList';

function App() {
  const theme = baseTheme;
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<FullLayout />} >
              <Route path='/' element={<Main />} />
              <Route path='/approval/draft/form' element={<ApprovalWrite />} />
              <Route path='/franchisee' element={<Franchisee />} />
              <Route path='/warn' element={<Warning />} />
              <Route path='/close' element={<Closing />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/sales' element={<SalesList />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
