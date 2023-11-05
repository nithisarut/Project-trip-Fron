import React, { Fragment, useEffect } from 'react'
import { fetchAccount, fetchAccountAll } from '../../../app/store/accountSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import NavAdmin from '../../../components/admin/NavAdmin'
import { Link, useNavigate } from 'react-router-dom';
import { Image, Pagination } from 'antd';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import usePagination from '../../../app/hooks/usePagination';


function TableUser() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        accountLoaded,
        accountAll
    } = useAppSelector(state => state.account);//
    useEffect(() => {
        dispatch(fetchAccountAll());

        console.log(accountAll)

    }, [accountLoaded, dispatch]);


    const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 5 });

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }
    // const onSearch = (value: string) => dispatch(fetchLocationAsync(value));


    


    return (
        <React.Fragment>
            <NavAdmin>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">ข้อมูลสถานที่</h3>
                            </div>
                            {/* <Search placeholder="" allowClear onSearch={onSearch} style={{ width: 200 }} />
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <PDFDownloadLink
                                    document={<PdfLocation location={location as LocationTrip} />}
                                    fileName="รายงานข้อมูลสถานที่.pdf"
                                >
                                    <Button style={{ margin: "10px", right: "10px" }}>
                                        PDF
                                    </Button>
                                </PDFDownloadLink>
                            </div> */}
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
                                    ชื่อ - นามสกุล
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    อีเมล์
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    เบอร์โทร
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    หน้าที่
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">

                                    </th>

                                </tr>
                            </thead>

                            {React.Children.toArray(accountAll?.data.map((item: any , index:any) => index >= minIndex &&
                                index < maxIndex && <tbody>
                                    <tr>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <Image width={100} src={item.image} />
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        {item.name}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        {item.email}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.phoneNumber}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.roleName}
                                        </td>
                                        
                                       
                                    </tr>

                                </tbody>
                            ))}
                        </table>
                        {accountAll && accountAll!.data?.length > 0 && <Pagination
                            pageSize={pageSize}
                            current={current}
                            total={accountAll!.data?.length}
                            onChange={handleChange}
                            className="center"
                            style={{ marginTop: "30px",display:"flex" ,justifyContent:"end" }}
                        />}
                    </div>


                
            </NavAdmin>
        </React.Fragment>
    )
}

export default TableUser