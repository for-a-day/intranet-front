import { Grid, Button, Box, AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import ClosingList from "../../components/closing/ClosingList";
import { Add as AddIcon, Store as StoreIcon, Warning as WarningIcon, Close as CloseIcon } from '@mui/icons-material';

const Closing = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: 'rgb(186, 232, 250)' }}>
              <Toolbar>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
                  폐점 관리 
                </Typography>
                <Button color="inherit" href="/franchisee" sx={{ color: 'black', fontWeight: 'bold', margin: '0 5px', borderRadius: '8px' }}>
                  <StoreIcon /> 가맹점
                  </Button>
                  <Button color="inherit" href="/close" sx={{ color: 'black', fontWeight: 'bold', margin: '0 5px', borderRadius: '8px' , backgroundColor: "#59bfcf" }}>
                  <CloseIcon/> 폐점
                  </Button>
                  <Button color="inherit" href="/warn" sx={{ color: 'black', fontWeight: 'bold' }}>
                  <WarningIcon/> 경고 가맹점
                  </Button>
              </Toolbar>
            </AppBar>
          </Box>  
        </Grid>
        <Grid item xs={12}>
          <ClosingList />
        </Grid>
      </Grid>
    );
};

export default Closing;
