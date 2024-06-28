import { Box, Button, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import FormModal from '../../components/approval/FormModal';
import ModalPortal from '../../config/ModalPortal';


const ApprovalWrite = () => {
  const [modal, setModal] = useState(false);
  const [htmls, setHtmls] = useState({
    subject: "양식 폼을 선택해주세요",
    content: "양식 폼을 선택해주세요"
  });

  const changeForm = (data) => {
    setHtmls(data);
    setModal(!modal);
  }

  const onModal = () => {
    setModal(!modal);
  }


  return (
    <Stack direction="row" spacing={4} sx={{marginLeft: "0"}}>
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
      <Stack>
        <Box sx={{marginBottom:"15px"}}>
          <Typography variant='h2'>{htmls.subject}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant='h5'>결재요청</Button>
          <Button variant='h5'>임시저장</Button>
          <Button variant='h5'>미리보기</Button>
          <Button variant='h5'>취소</Button>
          <Button variant='h5'>결재정보</Button>
        </Stack>
        <Box sx={{border: "3px solid gray", padding: "50px", marginTop:"10px", marginBottom:"10px"}}>
          <div>{parse(htmls.content)}</div>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant='h5'>결재요청</Button>
          <Button variant='h5'>임시저장</Button>
          <Button variant='h5'>미리보기</Button>
          <Button variant='h5'>취소</Button>
          <Button variant='h5'>결재정보</Button>
        </Stack>
      </Stack>
      <ModalPortal>
        {modal && <FormModal onModal={onModal} changeForm={changeForm}/>}
       </ModalPortal>
    </Stack>
  )
};

export default ApprovalWrite;