import React, { useEffect } from 'react';
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
  const title = location?.state?.title || "";
  const categoryList = ['todo', 'schedule', 'draft', 'temp', 'approval', 'department', 'complete'];
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

  if (!categoryList.includes(category)) {
    return <Navigate to="/approval/draft/form" />;
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
  }

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
                  <TableCell padding="checkbox" sx={{width: "1% !important"}}><Checkbox /></TableCell>
                  <TableCell sx={{width: "10%"}}>기안일</TableCell>
                  <TableCell sx={{width: "20%"}}>결재양식</TableCell>
                  <TableCell sx={{width: "5%"}}>긴급</TableCell>
                  <TableCell sx={{width: "25%"}}>제목</TableCell>
                  <TableCell sx={{width: "8%"}}>첨부</TableCell>
                  <TableCell sx={{width: "15%"}}>문서번호</TableCell>
                  <TableCell sx={{width: "10%"}}>결재상태</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {approvalList?.map((doc, index) => (
                <StyledTableRow key={index}>
                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                    <TableCell>{doc?.creationDate?.split("T")[0]}</TableCell>
                    <TableCell>{doc.formName}</TableCell>
                    <TableCell>
                      {doc.urgency && <Chip label="긴급" color="error" size="small" />}
                    </TableCell>
                    {doc.status === 'T' ? (
                      <SubjectTableCell onClick={() => navigate(`/approval/draft/revise/${doc.approvalId}`)}>{doc.subject}</SubjectTableCell>
                    ) : (
                      <SubjectTableCell onClick={() => navigate(`/approval/draft/detail/${doc.approvalId}`)}>{doc.subject}</SubjectTableCell>
                    )}
                    <TableCell>
                      {doc.fileCount > 0 && <AttachFile sx={{ fontSize: 20 }} />}
                    </TableCell>
                    <TableCell>{doc.formName}-{doc.approvalId}</TableCell>
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
