import React, { useState } from "react";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Divider,
  useTheme,
  Typography,
  Button
} from "@mui/material";
import { Outlet, useLocation, Link } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { TopbarHeight } from "../assets/Theme-variable";
const MainWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));
const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: TopbarHeight,
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));
const drawerWidth = 283; // 오른쪽 사이드바 너비 설정
const FullLayout = ({count}) => {
  const theme = useTheme(); // useTheme 훅을 사용하여 테마 가져오기
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const location = useLocation();
  const pathsWithSidebar = ['/franchisee', '/close', '/warn'];
  return (
    <MainWrapper>
      {pathsWithSidebar.includes(location.pathname) && <CssBaseline />}
      <Header
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor: "#FFFFFF",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        count={count}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {pathsWithSidebar.includes(location.pathname) && (
        <Drawer
          sx={{
            width: { lg: drawerWidth, xs: 20 }, // md 이상일 때는 drawerWidth, md 이하일 때는 0
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: '90px', // 헤더 높이에 맞추기
              left: isSidebarOpen ? "265px" : "0px", // 왼쪽 사이드바 너비 고려
              [theme.breakpoints.down("lg")]: {
                left: 0, // md 이하일 때는 왼쪽에 붙게
              },
              transition: 'left 0.3s ease', // 애니메이션 추가
            },
          }}
          variant={ "permanent"}
          onClose={() => setMobileSidebarOpen(false)}
        >
          <Box>
            <Box sx={{pl:2}}>
          <h2>가맹점 관리</h2>
          </Box>
          <hr></hr>
          <Box sx={{textAlign:'center', mb:4}}>
        </Box>
          <List>
            {['가맹점', '폐점', '경고 가맹점'].map((text, index) => {
              const to = `/${text === '가맹점' ? 'franchisee' : text === '폐점' ? 'close' : 'warn'}`;
              const isActive = location.pathname === to;
              return (
                <ListItem
                  button
                  key={index}
                  component={Link}
                  to={to}
                  sx={{
                    backgroundColor: isActive ? 'rgba(0, 0, 255, 0.1)' : 'inherit',
                    '&:hover': {
                      backgroundColor: isActive ? 'rgba(0, 0, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
          </Box>
          <Divider />
        </Drawer>
      )}
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: pathsWithSidebar.includes(location.pathname) ? `${drawerWidth + (isSidebarOpen && lgUp ? 10 : 0)}px!important` : isSidebarOpen && lgUp ? "280px!important" : "",
            marginLeft: 0
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};
export default FullLayout;