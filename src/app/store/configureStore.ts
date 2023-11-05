/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from './accountSlice';
import { carSlice } from './carSlice';
import { detailDetailImageLocationSlice } from './detailImageLocation';
import { homeSlice } from './homeSlice';
import { locationSlice } from './locationSlice';
import { tripSlice } from './tripSlice';
import { orderTripSlice } from './orderTripSlice';
import { payMentSlice } from './payMent';

export const store = configureStore({
  reducer: {
      account : accountSlice.reducer,
      trip : tripSlice.reducer, 
      car:carSlice.reducer,
      home:homeSlice.reducer,
      location:locationSlice.reducer,
      images:detailDetailImageLocationSlice.reducer,
      orderTrip:orderTripSlice.reducer,
      payMent:payMentSlice.reducer
  } ,
  
});


//เป็นค่า Default ที่มีอยู่ใน store คือ store.getState, store.dispatch (ใช้ตามรูปแบบเขาเลย)
export type RootState = ReturnType<typeof store.getState>// อ่าน state ; ค่าของ state ทั้งหมด
export type AppDispatch = typeof store.dispatch;			// dispatch สำหรับเรียก action

//สำหรับเรียกใข้ dispatch และ state (ใช้ตามรูปแบบเขาเลย)
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;