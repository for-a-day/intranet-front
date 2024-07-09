import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Typography, Chip, IconButton, Box, Stack } from '@mui/material';
import { AttachFile} from '@mui/icons-material';
import { styled } from '@mui/system';
import ApprovalSideBar from '../../components/approval/ApprovalSideBar';
import {  Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { _getApprovalList } from '../../modules/redux/approval';

const StyledTableRow = styled(TableRow)({
  height: '36px',
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)"
  }
});

const SubjectTableCell = styled(TableCell)({
  cursor: 'pointer',
  ":hover": {
    fontWeight: 700,
    color: "#fc4b6c"
  }
});

const ApprovalList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {category} = useParams();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const categoryList = ['todo', 'schedule', 'mydraft', 'temp', 'approval', 'department', 'complete'];
  const titleList = {todo: '결대 대기 문서', schedule: '결재 예정 문서', approval: '결재 진행 문서', mydraft: '기안 문서', temp: '임시 저장 문서', complete: '결재 문서'} 
  const [selectedItem, setSelectedItem] = useState(null);
  const {isLoading, error, approvalList = []} = useSelector((state) => state.approval);

  useEffect(() => {
    dispatch(_getApprovalList(category));

    if (isLoading) {
      return <div>로딩중....</div>;
    }
  
    if (error) {
        return <div>{error.message}</div>;
    }
  },[category]);

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const category = pathParts[pathParts.length - 1];
    setSelectedItem(category);
    setTitle(titleList[category]);
  }, [location]);

  if (!categoryList.includes(category)) {
    return <Navigate to="/approval/draft" />;
  }

  const getStatus = (status) => {
    switch (status) {
        case 'C':
            return <Chip label="완료" color="success" size="small" />;
        case 'R':
              return <Chip label="반려" color="warning" size="small" />;
        case 'T':
            return <Chip label="임시" color="error" size="small" />;
        default:
            return <Chip label="진행중" color="primary" size="small" />;
    }
  };

  return (
    <Stack direction="row" spacing={4} sx={{marginLeft: "0", maxWidth: "none", width: "100% !important"}}>
      <ApprovalSideBar />
      <Box sx={{width: "100%"}}>
        <Box sx={{marginBottom:"15px"}}>
          <Typography variant='h2'>{title}</Typography>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <StyledTableRow>
                  <TableCell sx={{width: "15%"}}>기안일</TableCell>
                  <TableCell sx={{width: "17%"}}>결재양식</TableCell>
                  <TableCell sx={{width: "5%", textAlign:"center"}}>긴급</TableCell>
                  <TableCell sx={{width: "34%"}}>제목</TableCell>
                  {/* <TableCell sx={{width: "8%"}}>첨부</TableCell> */}
                  <TableCell sx={{width: "17%"}}>문서번호</TableCell>
                  <TableCell sx={{width: "10%"}}>결재상태</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {approvalList?.map((doc, index) => (
                <StyledTableRow key={index}>
                    <TableCell>{doc?.creationDate?.split("T")[0]}</TableCell>
                    <TableCell>{doc.formName}</TableCell>
                    <TableCell>
                      {doc?.urgency === '1' && <Chip label="긴급" color="error" size="small" />}
                    </TableCell>
                    {doc.status === 'T' ? (
                      <SubjectTableCell onClick={() => navigate(`/approval/draft/revise/${doc.approvalId}`,{state : {category : selectedItem}})}>{doc.subject}</SubjectTableCell>
                    ) : (
                      <SubjectTableCell onClick={() => navigate(`/approval/draft/detail/${doc.approvalId}`,{state : {category : selectedItem}})}>{doc.subject}</SubjectTableCell>
                    )}
                    {/* <TableCell>
                      {doc.fileCount > 0 && <AttachFile sx={{ fontSize: 20 }} />}
                    </TableCell> */}
                    {doc?.docNo !== null && doc.docNo !== undefined? (
                      <TableCell>NG-결재-2024-{String(doc?.docNo).padStart(4, '0')}</TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )}
                    <TableCell>
                      {getStatus(doc.status)}
                    </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};

export default ApprovalList;
