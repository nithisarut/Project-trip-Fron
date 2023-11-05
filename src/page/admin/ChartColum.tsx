import React, { useEffect } from 'react'
import { ReportData } from '../../app/models/Report';
import { DatePicker, DatePickerProps } from 'antd';

interface Props {
  ReactFC: any;
  data: ReportData | null;
  typeChart: string;
  statusButton :string;
}

const value = [
    {
        month :"1",
        label: "มกราคม",
        value: "" 
    },
    {
        month :"2",
        label: "กุมภาพันธ์",
        value: ""
    },
    {
        month :"3",
        label: "มีนาคม",
        value: ""
    },
    {
        month :"4",
        label: "เมษายน",
        value: ""
    },
    {
        month :"5",
        label: "พฤษภาคม",
        value: ""
    },
    {
        month :"6",
        label: "มิถุนายน",
        value: ""
    },
    {
        month :"7",
        label: "กรกฏาคม",
        value: ""
    },
    {
        month :"8",
        label: "สิงหาคม",
        value: ""
    },
    {
        month :"9",
        label: "กันยายน",
        value: ""
    },
    {
        month :"10",
        label: "ตุลาคม",
        value: ""
    },
    {
        month :"11",
        label: "พฤศจิกายน",
        value: ""
    },
    {
        month :"12",
        label: "ธันวาคม",
        value: ""
    },
]

function ChartColum({ReactFC, data, typeChart , statusButton}: Props) {

 
 useEffect(() => {

 }, [data]);

  const chartConfigs = {
    className: "text-st",
    type: "column3d",
    width: "100%",
    height: "400",
    dataFormat: "json",
  
    dataSource: {
            chart: {
                caption: "รายได้ต่อปี",
                
                subCaption: `${new Intl.NumberFormat().format(data?.totalPrice as any)} บาท` ,
                xAxisName: "เดือน",
                yAxisName: "รายได้ (เป็น BTH)",
                theme: "fusion"
            },
            data: data ? value.map(j => {
               const priceTotal = data.trip.filter(e => e.month.toString() === j.month).reduce((curNumber, item) => {
                    return curNumber + (statusButton === "price" ? item.price : item.percent)
                }, 0);
                j.value  = priceTotal.toString()
                return j 
            }) : []
        
    
    }
  };


  return (
    <>
    <ReactFC   {...chartConfigs} />
    
    </>
    
  )
}

export default ChartColum