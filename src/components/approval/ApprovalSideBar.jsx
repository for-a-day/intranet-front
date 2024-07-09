import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalPortal from '../../config/ModalPortal';
import FormModal from './FormModal';
import { useLocation, useNavigate } from 'react-router-dom';

const ApprovalSideBar = ({setApprovalData = null, _category = ""}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);

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


  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const category = pathParts[pathParts.length - 1];
    setSelectedItem(category);
    if(_category !== ""){
      setSelectedItem(_category);
    }
  }, [location]);

  const handleItemClick = (item) => {
    navigate(`/approval/draft/list/${item.category}`);
  };

  const menuItems = [
    { type: "todo", label: "결대 대기 문서", category: "todo" },
    { type: "schedule", label: "결재 예정 문서", category: "schedule" },
    { type: "approval", label: "결재 진행 문서", category: "approval" },
    { type: "mydraft", label: "기안 문서", category: "mydraft" },
    { type: "temp", label: "임시 저장 문서", category: "temp" },
    { type: "complete", label: "결재 문서", category: "complete" }
  ];

  return (
    <>
      <Stack>
        <Box sx={{width:"200px"}}>
          <Typography variant='h2' onClick={() => navigate("/approval/draft")} sx={{marginBottom: "20px", cursor: "pointer",padding: "0 10px 10px 0 "}}>전자결재</Typography>
          <Box display="flex" alignItems="center" my={2}>
            <Button variant='contained' color='success' sx={{width:"100%", margin:"auto", height:"45px"}} onClick={onModal}>새 결재 진행</Button>
          </Box>
          <Box sx={{marginTop: "30px"}}>
            <Typography variant='h4' sx={{fontWeight:"bold", marginBottom: "10px"}}>결재함</Typography>
            {menuItems.slice(0, 3).map(item => (
              <Typography
                key={item.category}
                variant='h6'
                sx={{
                  cursor:"pointer",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  padding: "10px 0 10px 15px",
                  backgroundColor: selectedItem === item.category ? 'rgb(186, 232, 250)' : 'transparent' 
                }}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
          <Box sx={{marginTop: "30px"}}>
            <Typography variant='h4' sx={{fontWeight:"bold",  marginBottom: "10px"}}>개인 문서함</Typography>
            {menuItems.slice(3).map(item => (
              <Typography
                key={item.category}
                variant='h6'
                sx={{
                  cursor:"pointer",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  padding: "10px 0 10px 15px",
                  backgroundColor: selectedItem === item.category ? 'rgb(186, 232, 250)' : 'transparent' 
                }}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
          {/* <Box sx={{marginTop: "30px"}}>
            <Typography variant='h5' sx={{fontWeight:"bold",  marginBottom: "10px"}}>부서 문서함</Typography>
            <Typography variant='h6' sx={{marginLeft:"15px", cursor:"pointer", marginBottom: "5px"}} onClick={() => movePage("department","부서 기안 문서")}>부서 기안 문서</Typography>
          </Box> */}
        </Box>
      </Stack>
      <ModalPortal>
        {modal && <FormModal onModal={onModal} changeForm={changeForm}/>}
      </ModalPortal>
    </>
  );
};

export default ApprovalSideBar;