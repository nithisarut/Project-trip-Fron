import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import TabLocation from '../../user/TabLocation';

interface Props {
    isModalOpen : boolean ,
    setIsModalOpen : Function ,
    dataDetail : any ,
    setDataDetail : Function

}

function DetailTrip({ isModalOpen , setIsModalOpen , dataDetail , setDataDetail}  : Props) {

  
    const handleOk = () => {
      setIsModalOpen(false);
      setDataDetail(null);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setDataDetail(null);
    };

    console.log(dataDetail)

  return (
   <React.Fragment>
      <Modal width={1300}  footer={false}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className="text-gray-700 body-font overflow-hidden bg-white mt-5 ">
        <div className=" px-5  mx-auto ">

          <div className="lg:w-5/5 mx-auto flex flex-wrap ">

            <img className="lg:w-1/2  rounded border border-gray-200"  src={dataDetail?.imageTrip} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{dataDetail?.tripName}</h1>
              <div className="flex mb-4">
                <h1 className="leading-relaxed">ระดับ {dataDetail?.classTrip?.name}</h1>
              </div>

              <p className="leading-relaxed">{dataDetail?.detail}</p>


              <div className="flex mt-6 items-center ">
                <p className="leading-relaxed text-gray-900">จำนวนคนที่รับ {dataDetail?.amount} คน</p>
              </div>
            
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5" />
              <div className='title-font font-medium text-1xl text-black"'>ตารางการจัดกิจกรรม</div>
              <br />
  <Link to={dataDetail && dataDetail!.file.toString() || ""} target="_blank" className=" ml-auto text-black bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" style={{color:"white"}}>เอกสาร</Link>            
            </div>

          </div>
          <br />

          {dataDetail && dataDetail!.addMultipleLocations?.length > 0 ? <TabLocation addMultipleLocations={dataDetail?.addMultipleLocations as any} /> : ""}

        </div>
        <div className=" 2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">ข้อมูลของรถที่จะเดินทาง</h1>
                    <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">ชื่อคนขับ : {dataDetail?.vehicle.driverName}</h1>
                    <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">บริษัท : {dataDetail?.vehicle.company}</h1>
                    <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">เบอร์โทร : {dataDetail?.vehicle.tel}</h1>

                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src={dataDetail?.vehicle.imageDriver} alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">รุ่นรถ : {dataDetail?.vehicle.vehicleName}</h1>
                    <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">บริษัท : {dataDetail?.vehicle.company}</h1>
                    <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">เบอร์โทร : {dataDetail?.vehicle.tel}</h1>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src={dataDetail?.vehicle.imageVehicle} alt="A group of People" />
                </div>
            </div>
        </div>
      </div>
      
      </Modal>
   </React.Fragment>
  )
}

export default DetailTrip