import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios' 
import {Url} from '../../url/url'

export const cartdata =  createAsyncThunk('cartdata', async (id)=>{ 
  if(id){
    const response = await axios.get(`${Url}/cart/${id}`).then(data => data.data)  
     return response 
    }
    else{
      return []
    }
  }) 

const CartSlice = createSlice({
    name: "cart data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(cartdata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      builder.addCase(cartdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(cartdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default CartSlice.reducer;


 



