import { Box, Button, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import React, { useEffect, useRef, useState } from 'react';
import ModalPortal from '../../config/ModalPortal';
import { renderToStaticMarkup } from 'react-dom/server';
import { useDispatch } from 'react-redux';
import { _createApproval } from '../../modules/redux/approval';
import { useLocation, useNavigate } from 'react-router-dom';
import ApprovalSideBar from '../../components/approval/ApprovalSideBar';
import ApprovalModal from '../../components/approval/ApprovalModal';


const ApprovalWrite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const contentRef = useRef(null);
  const [approvalInfo, setApprovalInfo] = useState([])
  const [approvalData, setApprovalData] = useState(location.state?.approvalData || null);
  const [formValues, setFormValues] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // 입력 필드에 이벤트 리스너 추가
    const inputs = contentRef.current.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('change', handleInputChange);
    });

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      inputs.forEach(input => {
        input.removeEventListener('change', handleInputChange);
      });
    };
  }, [approvalData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const replaceInputTextareaWithSpan = (node) => {
    if (node.type === 'tag' && (node.name === 'input' || node.name === 'textarea' || node.name === 'select')) {
      let value = formValues[node.attribs.name] || node.attribs.value || '';  
  
      return (
        <span>
          {value}
        </span>
      );
    }
    return node;
  };

  const onChangeHtml = () => {
    return new Promise((resolve) => {
      const _htmls = parse(contentRef.current.innerHTML, { replace: replaceInputTextareaWithSpan });
      const newHtml = renderToStaticMarkup(_htmls);
      resolve(newHtml); 
    });
  }
  
  const onSubmtEvent = async () => {
    const updatedHtml = await onChangeHtml(); 
    
    const data = {
      formData : {
        subject: approvalData.subject,
        formId: approvalData.formId,
        docBody: updatedHtml,
        approvalInfo: approvalInfo
      },
      _navigate: navigate
    };
  
    dispatch(_createApproval(data));
  };

  //결재정보 모달창
  const onModal = () => {
    setModal(!modal);
  }


  return (
    <Stack direction="row" spacing={4} sx={{marginLeft: "0"}}>
      <ApprovalSideBar setApprovalData={setApprovalData}/>
      <Stack>
        <Box sx={{marginBottom:"15px"}}>
          <Typography variant='h2'>{approvalData?.subject || ""}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant='h5' onClick={onSubmtEvent}>결재요청</Button>
          <Button variant='h5'>임시저장</Button>
          <Button variant='h5'>미리보기</Button>
          <Button variant='h5'>취소</Button>
          <Button variant='h5' onClick={onModal}>결재정보</Button>
        </Stack>
        <Box sx={{border: "3px solid gray", padding: "50px", marginTop:"10px", marginBottom:"10px"}}>
          <div ref={contentRef}>{parse(approvalData?.content || "")}</div>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant='h5' onClick={onSubmtEvent}>결재요청</Button>
          <Button variant='h5'>임시저장</Button>
          <Button variant='h5'>미리보기</Button>
          <Button variant='h5'>취소</Button>
          <Button variant='h5' onClick={onModal}>결재정보</Button>
        </Stack>
      </Stack>
      <ModalPortal>
        {modal && <ApprovalModal onModal={onModal} setApprovalInfo={setApprovalInfo}/>}
      </ModalPortal>
    </Stack>
  )
};

export default ApprovalWrite;