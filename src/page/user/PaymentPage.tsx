import { CloseOutlined, InboxOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Upload, UploadProps, message } from 'antd'
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Payment } from '../../app/models/PaymentRequest';
import agent from '../../app/api/agent';
import Swal from 'sweetalert2';
import { fetchAccount } from '../../app/store/accountSlice';

function PaymentPage({ orDerTripId, loadData }: any) {






    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageInfo, setImageInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();

    const values: Payment = {
        Image: imageInfo,

        status: false,
        OrDerTripId: orDerTripId,

    }
    const RemoveImage = () => {
        // setFieldValue("formFiles", "");
        setImageUrl("");
    };

    const beforeUploadAntd = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!');
        }
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isLt2M) {
            message.error('รูปภาพต้องมีขนาดเล็กกว่า 100MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const props: UploadProps = {
        name: 'formFiles',
        multiple: false,
        onChange: (info) => {
            if (info.file.status === 'uploading') {
                setLoading(true);
                return;
            }
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
                setImageInfo(info.file.originFileObj)
            });

            // setFieldValue("formFiles", info.file.originFileObj);
        }
    };

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const Onclick = async () => {

        let result: any;
        if (!state) result = await agent.Payment.createPayment(values);
        if (result!.msg === "OK")
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setModal2Open(false);
                loadData();
            });

    }








    const [modal2Open, setModal2Open] = useState(false);
    return (
        <React.Fragment>

            <Link to="" className=" text-center bg-blueeeeeee px-2 py-1 bg- text-white font-bold " onClick={() => setModal2Open(true)}>
                ชำระเงิน
            </Link>
            <Modal
                title="ชำระเงิน"
                footer={false}
                centered
                width={700}
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
            >

                <div>
                    <div >


                        <div >
                            <div className="xl:w-5/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full" >
                                <div className="flex flex-col justify-start items-start w-full space-y-4">
                                    <p className="text-xl md:text-2xl leading-normal text-gray-800">นิธิศรุจ สินธุ์คง</p>
                                    <p className="text-base font-semibold leading-none text-gray-600">0018182521 (ไทยพาณิชย์)</p>
                                </div>
                                <div >
                                    <img style={{ width: "12.5rem" }} src="https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.15752-9/348366218_1016252823084425_2683057142098881036_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeG3Xa4baE9ThVrVeKqoBMmDWahJ7MWnwHJZqEnsxafActeLb_m6BR7KH_qULX6iX2OL-Ur-68WjW1G6y--cfH5Q&_nc_ohc=vp4CoS0Mf7sAX_qDM5T&_nc_ht=scontent.fbkk20-1.fna&oh=03_AdTux73QAzA2HHjnr0m9aeFID3GdpGPdDyn2Tozy12bWWQ&oe=649DB3B5" alt="headphones" />
                                </div>
                            </div>

                            <div >



                                <div className="mt-8" style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>


                                    <Upload.Dragger {...props} beforeUpload={beforeUploadAntd} style={{ width: "37.5rem" }} showUploadList={false}>
                                        {!imageUrl ? <>

                                            <p className="ant-upload-text text-st">
                                                เพิ่มหลักฐานการโอนเงิน
                                            </p>
                                        </> : <Badge count={<Button
                                            type="primary"
                                            shape="circle"

                                            htmlType='button'
                                            danger icon={<CloseOutlined />}
                                            onClick={RemoveImage}
                                            size="small"
                                            style={{ marginLeft: "5px" }} />}>
                                            <img
                                                src={imageUrl}
                                                className='img-thumbnail'
                                                alt='...'
                                                style={{ width: '100%', height: "200px" }}
                                            />
                                        </Badge>}
                                    </Upload.Dragger>
                                </div>






                                <button onClick={Onclick} className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                                    <div>
                                        <p className="text-base leading-4">ชำระเงิน</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>

        </React.Fragment>
    )
}

export default PaymentPage