import { Grid, Button, Box, AppBar, Toolbar, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import FranchiseeList from "../../components/franchisee/FranchiseeList";
import axios from "axios";

const Franchisee = () => {
    const [franchisee, setFranchisee] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      franchiseeId: '',
      franchiseeName: '',
      employeeId: '',
      owner: '',
      address: '',
      phoneNumber: '',
      contractDate: '',
      expirationDate: '',
      warningCount: '',
    });

    // 스타일
    const styles = {
      register: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
      },
      modal: {
        width: "60vw", 
        maxWidth: "800px", 
      },
      paragraph: {
        width: "65%",
        marginBottom: "10px",
      }
    };

    const fetchFranchisee = async () => {
      try {
          const response = await axios.get('http://localhost:9000/app/store');
          const franchiseeMap = response.data.data;

          // Convert the Map object to an array
          const franchiseeArray = Object.values(franchiseeMap);
          setFranchisee(franchiseeArray);
      } catch (error) {
          console.error('에러났슴둥', error);
      }
  };

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
        console.log('등록버튼이 눌렸습니다');
        try {
            const url = `http://localhost:9000/app/store`;
            const response = await axios.post(url, formData);
            alert('새로운 가맹점 등록을 축하드립니다!');
            console.log('api 담기 성공', response.data);
            handleClose(); // 등록 성공 시 모달 닫기
        } catch (error) {
            console.log('등록 중 에러 발생', error);
        }
        fetchFranchisee();
    }; 

    // input요소 및 만료 계약일 생성
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // 만료계약일 자동 설정
        if(name === 'contractDate'){
            const contractDate = new Date(value);
            const expirationDate = new Date(contractDate.getFullYear() + 2
                                            , contractDate.getMonth(), contractDate.getDate());
            setFormData(prevState => ({
                ...prevState,
                expirationDate: expirationDate.toISOString().split('T')[0]
            }));
        }
    };

    // 등록 버튼
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("정상 등록 완료", formData);
      // Close modal
      setOpen(false);
    };

    return (
        <>
        {/* Main Content */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" sx={{ bgcolor: '#81BEF7' }}>
                <Toolbar>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ color: 'black', fontWeight: 'bold', marginRight: '10px' }}
                    >
                      가맹점 관리
                    </Typography>
                    <button style={styles.register} onClick={handleOpen}>등록</button>
                  </Box>
                  <Button color="inherit" href="/franchisee" sx={{ color: 'black', fontWeight: 'bold' }}>
                    가맹점
                  </Button>
                  <Button color="inherit" href="/close" sx={{ color: 'black', fontWeight: 'bold' }}>
                    폐점
                  </Button>
                  <Button color="inherit" href="/warn" sx={{ color: 'black', fontWeight: 'bold' }}>
                    경고 가맹점
                  </Button>
                </Toolbar>
              </AppBar>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FranchiseeList />
          </Grid>
          <Dialog open={open}>
            <DialogTitle>가맹점 등록</DialogTitle>
            <DialogContent onClick={handleDialogClick}>
            {open && (
              <div style={styles.modal}>
                  <h2>가맹점 등록</h2>
                  <form onSubmit={handleSubmit}>
                    <p>
                      <TextField sx={styles.paragraph}
                        type="text"
                        name="franchiseeId"
                        label="가맹점 ID"
                        value={formData.franchiseeId}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <TextField sx={styles.paragraph}
                        type="text"
                        name="franchiseeName"
                        label="가맹점명"
                        value={formData.franchiseeName}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <TextField sx={styles.paragraph}
                        type="text"
                        name="owner"
                        label="대표자명"
                        value={formData.owner}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <TextField sx={styles.paragraph}
                        type="text"
                        name="address"
                        label="지점주소"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <TextField sx={styles.paragraph}
                        type="text"
                        name="phoneNumber"
                        label="연락처"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <TextField sx={styles.paragraph}
                        type="date"
                        name="contractDate"
                        label="가맹계약일"
                        value={formData.contractDate}
                        onChange={handleInputChange}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </p>
                    <p>
                      <TextField sx={styles.paragraph}
                        type="date"
                        name="expirationDate"
                        label="만료계약일"
                        value={formData.expirationDate}
                        onChange={handleInputChange}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </p>
                    <p>
                      <TextField sx={styles.paragraph}
                        type="text"
                        name="employeeId"
                        label="담당자"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <input
                        type="hidden"
                        name="warningCount"
                        value={formData.warningCount}
                        onChange={handleInputChange}
                        required
                        readOnly
                      />
                    </p>
                  </form>
              </div>
            )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                취소
              </Button>
              <Button onClick={handleRegister} color="primary">
                등록
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </>  
    );
  };

export default Franchisee;