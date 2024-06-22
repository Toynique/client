import {createSlice} from '@reduxjs/toolkit'

const CartSlice = createSlice({
    name: "userdata",
    initialState: [],
    reducers: {
        adduser: (state, action)=>{  
            if(state.length > 0){ 
                state.splice(0, 1, action.payload )
            }
            else{
                state.push(action.payload)
            } 
        },
        removeuser: (state, action)=>{
            state.splice(0 , state.length)
        }
    }
})

export const {adduser, removeuser} = CartSlice.actions;
export default CartSlice.reducer;