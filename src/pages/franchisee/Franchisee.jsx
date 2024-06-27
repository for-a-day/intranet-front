import { Box, Stack, Typography, Grid } from "@mui/material";
import React from "react";
import FranchiseeList from "../../components/franchisee/FranchiseeList";


const Franchisee = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={6} lg={12}>
        <FranchiseeList />
      </Grid>
    </Grid>
  );
};

export default Franchisee;