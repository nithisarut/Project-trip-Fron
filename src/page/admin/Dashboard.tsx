
import React, { useEffect, useState } from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Column2D from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

import NavAdmin from '../../components/admin/NavAdmin'
import ChartColum from "./ChartColum";
import agent from "../../app/api/agent";
import { ReportData } from "../../app/models/Report";
import { Button, DatePicker, DatePickerProps, Row, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchAccountAll } from "../../app/store/accountSlice";
import { fetchTrip } from "../../app/store/tripSlice";
import { fetchAllPayment } from "../../app/store/payMent";
import { orderTripSlice } from "../../app/store/orderTripSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFchat from "./PDFchat";

function Dashboard() {
  const [dataReport, setDataRepost] = useState<ReportData | null>(null);
  const [year, setYear] = useState<any | null>(null);
  const [statusButton , setStatusButton] = useState<string>("price");
  const dispatch = useAppDispatch();

  const { RangePicker } = DatePicker;
  const {
    accountLoaded,
    accountAll
  } = useAppSelector(state => state.account);//
  useEffect(() => {
    dispatch(fetchAccountAll());

    console.log(accountAll)

  }, [accountLoaded, dispatch]);

  const {
    payMentLoaded,
    payMent,
  } = useAppSelector(state => state.payMent);//
  useEffect(() => {
    dispatch(fetchAllPayment());
  }, [payMentLoaded, dispatch]);

  const {
    tripsLoaded,
    trip
  } = useAppSelector(state => state.trip);//
  useEffect(() => {
    dispatch(fetchTrip());
  }, [tripsLoaded, dispatch]);




  useEffect(() => {
    loadReport(null);
  }, [])

  const loadReport = async (dataDate: any) => {
    const { data } = await agent.Report.getReport(dataDate);
    if (data) setDataRepost(data);
  };


  const onChange = (_: any, dateString: any) => {
    loadReport({
      start: new Date(dateString[0]).toLocaleDateString("en-US"),
      end: new Date(dateString[1]).toLocaleDateString("en-US")
    });
    setYear(new Date(dateString).getFullYear());
  };





  return (
    <>
      <NavAdmin>

        <div className="mb-5 container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
          <div className="w-full px-4 py-5 bg-gray-800 rounded-lg shadow">
            <div className="text-sm font-medium text-white truncate">
              ผู้ใช้งานทั้งหมด
            </div>
            <div className="mt-1 text-3xl font-semibold text-white">
              {accountAll?.data?.length}
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-gray-800 rounded-lg shadow">
            <div className="text-sm font-medium text-white truncate">
              แพ็กเกจทัวร์ทั้งหมด
            </div>
            <div className="mt-1 text-3xl font-semibold text-white">
              {trip?.data?.length}
            </div>

          </div>
          <div className="w-full px-4 py-5 bg-gray-800 rounded-lg shadow">
            <div className="text-sm font-medium text-white truncate">
              ตรวจสอบการชำระเงิน
            </div>
            <div className="mt-1 text-3xl font-semibold text-white">
              {payMent?.data?.length}
            </div>
          </div>



        </div>
        <PDFDownloadLink
          document={<PDFchat data={dataReport} year={year} />}
          fileName="รายงานข้อมูลสถานที่.pdf"
        >
          <Button style={{ margin: "10px", right: "10px" }}>
            PDF
          </Button>
        </PDFDownloadLink>
        {/* <DatePicker onChange={onChange} picker="year" className='mb-5 mr-5' /> */}

        <RangePicker onChange={onChange} />
        <Row style={{ marginBottom: "5px", }}>
          <Space>
            <Button onClick={()=> setStatusButton("price")}>ตัวเลข</Button>
            <Button onClick={()=> setStatusButton("persent")}>เปอร์เซ็น</Button>
          </Space>
        </Row>
        <ChartColum statusButton={statusButton} ReactFC={ReactFC} data={dataReport} typeChart={""} />
      </NavAdmin>

    </>

  )
}

export default Dashboard