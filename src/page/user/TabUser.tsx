import React, { useEffect, useState } from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import Payment from './PaymentPage';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchAccount, loadAccountStorage } from '../../app/store/accountSlice';
import { useNavigate } from 'react-router-dom';
import { fetchOrderTrip } from '../../app/store/orderTripSlice';
import PaymentPage from './PaymentPage';
import { OrderStatus } from '../../app/models/OrderTrip';
import DetailOrder from './DetailOrder';
function TabUser() {
  const { orderTrip } = useAppSelector(state => state.orderTrip);

  const dispatch = useAppDispatch();
  const account = loadAccountStorage();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchOrderTrip(account.id));

  }, [orderTrip, dispatch]);

  useEffect(() => {
    if (!account) dispatch(fetchAccount());

  }, [account, dispatch]);


  var bgColors = {
    "BlueThream": "#576CBC",

  };

  var bgColorss = {
    "YeeolowThrem": "#FFAE00",

  };

  console.log(orderTrip)


  const StatusKey = ({ status }: any) => {
    switch (status) {
      case 0:
        return <p className="bg-red-500 text-white py-1 px-3 rounded-full text-xs" >ชำระเงิน</p>
      case 1:
        return <p className="bg-yellow-500 text-white py-1 px-3 rounded-full text-xs">ตรวจสอบ</p>
      case 2:
        return <p className="bg-green-500 text-white py-1 px-3 rounded-full text-xs" >สำเร็จ</p>

      default:
        return <p></p>

    }
  }

  const data = [
    {
      label: "ใบจอง",
      value: "ใบจอง",
      desc: <>{orderTrip?.length > 0 ? orderTrip?.filter((e: any) => e.status !== OrderStatus.SuccessfulPayment).map((order: any) => {
        return <div key={order.id}
          className="mt-5 relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <img src={order.trip?.imageTrip} />
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center">

              <div className="flex items-center">

                <a className="text-gray-600 font-bold text-sm ml-1">
                  <StatusKey status={order.status} />
                </a>
              </div>
            <DetailOrder data ={order}/>

            </div>

            <h3 className="font-black text-gray-800 md:text-3xl text-xl">{order.trip?.tripName}</h3>

            <p className="text-xl font-black text-gray-800">
              <span className="font-normal text-gray-600 text-base">วันออกเดินทาง/</span>
           เริ่ม {new Date(order.trip?.dateTimeStart).toLocaleString("th-TH", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "2-digit",
                                          })}  สิ้นสุด {new Date(order.trip?.dateTimeEnd).toLocaleString("th-TH", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "2-digit",
                                          })}
           

            </p>
            {order.status === OrderStatus.WaitingForPayment ? (<PaymentPage orDerTripId={order.id} loadData={() => dispatch(fetchOrderTrip(account.id))} />) : null}
          </div>
        </div>



      }) : <><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDgpmPpmhgLPrLZdxJNBhEnK3OxJdv3IsTpRQY8m1HWVO240zJNCotkBU3HAMcN7JY64c&usqp=CAU'

        style={{ width: "62.5rem" }} ></img></>}


      </>
    },
    {
      label: "สำเร็จ",
      value: "สำเร็จ",
      desc: <>
        {orderTrip?.length > 0 ? orderTrip?.filter((e: any) => e.status === OrderStatus.SuccessfulPayment).map((order: any) => {
          return <div key={order.id}
            className="mt-5 relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <div className="w-full md:w-1/3 bg-white grid place-items-center">
              <img src={order.trip?.imageTrip} />
            </div>
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
              <div className="flex justify-between item-center">

                <div className="flex items-center">

                  <a className="text-gray-600 font-bold text-sm ml-1">
                    <StatusKey status={order.status} />
                  </a>
                </div>
                <DetailOrder data ={order}/>

              </div>

              <h3 className="font-black text-gray-800 md:text-3xl text-xl">{order.trip?.tripName}</h3>

              <p className="text-xl font-black text-gray-800">
              <span className="font-normal text-gray-600 text-base">วันออกเดินทาง/</span>
           เริ่ม {new Date(order.trip?.dateTimeStart).toLocaleString("th-TH", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "2-digit",
                                          })}  สิ้นสุด {new Date(order.trip?.dateTimeEnd).toLocaleString("th-TH", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "2-digit",
                                          })}
           


              </p>
              {order.status === OrderStatus.WaitingForPayment ? (<PaymentPage orDerTripId={order.id} loadData={() => dispatch(fetchOrderTrip(account.id))} />) : null}
            </div>
          </div>



        }) : <><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDgpmPpmhgLPrLZdxJNBhEnK3OxJdv3IsTpRQY8m1HWVO240zJNCotkBU3HAMcN7JY64c&usqp=CAU'

          style={{ width: "62.5rem" }} ></img></>}</>,
    },
  ];

  return (
    <React.Fragment>
      <Tabs value="ใบจอง" >
        <TabsHeader style={{ backgroundColor: bgColors.BlueThream }}>
          {data.map(({ label, value }) => (

            <Tab key={value} value={value}>

              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              <div className='bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-ful' >
                {desc}
              </div>

            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </React.Fragment>
  )
}

export default TabUser