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
            <th style={styles.th}>신청 제품</th>
            <th style={styles.th}>가맹점ID</th>
            <th style={styles.th}>가맹점명</th>
            <th style={styles.th}>사업자명</th>
            <th style={styles.th}>주소</th>
            <th style={styles.th}>연락처</th>
            <th style={styles.th}>개수</th>
            <th style={styles.th}>단가</th>
            <th style={styles.th}>총액</th>
      </tr>
      </thead>
      <tbody>
        {order.map(order => (
          <tr key={order.order_id}>
            <td style={styles.td}>{order.menu_id.menu_name}</td>
            <td style={styles.td}>{order.franchisee_id.franchiseeId}</td>
            <td style={styles.td}>{order.franchisee_id.franchiseeName}</td>
            <td style={styles.td}>{order.franchisee_id.owner}</td>
            <td style={styles.td}>{order.franchisee_id.address}</td>
            <td style={styles.td}>{order.franchisee_id.phoneNumber}</td>
            <td style={styles.td}>{order.order_quantity}</td>
            <td style={styles.td}>{order.menu_id.menu_origin_price}</td>
            <td style={styles.td}>{order.order_price} 원</td>
        </tr>
        ))}    
      </tbody>
      </table>
    </div>
  );
};

export default OrderList;