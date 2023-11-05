import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Car } from "../models/Car";
import { RootState } from "./configureStore";
interface CarState {
    car: Car | null;
    carsLoaded: boolean;
   
};

const initialState : CarState= {
car : null ,
carsLoaded : false
}

 // สรา้งตัวแปรแบบ Adapter
export const fetchCarsAsync = createAsyncThunk<any, void, { state: RootState }>(
    'car/fetchCars',
    async (_, thunkAPI) => {
        
        try {
            const result = await agent.Car.getcar();
            
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);
export const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        resetCar: (state) => {
            state.carsLoaded = false;
            state.car = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCarsAsync.fulfilled, (state, action) => {
           const {data} = action.payload
            state.car = action.payload; // set products
            state.carsLoaded = true;
        });
        
    }
});

export const { resetCar } = carSlice.actions;
