import React, { useState, useEffect } from 'react';
import styles from './SalesListStyle';
import instance from "../../axiosConfig";
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
      <Box sx={{ width: '90%', mx:'auto'}}>
       <Table aria-label="simple table" sx={{ whiteSpace: "nowrap" }}>
        <TableHead sx={{borderBottom:'2px solid #d1cfcf'}}>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" fontWeight='bold' variant="h6" align="center">매출년/월</Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" fontWeight='bold' variant="h6" align="center">가맹점ID</Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" fontWeight='bold' variant="h6" align="center">가맹점명</Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" fontWeight='bold' variant="h6" align="center">사업자명</Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" fontWeight='bold' variant="h6" align="center">주소</Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" fontWeight='bold' variant="h6" align="center">연락처</Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" fontWeight='bold' variant="h6" align="center">월별 매출</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSales.map(sale => {
              const monthlyInfo = monthlyData.find(data => data.year === sale.year && data.month === sale.month);
              return(
                <TableRow key={sale.salesId} sx={{ cursor: "pointer","&:hover": { backgroundColor: "#f5f5f5" }}} >
                  <TableCell>
                    <Typography variant="h6" align="center">{`${sale.year}년 ${sale.month}월`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="#1C1C1C" fontWeight='bold' variant="h6" align="center">{sale.franchiseeId.franchiseeId}</Typography>
                  </TableCell>
                  <TableCell >
                    <Typography variant="h6" align="center" style={{
                      ...(sale.monthlySales === monthlyData.find(data => data.year === sale.year && data.month === sale.month)?.highest ? styles.highest : {}),
                      ...(sale.monthlySales === monthlyData.find(data => data.year === sale.year && data.month === sale.month)?.lowest ? styles.lowest : {}),
                      ...(monthlyInfo && monthlyInfo.highest === monthlyInfo.lowest ? { color: 'black' } : {}),
                    }}>
                      {sale.franchiseeId.franchiseeName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6" align="center">{sale.franchiseeId.owner}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6" align="center">{sale.franchiseeId.address}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6" align="center">{sale.franchiseeId.phoneNumber}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="#1C1C1C" fontWeight='bold' variant="h6" align="center">{`${sale.monthlySales.toLocaleString()} 원`}</Typography>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </Box>  
    );
  };

  return (
    <Box sx={{ width: '90%', mx:'auto'}}>
      {monthlyData.map(monthly => (
        <Box key={`${monthly.year}-${monthly.month}`}>
        <Box sx={{ pt: 4, pl: 8, pb: 1 }}>
          <Typography color="textSecondary" variant="h3" align="left" fontWeight="bold" color='black'>
            {`${monthly.year}년 ${monthly.month}월`}
          </Typography>
        </Box>
        <Box>
          {renderSalesForYearMonth(monthly.year, monthly.month)}
        </Box>  
        </Box>
      ))}
    </Box>
  );
};

export default SalesList;
