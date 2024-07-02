import { Box, Button, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import React, { useEffect, useRef, useState } from 'react';
import FormModal from '../../components/approval/FormModal';
import ModalPortal from '../../config/ModalPortal';
import { renderToStaticMarkup } from 'react-dom/server';
import { useDispatch } from 'react-redux';
import { _createApproval } from '../../modules/redux/approval';
import { useLocation, useNavigate } from 'react-router-dom';
import ApprovalSideBar from '../../components/approval/ApprovalSideBar';


const ApprovalWrite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const contentRef = useRef(null);
  const [approvalInfo, setApprovalInfo] = useState([
    {"employeeId": 6, "seq" : 0, "type": "기안", "status": "D"},
    {"employeeId": 5, "seq" : 1, "type": "결재", "status": "D"},
    {"employeeId": 4, "seq" : 2, "type": "결재", "status": "D"},
    {"employeeId": 3, "seq" : 3, "type": "결재", "status": "D"}
  ])
  const [approvalData, setApprovalData] = useState(location.state?.approvalData || null);
  const [changeHtml, setChangeHtml] = useState("");

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
    const { value } = event.target;
    event.target.setAttribute('value', value);
  };

  const replaceInputTextareaWithSpan = (node) => {
    if (node.type === 'tag' && (node.name === 'input' || node.name === 'textarea' || node.name === 'select')) {
      let value = node.attribs.value || '';  
  
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
      setChangeHtml(newHtml);
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
    navigate("/approval/")
  };
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
          <Button variant='h5'>결재정보</Button>
        </Stack>
        <Box sx={{border: "3px solid gray", padding: "50px", marginTop:"10px", marginBottom:"10px"}}>
          <div ref={contentRef}>{parse(approvalData?.content || "")}</div>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant='h5' onClick={onSubmtEvent}>결재요청</Button>
          <Button variant='h5'>임시저장</Button>
          <Button variant='h5'>미리보기</Button>
          <Button variant='h5'>취소</Button>
          <Button variant='h5'>결재정보</Button>
        </Stack>
      </Stack>
    </Stack>
  )
};

export default ApprovalWrite;