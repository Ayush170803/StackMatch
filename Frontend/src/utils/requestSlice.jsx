import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice(
    {
        name:"requests",
        initialState:null,
        reducers:{
            addRequests:(state,action)=>{
                return action.payload;
            },
            removeRequests:(state,action)=>
            {
                const newRequests = state.filter((r) => r.requestId !=action.payload);
                return newRequests
            }
        }
    }
)

export const {addRequests,removeRequests} = requestSlice.actions;
export default requestSlice.reducer;