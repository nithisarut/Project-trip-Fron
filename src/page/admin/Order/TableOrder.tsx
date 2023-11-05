import React, { useEffect, useState } from 'react'
import NavAdmin from '../../../components/admin/NavAdmin'
import { Button, Modal, Pagination, Row } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchAllPayment } from '../../../app/store/payMent';
import { Image } from 'antd';

import moment from 'moment-timezone';
import { PaymentUpdate } from '../../../app/models/PaymentRequest';
import agent from '../../../app/api/agent';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { OrderStatus } from '../../../app/models/OrderTrip';
import DetailOrder from '../../user/DetailOrder';
import usePagination from '../../../app/hooks/usePagination';
function Order() {

    const dispatch = useAppDispatch();
    const {
        payMentLoaded,
        payMent,
    } = useAppSelector(state => state.payMent);//
    useEffect(() => {
        dispatch(fetchAllPayment());
    }, [payMentLoaded, dispatch]);

    const navigate = useNavigate();
    const { state } = useLocation();

    const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 6 });

    return (
        <React.Fragment>
            <NavAdmin>




                <div className='bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-ful'>
                    <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                        {payMent?.data?.map((data: any, index: any) => {
                            //console.log(data)
                            const confirm: PaymentUpdate = {
                                id: data.id,
                                status: true,
                                orderStatus: OrderStatus.SuccessfulPayment,
                                orderId: data.orderTrips.id
                            };

                            const cancel: PaymentUpdate = {
                                id: data.id,
                                status: false,
                                orderStatus: OrderStatus.WaitingForPayment,
                                orderId: data.orderTrips.id
                            };

                            console.log(data)
                            const onCancel = async () => {
                                let result: any;
                                if (!state) result = await agent.Payment.updatePayment(cancel);
                                await agent.Payment.deletePayment(cancel.id);
                                if (result!.msg === "OK"){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'ยกเลิกสำเร็จ',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(() => {
                                        dispatch(fetchAllPayment());
                                    });
                                }  
                                    else{
                                        Swal.fire({
                                            position: 'center',
                                            icon: 'error',
                                            title: 'ยืนยันไม่สำเร็จ',
                                            showConfirmButton: false,
                                            timer: 1500
                                        }).then(() => {
                                            dispatch(fetchAllPayment());
                                    });
                                    }
                            }

                            const onConFirm = async () => {
                                let result: any;
                                if (!state) result = await agent.Payment.updatePayment(confirm);
                                if (result?.msg === "OK"){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'ยืนยันสำเร็จ',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(() => {
                                        dispatch(fetchAllPayment());
                                });
                                } else{
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'ยืนยันไม่สำเร็จ',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(() => {
                                        dispatch(fetchAllPayment());
                                });
                                }
                                   
                            }

                            return index >= minIndex &&
                            index < maxIndex && <div key={index} className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                                <h3 className="mb-3 text-xl font-bold text-indigo-600">ID {data.id}</h3>
                                <div className="relative">
                                    <Image className="w-full rounded-xl" style={{ width: "300px", height: "300px" }} src={data.image} alt="Colors" />
                                    {!data.status ? <p className="absolute top-0 bg-red-500 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">ตรวจสอบ</p> : <p className="absolute top-0 bg-green-500 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">ยืนยันสำเร็จ</p>}
                                </div>

                                <div className="my-4">


                                    <DetailOrder data={data?.orderTrips} />
                                    {!data.status === true ? (<> <button onClick={onConFirm} className="mt-4 text-xl w-full text-white bg-green-600 py-2 rounded-xl shadow-lg">ยืนยัน</button>  <button onClick={onCancel} className="mt-4 text-xl w-full text-white bg-red-600 py-2 rounded-xl shadow-lg">ยกเลิก</button></>) : null}

                                </div>
                            </div>
                        })}
                    </div>
                    {payMent && payMent!.data?.length > 0 && <Pagination
                        pageSize={pageSize}
                        current={current}
                        total={payMent!.data?.length}
                        onChange={handleChange}
                        className="center"
                        style={{ marginTop: "30px", display: "flex", justifyContent: "end" }}
                    />}
                </div>




            </NavAdmin>

        </React.Fragment>
    )
}

export default Order