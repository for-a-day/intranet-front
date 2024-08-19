import React from "react";
import { Box, Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import styles from "./FranchiseeListStyle";

const EditFranchiseeModal = ({
  formData,
  handleInputChange,
  editSubmit,
  closeModal,
  handleDeleteModalOpen,
  warnSubmit,
  isWarningReasonVisible,
  isDeleteModalOpen,
  handleDelete
}) => {
  return (
    <>
      <div style={styles.overlay} onClick={closeModal}></div>
      <div style={styles.modalEdit}>
        <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={closeModal}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h2" mb={3} mt={2}>
          가맹점 수정
        </Typography>
        <hr style={{ marginBottom: "25px" }}></hr>
        <form onSubmit={editSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={styles.input}
                type="text"
                name="franchiseeId"
                label="가맹점 ID"
                value={formData.franchiseeId}
                onChange={handleInputChange}
                readOnly
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={styles.input}
                type="text"
                name="franchiseeName"
                label="가맹점명"
                value={formData.franchiseeName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={styles.input}
                type="text"
                name="owner"
                label="가맹점 대표"
                value={formData.owner}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={styles.input}
                type="text"
                name="address"
                label="지점주소"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={styles.input}
                type="text"
                name="phoneNumber"
                label="연락처"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={styles.input}
                type="date"
                name="contractDate"
                label="가맹계약일"
                value={formData.contractDate}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={styles.input}
                type="date"
                name="expirationDate"
                label="만료계약일"
                value={formData.expirationDate}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={styles.warnInput}
                type="number"
                name="warningCount"
                label="경고횟수"
                inputProps={{ min: 0, max: 5 }}
                value={formData.warningCount}
                onChange={handleInputChange}
                required
              />
            </Grid>
            {isWarningReasonVisible && (
              <>
                <Grid item xs={10}>
                  <TextField
                    sx={styles.warnInput}
                    name="warningReason"
                    value={formData.warningReason}
                    label="경고사유"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button style={styles.warnRegister} type="submit" onClick={warnSubmit}>
                    저장
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                sx={styles.input}
                type="text"
                name="employeeId"
                label="담당자"
                value={formData.employeeId}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={9}>
              <input
                sx={styles.input}
                type="hidden"
                name="employeeId"
                value={formData.closingDate}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={editSubmit}
                type="submit"
                sx={{ marginRight: 2 }}
              >
                저장
              </Button>
              <Button
                variant="contained"
                onClick={handleDeleteModalOpen}
                sx={{ backgroundColor: "#FF0040" }}
              >
                삭제
              </Button>
            </Box>
          </Grid>
        </form>
      </div>

      {isDeleteModalOpen && (
        <>
          <div style={styles.closingOverlay} onClick={closeModal}></div>
          <div style={styles.delModal}>
            <IconButton
              sx={{ position: "absolute", top: 10, right: 10 }}
              onClick={closeModal}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" mb={3} mt={2}>
              가맹점 폐점 사유를 입력해주세요.
            </Typography>
            <Grid item xs={12}>
              <TextField
                sx={styles.input}
                type="text"
                name="closingReason"
                label="폐점사유"
                value={formData.closingReason}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ marginRight: 1, backgroundColor: "#FF0040" }}
              >
                삭제
              </Button>
              <Button
                variant="contained"
                onClick={closeModal}
                sx={{ backgroundColor: "#6c757d", color: "#fff" }}
              >
                취소
              </Button>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default EditFranchiseeModal;