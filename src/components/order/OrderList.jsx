import React, { useState, useEffect } from 'react';
import styles from './OrderListStyle';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import instance from "../../axiosConfig";

const OrderList = () => {
  const token = localStorage.getItem('token');
  const [order, setOrder] = useState([]);

    // 목록
    useEffect(() => {
      const fetchOrder = async () => {
          try {
              const response = await instance.get('/app/order');
              const orderMap = response.data.data;

              const orderArray = Object.values(orderMap);
              setOrder(orderArray);
          } catch (error) {
              console.error('주문 목록 : 에러', error);
          }
      };
      fetchOrder();
    }, [token]);

  return (
    <Box sx={{ width: '90%', mx:'auto'}}>
       <Table aria-label="simple table" sx={{whiteSpace: "nowrap",}}>
        <TableHead sx={{borderBottom:'2px solid #d1cfcf'}}>
        <TableRow>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                신청 제품
                </Typography>
                </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                가맹점ID
                </Typography> 
                </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                가맹점명
                </Typography>
                </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                사업자명
                </Typography>
                </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                주소
                </Typography>
                </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                연락처
                </Typography>
                </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                개수
                </Typography>
                </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                단가
                </Typography>
                </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                총액
                </Typography>
                </TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {order.map(order => (
            <TableRow key={order.order_id} sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }} >
              <TableCell>
                <Typography variant="h6" align="center">{order.menu_id.menu_name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">{order.franchisee_id.franchiseeId}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">{order.franchisee_id.franchiseeName}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">{order.franchisee_id.owner}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">{order.franchisee_id.address}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">{order.franchisee_id.phoneNumber}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">{order.order_quantity}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">{order.menu_id.menu_origin_price.toLocaleString()} 원</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">{order.order_price.toLocaleString()} 원</Typography>
              </TableCell>
            </TableRow>
          ))}    
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrderList;