import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, Collapse, InputAdornment, List, ListItem, ListItemIcon, ListItemText,  Stack, TextField, Typography } from '@mui/material';
import { Folder, Search as SearchIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import ApprovalInfoModal from './ApprovalInfoModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { _getEmployeeList } from '../../modules/redux/approval';



const ApprovalModal = ({onModal, setApprovalInfo, approvalInfo, htmlApproveSetting}) => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState(approvalInfo || []);
  const [storageData, setStorageData] = useState([
    { departmentCode: 1, departmentName: '샘플' },
  ]);
  const [openSample, setOpenSample] = useState(true);
  const [openStorage, setOpenStorage] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {isLoading, error, employee = {}} = useSelector((state) => state.approval);
  useEffect(() => {
    dispatch(_getEmployeeList());
  },[]);

  useEffect(() => {
    if (!isLoading && !error && employee.departments) {
      setStorageData(employee.departments);

      const initialOpenStorage = {};
      employee.departments.forEach(item => {
        initialOpenStorage[item.departmentCode] = true;
      });
      setOpenStorage(initialOpenStorage);
      setEmployeeData(employee.employees);
    }
  }, [isLoading, error, employee]);

  if (isLoading) {
    return <div>로딩중....</div>;
  }

  if (error) {
      return <div>{error.message}</div>;
  }

  //사원 정보 저장
  const employeeList = employeeData.map((employee) => {
    let updatedEmployee = { ...employee, selectStatus: false };
    
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].employeeId === employee.employeeId) {
        updatedEmployee = { ...employee, selectStatus: true };
        break;
      }
    }
    
    return updatedEmployee;
  });

  //검색어를 기준으로 데이터를 필터링
  const filteredData = employeeList?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 검색 기능 구현 예정
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickSample = () => {
    setOpenSample(!openSample);
  };

  const handleClickStorage = (storageId) => {
    setOpenStorage((prevState) => ({
      ...prevState,
      [storageId]: !prevState[storageId],
    }));
  };

  const changeData = (form) => {
    if(datas.length > 4){
      alert("결재자는 최대 5명까지 지정할 수 있습니다.");
      return;
    } else {
      if (!datas.some((data) => data.employeeId === form.employeeId)) {
        setDatas([...datas, {...form, selectStatus: true}]);
      }
  
      const updatedFilteredData = filteredData.map((item) =>
        item.employeeId === form.employeeId ? { ...item, selectStatus: true } : item
      );
      setEmployeeData(updatedFilteredData);
    }
  };

  const moveFormItem = (sourceIndex, destinationIndex) => {
    const updatedData = Array.from(datas);
    const [movedItem] = updatedData.splice(sourceIndex, 1);
    updatedData.splice(destinationIndex, 0, movedItem);

    setDatas(updatedData);
  };

  const onRemove = (id) => {
    setDatas((prevData) => prevData.filter((item) => item.employeeId !== id));
    const updatedFilteredData = filteredData.map((item) =>
      item.employeeId === id ? { ...item, selectStatus: false } : item
    );
    setEmployeeData(updatedFilteredData);
  };

  const selectApprovalInfo = () => {
    const updatedData = datas.map((data,index) => {
      return { ...data, seq: index+1, type: "결재", status: "대기" }; 
    });
    setApprovalInfo(updatedData);
    htmlApproveSetting(updatedData);
    onModal(false);
  }

  return (
    <>
      <Box style={{ position: "fixed", width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.40)", zIndex: 1400, top: 0 }}></Box>
      <Box px={4} py={4} sx={{ height: "500px", width: "630px", backgroundColor: "#fff", position: "fixed", left: "50%", top: "50%", zIndex: 1500, transform: "translate(-50%, -50%)" }}>
        <Typography variant='h4' sx={{ fontWeight: "700" }}>결재정보</Typography>
        <Stack direction="row" spacing={2} mt={8} >
          <Box sx={{ border: "1px solid #ddd" }} width={280} height={360}>
            <Box display="flex" alignItems="center" justifyContent="center" height="15%" sx={{ borderBottom: "1px solid #ddd" }}>
              <Box width="90%">
                <TextField type='text' sx={{ fontSize: "0.75rem", width: "100%" }} placeholder='직급/이름' size='small' InputLabelProps={{ sx: { fontSize: "0.75rem" } }} onKeyUp={handleSearch} InputProps={{
                  sx: { fontSize: "0.75rem" },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ padding: 0 }}>
                      <Button sx={{ minWidth: 0, padding: 0, width: '40px', height: '40px', marginRight: '-12px' }}><SearchIcon /></Button>
                    </InputAdornment>
                  ),
                }} />
              </Box>
            </Box>
            <Box sx={{ height: "80%", flexGrow: 1, maxWidth: 400, overflowY: 'auto', padding: '10px' }}>
              <List component="nav">
                <ListItem button onClick={handleClickSample}>
                  <ListItemIcon>
                    <Folder fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>부서</Typography>} />
                  {openSample ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSample} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {storageData?.map((storage, _index) => (
                      <div key={_index + 1000}>
                        <ListItem button onClick={() => handleClickStorage(storage.departmentCode)} sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <Folder fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{storage.departmentName}</Typography>
                            }
                          />
                          {openStorage[storage.departmentCode] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                        </ListItem>
                        <Collapse in={openStorage[storage.departmentCode]} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {filteredData.filter((form) => form.department === storage.departmentName)
                              .map((form, index) => (
                                <ListItem sx={{ pl: 8, paddingTop: '2px', paddingBottom: '2px' }} key={index} >
                                  <ListItemText
                                    primary={
                                      <Box display="flex" alignItems="center">
                                        {!form.selectStatus ?(
                                          <Chip label={form.level} color="success" size="small" sx={{ fontSize: '0.75rem', marginRight: '1rem' }} />
                                        ) : (
                                          <Chip label={form.level} size="small" sx={{ fontSize: '0.75rem', marginRight: '1rem' }} />
                                        )}
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', height: "20px", lineHeight:"20px" }}>
                                          {form.name}
                                        </Typography>
                                      </Box>
                                    }
                                  />
                                  {!form.selectStatus ?(
                                    <Button onClick={() => changeData(form)} sx={{ minWidth: '40px', minHeight: '40px', fontSize: '1.5rem', lineHeight: 'normal', padding: 0}}>+</Button>
                                  ) : (
                                    <Button onClick={() => onRemove(form.employeeId)} sx={{ minWidth: '40px', minHeight: '40px', fontSize: '1.5rem', lineHeight: 'normal', padding: 0}}>-</Button>
                                  )}
                                  
                                </ListItem>
                              ))}
                          </List>
                        </Collapse>
                      </div>
                    ))}
                  </List>
                </Collapse>
              </List>
            </Box>
          </Box>
          <ApprovalInfoModal data={datas} moveFormItem={moveFormItem} onRemove={onRemove} />
        </Stack>
        <Box my={2} display="flex" justifyContent="end" width="100%">
          <Button variant='contained' color='success' sx={{ marginRight: "10px", width: "15%" }} onClick={selectApprovalInfo}>확인</Button>
          <Button variant='outlined' color='success' sx={{ width: "15%" }} onClick={onModal}>취소</Button>
        </Box>
      </Box>
    </>
  );
};


export default ApprovalModal;
