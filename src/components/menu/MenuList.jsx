import React, { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem, TextField, Typography,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Chip,
    Paper, } from "@mui/material";
import styles from './MenuListStyles';

const MenuList = () => {
    const [menu, setMenu] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보를 저장할 상태
    const [showModal, setShowModal] = useState(false); // 상세 모달 표시 여부를 관리하는 상태
    const [showEditModal, setShowEditModal] = useState(false); // 수정 모달 표시 여부를 관리하는 상태
    const [formData, setFormData] = useState({
        menu_id: '',
        menu_name: '',
        menu_price: 0,
        menu_recipe: '',
        menu_origin_price: 0,
        menu_end: 0
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

    // 메뉴 삭제 함수
    const handleDeleteMenu = async () => {
        const delData = ({
            menu_id: selectedMenu.menu_id,
            menu_name: selectedMenu.menu_name,
            menu_price: selectedMenu.menu_price,
            menu_recipe: selectedMenu.menu_recipe,
            menu_origin_price: selectedMenu.menu_origin_price,
            menu_end: 0
        })
        try {
            // 삭제 API 호출
            const delResponse = await axios.put(`http://localhost:9000/app/menu/delete/${selectedMenu.menu_id}`, delData);

            alert('메뉴가 미판매 처리 되었습니다.');
            console.log('메뉴 삭제 완료');
            handleCloseModal();
            console.log('삭제 API 응답:', delResponse.data);
        } catch (error) {
            console.error('메뉴 삭제 에러', error);
        }
        fetchMenu();
    };

    const handleModMenu = async () => {
        const modData = ({
            menu_id: formData.menu_id,
            menu_name: formData.menu_name,
            menu_price: formData.menu_price,
            menu_recipe: formData.menu_recipe,
            menu_origin_price: formData.menu_origin_price,
            menu_end: formData.menu_end
        })
        try {
            // 수정 API 호출
            const modResponse = await axios.put(`http://localhost:9000/app/menu/${selectedMenu.menu_id}`, modData);
            alert('메뉴가 성공적으로 수정되었습니다');
            handleCloseEditModal();
            console.log('수정 API 응답:', modResponse.data);
        } catch (error) {
            console.error('메뉴 수정 에러', error);
        }
        fetchMenu();
    };

    // 모달 열기
    const handleOpenModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(true);
    };

    // 수정 모달 열기
    const handleOpenEditModal = (menu) => {
        setSelectedMenu(menu);
        setFormData(menu);
        setShowEditModal(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setSelectedMenu(null);
        setShowModal(false);
    };

    // 수정 모달 닫기
    const handleCloseEditModal = () => {
        setSelectedMenu(null);
        setShowEditModal(false);
    };

    // 폼 데이터 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 메뉴 상태에 따라 필터링하여 테이블 렌더링
    const renderMenuTable = (isEnd) => {
        const filteredMenu = menu.filter(item => item.menu_end === isEnd);
        return (
            <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
                <TableHead sx={{borderBottom:'2px solid #d1cfcf'}}>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6" align="center">
              메뉴ID
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6" align="center">
              메뉴명
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6" align="center">
              판매가격
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6" align="center">
              레시피
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6" align="center">
              총 원가
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6" align="center">
              판매여부
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
                    {filteredMenu.map((menu) => (
                        <TableRow key={menu.menu_id} onClick={() => handleOpenModal(menu)} sx={{
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                          }}>
                            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
                align="center"
              >
                {menu.menu_id}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
                align="center"
              >
                {menu.menu_name}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
                align="center"
              >
                {menu.menu_price}
              </Typography>
            </TableCell>
            <TableCell sx={{width:320}}>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
                align="center"
              >
                {menu.menu_recipe}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
                align="center"
              >
                {menu.menu_origin_price}
              </Typography>
            </TableCell>
            <TableCell sx={{textAlign:'center'}}>
              <Chip
                sx={{
                  pl: "4px",
                  pr: "4px",
                  backgroundColor: menu.menu_end === 1 ? "primary.main" : "error.main",
                  color: "#fff",
                }}
                size="small"
                label={menu.menu_end === 1 ? '판매' : '미판매'}
              ></Chip>
            </TableCell>
          </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    return (
        <>
            <Box sx={{ width: '90%', mx: 'auto' }}>
                {/* 판매 중인 메뉴 */}
                <h2>판매 중인 메뉴</h2>
                {renderMenuTable(1)}
                
                {/* 미판매 메뉴 */}
                <h2 style={{ marginTop: 40 }}>미판매 메뉴</h2>
                {renderMenuTable(0)}
            </Box>
            {/* 상세 모달 */}
            {selectedMenu && showModal && (
                <Paper sx={{padding: 3, backgroundColor: '#fffcfc', borderRadius: 2, boxShadow: 3}}>
                    <div style={styles.overlay} onClick={handleCloseModal}></div>
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <h4 style={styles.modalTitle}>메뉴 상세 정보</h4>
                            <hr style={{marginBottom:'2px'}}></hr>
                            <Grid container spacing={3} sx={{mt:1, pl:2}}>
                                <Grid item xs={3}><strong>메뉴ID</strong> </Grid>
                                <Grid item xs={9}>{selectedMenu.menu_id}</Grid>
                                <Grid item xs={3}><strong>메뉴명</strong></Grid>
                                <Grid item xs={9}>{selectedMenu.menu_name}</Grid>
                                <Grid item xs={3}><strong>판매가격</strong></Grid>
                                <Grid item xs={9}>{selectedMenu.menu_price}</Grid>
                                <Grid item xs={3}><strong>레시피</strong></Grid>
                                <Grid item xs={9}>{selectedMenu.menu_recipe}</Grid>
                                <Grid item xs={3}><strong>총 원가</strong></Grid>
                                <Grid item xs={9}>{selectedMenu.menu_origin_price}</Grid>
                                <Grid item xs={3}><strong>판매여부</strong></Grid>
                                <Grid item xs={9}>{selectedMenu.menu_end === 1 ? '판매' : '미판매'}</Grid>
                            </Grid>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                            <Button variant="contained" color="error" onClick={handleDeleteMenu}>
                                미판매
                            </Button>
                            <Button variant="contained" onClick={() => handleOpenEditModal(selectedMenu)} sx={{ ml: 1 }}>
                                수정
                            </Button>
                            <Button variant="contained" onClick={handleCloseModal} sx={{ ml: 1 }}>
                                닫기
                            </Button>
</Box>
                    </div>
                </Paper>
            )}
    
            {/* 수정 모달 */}
            {selectedMenu && showEditModal && (
                <>
                    <div style={styles.overlay} onClick={handleCloseEditModal}></div>
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <h4 style={styles.modalTitle}>메뉴 수정</h4>
                            <hr style={{ marginBottom: '20px' }}></hr>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="text"
                                    name="menu_id"
                                    label="메뉴ID"
                                    value={formData.menu_id}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="text"
                                    name="menu_name"
                                    label="메뉴명"
                                    value={formData.menu_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="number"
                                    name="menu_price"
                                    label="판매가격"
                                    value={formData.menu_price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="text"
                                    name="menu_recipe"
                                    label="레시피"
                                    value={formData.menu_recipe}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="number"
                                    name="menu_origin_price"
                                    label="총 원가"
                                    value={formData.menu_origin_price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    select
                                    name="menu_end"
                                    label="판매여부"
                                    value={formData.menu_end}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>판매</MenuItem>
                                    <MenuItem value={0}>미판매</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <Button variant="contained" color="primary" onClick={handleModMenu}>
                                저장
                            </Button>
                            <Button variant="contained" onClick={handleCloseEditModal} sx={{ marginLeft: 2, backgroundColor: '#dc3545' }}>
                                취소
                            </Button>
                        </Box>
                    </div>
                </>
            )}
        </>
    );
}
export default MenuList;