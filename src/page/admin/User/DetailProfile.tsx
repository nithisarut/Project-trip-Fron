import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import NavAdmin from '../../../components/admin/NavAdmin';

function DetailProfile() {

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
  return (
    <React.Fragment>
        <NavAdmin>
        <Button type="primary" onClick={showModal}>
    Open Modal
  </Button>
  <Modal width={1300} footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
           <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'></img>
           
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="full_name">ชื่อ - นามสกุล</label>
                <input disabled type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="email">อีเมล์</label>
                <input disabled type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="address">เบอร์โทร</label>
                <input disabled type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="city">หน้าที่</label>
                <input disabled type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>

         

   
           
      
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">แก้ไข</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  </Modal>
        </NavAdmin>
  
    </React.Fragment>
  
  )
}

export default DetailProfile