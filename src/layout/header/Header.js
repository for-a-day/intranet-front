import React, { useEffect, useState } from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import ModalPortal from "../../config/ModalPortal";
import SseModal from "../../components/approval/SseModal";

const Header = (props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [levelName, setLevelName] = useState("");

  //SSE
  const [data, setData] = useState([]);
  const [count, setCount] = useState(props.count || 0);
  const [notice, setNotice] = useState({});
  const [modal, setModal] = useState(false);
  const isEmpty = (obj) => {
    if (obj == null) return true;
  
    return Object.values(obj).length === 0;
  };

  useEffect(() => {
    setCount(props.count);
  }, [props.count]);

  useEffect(() => {
    if(!isEmpty(props.notice)){
      setNotice(props.notice);
    }
  },[props.notice]);

  useEffect(() => {
    if (!isEmpty(notice)) {
      setModal(true);
      const timer = setTimeout(() => {
        setModal(false);
        setNotice({});
      }, 3000);

      return () => clearTimeout(timer);
    }

  },[notice]);

  const notReadData = data && data.filter((data) => data.read === false).reverse();

  const getNotice = async () => {
    const res = await instance.post("/app/auth/notice");
    setData(res.data.data.notificationResponses);
  };

  const readHandler = async (id) => {
    await instance.put(`/app/auth/notice/${id}`);
  };

  const readAllHandler = async (id) => {
    await instance.post(`/app/auth/notice/${id}`);
  }

  const handleClick = (event) => {
    getNotice();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //알림을 클릭 시 동작하는 함수
  const readClick = (id, url) => {
    const _data = notReadData.filter((data) => data.id !== id);
    const _count = count - 1;
    readHandler(id);
    setData(_data);
    setCount(_count);
    setAnchorEl(null);
    setTimeout(() => {
      navigate(url);
    }, 500);
  };

  //모두 읽음
  const readAllClick = (id) => {
    const _count = 0;
    readAllHandler(id);
    setData([]);
    setCount(_count);
    setAnchorEl(null);
  };

  const [anchorEl4, setAnchorEl4] = useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleLogout = () => {
    alert("로그아웃되었습니다.");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const handleMyAccountClick = () => {
    navigate("/app/my-account");
    handleClose4();
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{ display: { lg: "none", xs: "inline" } }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />
        <span>
          <span>{departmentName} </span>
          <span> {levelName} </span>
          <span> {employeeName} </span>
        </span>
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {count === 0 ? (
            <NotificationsNoneOutlinedIcon width="20" height="20" />
          ) : (
            <NotificationsActiveIcon width="20" height="20" sx={{ color: "red" }} />
          )}
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "400px",
              maxHeight: "280px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          {notReadData?.length === 0 ? (
            <MenuItem onClick={handleClose}>
              <Typography>조회할 알림이 없습니다.</Typography>
            </MenuItem>
          ) : (
            <Box>
              {notReadData?.length >= 2 ? (
                <Button sx={{marginLeft: "65%", padding: "12px 30px"}} onClick={() => readAllClick(notReadData[0]?.id)}><Typography variant="h4">모두 읽음</Typography></Button>
              ) : null}
              {notReadData?.map((list) => (
                <MenuItem key={list.id} onClick={() => readClick(list.id, list.url)}>
                  <Stack>
                    <Typography>{list.content}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Box>
          )}
          <ModalPortal>
            {modal && <SseModal modal={modal} notice={notice} readClick={readClick}/>}
          </ModalPortal>
        </Menu>
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: "30px", height: "30px" }} />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleMyAccountClick}>
            <Avatar sx={{ width: "35px", height: "35px" }} />
            <Box sx={{ ml: 2 }}>My account</Box>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
 