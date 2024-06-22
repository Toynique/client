import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const blogdata =  createAsyncThunk('blogdata', async ()=>{
    const response = await axios.get(`${Url}/blog`).then(data => data.data) 
     return response 
  })

const BlogSlice = createSlice({
    name: "blog data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(blogdata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      builder.addCase(blogdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(blogdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default BlogSlice.reducer;


 



