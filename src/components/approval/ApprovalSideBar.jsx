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

  const movePage = (category,_title) => {
    navigate(`/approval/draft/list/${category}`,{state : {title: _title}});
  }

  return (
    <>
      <Stack>
        <Box sx={{width:"200px"}}>
          <Typography variant='h2' onClick={() => navigate("/approval/draft")} sx={{marginBottom: "20px", cursor: "pointer",padding: "0 10px 10px 0 "}}>전자결재</Typography>
          <Box display="flex" alignItems="center" my={2}>
            <Button variant='contained' color='success' sx={{width:"90%", margin:"auto", height:"45px"}} onClick={onModal}>새 결재 진행</Button>
          </Box>
          <Box sx={{marginTop: "30px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold", marginBottom: "10px"}}>자주 쓰는 양식</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>휴가 신청</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>업무 기안</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)휴가신청-연차관리연동</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px"}}>(신규)연장근무신청-근태관리연동</Typography>
          </Box>
          <Box sx={{marginTop: "30px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold", marginBottom: "10px"}}>결재함</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px", cursor:"pointer", marginBottom: "5px"}} onClick={() => movePage("todo","결재 대기 문서")}>결대 대기 문서</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px", cursor:"pointer", marginBottom: "5px"}} onClick={() => movePage("schedule","결재 예정 문서")}>결재 예정 문서</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px", cursor:"pointer", marginBottom: "5px"}} onClick={() => movePage("approval","결재 완료 문서")}>결재 완료 문서</Typography>
          </Box>
          <Box sx={{marginTop: "30px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold",  marginBottom: "10px"}}>개인 문서함</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px", cursor:"pointer", marginBottom: "5px"}} onClick={() => movePage("draft","기안 문서")}>기안 문서</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px", cursor:"pointer", marginBottom: "5px"}} onClick={() => movePage("temp","임시 저장 문서")}>임시 저장 문서</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px", cursor:"pointer", marginBottom: "5px"}} onClick={() => movePage("complete","결재 문서")}>결재 문서</Typography>
          </Box>
          <Box sx={{marginTop: "30px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold",  marginBottom: "10px"}}>부서 문서함</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px", cursor:"pointer", marginBottom: "5px"}} onClick={() => movePage("department","부서 기안 문서")}>부서 기안 문서</Typography>
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