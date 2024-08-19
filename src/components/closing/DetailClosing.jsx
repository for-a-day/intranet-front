import React from 'react';
import styles from "./ClosingListStyle";
import { Typography, Grid, Button, Paper, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DetailClosing = ({ selectedClose, closeModal}) => {
    return(
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
              폐점 상세 정보
            </Typography>
            <hr style={{ marginBottom: "10px" }}></hr>
            <Grid container spacing={3} sx={{ mt: 1, pl: 2 }}>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  가맹점 아이디
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.closingId}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  담당자
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.employeeId}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  가맹점명
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.closingName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  대표자명
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.owner}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  지점주소
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.address}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  연락처
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  계약일
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.contractDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  계약만료일
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.expirationDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  폐점사유
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.closingReason}</Typography>
              </Grid>
            </Grid>
          </div>
        </> 
    );
};

export default DetailClosing;