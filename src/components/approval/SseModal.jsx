import { Box, keyframes, styled, Typography } from '@mui/material';
import React from 'react';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 50%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;


const AnimatedBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(2),
  border: "2px solid #e0e0e0",
  borderRadius: '10px',
  height: "50px",
  width: "370px",
  backgroundColor: "#fff",
  position: "fixed",
  right: '-105px',
  top: '100px',
  zIndex: 1500,
  transform: "translate(-50%, -50%)",
  animation: `${slideUp} 0.5s ease-in-out`,
}));

const SseModal = ({modal, readClick, notice}) => {
  return (
     <>
      {modal && (
        <AnimatedBox onClick={() => readClick(notice?.id, notice?.url) }>
          <Typography variant='h5' sx={{ fontWeight: "700", lineHeight: 3 }}>{notice?.content}</Typography>
        </AnimatedBox>
      )}
    </>
  );
};

export default SseModal;