import React, { useState } from 'react'
import NavAdmin from './NavAdmin'
import { Badge, Button, Input, message, Upload } from 'antd'
import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { ErrorMessage, Form, Formik } from 'formik'
import agent from '../../app/api/agent'
import Swal from 'sweetalert2'
import { CarValidate } from '../../validate/AccountValidate'
import { useLocation, useNavigate } from 'react-router-dom'


function CreateCar() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const values = {
        Id : state ? state.vehicleID : '',
        VehicleName: state ? state.vehicleName : '',
        Tel: state? state.tel: '',
        VehicleRegistration: state ? state.vehicleRegistration : '',
        Company: state? state.company: '',
        DriverName: state? state.driverName: '',
        NumberOFSeats: state? state.numberOFSeats: '',
        ImageDriver: state? state.ImageDriver: '',
        ImageVehicle: state? state.ImageVehicle: '',
    };

    

  
    const [imageUrlCar, setImageUrlCar] = useState<string>();
    const [loadingCar, setLoadingCar] = useState(false);

    const [imageUrlDriver, setImageUrlDriver] = useState<string>();
    const [loadingDriver, setLoadingDriver] = useState(false);
    const RemoveImageDriver = () => {
        setImageUrlDriver("");

    }
    const RemoveImageCar = () => {
        setImageUrlCar("");

    }
    const beforeUpload = (file: RcFile) => {
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


    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleSubmitForm = async (value: any) => { 
        let result ;
        if (!state) result = await agent.Car.createCar(value)
        else result = await agent.Car.updateCar(value);
        if (result!.msg === "OK")
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/TableCar");
            });
    }
    return (
        <React.Fragment>
            <NavAdmin>
                <div className='bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-ful'>
                <div className="mx-auto max-w-2xl text-center ">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">ฟอร์มข้อมูลของพนักงานขับรถ</h2>
                    </div>
                    <Formik initialValues={values}
                        validationSchema={CarValidate}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                handleSubmitForm(values);
                                setSubmitting(false);
                            }, 400);
                        }}>
                        {({ values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue, }) => {
                            const handleChangeImageDriver: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
                                if (info.file.status === 'uploading') {
                                    setLoadingDriver(true);
                                    return;
                                }

                                getBase64(info.file.originFileObj as RcFile, (url) => {
                                    setLoadingDriver(false);
                                    setImageUrlDriver(url);
                                });

                                setFieldValue("ImageDriver", info.file.originFileObj);

                            };
                            const handleChangeImageCar: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
                                if (info.file.status === 'uploading') {
                                    setLoadingCar(true);
                                    return;
                                }

                                getBase64(info.file.originFileObj as RcFile, (url) => {
                                    setLoadingCar(false);
                                    setImageUrlCar(url);
                                });

                                setFieldValue("ImageVehicle", info.file.originFileObj);

                            };
                            return <Form onSubmit={handleSubmit} action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            ชื่อพนักงาน
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.DriverName && errors.DriverName
                                                    ? "error"
                                                    : ""}
                                                name="DriverName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.DriverName}
                                                type="text"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="DriverName" component="div" className="text-danger text-st" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            รุ่นรถ
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.VehicleName && errors.VehicleName
                                                    ? "error"
                                                    : ""}
                                                name="VehicleName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.VehicleName}
                                                type="text"

                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="VehicleName" component="div" className="text-danger text-st" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            ทะเบียนรถ
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.VehicleRegistration && errors.VehicleRegistration
                                                    ? "error"
                                                    : ""}
                                                name="VehicleRegistration"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.VehicleRegistration}
                                                type="text"

                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="VehicleRegistration" component="div" className="text-danger text-st" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            จำนวนที่นั่ง
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.NumberOFSeats && errors.NumberOFSeats
                                                    ? "error"
                                                    : ""}
                                                name="NumberOFSeats"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.NumberOFSeats}
                                                type="text"

                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="NumberOFSeats" component="div" className="text-danger text-st" />
                                        </div>
                                    </div>

                                    <div >
                                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                            บริษัท
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.Company && errors.Company
                                                    ? "error"
                                                    : ""}
                                                name="Company"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Company}
                                                type="text"

                                                id="company"
                                                autoComplete="organization"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="Company" component="div" className="text-danger text-st" />
                                        </div>
                                    </div>
                                    
                                    <div >
                                        <label htmlFor="Tel" className="block text-sm font-semibold leading-6 text-gray-900">
                                            เบอร์ติดต่อ
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.Tel && errors.Tel
                                                    ? "error"
                                                    : ""}
                                                name="Tel"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Tel}
                                                type="text"

                                                id="Tel"
                                                autoComplete="organization"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="Tel" component="div" className="text-danger text-st" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            รูปพนักงานขับรถ
                                        </label>
                                        <Upload
                                            name="ImageDriver"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            beforeUpload={beforeUpload}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            onChange={handleChangeImageDriver}
                                        >
                                            <Button loading={loadingDriver} icon={<UploadOutlined />}>
                                                เพิ่มรูปภาพ
                                            </Button>
                                        </Upload>
                                        <ErrorMessage name="ImageDriver" component="div" className="text-danger text-st" />

                                    </div>
                                    {imageUrlDriver ? <Badge count={<Button
                                        type="primary"
                                        shape="circle"
                                        htmlType='button'
                                        danger icon={<CloseOutlined />}
                                        onClick={RemoveImageDriver}
                                        size="small"
                                        style={{ marginLeft: "5px" }} />}>
                                        <img
                                            src={imageUrlDriver}
                                            className='img-thumbnail'
                                            alt='...'
                                            style={{ width: '120px', }}
                                        />
                                    </Badge> : state ? <Badge count={<Button
                                        type="primary"
                                        shape="circle"
                                        htmlType='button'
                                        danger icon={<CloseOutlined />}
                                        onClick={RemoveImageDriver}
                                        size="small"
                                        style={{ marginLeft: "5px" }} />}>
                                        <img
                                            src={state?.imageDriver}
                                            className='img-thumbnail'
                                            alt='...'
                                            style={{ width: '120px', }}
                                        />
                                    </Badge>:""}
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            รูปรถ
                                        </label>
                                        <Upload
                                            name="ImageVehicle"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            beforeUpload={beforeUpload}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            onChange={handleChangeImageCar}
                                        >
                                            <Button loading={loadingCar} icon={<UploadOutlined />}>
                                                เพิ่มรูปภาพ
                                            </Button>
                                        </Upload>
                                        <ErrorMessage name="ImageVehicle" component="div" className="text-danger text-st" />
                                    </div>
                                    {imageUrlCar ? <Badge count={<Button
                                        type="primary"
                                        shape="circle"
                                        htmlType='button'
                                        danger icon={<CloseOutlined />}
                                        onClick={RemoveImageCar}
                                        size="small"
                                        style={{ marginLeft: "5px" }} />}>
                                        <img
                                            src={imageUrlCar}
                                            className='img-thumbnail'
                                            alt='...'
                                            style={{ width: '120px', }}
                                        />
                                    </Badge> : state ? <Badge count={<Button
                                        type="primary"
                                        shape="circle"
                                        htmlType='button'
                                        danger icon={<CloseOutlined />}
                                        onClick={RemoveImageCar}
                                        size="small"
                                        style={{ marginLeft: "5px" }} />}>
                                        <img
                                            src={state?.imageVehicle}
                                            className='img-thumbnail'
                                            alt='...'
                                            style={{ width: '120px', }}
                                        />
                                    </Badge>:""}
                                </div>



                                <div className="mt-10">

                                    <button
                                       
                                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        บันทึกข้อมูล
                                    </button>
                                </div>
                            </Form>
                        }}
                    </Formik>
                </div>
                  

             
            </NavAdmin>


        </React.Fragment>
    )
}

export default CreateCar