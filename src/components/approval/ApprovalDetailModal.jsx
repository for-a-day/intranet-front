import React from 'react';
import { Box, Button,  Stack,  Typography } from '@mui/material';
import ApprovalDetailInfo from './ApprovalDetailInfo';



const ApprovalDetailModal = ({onModal, participants}) => {
  const [drafter, ...approvers] = participants;
  const drafters = [drafter];

  const selectApprovalInfo = () => {
    onModal(false);
  }

  return (
    <>
      <Box style={{ position: "fixed", width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.40)", zIndex: 1400, top: 0 }}></Box>
      <Box px={4} py={4} sx={{ height: "500px", width: "630px", backgroundColor: "#fff", position: "fixed", left: "50%", top: "50%", zIndex: 1500, transform: "translate(-50%, -50%)" }}>
        <Typography variant='h4' sx={{ fontWeight: "700" }}>결재정보</Typography>
        <Stack spacing={2} mt={4} >
          <ApprovalDetailInfo category="기안자" height={100} employeeList={drafters}/>
          <ApprovalDetailInfo category="결재자" height={290} employeeList={approvers}/>
        </Stack>
        <Box my={2} display="flex" justifyContent="end" width="100%">
          <Button variant='contained' color='success' sx={{ marginRight: "10px", width: "15%" }} onClick={selectApprovalInfo}>확인</Button>
          <Button variant='outlined' color='success' sx={{ width: "15%" }} onClick={onModal}>취소</Button>
        </Box>
      </Box>
    </>
  );
};


export default ApprovalDetailModal;
