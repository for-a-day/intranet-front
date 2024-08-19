// src/components/DetailModal.jsx
import React from 'react';
import styles from "./MenuListStyles";
import { Typography, Grid, Button, Paper, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DetailModal = ({ selectedMenu, handleCloseModal, handleDeleteMenu, handleOpenEditModal }) => {
  if (!selectedMenu) return null; // selectedMenu가 없으면 모달이 렌더링되지 않도록

  return (
    <Paper sx={{ padding: 3, backgroundColor: "#fffcfc", borderRadius: 2, boxShadow: 3 }}>
          <div style={styles.overlay} onClick={handleCloseModal}></div>
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <IconButton
                sx={{ position: "absolute", top: 20, right: 20 }}
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h2" sx={{ pt: 2, paddingBottom: "20px", fontWeight: "bold" }}>
                판매 중인 메뉴
              </Typography>
              <hr style={{ marginBottom: "2px" }}></hr>
              <Grid container spacing={3} sx={{ mt: 1, pl: 2 }}>
                <Grid item xs={12} sx={{ml: 10}}>
                  {selectedMenu && selectedMenu.menu_image ? (
                      <div>
                          <img 
                              src={`http://localhost:9000/images/${selectedMenu.menu_image}`} 
                              alt={selectedMenu.menu_name} 
                              style={{ maxWidth: '300px', height: 'auto' }} // 스타일을 필요에 맞게 조정
                          />
                      </div>
                  ) : null}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" fontWeight="bold">
                    메뉴ID
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">{selectedMenu.menu_id}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" fontWeight="bold">
                    메뉴명
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">{selectedMenu.menu_name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" fontWeight="bold">
                    판매가격
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">
                    {selectedMenu.menu_price.toLocaleString()}원
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" fontWeight="bold">
                    레시피
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">{selectedMenu.menu_recipe}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" fontWeight="bold">
                    총 원가
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">
                    {selectedMenu.menu_origin_price.toLocaleString()}원
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" fontWeight="bold">
                    판매여부
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">
                    {selectedMenu.menu_end === 1 ? "판매" : "미판매"}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
              <Button variant="contained" color="error" onClick={handleDeleteMenu}>
                미판매
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenEditModal(selectedMenu)}
                sx={{ ml: 1 }}
              >
                수정
              </Button>
              <Button variant="contained" onClick={handleCloseModal} sx={{ ml: 1 }}>
                닫기
              </Button>
            </Box>
          </div>
        </Paper>
  );
};

export default DetailModal;