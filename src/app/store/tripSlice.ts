import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Car } from "../models/Car";
import { ClassTrip } from "../models/ClassTrip";
import { DatumTrip, TripParams } from "../models/Trip";
import { RootState } from "./configureStore";



interface TripState {
  trip: any | null;
  tripsLoaded: boolean
  detailTrip: DatumTrip | null;
  tripsdetailLoaded: boolean;
  vehicleLoaded: boolean;
  vehicle: Car | null;
  locationLoaded: boolean;
  location: Car | null;
  classTripLoaded: boolean;
  classTrip: ClassTrip[] | null;
  tripParams: TripParams;
  tripnew: any | null;
  tripnewLoaded: boolean;
}


const initialState: TripState = {
  trip: null,
  tripsLoaded: false,
  tripsdetailLoaded: false,
  detailTrip: null,
  vehicleLoaded: false,
  vehicle: null,
  locationLoaded: false,
  location: null,
  classTripLoaded: false,
  classTrip: null,
  tripParams: initParams(),
  tripnew: null,
  tripnewLoaded: false,
};


function initParams(): TripParams {
  return {
    classId: 0
  }
};



export const fetchTrip = createAsyncThunk <any[], void, { state: RootState }>(
  "trip/fetchTrip",
  async (_, thunkAPI) => {

    try {
      const data = await agent.Trip.gettrip(thunkAPI.getState().trip.tripParams);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchTripNew = createAsyncThunk(
  "trip/GetTripNew",
  async (_, thunkAPI) => {

    try {
      const data = await agent.Trip.getNewtrip();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchVehicleSelect = createAsyncThunk(
  "car/fetchCars",
  async (_, thunkAPI) => {
    try {
      const result = await agent.Car.getcar();

      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchClassTripAsync = createAsyncThunk(
  "ClassTrip/GetClassTrip",
  async (_, thunkAPI) => {
    try {
      const result = await agent.ClassTrip.getClassTrip();

      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const fetchLocationSelect = createAsyncThunk(
  "location/fetchLocations",
  async (_, thunkAPI) => {

    try {
      const result = await agent.Location.getlocation();
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchDetailTrip = createAsyncThunk<any, number>(
  "Trips/fetchDetailTrip",
  async (id, thunkAPI) => {
    try {
      return await agent.Trip.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const fetchDetailAddMultipleLocations = createAsyncThunk<any, number>(
  "DetailAddMultipleLocations/fetchDetailAddMultipleLocations",
  async (id, thunkAPI) => {
    try {
      return await agent.AddMultipleLocations.getAddMultipleLocations(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    resetDetailTrip: (state) => {
      state.tripsdetailLoaded = false;
    },

    setTripParams: (state, action) => {
      state.tripsLoaded = false;
      state.tripParams = { ...state.tripParams, ...action.payload };
  },
  resetTripParams: (state) => {
    state.tripsLoaded = false;
      state.tripParams = initParams();
  },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrip.fulfilled, (state, action) => {
      state.trip = action.payload;
      state.tripsLoaded = true
    });
    builder.addCase(fetchDetailTrip.fulfilled, (state, action) => {
      if (action.payload.msg === 'OK')
        state.detailTrip = action.payload.data;
      state.tripsdetailLoaded = true
    });
    builder.addCase(fetchVehicleSelect.fulfilled, (state, action) => {
      state.vehicle = action.payload;
      state.vehicleLoaded = true;
    });
    builder.addCase(fetchLocationSelect.fulfilled, (state, action) => {
      state.location = action.payload;
      state.locationLoaded = true;
    });
    builder.addCase(fetchClassTripAsync.fulfilled, (state, action) => {
      state.classTrip = action.payload.data;
      state.classTripLoaded = true;
    });
    builder.addCase(fetchTripNew.fulfilled, (state, action) => {
      state.tripnew = action.payload;
      state.tripnewLoaded = true
    });

    
  },
});




export const { resetDetailTrip ,setTripParams,resetTripParams} = tripSlice.actions