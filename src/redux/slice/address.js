import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const addressdata =  createAsyncThunk('addressdata', async (userId)=>{ 
    const response = await axios.get(`${Url}/api/address/user?userId=${userId}`).then(data => data.data)  
     return response 
  })

const AddressSlice = createSlice({
    name: "address data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(addressdata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      builder.addCase(addressdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(addressdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default AddressSlice.reducer;
 
