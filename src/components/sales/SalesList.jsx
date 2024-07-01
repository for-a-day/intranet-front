import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesList = () => {
    const [sales, setSales] = useState();

    useEffect(()=> {
        const fetchSales = async () => {
            try {
                const response = await axios.get('http://localhost:9001/api/order');
                const salesMap = response.data.data;

                const salesArray = Object.values(salesMap);
                setSales(salesArray);
            } catch (error) {
                console.error('매출 목록 : 에러', error);
            }
        };
        fetchSales();
    }, []);

} 

export default SalesList;