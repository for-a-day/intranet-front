import React from "react";
import { Box, Button, Grid, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import styles from "./FranchiseeListStyle";

const DetailFranchiseeModal = ({ selectedFranchisee, closeModal, handleEditModalOpen }) => {
  return (
    <>
          <div style={styles.overlay} onClick={closeModal}></div>
          <div style={styles.modal}>
            <IconButton sx={{ position: "absolute", top: 20, right: 20 }} onClick={closeModal}>
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h2"
              sx={{ pt: 2, pl: 1, paddingBottom: "20px", fontWeight: "bold" }}
            >
              가맹점 상세 정보
            </Typography>
            <hr style={{ marginBottom: "5px" }}></hr>
            <Grid container spacing={3} sx={{ mt: 1, pl: 2 }}>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  가맹점 아이디
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.franchiseeId}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  담당자
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.employeeId.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  가맹점명
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.franchiseeName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  대표자명
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.owner}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  지점주소
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.address}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  연락처
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  계약일
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.contractDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  계약만료일
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.expirationDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  경고횟수
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedFranchisee.warningCount}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 2 }}>
              <Button variant="contained" onClick={handleEditModalOpen}>
                수정하기
              </Button>
            </Box>
          </div>
    </>
  );
};

export default DetailFranchiseeModal;