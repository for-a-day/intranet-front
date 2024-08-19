// src/components/EditModal.js
import React from "react";
import { Typography, TextField, Box, Button, IconButton, MenuItem } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import styles from "./MenuListStyles";

const EditModal = ({ formData, handleCloseEditModal, handleChange, handleModMenu }) => {
  return (
    <>
      <div style={styles.overlay} onClick={handleCloseEditModal}></div>
      <div style={styles.modal}>
        <IconButton sx={{ position: "absolute", top: 20, right: 20 }} onClick={handleCloseEditModal}>
          <CloseIcon />
        </IconButton>
        <div style={styles.modalContent}>
          <Typography variant="h2" sx={{ pt: 2, paddingBottom: "20px", fontWeight: "bold" }}>
            메뉴 수정
          </Typography>
          <hr style={{ marginBottom: "20px" }}></hr>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleModMenu}>
            저장
          </Button>
          <Button variant="contained" onClick={handleCloseEditModal} sx={{ marginLeft: 2, backgroundColor: "#dc3545" }}>
            취소
          </Button>
        </Box>
      </div>
    </>
  );
};

export default EditModal;
