import React, { useEffect, useState } from "react";
import { Grid, Box, AppBar, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import SalesList from "../../components/sales/SalesList";
import {styles, GreenDot, RedDot } from "./SalesStyle";

const currentYear = new Date().getFullYear();

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [openModal, setOpenModal] = useState(false); // 모달 열림 여부 상태
    const [selectedYear, setSelectedYear] = useState(currentYear); // 선택된 년도 상태
    const [selectedMonth, setSelectedMonth] = useState(""); // 선택된 월 상태
    
    const years = [];
    for (let year = currentYear; year <= currentYear + 10; year++) {
      years.push(year);
    }

    const handleClick = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
    };

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:9000/app/sales');
            const salesMap = response.data.data;

            const saleArray = Object.values(salesMap);
            setSales(saleArray);
        } catch (error) {
            console.error('매출 목록 : 에러', error);
        }
    };
  
    const fetchSalesCall = () => {
      if (!selectedYear || !selectedMonth) {
        alert('년도와 월을 선택해주세요.');
        return;
      }

      axios.post('http://localhost:9000/api/go/sales', { year: selectedYear, month: selectedMonth })
        .then(response => {
          console.log('데이터가 성공적으로 저장되었습니다:', response.data);
          alert('매출정보를 불러옵니다. 잠시만 기다려주십시오.');
          handleCloseModal(); // 모달 닫기
          fetchSales();
        })
        .catch(error => {
          console.error('데이터 저장 중 오류 발생:', error);
        });
        
    };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: '#81BEF7' }}>
            <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h3" component="div" sx={{ color: 'black', fontWeight: 'bold' }}>
                매출 관리(기획부)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" component="div" sx={{ color: 'black', fontWeight: 'bold', mr: 1 }}>
                  <GreenDot /> 월별 최고매출
                </Typography>
                <Typography variant="body1" component="div" sx={{ color: 'black', fontWeight: 'bold', mr: 1 }}>
                  <RedDot /> 월별 최저매출
                </Typography>
              </Box>
            </Box>
              <Button onClick={handleClick} style={styles.register}>매출 데이터 불러오기</Button>
            </Toolbar>
          </AppBar>
        </Box>  
      </Grid>
      <Grid item xs={12}>
        <SalesList />
      </Grid>

      {/* 모달 */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>년도와 월 선택</DialogTitle>
        <hr></hr>
        <DialogContent style={styles.modal}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth style={styles.formControl}>
                <InputLabel>년도</InputLabel>
                <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  {years.map(year => (
                    <MenuItem key={year} value={year}>{`${year}년`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth style={styles.formControl}>
                <InputLabel>월</InputLabel>
                <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                  <MenuItem value={1}>1월</MenuItem>
                  <MenuItem value={2}>2월</MenuItem>
                  <MenuItem value={3}>3월</MenuItem>
                  <MenuItem value={4}>4월</MenuItem>
                  <MenuItem value={5}>5월</MenuItem>
                  <MenuItem value={6}>6월</MenuItem>
                  <MenuItem value={7}>7월</MenuItem>
                  <MenuItem value={8}>8월</MenuItem>
                  <MenuItem value={9}>9월</MenuItem>
                  <MenuItem value={10}>10월</MenuItem>
                  <MenuItem value={11}>11월</MenuItem>
                  <MenuItem value={12}>12월</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>취소</Button>
          <Button onClick={fetchSalesCall} variant="contained" color="primary">불러오기</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Sales;