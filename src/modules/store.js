import { configureStore } from "@reduxjs/toolkit";
import approvalSlice from "./redux/approval";


const store = configureStore({
  reducer: {
    approval: approvalSlice.reducer
  },
});
  
export default store;