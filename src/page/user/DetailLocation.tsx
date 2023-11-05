import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { ImageDetailLocation } from './TabLocation';

function DetailLocation({data}:any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    var bgColors = {
      "BlueThream": "#0B2447",
    
    };
  
  return (
    <React.Fragment>
  <Button style={{ backgroundColor: bgColors.BlueThream }} type="primary" onClick={showModal}>
       รายละเอียด
      </Button>
      <Modal footer={false} width={1400} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">{data.locationName}</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">{data.details}</p>
                    <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">สถานที่ตั้ง</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">

                  <li className="text-gray-400">
                    <span className="text-gray-600">ตำบล {data.district}</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">อำเภอ {data.subDistrict}</span>
                  </li>

                </ul>
              </div>
            </div>

                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src={data.image} alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-12/12 lg:pt-8">
                    <ImageDetailLocation locationId={data.locationID} />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
              
                <div className="w-full lg:w-12/12 lg:pt-8">
                  
                  
                   
                </div>
            </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default DetailLocation