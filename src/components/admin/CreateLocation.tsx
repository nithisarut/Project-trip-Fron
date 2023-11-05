import React, { useEffect, useState } from 'react'
import NavAdmin from './NavAdmin'
import { Badge, Button, Input, message, Select, Upload } from 'antd'
import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { ErrorMessage, Form, Formik, } from 'formik'
import agent from '../../app/api/agent'
import Swal from 'sweetalert2'
import { CarValidate, LocationValidate } from '../../validate/AccountValidate'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { fetchTypesAsync } from '../../app/store/locationSlice'
  
function CreateLocation() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useAppDispatch(); 

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const values = {
        Id: state ? state.locationID : '',
        LocationName: state ? state.locationName : '',
        Details: state ? state.details : '',
        District: state ? state.district : '',
        SubDistrict: state ? state.subDistrict : '',
        Image: state ? state.image : "",
        TypeID: state ? state.typeID : ''
    };

    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);

    const RemoveImage = () => {
        setImageUrl("");
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
        let result: any;
        if (state && state.locationID) result = await agent.Location.updateLocation(value);
        else result = await agent.Location.createLocation(value)

        if (result!.msg === "OK")
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/TableLocation");
            });
    } 

    const { typeLoaded, type } =
        useAppSelector((state) => state.location);


    useEffect(() => {
        if (!typeLoaded) dispatch(fetchTypesAsync());

    }, [typeLoaded, dispatch]); 

    return (
        <React.Fragment>
            <NavAdmin>
                <div className='bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-ful'>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">ฟอร์มข้อมูลของสถานที่</h2>
                    </div>
                    <Formik initialValues={values}
                        // validationSchema={LocationValidate}
                        onSubmit={async (values) => {
                            handleSubmitForm(values);
                        }}
                    >
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
                                    setLoading(true);
                                    return;
                                }

                                getBase64(info.file.originFileObj as RcFile, (url) => {
                                    setLoading(false);
                                    setImageUrl(url);
                                });

                                setFieldValue("Image", info.file.originFileObj);
                            };
                            return <Form onSubmit={handleSubmit} action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            ชื่อสถานที่
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.LocationName && errors.LocationName
                                                    ? "error"
                                                    : ""}
                                                name="LocationName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.LocationName}
                                                type="text"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="LocationName" component="div" className="text-danger text-st" />
                                        </div>
                                    </div> 
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            ตำบล
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.District && errors.District
                                                    ? "error"
                                                    : ""}
                                                name="District"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.District}
                                                type="text"

                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="District" component="div" className="text-danger text-st" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            อำเภอ
                                        </label>
                                        <div className="mt-2.5">
                                            <Input
                                                status={touched.SubDistrict && errors.SubDistrict
                                                    ? "error"
                                                    : ""}
                                                name="SubDistrict"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.SubDistrict}
                                                type="text"

                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="SubDistrict" component="div" className="text-danger text-st" />
                                        </div>
                                    </div> 
                                    <div>

                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 text-black mt-1.5">  ประเภท</label>
                                        <Select
                                            size='large'
                                            style={{ width: "100%" }}
                                            showSearch
                                            placeholder="ประเภทของแหล่งท่องเที่ยว"
                                            optionFilterProp="children"
                                            value={values.TypeID}
                                            onChange={(e) => setFieldValue("TypeID", e)}
                                            onSearch={onSearch}

                                        >

                                            {type?.map((dataType: any, index: any) => {
                                                return <Select.Option key={index} value={dataType.id}>{dataType.typeName}</Select.Option>
                                            })}
                                        </Select>


                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                            รายละเอียด
                                        </label>
                                        <div className="mt-2.5">
                                            <Input.TextArea
                                                status={touched.Details && errors.Details
                                                    ? "error"
                                                    : ""}
                                                name="Details"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Details}
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            />
                                            <ErrorMessage name="Details" component="div" className="text-danger text-st" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            รูป
                                        </label>
                                        <Upload
                                            name="ImageDriver"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            beforeUpload={beforeUpload}
                                            onChange={handleChangeImageDriver}
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
                                            src={state?.image}
                                            className='img-thumbnail'
                                            alt='...'
                                            style={{ width: '120px', }}
                                        />
                                    </Badge> : state && state.image && <img
                                        src={state.image}
                                        className='img-thumbnail'
                                        alt='...'
                                        style={{ width: '120px', }}
                                    />} 
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

export default CreateLocation