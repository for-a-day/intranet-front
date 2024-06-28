import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    data: {},
    formList: [],
    isLoading: false,
    error: null
}

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
    }
});

export default approvalSlice;