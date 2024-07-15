import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import instance from "../../axiosConfig";

const initialState = {
    main: {},
    data: {},
    employee: {},
    approval: {},
    modfiyApproval: {},
    approvalList: [],
    formList: [],
    mydraft:[],
    isLoading: false,
    error: null
}

//전자결재 메인 조회
export const _getMainList = createAsyncThunk(
  "approval/getMainList",
    async (payload, thunkAPI) => {
        try{
            const data = await instance.get(`/app/approval`);
            return thunkAPI.fulfillWithValue(data.data.data);
        } catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

//결재 양식 폼 목록 조회
export const _getFormList = createAsyncThunk(
    "approval/getFormList",
    async (payload, thunkAPI) => {
        try{
            const data = await instance.get(`/app/approval/form`);
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
      const data = await instance.post(`/app/approval/draft`, payload.formData);
      if(payload.formData.saveType === 'T'){
        payload._navigate(`/approval/draft/revise/${data.data.data.approvalId}`, { state: {history: "/approval/draft", category: "temp"}});
      } else {
        payload._navigate(`/approval/draft/detail/${data.data.data.approvalId}`, { state: {history: "/approval/draft", category: "mydraft"}});
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
      const data = await instance.post(`/app/approval/draft/doc`, payload.formData);
      if(payload.formData.saveType === 'T'){
        payload._navigate(`/approval/draft/revise/${data.data.data.approvalId}`, { state: {history: "/approval/draft" , category: "temp"}});
      } else {
        payload._navigate(`/approval/draft/detail/${data.data.data.approvalId}`, { state: {history: "/approval/draft", category: "mydraft"}});
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
      const data = await instance.get(`/app/employees/list`);
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
      const data = await instance.get(`/app/approval/draft/${payload}`);
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
      const data = await instance.get(`/app/approval/draft/doc/${payload}`);
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
      const data = await instance.get(`/app/approval/draft/doc/${payload._id}?type=${payload.type}`);
      if(data?.data?.data?.approval?.participantList[0].employeeId != data?.data?.data?.employee?.id){
        alert("잘못된 접근입니다.");
        payload._navigate("/approval/draft/list/mydraft");
        return;
      }

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
      const data = await instance.put(`/app/approval/draft/doc`,payload.formData);
      if(data.data.code === "FAIL"){
        alert(data.data.msg);
        payload._navigate(`/approval/draft/detail/${payload.formData.approvalId}?p=p`, { state: {history: "/approval/draft/list/mydraft", category: "mydraft"}});
      } else {
        if(payload.formData.saveType === 'T'){
          payload._navigate(`/approval/draft/revise/${data.data.data}`, { state: {history: "/approval/draft", category: "temp"}});
        } 
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
      const data = await instance.put(`/app/approval/draft`,payload.formData);
      payload._navigate(`/approval/draft/detail/${data.data.data}?c=c`, { state: {history: "/approval/draft"}});
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

//기안문 삭제
export const _deleteApproval = createAsyncThunk(
  "approval/deleteApproval",
  async (payload, thunkAPI) => {
    try{
      const data = await instance.delete(`/app/approval/draft/doc/${payload.id}`);
      payload._navigate(`/approval/draft/list/mydraft`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

//메인 내가 올린 기안문 조회
export const _getMyDraft = createAsyncThunk(
  "approval/getMyDraft",
  async (payload, thunkAPI) => {
    try{
      const data = await instance.get(`/app/approval/my-draft`);

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
              .addCase(_getMainList.pending, (state) => {
                  state.isLoading = true;
              })
              .addCase(_getMainList.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.main = action.payload;
              })
              .addCase(_getMainList.rejected, (state, action) => {
                  state.isLoading = false;
                  state.error = action.payload;
              })
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
        builder
            .addCase(_deleteApproval.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_deleteApproval.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(_deleteApproval.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_getMyDraft.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_getMyDraft.fulfilled, (state, action) => {
                state.isLoading = false;
                state.mydraft = action.payload;
            })
            .addCase(_getMyDraft.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { clearApprovalDetail } = approvalSlice.actions;

export default approvalSlice;