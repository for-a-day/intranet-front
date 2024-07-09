import React, { useState, useEffect } from 'react';
import styles from './SalesListStyle';
import instance from "../../axiosConfig";

const SalesList = () => {
  const token = localStorage.getItem('token');
  const [sales, setSales] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await instance.get('/app/sales');
        const salesMap = response.data.data;
        const saleArray = Object.values(salesMap);
        setSales(saleArray);
      } catch (error) {
        console.error('매출 목록 : 에러', error);
      }
    };
    fetchSales();
  }, [token]);

  useEffect(() => {
    // Function to calculate monthly sales data
    const calculateMonthlyData = () => {
      const monthlySalesData = {};

      // Group sales data by month
      sales.forEach(sale => {
        const { year, month, monthlySales: saleAmount } = sale;
        const key = `${year}-${month}`;

        if (!monthlySalesData[key]) {
          monthlySalesData[key] = {
            year,
            month,
            sales: [],
          };
        }

        monthlySalesData[key].sales.push(saleAmount);
      });

      // Calculate highest and lowest for each month
      const monthlyDataArray = Object.keys(monthlySalesData).map(key => {
        const monthSales = monthlySalesData[key].sales;
        const highest = Math.max(...monthSales);
        const lowest = Math.min(...monthSales);

        return {
          year: monthlySalesData[key].year,
          month: monthlySalesData[key].month,
          highest,
          lowest,
        };
      });

      // Sort monthly data by year and month (ascending order)
      monthlyDataArray.sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        } else {
          return a.month - b.month;
        }
      });

      setMonthlyData(monthlyDataArray);
    };

    calculateMonthlyData();
  }, [sales]);

  // Function to render sales data for a specific year and month
  const renderSalesForYearMonth = (year, month) => {
    const filteredSales = sales.filter(sale => sale.year === year && sale.month === month);
    

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>매출년/월</th>
            <th style={styles.th}>가맹점ID</th>
            <th style={styles.th}>가맹점명</th>
            <th style={styles.th}>사업자명</th>
            <th style={styles.th}>주소</th>
            <th style={styles.th}>연락처</th>
            <th style={styles.th}>월별 매출</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map(sale => {
              const monthlyInfo = monthlyData.find(data => data.year === sale.year && data.month === sale.month);
              return(
                <tr key={sale.salesId}>
                  <td style={styles.td}>{`${sale.year}년 ${sale.month}월`}</td>
                  <td style={styles.td}>{sale.franchiseeId.franchiseeId}</td>
                  <td style={{
                    ...styles.td,
                    ...(sale.monthlySales === monthlyData.find(data => data.year === sale.year && data.month === sale.month)?.highest ? styles.highest : {}),
                    ...(sale.monthlySales === monthlyData.find(data => data.year === sale.year && data.month === sale.month)?.lowest ? styles.lowest : {}),
                    ...(monthlyInfo && monthlyInfo.highest === monthlyInfo.lowest ? { color: 'black' } : {}),
                  }}>
                    {sale.franchiseeId.franchiseeName}
                  </td>
                  <td style={styles.td}>{sale.franchiseeId.owner}</td>
                  <td style={styles.td}>{sale.franchiseeId.address}</td>
                  <td style={styles.td}>{sale.franchiseeId.phoneNumber}</td>
                  <td style={styles.td}>{`${sale.monthlySales.toLocaleString()} 원`}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.container}>
      {monthlyData.map(monthly => (
        <div key={`${monthly.year}-${monthly.month}`}>
          <h3>{`${monthly.year}년 ${monthly.month}월`}</h3>
          {renderSalesForYearMonth(monthly.year, monthly.month)}
        </div>
      ))}
    </div>
  );
};

export default SalesList;
