import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SalesListStyle';

const SalesList = () => {
  const [sales, setSales] = useState([]);

    // 목록
    useEffect(() => {
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
      fetchSales();
    }, []);

  return (
    <div style={styles.container}>
      <table style={styles.table}>
      <thead>
      <tr>
          <th style={styles.th}>가맹점 ID</th>
          <th style={styles.th}>매출년/월</th>
          <th style={styles.th}>월별 매출</th>
      </tr>
      </thead>
      <tbody>
        {sales.map(sales => (
            <tr key={sales.salesId}> 
              <td style={styles.td}>{sales.franchiseeId}</td>
              <td style={styles.td}>{sales.year}년 {sales.month} 월</td>
              <td style={styles.td}>{sales.monthlySales} 원 </td>
            </tr>
        ))}    
      </tbody>
      </table>
    </div>
  );
};

export default SalesList;