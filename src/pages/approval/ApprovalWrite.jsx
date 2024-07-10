import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import React, { useEffect, useRef, useState } from 'react';
import ModalPortal from '../../config/ModalPortal';
import { renderToStaticMarkup } from 'react-dom/server';
import { useDispatch } from 'react-redux';
import { _createApproval } from '../../modules/redux/approval';
import { useLocation, useNavigate } from 'react-router-dom';
import ApprovalSideBar from '../../components/approval/ApprovalSideBar';
import ApprovalModal from '../../components/approval/ApprovalModal';
import approve from '../../assets/image/approve.png';

//아이콘
import AssignmentIcon from '@mui/icons-material/Assignment';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ApprovalDraftList from '../../components/approval/ApprovalDraftList';

const ApprovalWrite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const contentRef = useRef(null);
  const [approvalInfo, setApprovalInfo] = useState([])
  const [approvalData, setApprovalData] = useState(location.state?.approvalData || null);
  const [formValues, setFormValues] = useState({});
  const [modal, setModal] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [urgency, setUrgency] = useState(0);
  const [employee, setEmployee] = useState(location.state?.employee || null); //사원 정보

  useEffect(() => {
    // 입력 필드에 이벤트 리스너 추가
    const inputs = contentRef.current.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('change', handleInputChange);
    });

    //현재 날짜
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    //기안자
    const draftUser = contentRef.current.querySelector('#draftUser');
    if (draftUser) {
      draftUser.textContent = employee.name || "";   //추후 데이터가 없을 때 다시 받아오는 로직 필요할듯
    }

    //도장 직급
    const draftLevel = contentRef.current.querySelector('#draftLevel');
    if (draftLevel) {
      draftLevel.textContent = employee.level || "";
    }

    //도장 이름
    const draftName = contentRef.current.querySelector('#draftName');
    if (draftName) {
      draftName.textContent = employee.name || "";
    }

    //소속
    const draftDept = contentRef.current.querySelector('#draftDept');
    if (draftDept) {
      draftDept.textContent = employee.department || "";
    }

    //기안일
    const draftDate = contentRef.current.querySelector('#draftDate');
    if (draftDate) {
      draftDate.textContent = formattedDate;
    }

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      inputs.forEach(input => {
        input.removeEventListener('change', handleInputChange);
      });
    };
  }, [approvalData]);

  //결재정보 설정
  const htmlApproveSetting = (datas) => {
    const dTable = contentRef.current.querySelector(`#dTable`);
    if(datas.length > 0){
      dTable.style.display = 'table';
    } else {
      dTable.style.display = 'none';
    }

    for(let i=1; i<=5; i++){
      const approve = contentRef.current.querySelector(`#approve${i}`);
      approve.style.display = 'none';
    }

    for(let i=0; i<datas.length; i++){
      const approve = contentRef.current.querySelector(`#approve${datas[i].seq}`);
      const approveLevel = contentRef.current.querySelector(`#approveLevel${datas[i].seq}`);
      const approveName = contentRef.current.querySelector(`#approveName${datas[i].seq}`);
      approve.style.display = 'table';
      approveLevel.textContent = datas[i].level;
      approveName.textContent = datas[i].name;
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    event.target.setAttribute('value', value);
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    if(name === 'subject'){
      setDocTitle(value.trim());
    }
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

  const replaceInputValue = (node) => {
    if (node.type === 'tag' && (node.name === 'input')) {
      let value = formValues[node.attribs.name] || node.attribs.value || '';  
      if(node.attribs.style !== undefined){
        const styleObject = parseStyleString(node.attribs.style);

        return (
          <input class={node.attribs.class} style={styleObject} type={node.attribs.type} name={node.attribs.name} value={value}  />
        );
      } else {
        return (
          <input class={node.attribs.class} type={node.attribs.type} name={node.attribs.name} value={value}  />
        );
      }
    }
    return node;
  };

  function parseStyleString(styleString) {
    return styleString.split(';').reduce((styleObject, styleProperty) => {
      const [key, value] = styleProperty.split(':').map(item => item.trim());
      if (key && value) {
        // CSS 속성을 camelCase로 변환
        const camelCaseKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObject[camelCaseKey] = value;
      }
      return styleObject;
    }, {});
  }

  const onChangeHtml = (type) => {
    return new Promise((resolve) => {
      const _htmls = parse(contentRef.current.innerHTML, { replace: type });
      const newHtml = renderToStaticMarkup(_htmls);
      resolve(newHtml); 
    });
  }
  
  const onSubmtEvent = async (saveType) => {
    if(saveType !== "T" && approvalInfo.length === 0){
      window.alert("결재정보에 최소 1명이상 결재자를 설정해야합니다");
      return;
    }

    const confirmText = saveType === "C" ? "기안문 결재 요청하시겠습니까?" : "기안문을 임시보관하시겠습니까?";
    if(window.confirm(confirmText)){
      if(saveType === 'C'){
        //현재 날짜
        const today = new Date();
        const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

        const draftDate = contentRef.current.querySelector('#draftDates');
        if (draftDate) {
          draftDate.textContent = formattedDate;
        }

        //도장
        const draftImg = contentRef.current.querySelector('#draftImg');
        if (draftImg) {
          draftImg.src = approve;
        }
      }

      const updatedHtml = await onChangeHtml(replaceInputTextareaWithSpan); 
      const tempHtml = await onChangeHtml(replaceInputValue);
      const data = {
        formData : {
          subject: docTitle !== "" ? docTitle : approvalData.subject,
          formId: approvalData.formId,
          docBody: updatedHtml,
          tempBody: tempHtml,
          saveType: saveType,
          urgency: urgency,
          approvalInfo: approvalInfo
        },
        _navigate: navigate
      };
      
      dispatch(_createApproval(data));
    }
  };

  //결재정보 모달창
  const onModal = () => {
    setModal(!modal);
  }

  //취소 메서드
  const cancel = () => {
    if(window.confirm("취소 하시겠습니까?")){
      navigate("/approval/draft/list/mydraft");
    }
  }

  //긴급 기능
  const onUrgency = (event) => {
    setUrgency(event.target.checked ? 1 : 0);
  };


  return (
    <Stack direction="row" spacing={4} sx={{marginLeft: "0", overflowX: "auto"}}>
      <ApprovalSideBar setApprovalData={setApprovalData}/>
      <Stack>
        <Box sx={{ marginBottom: "15px", display: "flex", alignItems: "flex-start" }}>
          <Typography variant='h2'>{approvalData?.subject}</Typography>
          <FormGroup sx={{ display: "flex", alignItems: "flex-start", marginLeft: 2 }}>
            <FormControlLabel sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }, alignItems: "flex-start", marginTop: "-0.5em"}} 
                  onChange={onUrgency} 
                  control={<Checkbox  checked={urgency === 1} color='error'  sx={{ alignSelf: 'flex-start' }} />} 
                  label={<Typography variant='h4' sx={{marginTop: '13px', marginLeft:"-8px"}}>긴급</Typography>} 
              />
          </FormGroup>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant='h5' startIcon={<SendIcon />} onClick={() => onSubmtEvent("C")}>결재요청</Button>
          <Button variant='h5' startIcon={<SaveIcon />} onClick={() => onSubmtEvent("T")}>임시저장</Button>
          <Button variant='h5' startIcon={<ArrowBackIcon />} onClick={cancel}>취소</Button>
          <Button variant='h5' startIcon={<AssignmentIcon />} onClick={onModal}>결재정보</Button>
        </Stack>
        <Stack direction="row" spacing={4}>
          <Box sx={{border: "3px solid #e0e0e0", padding: "50px", marginTop:"10px", marginBottom:"10px"}}>
            <div ref={contentRef}>{parse(approvalData?.content || "")}</div>
          </Box>
          {/* 사이드 기안자 시작 */}
          <ApprovalDraftList type="W" participant={employee} participants={approvalInfo}/>  
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant='h5' startIcon={<SendIcon />}onClick={() => onSubmtEvent("C")}>결재요청</Button>
          <Button variant='h5' startIcon={<SaveIcon />} onClick={() => onSubmtEvent("T")}>임시저장</Button>
          <Button variant='h5' startIcon={<ArrowBackIcon />} onClick={cancel}>취소</Button>
          <Button variant='h5' startIcon={<AssignmentIcon />} onClick={onModal}>결재정보</Button>
        </Stack>
      </Stack>
      <ModalPortal>
        {modal && <ApprovalModal onModal={onModal} setApprovalInfo={setApprovalInfo} approvalInfo={approvalInfo} htmlApproveSetting={htmlApproveSetting}/>}
      </ModalPortal>
    </Stack>
  )
};

export default ApprovalWrite;