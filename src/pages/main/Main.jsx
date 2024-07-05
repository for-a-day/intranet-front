import { Typography } from '@mui/material';
import React from 'react';
import MainList from '../../components/main/MainList';
import Stopwatch from '../../components/stopWatch/stopWatch';


const Main = () => {
  return (
    <div>
      <Typography variant='h1'>메인입니다</Typography>
      <Stopwatch />
      <MainList />
    </div>
  );
};

export default Main;