import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const MainList = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h3">예시입니다</Typography>
      <Box>
        <TextField
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="Weight"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      </Box>
    </Stack>
  );
};

export default MainList;
