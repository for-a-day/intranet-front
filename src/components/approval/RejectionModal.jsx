import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

const RejectionModal = ({onModal, reason}) => {
  return (
    <>
      <Box style={{ position: "fixed", width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.40)", zIndex: 1400, top: 0 }}></Box>
      <Box px={4} py={4} sx={{ height: "250px", width: "350px", backgroundColor: "#fff", position: "fixed", left: "50%", top: "50%", zIndex: 1500, transform: "translate(-50%, -50%)" }}>
      <Typography variant='h4' sx={{ fontWeight: "700" }}>반려사유</Typography>
        <Stack spacing={2} mt={4} sx={{height: "140px", maxHeight: "140px"}} >
          <Typography variant='body1'>{reason}</Typography>
        </Stack>
        <Box my={2} display="flex" justifyContent="end" width="100%">
          <Button variant='contained' color='success' sx={{ marginRight: "10px", width: "15%" }} onClick={onModal}>확인</Button>
          <Button variant='outlined' color='success' sx={{ width: "15%" }} onClick={onModal}>취소</Button>
        </Box>
      </Box>
    </>
  );
};

export default RejectionModal;