import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";


import { OrderRequest } from "../models/OrderTrip";

interface OrderState {
    orderTrip: any | null;
    orderTripLoaded: boolean;
   
};

const initialState : OrderState= {
    orderTrip : null ,
    orderTripLoaded : false
}

 // สรา้งตัวแปรแบบ Adapter
 export const fetchOrderTrip = createAsyncThunk<any, number>(
    "OrderTrip/fetchOrderTrip",
    async (id, thunkAPI) => {
      try {
        return await agent.OrderTrip.getByIdOrderAccount(id);
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );

  
  
export const orderTripSlice = createSlice({
    name: "orderTrip",
    initialState,
    reducers: {
        resetOrderTrip: (state) => {
            state.orderTripLoaded = false;
            state.orderTrip = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOrderTrip.fulfilled, (state, action) => {
     
              state.orderTrip = action.payload;
            state.orderTripLoaded = true
          });
    }
});

export const { resetOrderTrip } = orderTripSlice.actions;
