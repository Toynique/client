import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const wishlistdata =  createAsyncThunk('wishlistdata', async (id)=>{
  if(id){
    const response = await axios.get(`${Url}/wishlist/${id}`).then(data => data.data)
     return response 
  }
  else{
    return []
  }
  })

const WishlistSlice = createSlice({
    name: "wishlist data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(wishlistdata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      builder.addCase(wishlistdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(wishlistdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default WishlistSlice.reducer;


 



