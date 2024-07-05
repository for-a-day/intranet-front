import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import React from "react";
import "./Main.css";

const MainList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box className="box" sx={{ height: 300 }}>
          내 정보
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box className="box" sx={{ height: 200 }}>
          뭐넣냐?
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box className="box" sx={{ height: 300 }}>
          일정등록 바로가기 / 휴가 신청서 작성 바로가기
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className="box" sx={{ height: 100 }}>
          퇴근 시간 카운트 / 근태 ?
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className="box" sx={{ height: 300 }}>
          전자 결재 문서
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className="box" sx={{ height: 200 }}>
          오늘의 일정
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainList;
