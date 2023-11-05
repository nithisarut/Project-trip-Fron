import React, { useState } from 'react'
import Navbar from '../../components/user/Navbar';
import { Result, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Footer from '../../components/user/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DatumTrip } from '../../app/models/Trip';
import { OrderRequest } from '../../app/models/OrderTrip';
import { Form, Formik } from 'formik';
import { loadAccountStorage } from './Profile';
import agent from '../../app/api/agent';
import Swal from 'sweetalert2';
import { fetchTrip } from '../../app/store/tripSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';

dayjs.extend(customParseFormat);



interface ILocation {
  state: DatumTrip | null;
}



function FormRent() {
  const navigate = useNavigate();
  const account = loadAccountStorage();
  const dispatch = useAppDispatch()
  const [price01, setPrice01] = useState(0);
  const [price02, setPrice02] = useState(0);
  const total = price01 + price02;
  const { state }: ILocation = useLocation();



  //ส่งค่าไปbackend
  const handleSubmitForm = async (value: any) => {
    let result = await agent.OrderTrip.createOrderTrip(value);
    if (result!.msg === "OK")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        dispatch(fetchTrip());
        navigate("/Profile");
      });
  }

  console.log(state)

  const values = {

    name: "",
    tel: "",
    contactTime: null,
    amountAdult: price01,
    amountKid: price02,
    total: 0,
    singleStay: 0,
    stay2Persons: 0,
    stay3Persons: 0,
    accountsId: account.id,
    tripId: state?.id
  };



  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="flex justify-center items-center">
        <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
          <div className="flex flex-col justify-start items-start w-full space-y-9">
            <div className="flex justify-start flex-col items-start space-y-2">
              <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
                <svg className="fill-stroke" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.91681 7H11.0835" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.91681 7L5.25014 9.33333" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.91681 7.00002L5.25014 4.66669" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Link to="" className="text-sm leading-none">กลับ</Link>
              </button>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">ตรวจสอบก่อนจ่าย</p>

            </div>

            <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
              <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                <div className="flex flex-col justify-start items-start w-full space-y-4">
                  <p className="text-xl md:text-2xl leading-normal text-gray-800">{state?.tripName}</p>
                  <p className="text-xl md:text-2xl leading-normal text-gray-800">จำนวนที่ว่าง {state?.amount} คน</p>
                  <p className="text-base font-semibold leading-none text-gray-600"> {new Intl.NumberFormat().format(state?.price as any)} บาท (ต่อคน)</p>
                </div>
                <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                  <img src={state?.imageTrip} alt="headphones" />
                </div>
              </div>

              <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">


                <div className="flex flex-row justify-center items-center mt-6">
                  <hr className="border w-full" />
                  <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">กรอกข้อมูล</p>
                  <hr className="border w-full" />
                </div>
                <Formik
                  initialValues={values}
                  //validationSchema={LocationValidate}
                  onSubmit={async (values) => {
                    values.total = total;

                    handleSubmitForm(values);
                  }}

                >{({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue }) => {


                  return <Form className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="mt-8">
                      <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                        ชื่อผู้จอง
                      </label>
                      <div className="mt-2.5">

                        <input onChange={handleChange}
                          onBlur={
                            handleBlur
                          }

                          name="name"
                          id="name"
                          autoComplete="organization" className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="ชื่อ - นามสกุล" />
                      </div>

                      <div className="mt-2 flex-col">
                        <div>
                          <label htmlFor="tel" className="block text-sm font-semibold leading-6 text-gray-900">
                            เบอร์ติดต่อ
                          </label>

                          <div className="mt-2.5">
                            <input onChange={handleChange}
                              onBlur={
                                handleBlur
                              }
                              name="tel"
                              id="tel"
                              autoComplete="given-name" className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="เบอร์ติดต่อ" />
                          </div>

                        </div >
                        <div className="mt-2 flex-col">
                          <label className="block text-sm font-semibold leading-6 text-gray-900">
                            จำนวนคน (ส่วนของเด็กจะลดราคา 25%)
                          </label>
                          <div className="flex-row flex">
                            <input onBlur={
                              handleBlur
                            }
                              name="amountAdult"
                              onChange={(e) => {
                                setFieldValue("amountAdult", e.target.value);
                                setPrice01(Number(e.target.value) * Number(state?.price));
                              }}
                              min={0}
                              className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="number" placeholder=" จำนวนผู้ใหญ่" />
                            <input onBlur={
                              handleBlur
                            }
                              name="amountKid"
                              min={0}
                              onChange={(e) => {
                                setFieldValue("amountKid", e.target.value);
                                setPrice02(Number(e.target.value) * Number(percent(state?.price, 25)));
                              }}
                              className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="number" placeholder="จำนวนเด็ก" />
                          </div>
                        </div>
                      </div>




                      <div className="mt-2 flex-col">
                        <label className="mt-10 text-base font-semibold leading-4 text-gray-800">ระบุจำนวนห้องพัก</label>
                        <div className="mt-2 flex-col">
                          <div>
                            <input min={0} onChange={handleChange}
                              onBlur={
                                handleBlur
                              }
                              name="singleStay"
                              className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="number" placeholder="พักเดี่ยว" />
                          </div>
                          <div className="flex-row flex">
                            <input min={0} onChange={handleChange}
                              onBlur={
                                handleBlur
                              }
                              name="stay2Persons"
                              className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="number" placeholder=" พัก 2 ท่าน" />
                            <input min={0} onChange={handleChange}
                              onBlur={
                                handleBlur
                              }
                              name="stay3Persons"
                              className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="number" placeholder="พัก 3 ท่าน" />
                          </div>
                        </div>



                        <div className="mt-2 flex-col">
                          <label htmlFor="contactTime" className="block text-sm font-semibold leading-6 text-gray-900">
                            เวลาที่สามารถติดต่อได้
                          </label>
                          <div className="mt-2.5">

                            <TimePicker
                              size='large'
                              style={{ width: "100%" }}
                              onChange={(_: any, timeString: string) => setFieldValue("contactTime", timeString)}
                              name="contactTime"
                              onBlur={handleBlur}
                              placeholder="เลือกเวลา"
                              defaultValue={dayjs('00:00:00', 'HH:mm:ss')} />

                          </div>
                        </div>
                      </div>



                      <div className="flex-row flex ">




                      </div>



                      <button onClick={handleSubmit as any} className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                        <div>
                          <p className="text-base leading-4">จ่าย {new Intl.NumberFormat().format(total as any)}  บาท</p>
                        </div>
                      </button>
                    </div>
                  </Form>
                }}
                </Formik>
              </div>
            </div>
          </div>
        </div>



      </div>


      <Footer></Footer>
    </React.Fragment>
  )
}

const percent = (num: any, perC: any) => num - (num * perC / 100);

export default FormRent