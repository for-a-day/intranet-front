import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <SentimentDissatisfiedIcon style={{ fontSize: '170px', color: '#90caf9' }} />
        <Typography variant="h1" component="h1" gutterBottom style={{ fontSize: '95px' }}>
          404
        </Typography>
        <Typography variant="h4" component="p" gutterBottom style={{ fontSize: '34px' }}>
          페이지가 없습니다
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={handleGoHome}
          sx={{ marginTop: '35px', padding: '18px 36px', fontSize: '22px' }}
        >
          메인으로 가기
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;