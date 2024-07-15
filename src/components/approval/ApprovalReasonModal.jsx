import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const ApprovalReasonModal = ({onModal, type, approvalDecision}) => {
  const [textareaValue, setTextareaValue] = useState('');
  const confirmLabel = type === "R" ? "반려하기" : "결재하기";
  const confirmText = type === "R" ? "반려 사유를 작성해주세요" : "의견을 작성해주세요";  
  const confirmButton = type === "R" ? "반려" : "승인";
  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };
  
  const onApproveRejection = () => {
    if(type === "R" && textareaValue.trim() === ""){
      alert("반려 사유를 입력해주세요.");
      return;
    }
    approvalDecision(type, textareaValue);
    onModal(false);
  }
  return (
    <>
      <Box style={{ position: "fixed", width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.40)", zIndex: 1400, top: 0 }}></Box>
      <Box px={4} py={4} sx={{ height: "300px", width: "350px", backgroundColor: "#fff", position: "fixed", left: "50%", top: "50%", zIndex: 1500, transform: "translate(-50%, -50%)" }}>
        <Typography variant='h4' sx={{ fontWeight: "700" }}>{confirmLabel}</Typography>
        <Stack spacing={2} mt={4} >
          <Typography variant='body1'>{confirmButton}의견</Typography>
          <textarea rows={7} value={textareaValue} onChange={handleTextareaChange} placeholder={confirmText}
            style={{ 
              width: '95%', 
              padding: '8px', 
              fontSize: '16px', 
              resize: 'none', 
              borderRadius: '4px', 
              border: '1px solid #ccc' 
            }}
          />
        </Stack>
        <Box my={2} display="flex" justifyContent="end" width="100%">
          <Button variant='contained' color='success' sx={{ marginRight: "10px", width: "15%" }} onClick={onApproveRejection}>{confirmButton}</Button>
          <Button variant='outlined' color='success' sx={{ width: "15%" }} onClick={onModal}>취소</Button>
        </Box>
      </Box>
    </>
  );
};

export default ApprovalReasonModal;