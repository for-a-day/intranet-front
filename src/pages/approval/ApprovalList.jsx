import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Box, Stack, Pagination, TextField, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import ApprovalSideBar from '../../components/approval/ApprovalSideBar';
import {  Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { _getApprovalList } from '../../modules/redux/approval';

//아이콘
import SearchIcon from '@mui/icons-material/SearchOutlined';

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
  const titleList = {todo: '결재 대기 문서', schedule: '결재 예정 문서', approval: '결재 진행 문서', mydraft: '기안 문서', temp: '임시 저장 문서', complete: '결재 문서'} 
  const [selectedItem, setSelectedItem] = useState(null);
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSelect, setSearchSelect] = useState("전체");
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
    setSearchText("");
    setSearchTerm("");
    setSearchSelect("전체");
    setCurrentPage(1);
  }, [location]);

  //검색 작업
  useEffect(() => {
    setList(approvalList);
  },[approvalList]);

  //검색 작업
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchText);
    }
  };

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
  };

  //셀렉트 박스
  const handelSelect = (e) => {
    setSearchSelect(e.target.value);
    setSearchText("");
    setSearchTerm("");
  }

  const filteredData = list?.filter(item => {
    if(searchSelect === "전체"){
      return item?.subject.toLowerCase().includes(searchTerm?.toLowerCase())
    } else {
      return item?.subject.toLowerCase().includes(searchTerm?.toLowerCase()) && item?.approvalType.includes(searchSelect);
    }
  }); 
  console.log(filteredData);
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const handlePageChange = (event, page) => {
      setCurrentPage(page);
  };

  // 페이지네이션 작업
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem); 

  if (!categoryList.includes(category)) {
    return <Navigate to="/approval/draft" />;
  }

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
    <Stack direction="row" spacing={4} sx={{ marginLeft: "0", maxWidth: "none", width: "100% !important" }}>
  <ApprovalSideBar />
  <Box sx={{ width: "100%", overflowX: "auto"}}>
    <Box sx={{ marginBottom: "10px" }}>
      <Typography variant="h2">{title}</Typography>
      <Stack direction="row" spacing={2} mt={2} mb={0} justifyContent="flex-end" sx={{marginRight:"5%", minWidth: "970px"}}>
        {category === 'mydraft' ? (
          <FormControl sx={{ width: '10%', height: '34.25px', minWidth:"120px" }}>
            <InputLabel id="approval-select-label">결재상태</InputLabel>
            <Select
              labelId="approval-select-label"
              id="approval-select"
              value={searchSelect}
              label="결재상태"
              onChange={handelSelect}
              sx={{ height: '100%', fontSize: '14px'}}
            >
              <MenuItem value="전체" sx={{ fontSize: '14px' }}>전체</MenuItem>
              <MenuItem value="진행중" sx={{ fontSize: '14px' }}>진행중</MenuItem>
              <MenuItem value="완료" sx={{ fontSize: '14px' }}>완료</MenuItem>
              <MenuItem value="반려" sx={{ fontSize: '14px' }}>반려</MenuItem>
            </Select>
          </FormControl>
        ) : (
          null
        )}
        <TextField
          type='text'
          sx={{ fontSize: "0.75rem", width: '20%', height: '40px', minWidth:'260px'}}
          placeholder='문서제목'
          size='small'
          value={searchText}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchText(e.target.value)}
          InputLabelProps={{ sx: { fontSize: "0.75rem" } }}
          InputProps={{
            sx: { fontSize: "0.75rem" },
            endAdornment: (
              <InputAdornment position="end" sx={{ padding: 0 }}>
                <Button sx={{ minWidth: 0, padding: 0, width: '40px', height: '40px', marginRight: '-12px' }} onClick={() => handleSearch(searchText)}>
                  <SearchIcon />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Box>
    <TableContainer sx={{ minWidth: "1000px", overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <StyledTableRow>
            <TableCell sx={{ width: "15%" }}>기안일</TableCell>
            <TableCell sx={{ width: "17%" }}>결재양식</TableCell>
            <TableCell sx={{ width: "5%", textAlign: "center" , minWidth:"37px" }}>긴급</TableCell>
            <TableCell sx={{ width: "34%" }}>제목</TableCell>
            {/* <TableCell sx={{width: "8%"}}>첨부</TableCell> */}
            <TableCell sx={{ width: "17%" }}>문서번호</TableCell>
            <TableCell sx={{ width: "10%" }}>결재상태</TableCell>
          </StyledTableRow>
        </TableHead>
        {filteredData?.length !== 0 ? (
          <TableBody>
            {currentItems?.map((doc, index) => (
              <StyledTableRow key={index}>
                <TableCell>{doc?.creationDate !== null ? doc?.creationDate?.split("T")[0] : doc?.modificationDate?.split("T")[0]}</TableCell>
                <TableCell>{doc.formName}</TableCell>
                <TableCell>
                  {doc?.urgency === '1' && <Chip label="긴급" color="error" size="small" />}
                </TableCell>
                {doc.status === 'T' ? (
                  <SubjectTableCell onClick={() => navigate(`/approval/draft/revise/${doc.approvalId}`, { state: { category: selectedItem } })}>{doc.subject}</SubjectTableCell>
                ) : (
                  <SubjectTableCell onClick={() => navigate(`/approval/draft/detail/${doc.approvalId}`, { state: { category: selectedItem } })}>{doc.subject}</SubjectTableCell>
                )}
                {/* <TableCell>
                  {doc.fileCount > 0 && <AttachFile sx={{ fontSize: 20 }} />}
                </TableCell> */}
                {doc?.docNo !== null && doc.docNo !== undefined ? (
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
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: 'center', padding: '20px', borderBottom: 'none', fontSize: '16px' }}>결재 문서가 없습니다</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        count={Math.ceil(filteredData?.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  </Box>
</Stack>
  );
};

export default ApprovalList;
