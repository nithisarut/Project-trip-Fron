import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, Image, MenuProps, message, Pagination, Space, Tooltip } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchTrip } from '../../../app/store/tripSlice';
import NavAdmin from '../../../components/admin/NavAdmin';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfTrip from './PdfTrip';
import { Trip } from '../../../app/models/Trip';
import usePagination from '../../../app/hooks/usePagination';
import Swal from 'sweetalert2';
import agent from '../../../app/api/agent';
import DetailTrip from './DetailTrip';

function TableTrip() {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const {
        tripsLoaded,
        trip
    } = useAppSelector(state => state.trip);//
    useEffect(() => {
        dispatch(fetchTrip());
    }, [tripsLoaded, dispatch]);

    const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 5 });

    const deleteTrip = (id: any , car : any) => {
        Swal.fire({
            title: 'คุณแน่ใจไหม?',
            text: "คุณจะเปลี่ยนกลับไม่ได้!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่ ลบเลย!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'ลบแล้ว!',
                    'ไฟล์ของคุณถูกลบแล้ว',
                    'success'
                ).then(async () => {
                    await agent.Trip.deleteTrip(id).then(async () => {
                        await agent.Car.updateCar(car).then( () => {
                            dispatch(fetchTrip());
                        });;
                    });
                   
                })
            }
        })
    }

    console.log(trip)

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <React.Fragment>
            <NavAdmin>


                <div className='bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-ful'>
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">ข้อมูลทัวร์</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">

                                <PDFDownloadLink
                                    document={<PdfTrip trip={trip as Trip} />}
                                    fileName="รายงานข้อมูลสถานที่.pdf"
                                >
                                    <Button style={{ margin: "10px", right: "10px" }}>
                                        PDF
                                    </Button>
                                </PDFDownloadLink>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-y-auto">
                        <table className="items-center bg-transparent w-full  ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        รูป
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        ชื่อแพ็กเกจทัวร์
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        ราคา
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        จำนวนที่รับ
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        ระดับ
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">

                                    </th>

                                </tr>
                            </thead>
                            <DetailTrip setDataDetail={setDataDetail} dataDetail={dataDetail} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

                            {React.Children.toArray(trip?.data.map((item: any, index: any) => {
                                    const cart = {
                                        VehicleRegistration : item.vehicle.vehicleRegistration ,
                                        NumberOFSeats : item.vehicle.numberOFSeats ,
                                        status : false,
                                        DriverName : item.vehicle.driverName,
                                        VehicleName : item.vehicle.vehicleName,
                                        Id : item.vehicle.id,
                                        Tel : item.vehicle.tel,
                                        Company : item.vehicle.company
                                    }
                                return index >= minIndex &&
                                    index < maxIndex && <tbody>
                                        <tr>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                <Image width={100} src={item.imageTrip} />
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {item.tripName}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {new Intl.NumberFormat().format(item.price as any)} บาท
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {item.amount} คน
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {item.classTrip.name}
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
                                                                            to={"/CreateTrip"} state={item}
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
                                                                            to={"#"} onClick={() => deleteTrip(item.id , cart)}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            ลบ
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to={""}
                                                                            onClick={() => {
                                                                                setIsModalOpen(true);
                                                                                setDataDetail(item);
                                                                            }}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            รายละเอียด
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
                            }
                            ))}
                        </table>
                        {trip && trip!.data?.length > 0 && <Pagination
                            pageSize={pageSize}
                            current={current}
                            total={trip!.data?.length}
                            onChange={handleChange}
                            className="center"
                            style={{ marginTop: "30px", display: "flex", justifyContent: "end" }}
                        />}
                    </div>
                </div>
            </NavAdmin>
        </React.Fragment>
    )
}

export default TableTrip