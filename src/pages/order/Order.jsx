import React, { useState } from "react";
import axios from "axios";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import OrderList from "../../components/order/OrderList";
import styles from "./OrderStyle";

const Order = () => {
    const data = { data: 1 };
    const handleFetchData = () => {       
        axios.post('http://localhost:9000/api/go/order', data)
          .then(response => {
            alert("주문 정보를 가져옵니다. 잠시만 기다려주십시오.");
            console.log('데이터가 성공적으로 저장되었습니다:', response.data);
          })
          .catch(error => {
            console.error('데이터 저장 중 오류 발생:', error);
          });
      };
    
    return(
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: '#81BEF7' }}>
            <Toolbar>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
                주문 관리(물류부)
              </Typography>
              <button onClick={handleFetchData} style={styles.register}>주문 정보 불러오기</button>
            </Toolbar>
          </AppBar>
        </Box>  
      </Grid>
      <Grid item xs={12}>
        <OrderList />
      </Grid>
      </Grid>
    );
};

export default Order;