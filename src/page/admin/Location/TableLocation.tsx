import { Button, Col, Image, Input, Row } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchLocationAsync } from '../../../app/store/locationSlice';
import NavAdmin from '../../../components/admin/NavAdmin';
import Swal from 'sweetalert2';
import agent from '../../../app/api/agent';
import { Link, Search, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfLocation from './PdfLocation';
import { Datum, LocationTrip } from '../../../app/models/Location';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import usePagination from '../../../app/hooks/usePagination';
import DetailLocation from './ModalAddimage';

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
};
function TableLocation() {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState<Datum | null>(null);
    const navigate = useNavigate();
    const { Search } = Input;
    const {
        locationsLoaded,
        location
    } = useAppSelector(state => state.location);//
    useEffect(() => {
        dispatch(fetchLocationAsync(""));
    }, [locationsLoaded, dispatch]);

    const deleteLocation = (id: any) => {
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
                    await agent.Location.deleteLocation(id).then(() => dispatch(fetchLocationAsync("")));
                })
            }
        })
    }


    const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 5 });

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }
    const onSearch = (value: string) => dispatch(fetchLocationAsync(value));
    return (
        <React.Fragment>
            <NavAdmin>

                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">ข้อมูลสถานที่</h3>
                        </div>
                        <Search placeholder="" allowClear onSearch={onSearch} style={{ width: 200 }} />
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <PDFDownloadLink
                                document={<PdfLocation location={location as LocationTrip} />}
                                fileName="รายงานข้อมูลสถานที่.pdf"
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
                                    รูป
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    ชื่อสถานที่
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    ตำบล
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    อำเภอ
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    ประเภท
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">

                                </th>

                            </tr>
                        </thead>

                 
                        
                        {React.Children.toArray(location?.data.map((item, index) => index >= minIndex &&
                            index < maxIndex && <tbody>
                                <tr>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <Image width={100} src={item.image} />
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        {item.locationName}
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.subDistrict}
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.district}
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.typeName}
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
                                                                    to={"/CreateLocation"} state={item}
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
                                                                    to={"#"} onClick={() => deleteLocation(item.locationID)}
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
                                                                    to={`/DetailLocationPage/`}
                                                                    state={item}
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
                        ))}
                    </table>
                    {location && location!.data?.length > 0 && <Pagination
                        pageSize={pageSize}
                        current={current}
                        total={location!.data?.length}
                        onChange={handleChange}
                        className="center"
                        style={{ marginTop: "30px", display: "flex", justifyContent: "end" }}
                    />}
                </div>


            </NavAdmin>

        </React.Fragment>
    )
}

export default TableLocation

