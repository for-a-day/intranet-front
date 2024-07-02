import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  data: {},
  approval: {},
  approvalList: [],
  formList: [],
  isLoading: false,
  error: null
}

//결재 양식 폼 목록 조회
export const _getFormList = createAsyncThunk(
  "approval/getFormList",
  async (payload, thunkAPI) => {
      try{
          const data = await axios.get("http://localhost:9000/app/approval/form");
          return thunkAPI.fulfillWithValue(data.data.data);
      } catch(e){
          return thunkAPI.rejectWithValue(e);
      }
  }
);

//기안문 등록
export const _createApproval = createAsyncThunk(
  "approval/createApproval",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:9000/app/approval/draft", payload.formData);
      payload._navigate(`/approval/draft/detail/${data.data.data.approvalId}`, {replace: true, state: {history: "/approval/draft"}});
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//기안문 상세조회
export const _getApprovalDetail = createAsyncThunk(
  "approval/getApprovalDetail",
  async (payload, thunkAPI) => {
    try{
      const data = await axios.get(`http://localhost:9000/app/approval/draft/doc/${payload}`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);


export const approvalSlice = createSlice({
    name: "approval",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(_getFormList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_getFormList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(_getFormList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_createApproval.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_createApproval.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approval = action.payload;
            })
            .addCase(_createApproval.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_getApprovalDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_getApprovalDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approval = action.payload;
            })
            .addCase(_getApprovalDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default approvalSlice;