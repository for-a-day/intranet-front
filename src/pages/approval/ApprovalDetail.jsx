import { Box, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { _getApprovalDetail } from '../../modules/redux/approval';
import ApprovalSideBar from '../../components/approval/ApprovalSideBar';
import ApprovalDetailMenu from '../../components/approval/ApprovalDetailMenu';


const ApprovalDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [backHistory, setBackHistory] = useState(location.state?.history || null);
  const {id} = useParams();
  const {isLoading, error, approval = {}} = useSelector((state) => state.approval);

  useEffect(() => {
    dispatch(_getApprovalDetail(id));

    if (isLoading) {
      return <div>로딩중....</div>;
    }
  
    if (error) {
        return <div>{error.message}</div>;
    }
  },[]);



  return (
    <Stack direction="row" spacing={4} sx={{marginLeft: "0"}}>
      <ApprovalSideBar />
      <Stack>
        <Box sx={{marginBottom:"15px"}}>
          <Typography variant='h2'>{approval.subject}</Typography>
        </Box>
        <ApprovalDetailMenu type={approval.approvalType} backHistory={backHistory}/>
        <Box sx={{border: "3px solid gray", padding: "50px", marginTop:"10px", marginBottom:"10px"}}>
          <div>{parse(approval.docBody || "")}</div>
        </Box>
        <ApprovalDetailMenu type={approval.approvalType} backHistory={backHistory}/>
      </Stack>
    </Stack>
  )
};

export default ApprovalDetail;