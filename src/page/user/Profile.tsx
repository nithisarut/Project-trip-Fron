import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { fetchAccount } from '../../app/store/accountSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import Footer from '../../components/user/Footer'
import Navbar from '../../components/user/Navbar'
import TabUser from './TabUser';




export const loadAccountStorage = () => JSON.parse(localStorage.getItem('account')!);
function Profile() {
  const [check, setcheck] = useState(false);
  const dispatch = useAppDispatch();
  const account = loadAccountStorage();
  const navigate = useNavigate()

  useEffect(() => {
    if (!account) dispatch(fetchAccount());

  }, [account, dispatch]);

  console.log(account)
  return (
    <React.Fragment>
      <Navbar />


      <div className="h-full mt-5"  >

        <div className=" block md:flex">



          <div className="w-full p-8 bg-white lg:ml-4 shadow-md">

            <div className="container max-w-screen-lg mx-auto">
              <div>


                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                      <img src={account.image}></img>

                    </div>

                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <label htmlFor="full_name">ชื่อ - นามสกุล</label>
                          <input disabled={!check}  type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={account.name} />
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="email">อีเมล์</label>
                          <input disabled={!check}  type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={account.email} placeholder="email@domain.com" />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="address">เบอร์โทร</label>
                          <input disabled={!check}  type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={account.phoneNumber} placeholder="" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="city">หน้าที่</label>
                          <input disabled={!check} type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={account.roleName} placeholder="" />
                        </div>

                        {/* <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                            <button onClick={() => { setcheck(true) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{!check ? "แก้ไข" : "บันทึก"}</button>
                          </div>
                        </div> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            <TabUser></TabUser>


          </div>

        </div>

      </div>
      <Footer />

    </React.Fragment>
  )
}

export default Profile