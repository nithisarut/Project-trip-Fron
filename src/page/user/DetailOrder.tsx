import { Button, Modal } from 'antd';
import moment from 'moment-timezone';
import React, { useState } from 'react'

function DetailOrder({data}:any) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);


    var bgColors = {
        "BlueThream": "#0B2447",
      
      };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <React.Fragment>
            <Button type="primary" style={{ backgroundColor: bgColors.BlueThream }} onClick={showModal}>
                รายละเอียด
            </Button>
            <Modal title="รายละเอียด" footer={false} width={600} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

         
               
                    <div className="text-gray-600">
                     

                    </div>

                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm  grid-cols-2 md:grid-cols-6">
                        <div className="md:col-span-3">
                          <label htmlFor="full_name">ชื่อคนจอง</label>
                          <input disabled type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data.name} />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="email">เบอร์ติดต่อ</label>
                          <input disabled  type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data.tel}  />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="city">ผู้ใหญ่</label>
   <input disabled type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={`${data.amountAdult} คน `} placeholder="" />
                        
                        </div> <div className="md:col-span-3">
                          <label htmlFor="city">เด็ก</label>
                          <input disabled type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={`${data.amountKid} คน `} placeholder="" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="address">พักเดี่ยว</label>
                          <input disabled  type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={`${data.singleStay} ห้อง `} placeholder="" />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="address">พัก2ท่าน</label>
                          <input disabled  type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={`${data.stay2Persons} ห้อง `} placeholder="" />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="address">พัก3ท่าน</label>
                          <input disabled  type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={`${data.stay3Persons} ห้อง `} placeholder="" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="city">เบอร์ติดต่อ</label>
                          <input disabled type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data.tel} placeholder="" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="city">เวลาที่ติดต่อ</label>
                          <input disabled type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={moment.utc(data.contactTime).tz('Asia/Bangkok').format(' HH:mm:ss')} placeholder="" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="city">ราคารวมทั้งหมด</label>
                          <input disabled type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data.total} placeholder="" />
                        </div>

                      </div>
                    </div>
                  
               


             
            </Modal>
        </React.Fragment>
    )
}

export default DetailOrder