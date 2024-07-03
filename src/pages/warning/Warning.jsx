import { Grid, Button, Box, AppBar, Toolbar, Typography } from "@mui/material";
import WarningList from "../../components/warning/WarningList";

const Warning = () => { 

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: '#81BEF7' }}>
              <Toolbar>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
                  폐점 관리 
                </Typography>
                <Button color="inherit" href="/franchisee" sx={{ color: 'black', fontWeight: 'bold' }}>
                  가맹점
                </Button>
                <Button color="inherit" href="/close" sx={{ color: 'black', fontWeight: 'bold' }}>
                  폐점
                </Button>
                <Button color="inherit" href="/warn" sx={{ color: 'black', fontWeight: 'bold' }}>
                  경고 가맹점
                </Button>
              </Toolbar>
            </AppBar>
          </Box>  
        </Grid>
        <Grid item xs={12}>
          <WarningList />
        </Grid>
      </Grid>
    );
};

export default Warning;
