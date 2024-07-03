import { Grid, Button, Box, AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import SalesList from "../../components/sales/SalesList";

const Sales = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
            매출 관리 목록(기획부)
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <SalesList />
      </Grid>
    );
};


export default Sales;