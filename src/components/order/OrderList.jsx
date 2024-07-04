import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderListStyle';

const OrderList = () => {
  const [order, setOrder] = useState([]);

    // 목록
    useEffect(() => {
      const fetchOrder = async () => {
          try {
              const response = await axios.get('http://localhost:9000/app/order');
              const orderMap = response.data.data;

              const orderArray = Object.values(orderMap);
              setOrder(orderArray);
          } catch (error) {
              console.error('주문 목록 : 에러', error);
          }
      };
      fetchOrder();
    }, []);

  return (
    <div style={styles.container}>
      <table style={styles.table}>
      <thead>
      <tr>
          <th style={styles.th}></th>
          <th style={styles.th}>가맹점 ID</th>
          <th style={styles.th}>메뉴 ID</th>
          <th style={styles.th}>주문량</th>
          <th style={styles.th}>주문 날짜</th>
          <th style={styles.th}>총 가격</th>
      </tr>
      </thead>
      <tbody>
        {order.map(order => (
            <tr key={order.orderId}> 
              <td style={styles.td}>{order.order_id}</td>
              <td style={styles.td}>{order.franchisee_id}</td>
              <td style={styles.td}>{order.menu_id}</td>
              <td style={styles.td}>{order.order_quantity}</td>
              <td style={styles.td}>{order.order_date}</td>
              <td style={styles.td}>{order.order_price} 원</td>
            </tr>
        ))}    
      </tbody>
      </table>
    </div>
  );
};

export default OrderList;