import {
  Grid,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuList from "../../components/menu/MenuList";
import instance from "../../axiosConfig";

const Menu = () => {
  const token = localStorage.getItem("token");
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    menu_id: "",
    menu_name: "",
    menu_price: 0,
    menu_recipe: "",
    menu_origin_price: 0,
    menu_end: 1,
  });

  // 목록
  const fetchMenu = async () => {
    try {
      const response = await instance.get("/app/menu");
      const menuMap = response.data.data;

      const menuArray = Object.values(menuMap);
      setMenu(menuArray);
    } catch (error) {
      console.error("폐점 목록 : 에러", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [token]);

  // 스타일
  const styles = {
    register: {
      backgroundColor: "#007BFF",
      color: "white",
      padding: "6px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginLeft: "10px",
    },
    modal: {
      width: "500px",
    },
    paragraph: {
      marginBottom: "10px",
    },
  };

  // 모달 키기
  const handleOpen = () => {
    setOpen(true);
  };

  // input요소 및 만료 계약일 생성
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 모달 끄기
  const handleClose = () => {
    setOpen(false);
  };

  // 모달 꺼짐 방지
  const handleDialogClick = (e) => {
    e.stopPropagation();
  };
  
  // 파일 변화 감지
  const handleFileChange  = (e) => {
    setFile(e.target.files[0]);
  };

  // 등록 버튼
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("정상 등록 완료", formData);
    // Close modal
    setOpen(false);
  };

  //등록
  const handleRegister = async () => {
    console.log("등록버튼이 눌렸습니다");
    try {
        const data = new FormData();

        data.append('menu_id', formData.menu_id);
        data.append('menu_name', formData.menu_name);
        data.append('menu_price', formData.menu_price);
        data.append('menu_recipe', formData.menu_recipe);
        data.append('menu_origin_price', formData.menu_origin_price);
        data.append('menu_end', formData.menu_end);
        if (file) {
            data.append('menu_image', file);
        }

        // 'FormData'의 내용을 확인할 수는 없지만, 파일이 포함되었는지 확인
        console.log('FormData에 파일이 포함되었는지 확인:', data.has('menu_image'));

        const url = `http://localhost:9000/app/menu`;
        const response = await instance.post(url, data, {
            headers: {
               'Content-Type': 'multipart/form-data',
            }
        });
        alert('신메뉴가 정상적으로 등록되었습니다');
        console.log('api 담기 성공', response.data);
        handleClose();
        fetchMenu();
    } catch (error) {
        console.log('등록 중 에러 발생', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: "rgb(186, 232, 250)" }}>
            <Toolbar>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1, color: "black" }}>
                메뉴 관리
              </Typography>
              <button style={styles.register} onClick={handleOpen}>
                등록
              </button>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <MenuList />
      </Grid>
      <Dialog open={open}>
        <DialogContent onClick={handleDialogClick}>
          {open && (
            <div style={styles.modal}>
              <Typography
                variant="h2"
                component="div"
                sx={{ flexGrow: 1, color: "black", pt: 2, pb: 2 }}
              >
                메뉴 등록
              </Typography>
              <hr style={{ marginBottom: "20px" }}></hr>
              <form onSubmit={handleSubmit}>
                <p>
                  <TextField
                    sx={styles.paragraph}
                    type="text"
                    name="menu_id"
                    label="메뉴 ID"
                    value={formData.menu_id}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </p>
                <p>
                  <TextField
                    sx={styles.paragraph}
                    type="text"
                    name="menu_name"
                    label="신메뉴명"
                    value={formData.menu_name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                </p>
                <p>
                  <TextField
                    sx={styles.paragraph}
                    type="number"
                    name="menu_price"
                    label="판매가"
                    value={formData.menu_price}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                </p>
                <p>
                  <TextField
                    sx={styles.paragraph}
                    type="text"
                    name="menu_recipe"
                    label="레시피"
                    value={formData.menu_recipe}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                </p>
                <p>
                  <TextField
                    sx={styles.paragraph}
                    type="number"
                    name="menu_origin_price"
                    label="총 원가"
                    value={formData.menu_origin_price}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                </p>
                <p>
                <TextField
                    sx={{width: '100%'}}
                    type="file"
                    name="menu_image"
                    onChange={handleFileChange}
                />
                </p>
              </form>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={styles.register} onClick={handleRegister} color="primary">
            등록
          </Button>
          <Button sx={styles.register} onClick={handleClose} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Menu;
