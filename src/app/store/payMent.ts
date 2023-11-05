import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";


interface PaymentState {
    payMent: any | null;
    payMentLoaded: boolean;
   
};

const initialState : PaymentState= {
    payMent : null ,
    payMentLoaded : false
}

export const fetchAllPayment = createAsyncThunk(
    "trip/fetchAllPayment",
    async (_, thunkAPI) => {
      
      try {
        const data = await agent.Payment.getPayment();
        return data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );

  export const payMentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
      resetPayment: (state) => {
        state.payMentLoaded = false;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAllPayment.fulfilled, (state, action) => {
        state.payMent = action.payload;
        state.payMentLoaded = true
      });
    },
  });
  
  
  
  
  export const { resetPayment} = payMentSlice.actions
  
