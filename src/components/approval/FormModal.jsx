import { Box, Button, Collapse, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import React, {  useEffect, useState } from 'react';
import { ExpandLess, ExpandMore, Folder, InsertDriveFile } from '@mui/icons-material';
import FormDetail from './FormDetail';
import { useDispatch, useSelector } from 'react-redux';
import { _getFormList } from '../../modules/redux/approval';

const FormModal = ({onModal, changeForm}) => {
  const dispatch = useDispatch();

  const [openStorage, setOpenStorage] = useState({});
  const [openSample, setOpenSample] = useState(true);
  const [storageData, setStorageData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [datas, setDatas] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const {isLoading, error, data = {}} = useSelector((state) => state.approval);

  useEffect(() => {
      dispatch(_getFormList());
  },[dispatch]);

  useEffect(() => {
    if (!isLoading && !error && data.storageList) {
      setStorageData(data.storageList);

      const initialOpenStorage = {};
      data.storageList.forEach(item => {
        initialOpenStorage[item.storageId] = true;
      });
      setOpenStorage(initialOpenStorage);
    }
  }, [isLoading, error, data]);

  
  if (isLoading) {
    return <div>로딩중....</div>;
  }

  if (error) {
      return <div>{error.message}</div>;
  }

  // 검색어가 변경될 때 호출되는 핸들러
  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
  };
  
  //양식 폼 저장
  const formData = data?.formList || [];

  // 검색어를 기준으로 데이터를 필터링
  const filteredData = formData?.filter(item =>
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickStorage = (storageId) => {
    setOpenStorage((prevState) => ({
      ...prevState,
      [storageId]: !prevState[storageId],
    }));
  };

  const handleClickSample = () => {
    setOpenSample(!openSample);
  };

  const changeData = (newData) => {
    setDatas(newData);
    setSelectedItem(newData.subject);
  };
  
  return (
    <>
      <Box style={{position: "fixed", width:"100%", height:"100%", background:"rgba(0, 0, 0, 0.40)", zIndex:1400, top:0}}></Box>
      <Box px={4} py={4} sx={{height:"500px", width: "630px", backgroundColor:"#fff", position: "fixed", left: "50%", top: "50%", zIndex: 1500, transform: "translate(-50%, -50%)"}}>
        <Typography variant='h4' sx={{fontWeight: "700"}}>결재양식 선택</Typography>
        <Stack direction="row" spacing={2} mt={8} >
          <Box sx={{border: "1px solid #ddd"}} width={280} height={360}>
            <Box display="flex" alignItems="center" justifyContent="center" height="15%" sx={{borderBottom: "1px solid #ddd"}}>
              <Box width="90%">
                <TextField type='text' sx={{fontSize:"0.75rem", width:"100%"}} placeholder='양식제목' size='small' InputLabelProps={{ sx: { fontSize: "0.75rem" }}} onKeyUp={handleSearch} InputProps={{
                  sx: { fontSize: "0.75rem" },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ padding: 0 }}>
                      <Button sx={{ minWidth: 0, padding: 0, width: '40px', height: '40px', marginRight: '-12px' }}><SearchIcon /></Button>
                    </InputAdornment>
                  ),
                }}/>
              </Box>
            </Box>
            <Box sx={{ height: "80%", flexGrow: 1, maxWidth: 400, overflowY: 'auto', padding: '10px' }}>
              <List component="nav">
                <ListItem button onClick={handleClickSample}>
                  <ListItemIcon>
                    <Folder fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>★샘플</Typography>} />
                  {openSample ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSample} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {storageData?.map((storage, _index) => (
                      <div key={_index+1000}>
                        <ListItem button  onClick={() => handleClickStorage(storage.storageId)} sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <Folder fontSize="small" /> 
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Typography variant="body2" sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{storage.storageName}</Typography> 
                            }
                          />
                          {openStorage[storage.storageId] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />} 
                        </ListItem>
                        <Collapse in={openStorage[storage.storageId]} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {filteredData.filter((form) => form.storageId === storage.storageId)
                            .map((form, index) => (
                              <ListItem button sx={{ pl: 8 }} key={index} onClick={() => changeData(form)}>
                                <ListItemIcon>
                                  <InsertDriveFile fontSize="small" /> 
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography variant="body2" sx={{ fontSize: selectedItem === form.subject ? '0.80rem' :'0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' , fontWeight: selectedItem === form.subject ? 'bold' : 'normal', color: selectedItem === form.subject ? '#ec407a': 'inherit' }}>{form.subject}</Typography> 
                                  }
                                />
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
          <Box>
            <FormDetail data={datas}/>               
          </Box>
        </Stack>
        <Box my={2} display="flex" justifyContent="end" width="100%">
          <Button variant='contained' color='success' sx={{marginRight: "10px", width:"15%"}} onClick={() => changeForm(datas)}>확인</Button>
          <Button variant='outlined' color='success' sx={{width: "15%"}} onClick={onModal}>취소</Button>
        </Box>
      </Box>
    </>
  );
};

export default FormModal;
