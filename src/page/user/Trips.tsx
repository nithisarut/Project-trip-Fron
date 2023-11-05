import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Input, Pagination, Radio, RadioChangeEvent, Space } from 'antd';

import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchClassTripAsync, fetchTrip, resetTripParams } from '../../app/store/tripSlice';
import Footer from '../../components/user/Footer'
import Navbar from '../../components/user/Navbar'
import { setTripParams } from '../../app/store/tripSlice';
import usePagination from '../../app/hooks/usePagination';





function Trips() {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const dispatch = useAppDispatch();
  const { tripsLoaded, trip } = useAppSelector((state) => state.trip);

  const { classTripLoaded, classTrip } =
    useAppSelector((state) => state.trip);

  useEffect(() => {
    if (!classTripLoaded) dispatch(fetchClassTripAsync());
  }, [classTripLoaded, dispatch]);

  const [value, setValue] = useState(0);



  const SearchClass = (e: RadioChangeEvent) => {
    dispatch(setTripParams({ classId: e.target.value }))
    setValue(e.target.value)
  }

  const ResetSearchClass = () => {
    dispatch(resetTripParams())
    setValue(0)
  }

  useEffect(() => {
    if (!tripsLoaded) dispatch(fetchTrip());
  }, [tripsLoaded, dispatch]);
  console.log(trip)
  const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 6 });
  return (
    <React.Fragment>
      <Navbar />
      <div className="bg-white">
        <div>
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">ระดับ</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200  " style={{ justifyContent: "space-around", display: "flex" }}>


                      <Radio.Group onChange={SearchClass} value={value} className='mt-5' >

                        <Space direction="vertical"  >
                          <a type='text' onClick={() => ResetSearchClass()} >ทั้งหมด</a>
                          {classTrip?.map((dataCalssTrip: any, index) => {
                            return <Radio key={index} value={dataCalssTrip.id}>{dataCalssTrip.name}</Radio>
                          })}

                        </Space>
                      </Radio.Group>

                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">แพ็กเกจท่องเที่ยว</h1>
              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="space-y-4 border-b border-gray-200 pb-6  text-gray-900">



                    <Radio.Group onChange={SearchClass} value={value} className='mt-5' >

                      <Space direction="vertical"  >
                        
                        
                        <Radio value={0}>ทั้งหมด</Radio>
                        {classTrip?.map((dataCalssTrip: any, index) => {
                          return <Radio key={index} value={dataCalssTrip.id}>{dataCalssTrip.name}</Radio>
                        })}

                      </Space>
                    </Radio.Group>

                  </ul>


                </form>
                <div className="lg:col-span-3">

                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">

                    {trip ? trip.data?.map((data: any, index: any) => {
                      return index >= minIndex &&
                        index < maxIndex && 
                          <div className="bg-blackThrem  transform hover:scale-105 transition duration-500">

                            <div className="mx-auto container py-8">
                              <div className="flex flex-wrap items-center lg:justify-between justify-center">

                                <div className="mx-2 w-72 lg:mb-0 mb-8">
                                  <div>
                                    <img src={data.imageTrip} className="w-full h-44" />
                                  </div>
                                  <div className="bg-white">
                                    <div className="flex items-center justify-between px-4 pt-4">
                                      <div>

                                      </div>
                                      <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                                        <p className="text-xs text-yellow-500">{data.classTrip.name}</p>
                                      </div>
                                    </div>
                                    <div className="p-4">
                                      <div className="flex items-center">
                                        <h2 className="font-semibold">{data.tripName}</h2>
                                      </div>
                                      <div className="flex mt-4">
                                        <div>
                                          <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">ออกเดินทาง {new Date(data.dateTimeStart).toLocaleString("th-TH", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "2-digit",
                                          })}</p>
                                        </div>
                                        <div className="pl-2">
                                          <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">ถึง {new Date(data.dateTimeEnd).toLocaleString("th-TH", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "2-digit",
                                          })}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between py-4">
                                        <Link key={index} to={`/DetailTrip/${data.id}`}  className=" text-black bg-blueeThrem border-0 py-1 px-2 focus:outline-none rounded" style={{color:"white"}}>รายละเอียด</Link>
                                        <h3 className="text-indigo-700 text-xs font-semibold">ราคา {new Intl.NumberFormat().format(data?.price as any)} บาท </h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                    
                    }

                    ) : "ไม่มีสินค้า"}
                  </div>
                  <div className='space-y-4 border-b border-gray-200 pb-6  text-gray-900'></div>
                  {trip && trip!.data?.length > 0 && <Pagination

                    pageSize={pageSize}
                    current={current}
                    total={trip!.data?.length}
                    onChange={handleChange}
                    className="center"
                    style={{ marginTop: "30px",display:"flex" ,justifyContent:"end"  }}
                  />}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />

    </React.Fragment>
  )
}

export default Trips