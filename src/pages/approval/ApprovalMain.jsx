import { Box, Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApprovalSideBar from '../../components/approval/ApprovalSideBar';
import { Comment, AttachFile } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { useDispatch } from 'react-redux';
import { _getMainList } from '../../modules/redux/approval';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

const ApprovalMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, error, main = {}} = useSelector((state) => state?.approval);

  useEffect(() => {
    dispatch(_getMainList());

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
      <Box sx={{ width: "100%" }}>
        <Box sx={{marginBottom:"15px"}}>
          <Typography variant='h2'>전자결재 홈</Typography>
        </Box>

        <Box sx={{ width: '100%', overflow: 'visible', paddingTop: 1 }}>
          <Typography variant="h4" sx={{marginBottom: 1}}> 결재 대기 문서 </Typography>
          <Swiper modules={[Navigation, Pagination]} spaceBetween={10} slidesPerView={1} style={{ width: '100%' }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1460: {
                slidesPerView: 4,
                spaceBetween: 10,
              }
            }}
          >
            {main?.main1?.map((item, index) => (
              <SwiperSlide key={index}>
                <Paper
                  sx={{
                    marginTop: 1,
                    padding: 8,
                    textAlign: 'center',
                    position: 'relative',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                > 
                  <Chip
                    label= {item?.list?.urgency === '1' ? "긴급" : "진행중"}
                    color= {item?.list?.urgency === '1' ? "error" :"success"}
                    sx= {{ position: 'absolute', top: 16, left: 16 }}
                  />
                  <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 1 }}>
                  {item?.list?.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    기안자: {item?.employee?.name} {item?.employee?.level}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    기안부서: {item?.employee?.department}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    기안일: {item?.list?.modificationDate?.split("T")[0]}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/approval/draft/detail/${item?.list?.approvalId}`)} sx={{ marginTop: 2, padding: '8px 40px' }}>
                    결재하기
                  </Button>
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" sx={{marginTop: 5 ,marginBottom: 2}}> 진행 중인 기안 문서 </Typography>
          <TableContainer component={Paper}>
            <Table sx={{borderTop: "1px solid rgba(224, 224, 224, 1)"}}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{width: "15%"}}>기안일</TableCell>
                  <TableCell sx={{width: "17%"}}>결재양식</TableCell>
                  <TableCell sx={{width: "5%", textAlign:'center'}}>긴급</TableCell>
                  <TableCell sx={{width: "34%"}}>제목</TableCell>
                  <TableCell sx={{width: "17%"}}>문서번호</TableCell>
                  <TableCell sx={{width: "10%"}}>결재상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {main?.main2?.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{row.modificationDate?.split("T")[0]}</TableCell>
                    <TableCell>{row?.formId?.subject}</TableCell>
                    <TableCell>{row.urgency === '1' ? <Chip label="긴급" color="error" /> : null}</TableCell>
                    <SubjectTableCell onClick={() => navigate(`/approval/draft/detail/${row?.approvalId}`)}>{row.subject}</SubjectTableCell>
                    <TableCell>{row.docNo}</TableCell>
                    <TableCell>
                      <Chip label='진행중' color='primary' />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" sx={{marginTop: 5 , marginBottom: 2}}> 완료된 기안 문서 </Typography>
          <TableContainer component={Paper}>
            <Table sx={{borderTop: "1px solid rgba(224, 224, 224, 1)"}}> 
              <TableHead>
                <TableRow>
                  <TableCell sx={{width: "15%"}}>기안일</TableCell>
                  <TableCell sx={{width: "17%"}}>결재양식</TableCell>
                  <TableCell sx={{width: "5%", textAlign:"center"}}>긴급</TableCell>
                  <TableCell sx={{width: "34%"}}>제목</TableCell>
                  <TableCell sx={{width: "17%"}}>문서번호</TableCell>
                  <TableCell sx={{width: "10%"}}>결재상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {main?.main3?.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{row.modificationDate?.split("T")[0]}</TableCell>
                    <TableCell>{row?.formId?.subject}</TableCell>
                    <TableCell>{row.urgency === '1' ? <Chip label="긴급" color="error" /> : null}</TableCell>
                    <SubjectTableCell onClick={() => navigate(`/approval/draft/detail/${row?.approvalId}`)}>{row.subject}</SubjectTableCell>
                    {row?.docNo !== null && row.docNo !== undefined? (
                      <TableCell>NG-결재-2024-{String(row?.docNo).padStart(4, '0')}</TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )}
                    <TableCell>
                      <Chip label='진행중' color='primary' />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Stack>
  );
};

export default ApprovalMain;