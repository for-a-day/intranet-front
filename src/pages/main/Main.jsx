import { Typography } from "@mui/material";
import React from "react";
import MainList from "../../components/main/MainList";
import Stopwatch from "../../components/stopWatch/stopWatch";
import Drawing from "../../components/main/Drawing";

const Main = () => {
  return (
    <div>
      <Stopwatch />
      <MainList />
      <Drawing />
    </div>
  );
};

export default Main;
