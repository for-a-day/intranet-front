import { Box, Chip, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { _getApprovalDetail, clearApprovalDetail } from '../../modules/redux/approval';
import ApprovalSideBar from '../../components/approval/ApprovalSideBar';
import ApprovalDetailMenu from '../../components/approval/ApprovalDetailMenu';
import { renderToStaticMarkup } from 'react-dom/server';
import approve from '../../assets/image/approve.png';
import rejection from '../../assets/image/rejection.png';
import ApprovalDraftList from '../../components/approval/ApprovalDraftList';
import "./Approval.css";


const ApprovalDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef();
  const location = useLocation();
  const queryString = location.search;
  const [backHistory, setBackHistory] = useState(location.state?.history || "");
  const category = location?.state?.category || null;
  const {id} = useParams();
  const {isLoading, error, approval = {}} = useSelector((state) => state?.approval);
  const [participant, setParticipant] = useState({});
  const [participantList, setParticipantList] = useState([]);

  if(approval?.approval && approval?.approval?.status === 'H' && approval?.approval?.approvalId){
    alert("해당 문서는 삭제되었습니다.");
    navigate('/approval/draft/list/mydraft');
  }

  useEffect(() => {
    dispatch(_getApprovalDetail(id));

    if (isLoading) {
      return <div>로딩중....</div>;
    }
  
    if (error) {
        return <div>{error.message}</div>;
    }
    return () => {
      dispatch(clearApprovalDetail()); 
    };
  },[dispatch, id ,queryString]);

  useEffect(() => {
    if(approval?.approval && approval?.approval?.status === 'T' && approval?.approval?.approvalId){
      navigate(`/approval/draft/revise/${approval?.approval?.approvalId}`);
    }

    if(approval?.approval?.participantList){
      const [_participant, ..._participantList] = approval?.approval?.participantList;
      setParticipant(_participant);
      setParticipantList(_participantList);
    }

    //기안일
    const docNo = contentRef.current.querySelector('#docNo');
    if (docNo && approval?.approval?.docNo !== null && approval?.approval?.docNo !== undefined) {
      docNo.textContent = `NG-결재-2024-${String(approval?.approval?.docNo).padStart(4, '0')}`; 
    }
  },[approval, navigate]);

  //상신 취소/결재/반려시 변경
  const onChangeHtml = () => {
    return new Promise((resolve) => {
      const _htmls = parse(contentRef.current.innerHTML);
      const newHtml = renderToStaticMarkup(_htmls);
      resolve(newHtml); 
    });
  }

  //상신 취소시 기존 결재정보 삭제
  const cancelApprove = () => {
    const draftDate = contentRef.current.querySelector('#draftDates');
    if (draftDate) {
      draftDate.textContent = "";
    }

    //도장
    const draftImg = contentRef.current.querySelector('#draftImg');
    if (draftImg) {
      draftImg.removeAttribute('src');
    }
  }

  //결재 및 반려 처리
  const approveDicision = (type, seq) => {
    //현재 날짜
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    if(type === "A"){
      const draftDate = contentRef.current.querySelector(`#approveDate${seq}`);
      if (draftDate) {
        draftDate.textContent = formattedDate;
      }

      //도장
      const draftImg = contentRef.current.querySelector(`#approveImg${seq}`);
      if (draftImg) {
        draftImg.src = approve;
      }
    } else if(type === "R") {
      const draftDate = contentRef.current.querySelector(`#approveDate${seq}`);
      if (draftDate) {
        draftDate.textContent = formattedDate;
        draftDate.style.color = "#FF2400";
        draftDate.style.fontWeight = 700;
      }

      //도장
      const draftImg = contentRef.current.querySelector(`#approveImg${seq}`);
      if (draftImg) {
        draftImg.src = rejection;
      }
    }
  }



  return (
    <Stack direction="row" spacing={4} sx={{marginLeft: "0", overflowX: "auto"}}>
      <ApprovalSideBar _category={category}/>
      <Stack>
        <Box sx={{marginBottom:"15px"}}>
          <Typography variant='h2'>{approval?.approval?.subject} {approval?.approval?.urgency === '1' && <Chip label="긴급" color="error" size="small"  sx={{marginBottom:"12px", marginLeft:"5px"}}/>}</Typography>
        </Box>
        <ApprovalDetailMenu contentRef={contentRef} employee={approval?.employee} backHistory={backHistory} approval={approval?.approval} participants={approval?.approval?.participantList} cancelApprove={cancelApprove} onChangeHtml={onChangeHtml} approveDicision={approveDicision}/>
        <Stack direction="row" spacing={4}>
          <Box className='print-container' sx={{border: "3px solid #e0e0e0", padding: "50px", marginTop:"10px", marginBottom:"10px"}}>
            <div ref={contentRef} className='print-container'>{parse(approval?.approval?.docBody || "")}</div>
          </Box>
          {/* 사이드 기안자 시작 */}
          <ApprovalDraftList type="D" participant={participant} participants={participantList}/>  
        </Stack>
        <ApprovalDetailMenu contentRef={contentRef} backHistory={backHistory} approval={approval?.approval} participants={approval?.approval?.participantList} cancelApprove={cancelApprove} onChangeHtml={onChangeHtml} approveDicision={approveDicision}/>
      </Stack>
    </Stack>
  )
};

export default ApprovalDetail;