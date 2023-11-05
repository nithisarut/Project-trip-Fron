import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Images } from "../models/Images";
import { Result } from "../models/Interfaces/IResponse";

interface DetailImageLocationState {
    detailImageLocation : Images[] | null
    detailImageLocationLoaded : boolean
}

const initialState: DetailImageLocationState = {
    detailImageLocation: null,
    detailImageLocationLoaded: false
};

export const createDetailImageLocationAsync = createAsyncThunk<Result, any>("images/detailImageLocation",
    async (values, thunkAPI) => {
        try {
            return await agent.Images.createImages(values);
          
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
});

export const fetchDetailImageLocationAsync = createAsyncThunk<Images[], any>(
    'product/fetchImageProductsAsync',
    async (id, thunkAPI) => {
        try {
         
            const Result = await agent.Images.getByIdImages(id);
         
            console.log(Result)
        
            return Result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const detailDetailImageLocationSlice = createSlice({
    name: "detailDetailImage",
    initialState,
    reducers: {
        resetImageProduct: (state) => {
        state.detailImageLocation = null;
        state.detailImageLocationLoaded = false;
    },
        resetImagedetail:(state) => {
            state.detailImageLocation = null
        }
},
    extraReducers: (builder => {
        builder.addCase(fetchDetailImageLocationAsync.fulfilled, (state, action) => {
            state.detailImageLocation = action.payload;
            state.detailImageLocationLoaded = true;
        });
    
    })
  });
  
  export const {resetImageProduct,resetImagedetail} = detailDetailImageLocationSlice.actions;