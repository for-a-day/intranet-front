import React, { useState, useEffect } from 'react';
import instance from "../../axiosConfig";
import styles from './NoSalesStyle';

const NoSales = () => {
    const token = localStorage.getItem('token');
   const[noSales, SetNoSales] = useState([]);

    useEffect(() => {
      const fetchNoSales = async () => {
        try {
          const response = await instance.get('/app/store/compare');
          const noSalesMap = response.data.franchiseeIdsNotInSales;
          SetNoSales(noSalesMap);
        } catch (error) {
          console.error('매출 정보 미제출 목록 : 에러', error);
        }
      };
  
      fetchNoSales();
    }, [token]);

  return (
    <div style={styles.salesTableWrapper}>
      <div style={styles.label}>매출정보 미제공 가맹점</div>
      <div style={styles.value}>
        {noSales.map((franchiseeId, index) => (
          <React.Fragment key={index}>
            <span>{franchiseeId}</span>
            {index !== noSales.length - 1 && <span>,&nbsp;</span>} {/* 마지막 요소 뒤에는 쉼표를 추가하지 않음 */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NoSales;
