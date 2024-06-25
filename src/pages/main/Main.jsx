import { Typography } from '@mui/material';
import React from 'react';
import MainList from '../../components/main/MainList';

const Main = () => {
  return (
    <div>
      <Typography variant='h1'>메인입니다</Typography>
      <MainList />
    </div>
  );
};

export default Main;