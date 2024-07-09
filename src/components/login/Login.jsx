import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Checkbox,
  TextField,
  Paper,
} from "@mui/material";
import LogoIcon from "../../layout/Logo/LogoIcon";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:9000/login', {
            employeeId,
            employeePassword
        });
        console.log(response.data);
        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        // 로그인 성공 후 처리 (예: 리디렉션)
        alert('로그인 성공');
        // window.open("http://localhost:3005", "_blank", "width=800,height=1000,top=0,left=0,toolbar=no,location=no");
        window.location.href = 'http://localhost:3000/';
      }catch (error) {
        alert("사번과 비밀번호를 확인해주세요.");
          console.error("There was an error logging in!", error);
        }
      };

  return (
    <Paper title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ mr: 3, mb: 1 }}>
                <LogoIcon />
              </Box>
              <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                사원 통합 관리 시스템
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="username"
                      mb="5px"
                    >
                      Username
                    </Typography>

                    <TextField id="username" variant="outlined" fullWidth
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)} />

                  </Box>
                  <Box mt="20px">
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="password"
                      mb="5px"
                    >
                      Password
                    </Typography>
                    <TextField id="password" type="password" variant="outlined" fullWidth value={employeePassword}
                      onChange={(e) => setEmployeePassword(e.target.value)} />
                  </Box>
                  <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="아이디 저장"
                      />
                    </FormGroup>
                  </Stack>
                </Stack>
                <Box>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                  >
                    로그인
                  </Button>
                </Box>
              </form>
              <Stack direction="row" spacing={1} justifyContent="center" mt={2}>

              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Login;
