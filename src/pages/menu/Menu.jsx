import { Grid, Button, Box, AppBar, Toolbar, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuList from "../../components/menu/MenuList";
import axios from "axios";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        menu_id: '',
        menu_name: '',
        menu_price: 0,
        menu_recipe: '',
        menu_origin_price: 0,
        menu_end: 1
      });

    // 목록
    const fetchMenu = async () => {
        try {
            const response = await axios.get('http://localhost:9000/app/menu');
            const menuMap = response.data.data;

            const menuArray = Object.values(menuMap);
            setMenu(menuArray);
        } catch (error) {
            console.error('폐점 목록 : 에러', error);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);  

    // 스타일
    const styles = {
        register: {
          backgroundColor: '#007BFF',
          color: 'white',
          padding: '6px 10px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginLeft: '10px',
        },
        modal: {
          width: "500px", 
        },
        paragraph: {
          marginBottom: "10px",
        }
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

    // 등록 버튼
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("정상 등록 완료", formData);
        // Close modal
        setOpen(false);
    };

    //등록
    const handleRegister = async () => {
        console.log('등록버튼이 눌렸습니다');
        try {
            const url = `http://localhost:9000/app/menu`;
            const response = await axios.post(url, formData);
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
            <AppBar position="static" sx={{ bgcolor: 'rgb(186, 232, 250)' }}>
              <Toolbar>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
                  메뉴 관리 
                </Typography>
                <button style={styles.register} onClick={handleOpen}>등록</button>
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
                    <h2>가맹점 등록</h2>
                    <hr style={{ marginBottom: '20px' }}></hr>
                    <form onSubmit={handleSubmit}>
                    <p>
                        <TextField sx={styles.paragraph}
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
                        <TextField sx={styles.paragraph}
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
                        <TextField sx={styles.paragraph}
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
                        <TextField sx={styles.paragraph}
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
                        <TextField sx={styles.paragraph}
                            type="number"
                            name="menu_origin_price"
                            label="총 원가"
                            value={formData.menu_origin_price}
                            onChange={handleInputChange}
                            required
                            fullWidth
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
