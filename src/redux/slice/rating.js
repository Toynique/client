import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const ratingdata =  createAsyncThunk('ratingdata', async ()=>{
    const response = await axios.get(`${Url}/api/rating/rating`).then(data => data.data) 
     return response 
  })

const RatingSlice = createSlice({
    name: "rating data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(ratingdata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      builder.addCase(ratingdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(ratingdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default RatingSlice.reducer;


 



