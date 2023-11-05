import { CloseOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Badge, Button, DatePicker, DatePickerProps, Input, message, Select, Space, Upload, UploadProps } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import agent from '../../app/api/agent';
import { fetchCarsAsync } from '../../app/store/carSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchLocationAsync } from '../../app/store/locationSlice';
import { fetchClassTripAsync, fetchTrip } from '../../app/store/tripSlice';
import moment from 'moment';

import NavAdmin from './NavAdmin';





const CreateTrip = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [previewPDF, setPreviewPDF] = useState<any>();
    const { Option } = Select;

    console.log(JSON.stringify(state, null, 2));
    // -F 'ImageTrip=@maxresdefault (2).jpg;type=image/jpeg' \
    // -F 'DateTimeEnd=10/10/2022' \
    // -F 'VehicleID=1' \
    // -F 'DateTimeStart=10/10/2022' \
    // -F 'Price=2' \
    // -F 'TripName=2' \
    // -F 'Detail=2' \
    // -F 'Amount=2' \
    // -F 'ClassTripId=1' \
    // -F 'Id=2' \
    // -F 'File=@รายงานข้อมูลสถานที่ - 2023-05-30T142308.213.pdf;type=application/pdf'
    const values = {
        Id: state ? state.id : "",
        TripName: state ? state.tripName : "",
        Detail: state ? state.detail : "",
        Amount: state ? state.amount : "",
        File: state ? state.file : "",
        Price: state ? state.price : "",
        DateTimeStart: state ? state.dateTimeStart : "",
        DateTimeEnd: state ? state.dateTimeEnd : "",
        VehicleID: state ? state.vehicle.id : "",
        ImageTrip: state ? state.imageTrip : "",
        ClassTripId: state ? state.classTrip.id : '',
        Location: state ? state.addMultipleLocations.map((el: any) => el.location.id) : [],
    };

    const { classTripLoaded, classTrip } =
        useAppSelector((state) => state.trip);


    useEffect(() => {
        if (!classTripLoaded) dispatch(fetchClassTripAsync());
    }, [classTripLoaded, dispatch]);


    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const {
        carsLoaded,
        car
    } = useAppSelector(state => state.car);//

    useEffect(() => {
        dispatch(fetchCarsAsync());
    }, [carsLoaded, dispatch]);


    const {
        locationsLoaded,
        location
    } = useAppSelector(state => state.location);//

    useEffect(() => {
        dispatch(fetchLocationAsync(""));
    }, [locationsLoaded, dispatch]);

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
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

    const handleSubmitForm = async (value: any) => {
        let result: any;
        if (state) {  
            // if (state.imageTrip) value.ImageTrip = value.ImageTrip.split("/images/")[1];
            // if (state.file) value.File = value.File.split("/images/")[1];
            // console.log(value)
            result = await agent.Trip.updateTrip(value);
        }
        else result = await agent.Trip.createtrip(value);

        if (result!.msg === "OK")
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/TableTrip");
            });
    } 

    const [imageUrl, setImageUrl] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const PlaceholderUpload = () => (
        <>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                คลิ้กหรือลากไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด
            </p>
            <p className="ant-upload-hint">รองรับการอัปโหลดครั้งเดียว</p>
        </>
    );

    return (
        <React.Fragment>
            <NavAdmin>
                <div className='bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-ful'>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">ฟอร์มข้อมูลของแพ็กเกจ</h2>
                    </div>
                    <Formik
                        initialValues={values}
                        //validationSchema={LocationValidate}
                        onSubmit={async (values) => {

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
                        const handleUploadFilePDF = (file: RcFile) => {
                            setFieldValue("File", file);
                            setPreviewPDF(file);
                        };
                        const RemoveImage = () => {
                            setFieldValue("ImageTrip", "");
                            setImageUrl("");
                        };
                        const onChangeStart: DatePickerProps['onChange'] = (date, dateString) => {
                            setFieldValue("DateTimeStart", dateString)
                        };
                        const onChangeEnd: DatePickerProps['onChange'] = (date, dateString) => {
                            setFieldValue("DateTimeEnd", dateString)
                        };
                        return <Form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-3">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        ชื่อ
                                    </label>
                                    <div className="mt-2.5">
                                        <Input
                                            status={touched.TripName && errors.TripName
                                                ? "error"
                                                : ""}
                                            name="TripName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.TripName}
                                            type="text"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                        />
                                        <ErrorMessage name="TripName" component="div" className="text-danger text-st" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        จำนวน
                                    </label>
                                    <div className="mt-2.5">
                                        <Input
                                            status={touched.Amount && errors.Amount
                                                ? "error"
                                                : ""}
                                            name="Amount"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Amount}
                                            type="text"

                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                        />
                                        <ErrorMessage name="Amount" component="div" className="text-danger text-st" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        ราคา
                                    </label>
                                    <div className="mt-2.5">
                                        <Input
                                            status={touched.Price && errors.Price ? "error"

                                                : ""}
                                            name="Price"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Price}
                                            type="text"

                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                        />
                                        <ErrorMessage name="Price" component="div" className="text-danger text-st" />
                                    </div>
                                </div>

                            </div>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 text-black mt-1.5">พาหนะ</label>
                                    {state ?  <Select
                                        disabled ={state ? true : false}
                                        size='large'
                                        style={{ width: "100%" }}
                                        showSearch
                                        value={state && state.vehicle.id }
                                        allowClear
                                        placeholder="พาหนะ"
                                        optionFilterProp="children"
                                        onChange={(e) => { setFieldValue("VehicleID", e) }}
                                        onSearch={onSearch}

                                    >
                                        {car?.data.filter(e => e.status === false).map((dataCar: any, index) => {
                                            return <Option key={index} value={dataCar.vehicleID}>{dataCar.vehicleName}</Option>
                                        })}
                                    </Select> :   <Select
                                        disabled ={state ? true : false}
                                        size='large'
                                        style={{ width: "100%" }}
                                        showSearch
                                        allowClear
                                        placeholder="พาหนะ"
                                        optionFilterProp="children"
                                        onChange={(e) => { setFieldValue("VehicleID", e) }}
                                        onSearch={onSearch}

                                    >
                                        {car?.data.filter(e => e.status === false).map((dataCar: any, index) => {
                                            return <Option key={index} value={dataCar.vehicleID}>{dataCar.vehicleName}</Option>
                                        })}
                                    </Select>}
                                   
                                  


                                </div>

                            
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        ระดับ
                                    </label>
                                    <div className="mt-2.5">
                                        <Select
                                            size='large'
                                            style={{ width: "100%" }}
                                            showSearch
                                            allowClear
                                            placeholder="ระดับ"
                                            optionFilterProp="children"
                                            onChange={(e) => { setFieldValue("ClassTripId", e) }}
                                            onSearch={onSearch}
                                            defaultValue={state && state.classTrip.id}
                                        > 
                                            {classTrip?.map((dataCalssTrip: any, index) => {
                                                return <Option key={index} value={dataCalssTrip.id}>{dataCalssTrip.name}</Option>
                                            })}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 text-black mt-1.5">สถานที่ท่องเที่ยว</label>
                                    <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="เลือกสถานที่ท่องเที่ยว"
                                    onChange={(e) => setFieldValue("Location", e)}
                                    optionLabelProp="label"
                                    size='large'
                                    defaultValue={state ? state.addMultipleLocations.map((el: any) => el.location.id) : []}
                                >
                                    {location?.data.map((dataLocation: any, index: any) => {
                                        return <Option key={index} value={dataLocation.locationID} label={dataLocation.locationName}>
                                            <Space>
                                                <span role="img" aria-label={dataLocation.locationName}>
                                                    {dataLocation.locationName}
                                                </span>
                                            </Space>
                                        </Option>
                                    })}
                                </Select>
                                </div>
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        วันเริ่ม
                                    </label>
                                    <div className="mt-2.5">
                                        <DatePicker defaultValue={state && moment(state.dateTimeStart)} placeholder="เลือกวันที่" style={{ width: "100%" }} size={"large"} onChange={onChangeStart} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        วันสิ้นสุด
                                    </label>
                                    <div className="mt-2.5">
                                        <DatePicker defaultValue={state && moment(state.dateTimeEnd)} placeholder="เลือกวันที่" style={{ width: "100%" }} size={"large"} onChange={onChangeEnd} />

                                    </div>
                                </div>

                            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-1">
                                <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                        รายละเอียด
                                    </label>
                                    <div className="mt-2.5">
                                        <Input.TextArea
                                            status={touched.Detail && errors.Detail
                                                ? "error"
                                                : ""}
                                            name="Detail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Detail}
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                        />
                                        <ErrorMessage name="Detail" component="div" className="text-danger text-st" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                        ไฟล์ PDF ตารางกิจกรรม
                                    </label>
                                    <Upload.Dragger
                                        showUploadList={false}
                                        beforeUpload={handleUploadFilePDF}
                                        accept=".pdf"
                                    >
                 
                                        {previewPDF ? (
                                            <>{previewPDF.name || previewPDF}</>
                                        ) : (
                                            state && state.file ? <>{state.file.split("/images/")[1]}</>  : ""
                                        )}
                                        {!previewPDF && !state?.file && PlaceholderUpload()}
                                    </Upload.Dragger>
                                </div>
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        รูป
                                    </label>
                                    <Upload
                                        name="ImageDriver"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={beforeUploadAntd}
                                        onChange={
                                            (info) => {
                                                if (info.file.status === 'uploading') {
                                                    setLoading(true);
                                                    return;
                                                }
                                                getBase64(info.file.originFileObj as RcFile, (url) => {
                                                    setLoading(false);
                                                    setImageUrl(url);
                                                });
                                                setFieldValue("ImageTrip", info.file.originFileObj);
                                            }
                                        }
                                    >
                                        <Button loading={loading} icon={<UploadOutlined />}>
                                            เพิ่มรูปภาพ
                                        </Button>
                                    </Upload>
                                    <ErrorMessage name="ImageDriver" component="div" className="text-danger text-st" />

                                </div>
                                {imageUrl ? <Badge count={<Button
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
                                        style={{ width: '120px', }}
                                    />
                                </Badge> : state ? <Badge count={<Button
                                    type="primary"
                                    shape="circle"
                                    htmlType='button'
                                    danger icon={<CloseOutlined />}
                                    onClick={RemoveImage}
                                    size="small"
                                    style={{ marginLeft: "5px" }} />}>
                                    <img
                                        src={state?.imageTrip}
                                        className='img-thumbnail'
                                        alt='...'
                                        style={{ width: '120px', }}
                                    />
                                </Badge> : ""}

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

export default CreateTrip