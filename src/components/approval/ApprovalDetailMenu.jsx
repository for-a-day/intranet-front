import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApprovalDetailMenu = ({type, backHistory = null}) => {
  const navigate = useNavigate();
  const backHistoryClick = () => {
    console.log(backHistory)
    if(backHistory === null){
      navigate(-1);
    } else {
      navigate(backHistory);
    }
  }

  return (
    <>
      {type === "기안" ?(
        <Stack direction="row" spacing={1}>
          <Button variant='h5'>상신취소</Button>
          <Button variant='h5'>결재정보</Button>
          <Button variant='h5' onClick={backHistoryClick}>목록</Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1}>
          <Button variant='h5'>결재</Button>
          <Button variant='h5'>반려</Button>
          <Button variant='h5'>결재정보</Button>
          <Button variant='h5' onClick={backHistoryClick}>목록</Button>
        </Stack>
      )}
    </>
  );
};

export default ApprovalDetailMenu;