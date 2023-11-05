import { Button, Dropdown, Image, MenuProps, message, Pagination, Space } from 'antd';
import React, { Fragment, useEffect } from 'react'
import { fetchCarsAsync } from '../../../app/store/carSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import NavAdmin from '../../../components/admin/NavAdmin'
import Swal from 'sweetalert2';
import agent from '../../../app/api/agent';
import { Link, useNavigate } from 'react-router-dom';
import { Car } from '../../../app/models/Car';
import { PDFDownloadLink } from "@react-pdf/renderer"
import PdfCar from './PdfCar';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import usePagination from '../../../app/hooks/usePagination';
function Car() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        carsLoaded,
        car,

    } = useAppSelector(state => state.car);


    useEffect(() => {
        dispatch(fetchCarsAsync());
    }, [carsLoaded, dispatch]);

    const deleteCar = (id: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(async () => {
                    await agent.Car.deleteCar(id).then(() => dispatch(fetchCarsAsync()));
                })
            }
        })
    }


    const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 5 });





    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    


    return (
        <React.Fragment>
            <NavAdmin>

                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">ข้อมูลพาหนะ</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">

                            <PDFDownloadLink
                                document={<PdfCar car={car as Car} />}
                                fileName="รายงานข้อมูลรถ.pdf"
                            >
                                <Button style={{ margin: "10px", right: "10px" }}>
                                    PDF
                                </Button>
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>

                <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    พาหนะ
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    คนขับรถ
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    ชื่อคนขับรถ
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    บริษัท
                                </th>

                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    สถานะ
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">

                                </th>
                            </tr>
                        </thead>

                        {React.Children.toArray(car?.data.map((item, index) => index >= minIndex &&
                            index < maxIndex && <tbody>
                                <tr>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <Image width={100} src={item.imageVehicle} />
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        <Image width={100} src={item.imageDriver} />
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.driverName}
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.company}
                                    </td>

                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {!item.status ? <span className="bg-green-500 text-white-600 py-1 px-3 rounded-full text-xs">ว่าง</span> : <span className="bg-red-500 text-white-600 py-1 px-3 rounded-full text-xs">ไม่ว่าง</span>}
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                    ตัวเลือก
                                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to={"/CreateCar"} state={item}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    แก้ไข
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to={"#"} onClick={() => deleteCar(item.vehicleID)}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    ลบ
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                       

                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </td>
                                </tr>

                            </tbody>
                        ))}
                    </table>

                    {car && car!.data?.length > 0 && <Pagination
                        pageSize={pageSize}
                        current={current}
                        total={car!.data?.length}
                        onChange={handleChange}
                        className="center"
                        style={{ marginTop: "30px" ,display:"flex" ,justifyContent:"end"  }}
                    />}

                </div>
            </NavAdmin>





        </React.Fragment>
    )
}

export default Car