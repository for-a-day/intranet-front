import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { _updateApprovalCancel, _updateApprovalOrRejection } from '../../modules/redux/approval';
import ModalPortal from '../../config/ModalPortal';
import ApprovalDetailModal from './ApprovalDetailModal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import ApprovalReasonModal from './ApprovalReasonModal';
import RejectionModal from './RejectionModal';

//아이콘
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListIcon from '@mui/icons-material/List';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import FeedbackIcon from '@mui/icons-material/Feedback';




const ApprovalDetailMenu = React.memo(({contentRef,type, approval, participants, cancelApprove, onChangeHtml, approveDicision, backHistory = null}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const backHistoryClick = () => {
    if(backHistory === null){
      navigate(-1);
    } else {
      navigate(backHistory);
    }
  }

  const approvalCancel = async (saveType) => {
    try {
      if(window.confirm("상신 취소 하시겠습니까?")){
        cancelApprove();
        const updatedHtml = await onChangeHtml();
        const data = {
          formData: {
            approvalId: approval.approvalId,
            docBody: updatedHtml,
            saveType: saveType,
          },
          _navigate: navigate
        };
  
        dispatch(_updateApprovalCancel(data));
      }
    } catch (e) {
      console.error("에러 발생:", e);
    }
  };

  //결재정보 모달창
  const onModal = () => {
    setModal(!modal);
  }

  //결재 및 반려 의견 모달창
  const onReasonModal = (type) => {
    setModalType(type);
    setReasonModal(!reasonModal);
  }

  //반려 사유 확인 모달창
  const onRejectModal = () => {
    setRejectModal(!rejectModal);
  }

  //결재 및 반려
  const approvalDecision = async (type, reason) => {
    approveDicision(type, approval.seq);
    const updatedHtml = await onChangeHtml(); 
    const data = {
      formData: {
        approvalId: approval.approvalId,
        docBody: updatedHtml,
        approvalType: type,
        reason: reason
      },
      _navigate: navigate
    };

    dispatch(_updateApprovalOrRejection(data));
  }
  

  //pdf저장
  const handleGeneratePdf = async  () => {
    const input = contentRef.current;
    if (input) {
      try {
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });  // 스케일을 2로 설정하여 해상도 개선
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // 양 옆 여백을 위해 20mm 줄임
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);

        // PDF 다운로드
        pdf.save('download.pdf');
      } catch (error) {
        console.error('Error generating PDF', error);
      }
    } else {
      console.error('Element not found');
    }
  };

  //인쇄 기능 - 작업중
  const handlePrint = useReactToPrint({
    content: () => contentRef.current
  });

  //재기안 페이지로 이동
  const moveReApprove = () => {
    navigate(`/approval/draft/reapply/${approval.approvalId}`);
  };

  return (
    <>
      {(approval.status === "R" && approval.approvalType === "기안")  ?(
        <Stack direction="row" spacing={1}>
          <Button variant='h5' startIcon={<AssignmentIcon /> }onClick={onModal}>결재정보</Button>
          <Button variant='h5' startIcon={<EditIcon />} onClick={moveReApprove}>재기안</Button>
          <Button variant='h5' startIcon={<ListIcon />} onClick={backHistoryClick}>목록</Button>
          <Button variant='h5' startIcon={<PrintIcon />} onClick={handlePrint}>인쇄</Button>
          <Button variant='h5' startIcon={<FeedbackIcon />} onClick={onRejectModal}>반려사유</Button>
        </Stack>
      ) : approval.status === "C" ?(
        <Stack direction="row" spacing={1}>
          <Button variant='h5' startIcon={<AssignmentIcon />} onClick={onModal}>결재정보</Button>
          <Button variant='h5' startIcon={<ListIcon />} onClick={backHistoryClick}>목록</Button>
          <Button variant='h5' startIcon={<DownloadIcon />} onClick={handleGeneratePdf}>다운로드</Button>
          <Button variant='h5' startIcon={<PrintIcon />} onClick={handlePrint}>인쇄</Button>
        </Stack>
      ) : type === "기안" ? (
        <Stack direction="row" spacing={1}>
          <Button variant='h5' startIcon={<UndoIcon />} onClick={() => approvalCancel("T")}>상신취소</Button>
          <Button variant='h5' startIcon={<AssignmentIcon />} onClick={onModal}>결재정보</Button>
          <Button variant='h5' startIcon={<ListIcon />} onClick={backHistoryClick}>목록</Button>
          <Button variant='h5' startIcon={<PrintIcon />} onClick={handlePrint}>인쇄</Button>
        </Stack>
      ) : type === "대기" ? (
        <Stack direction="row" spacing={1}>
          <Button variant='h5' startIcon={<CheckCircleIcon />} onClick={() => onReasonModal("A")}>결재</Button>
          <Button variant='h5' startIcon={<CancelIcon />} onClick={() => onReasonModal("R")}>반려</Button>
          <Button variant='h5' startIcon={<AssignmentIcon />} onClick={onModal}>결재정보</Button>
          <Button variant='h5' startIcon={<ListIcon />} onClick={backHistoryClick}>목록</Button>
          <Button variant='h5' startIcon={<PrintIcon />} onClick={handlePrint}>인쇄</Button>
        </Stack>
      ) : type === "반려" ? (
        <Stack direction="row" spacing={1}>
          <Button variant='h5' startIcon={<AssignmentIcon />} onClick={onModal}>결재정보</Button>
          <Button variant='h5' startIcon={<ListIcon />} onClick={backHistoryClick}>목록</Button>
          <Button variant='h5' startIcon={<PrintIcon />} onClick={handlePrint}>인쇄</Button>
          <Button variant='h5' startIcon={<FeedbackIcon />} onClick={onRejectModal}>반려사유</Button>
        </Stack> 
      ) : (
        <Stack direction="row" spacing={1}>
          <Button variant='h5' startIcon={<AssignmentIcon />} onClick={onModal}>결재정보</Button>
          <Button variant='h5' startIcon={<ListIcon />} onClick={backHistoryClick}>목록</Button>
          <Button variant='h5' startIcon={<PrintIcon />} onClick={handlePrint}>인쇄</Button>
        </Stack>
      )}
      <ModalPortal>
        {modal && <ApprovalDetailModal onModal={onModal} participants={participants}/>}
      </ModalPortal>
      <ModalPortal>
        {reasonModal && <ApprovalReasonModal onModal={onReasonModal} type={modalType} approvalDecision={approvalDecision}/>}
      </ModalPortal>
      <ModalPortal>
        {rejectModal && <RejectionModal onModal={onRejectModal} reason={approval?.reasonRejection}/>}
      </ModalPortal>
    </>
  );
});

export default ApprovalDetailMenu;