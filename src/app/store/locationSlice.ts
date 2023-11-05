import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { LocationTrip } from "../models/Location";
import { Type } from "../models/Type";
import { RootState } from "./configureStore";
interface LocationState {
    location: LocationTrip | null;
    locationsLoaded: boolean;
    typeLoaded: boolean;
    type: Type[] | null;
};

const initialState: LocationState = {
    location: null,
    locationsLoaded: false,
    typeLoaded: false,
    type: null,
   
}

export const fetchTypesAsync = createAsyncThunk(
    "Types/GetTypes",
    async (_, thunkAPI) => {
      try {
        const result = await agent.Type.getType();
        
        return result;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );

// สรา้งตัวแปรแบบ Adapter
export const fetchLocationAsync = createAsyncThunk<any, any, { state: RootState }>(
    'location/fetchLocation',
    async (_, thunkAPI) => {

        try {
            const result = await agent.Location.getlocation();
            console.log(result)
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);
export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        resetLocation: (state) => {
            state.locationsLoaded = false;
            state.location = null;
            
        }
        
    },
    extraReducers: builder => {
        builder.addCase(fetchLocationAsync.fulfilled, (state, action) => {
            const { data } = action.payload
            state.location = action.payload; // set products
            state.locationsLoaded = true;
        });

        builder.addCase(fetchTypesAsync.fulfilled, (state, action) => {
            state.type = action.payload;
            state.typeLoaded = true;
          });

          

    }
});

export const { resetLocation } = locationSlice.actions;
