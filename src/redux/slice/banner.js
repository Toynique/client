import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const bannerdata =  createAsyncThunk('bannerdata', async ()=>{
    const response = await axios.get(`${Url}/api/banner`).then(data => data.data) 
     return response 
  })

const BannerSlice = createSlice({
    name: "banner data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(bannerdata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      builder.addCase(bannerdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(bannerdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default BannerSlice.reducer;


 



