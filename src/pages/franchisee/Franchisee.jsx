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
import FranchiseeList from "../../components/franchisee/FranchiseeList";
import styles from "./FranchiseeStyle";
import {
  Add as AddIcon,
  Store as StoreIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import instance from "../../axiosConfig";

const Franchisee = () => {
  const token = localStorage.getItem("token");
  const [franchisee, setFranchisee] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    franchiseeId: "",
    franchiseeName: "",
    employeeId: "",
    owner: "",
    address: "",
    phoneNumber: "",
    contractDate: "",
    expirationDate: "",
    warningCount: "",
  });

  const fetchFranchisee = async () => {
    try {
      const response = await instance.get("/app/store");
      const franchiseeMap = response.data.data;

      // Convert the Map object to an array
      const franchiseeArray = Object.values(franchiseeMap);
      setFranchisee(franchiseeArray);
    } catch (error) {
      console.error("에러났슴둥", error);
    }
  };

  useEffect(() => {
    fetchFranchisee();
  }, [token]);

  // 모달 키기
  const handleOpen = () => {
    setOpen(true);
  };

  // 모달 끄기
  const handleClose = () => {
    setOpen(false);
  };

  // 모달 꺼짐 방지
  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  //등록
  const handleRegister = async () => {
    console.log("등록버튼이 눌렸습니다");
    try {
      const url = `/app/store`;
      const response = await instance.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("새로운 가맹점 등록을 축하드립니다!");
      console.log("api 담기 성공", response.data);
      handleClose();
      fetchFranchisee();
    } catch (error) {
      console.log("등록 중 에러 발생", error);
    }
  };

  // input요소 및 만료 계약일 생성
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 만료계약일 자동 설정
    if (name === "contractDate") {
      const contractDate = new Date(value);
      const expirationDate = new Date(
        contractDate.getFullYear() + 2,
        contractDate.getMonth(),
        contractDate.getDate(),
      );
      setFormData((prevState) => ({
        ...prevState,
        expirationDate: expirationDate.toISOString().split("T")[0],
      }));
    }
  };

  // 등록 버튼
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("정상 등록 완료", formData);
    setOpen(false);
  };

  return (
    <>
      {/* Main Content */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "rgb(186, 232, 250)", minWidth: 500 }}>
              <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ color: "black", fontWeight: "bold", marginRight: "10px" }}
                  >
                    가맹점 관리
                  </Typography>
                  <button style={styles.register} onClick={handleOpen}>
                    등록
                  </button>
                </Box>
                <Button
                  color="inherit"
                  href="/app/franchisee"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    backgroundColor: "#59bfcf",
                    margin: "0 5px",
                    borderRadius: "8px",
                  }}
                >
                  <StoreIcon /> 가맹점
                </Button>
                <Button
                  color="inherit"
                  href="/app/close"
                  sx={{ color: "black", fontWeight: "bold", margin: "0 5px", borderRadius: "8px" }}
                >
                  <CloseIcon /> 폐점
                </Button>
                <Button
                  color="inherit"
                  href="/app/warn"
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  <WarningIcon /> 경고 가맹점
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FranchiseeList />
        </Grid>
        <Dialog open={open}>
          <DialogContent onClick={handleDialogClick}>
            {open && (
              <div style={styles.modal}>
                <Typography variant="h2" mb={3} mt={2}>
                  가맹점 등록
                </Typography>
                <hr style={{ marginBottom: "25px" }}></hr>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        type="text"
                        name="franchiseeId"
                        label="가맹점 ID"
                        value={formData.franchiseeId}
                        onChange={handleInputChange}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="text"
                        name="franchiseeName"
                        label="가맹점명"
                        value={formData.franchiseeName}
                        onChange={handleInputChange}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        name="owner"
                        label="대표자명"
                        value={formData.owner}
                        onChange={handleInputChange}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={styles.paragraph}
                        type="text"
                        name="address"
                        label="지점주소"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={styles.paragraph}
                        type="text"
                        name="phoneNumber"
                        label="연락처"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        sx={styles.paragraph}
                        type="date"
                        name="contractDate"
                        label="가맹계약일"
                        value={formData.contractDate}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        sx={styles.paragraph}
                        type="date"
                        name="expirationDate"
                        label="만료계약일"
                        value={formData.expirationDate}
                        onChange={handleInputChange}
                        required
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={styles.paragraph}
                        type="text"
                        s
                        name="employeeId"
                        label="담당자"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        required
                        fullWidth
                      />
                    </Grid>
                    <input
                      type="hidden"
                      name="warningCount"
                      value={formData.warningCount}
                      onChange={handleInputChange}
                      required
                      readOnly
                    />
                  </Grid>
                </form>
              </div>
            )}
          </DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3, mb: 3 }}>
            <Button
              onClick={handleRegister}
              color="primary"
              sx={{ backgroundColor: "#1a97f5", color: "white" }}
            >
              등록
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              sx={{ backgroundColor: "#dc3545", color: "white", ml: 1 }}
            >
              취소
            </Button>
          </Box>
        </Dialog>
      </Grid>
    </>
  );
};

export default Franchisee;
