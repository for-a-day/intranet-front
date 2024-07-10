import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { _getMyDraft } from "../../modules/redux/approval";

const StyledTableRow = styled(TableRow)({
  height: "36px",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

const SubjectTableCell = styled(TableCell)({
  maxWidth: '150px', 
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  ":hover": {
    fontWeight: 700,
    color: "#fc4b6c",
  },
});

const MainApproval = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, mydraft = [] } = useSelector((state) => state?.approval);

  useEffect(() => {
    dispatch(_getMyDraft());

    if (isLoading) {
      return <div>로딩중....</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }
  }, []);

  const getStatus = (status) => {
    switch (status) {
        case 'C':
            return <Chip label="완료"  size="small" sx={{width:"50%", minWidth: "60px"}} />;
        case 'R':
              return <Chip label="반려" color='warning' size="small" sx={{color: "#fff", width:"50%" , minWidth: "60px"}}/>;
        case 'T':
            return <Chip label="임시" color="primary" size="small" sx={{width:"50%" , minWidth: "60px"}}/>;
        default:
            return <Chip label="진행중" color="success" size="small" sx={{width:"50%", minWidth: "60px"}}/>;
    }
  };

  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ marginLeft: "0", maxWidth: "none", width: "100% !important" }}
    >
      <Box sx={{ width: "100%", overflowX: "auto"}}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" component="div" sx={{ mb: 1, mt: 3, ml: 3, fontWeight: "600" }}>
            전자결재
          </Typography>
          <Button variant="h5" component="div" onClick={() => navigate("/approval/draft/list/mydraft")} sx={{pb:0, pt:0, mb:0, mt:2, mr: 3, fontWeight: "600", color:"primary.main" }}>
            더보기
          </Button>
        </Stack>
        <TableContainer>
          <Table size="large">
            <TableHead>
              <StyledTableRow>
                <TableCell sx={{ width: "15%" }}>기안일</TableCell>
                <TableCell sx={{ width: "17%" }}>결재양식</TableCell>
                <TableCell sx={{ width: "5%", textAlign: "center", minWidth:"37px" }}>긴급</TableCell>
                <TableCell sx={{ width: "34%" }}>제목</TableCell>
                <TableCell sx={{ width: "10%" }}>결재상태</TableCell>
              </StyledTableRow>
            </TableHead>
            {mydraft?.length !== 0 ? (
              <TableBody>
                {mydraft?.map((doc, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{doc?.creationDate !== null ? doc?.creationDate?.split("T")[0] : doc?.modificationDate?.split("T")[0]}</TableCell>
                    <TableCell sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px'}}>{doc?.formId?.subject}</TableCell>
                    <TableCell>
                      {doc?.urgency === '1' && <Chip label="긴급" color="error" size="small" />}
                    </TableCell>
                      <SubjectTableCell onClick={() => navigate(`/approval/draft/detail/${doc.approvalId}`,{ state: { history: "/approval/draft/list/mydraft" }})}>{doc.subject}</SubjectTableCell>
                    <TableCell>
                      {getStatus(doc.status)}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', padding: '20px', borderBottom: 'none', fontSize: '16px' }}>결재 문서가 없습니다</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};

export default MainApproval;
