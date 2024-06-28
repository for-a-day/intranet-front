import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const FormDetail = ({data}) => {
  console.log(data);
  return (
    <Stack spacing={3} sx={{border: "1px solid #ddd"}} width={330} height={360}>
      <Box height="15%" display="flex" alignItems="center" sx={{backgroundColor:"#ddd", paddingLeft: "3%"}}>
        <Typography variant='h5'>상세정보</Typography>
      </Box>
      <Stack direction="row" height="10%" sx={{paddingLeft: "3%"}}>
        <Typography width="28%" variant='body2'>제목</Typography>
        <Typography variant='body2'>{data.subject}</Typography>
      </Stack>
      <Stack direction="row" height="10%" sx={{paddingLeft: "3%"}}>
        <Typography width="28%" variant='body2'>카테고리</Typography>
        <Typography variant='body2'>{data.storageName}</Typography>
      </Stack>
      <Stack direction="row" height="10%" sx={{paddingLeft: "3%"}}>
        <Typography width="28%" variant='body2'>보존연한</Typography>
        <Typography variant='body2'>5년</Typography>
      </Stack>
    </Stack>
  );
};

export default FormDetail;