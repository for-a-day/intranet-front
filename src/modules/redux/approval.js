import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    data: {},
    employee: {},
    approval: {},
    modfiyApproval: {},
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
      if(payload.formData.saveType === 'T'){
        payload._navigate(`/approval/draft/revise/${data.data.data.approvalId}`, { state: {history: "/approval/draft"}});
      } else {
        payload._navigate(`/approval/draft/detail/${data.data.data.approvalId}`, { state: {history: "/approval/draft"}});
      }
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//기안문 수정
export const _updateApproval = createAsyncThunk(
  "approval/updateApproval",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:9000/app/approval/draft/doc", payload.formData);

      if(payload.formData.saveType === 'T'){
        payload._navigate(`/approval/draft/revise/${data.data.data.approvalId}`, { state: {history: "/approval/draft"}});
      } else {
        payload._navigate(`/approval/draft/detail/${data.data.data.approvalId}`, { state: {history: "/approval/draft"}});
      }
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//사원 및 부서 목록 조회
export const _getEmployeeList = createAsyncThunk(
  "approval/getEmployeeList",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:9000/app/employees/list`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

//기안문 목록 조회
export const _getApprovalList = createAsyncThunk(
  "approval/getApprovalList",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:9000/app/approval/draft/${payload}`);
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

//기안문 임시보관 페이지 상세조회
export const _getApprovalModifyDetail = createAsyncThunk(
  "approval/getApprovalModifyDetail",
  async (payload, thunkAPI) => {
    try{
      const data = await axios.get(`http://localhost:9000/app/approval/draft/doc/${payload._id}?type=${payload.type}`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//기안문 상신취소
export const _updateApprovalCancel = createAsyncThunk(
  "approval/updateApprovalCancel",
  async (payload, thunkAPI) => {
    try{
      const data = await axios.put(`http://localhost:9000/app/approval/draft/doc`,payload.formData);
      if(payload.formData.saveType === 'T'){
        payload._navigate(`/approval/draft/revise/${data.data.data}`, { state: {history: "/approval/draft"}});
      } 
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

//기안문 결재 및 반려
export const _updateApprovalOrRejection = createAsyncThunk(
  "approval/updateApprovalOrRejection",
  async (payload, thunkAPI) => {
    try{
      const data = await axios.put(`http://localhost:9000/app/approval/draft`,payload.formData);
      payload._navigate(`/approval/draft/detail/${data.data.data}?c=c`, { state: {history: "/approval/draft"}});
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const approvalSlice = createSlice({
    name: "approval",
    initialState,
    reducers: {
      clearApprovalDetail: (state) => {
        state.approval = {};
        state.modfiyApproval = {};
        state.error = null;
      }
    },
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
            .addCase(_updateApproval.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_updateApproval.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approval = action.payload;
            })
            .addCase(_updateApproval.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_getEmployeeList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_getEmployeeList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employee = action.payload;
            })
            .addCase(_getEmployeeList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_getApprovalList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_getApprovalList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalList = action.payload;
            })
            .addCase(_getApprovalList.rejected, (state, action) => {
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
        builder
            .addCase(_getApprovalModifyDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_getApprovalModifyDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.modfiyApproval = action.payload;
            })
            .addCase(_getApprovalModifyDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_updateApprovalCancel.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_updateApprovalCancel.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(_updateApprovalCancel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_updateApprovalOrRejection.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_updateApprovalOrRejection.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(_updateApprovalOrRejection.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { clearApprovalDetail } = approvalSlice.actions;

export default approvalSlice;