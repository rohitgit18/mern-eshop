import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import WebApis from '../apis/WebApis';
import axios from "axios";

export const fetchCategory = createAsyncThunk("CategorySlice/fetchCategory",async()=>{
    try{
        let response = await axios.get(WebApis.CATEGORY_LIST);
        return response.data.categoryList;
    }
    catch(err){
        console.log(err);
    }
});
const slice = createSlice({
    name: "CategorySlice",
    initialState:{
        categoryList: [],
        isLoading: false,
        error: null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategory.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(fetchCategory.fulfilled,(state,action)=>{
            state.categoryList = action.payload;
            state.isLoading = false;
        }).addCase(fetchCategory.rejected,(state,action)=>{
            state.error = "Oops! something went wrong";
            state.isLoading = false;
        });
    }
});

export default slice.reducer;