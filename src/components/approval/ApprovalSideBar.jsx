import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import ModalPortal from '../../config/ModalPortal';
import FormModal from './FormModal';
import { useNavigate } from 'react-router-dom';

const ApprovalSideBar = ({setApprovalData = null}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const changeForm = (data) => {
    if(setApprovalData !== null){
      setApprovalData(data);
    }
    navigate("/approval/draft/form", {state: { approvalData: data } });
    setModal(false);
  }

  const onModal = () => {
    setModal(!modal);
  }

  return (
    <>
      <Stack>
        <Box sx={{width:"200px"}}>
          <Typography variant='h2'>전자결재</Typography>
          <Box display="flex" alignItems="center" my={2}>
            <Button variant='contained' color='success' sx={{width:"90%", margin:"auto", height:"45px"}} onClick={onModal}>새 결재 진행</Button>
          </Box>
          <Box sx={{marginTop: "20px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold"}}>자주 쓰는 양식</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>휴가 신청</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>업무 기안</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)휴가신청-연차관리연동</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)연장근무신청-근태관리연동</Typography>
          </Box>
          <Box sx={{marginTop: "20px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold"}}>자주 쓰는 양식</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>휴가 신청</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>업무 기안</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)휴가신청-연차관리연동</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)연장근무신청-근태관리연동</Typography>
          </Box>
          <Box sx={{marginTop: "20px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold"}}>자주 쓰는 양식</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>휴가 신청</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>업무 기안</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)휴가신청-연차관리연동</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)연장근무신청-근태관리연동</Typography>
          </Box>
          <Box sx={{marginTop: "20px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold"}}>자주 쓰는 양식</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>휴가 신청</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>업무 기안</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)휴가신청-연차관리연동</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)연장근무신청-근태관리연동</Typography>
          </Box>
        </Box>
      </Stack>
      <ModalPortal>
        {modal && <FormModal onModal={onModal} changeForm={changeForm}/>}
      </ModalPortal>
    </>
  );
};

export default ApprovalSideBar;