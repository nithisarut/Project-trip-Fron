import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { Badge, Button, Input, message, Modal, Upload, } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { Formik, Form, ErrorMessage } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginAccount, registerAccount } from '../app/store/accountSlice';
import { useAppDispatch } from '../app/store/configureStore';
import { LoginValidate } from '../validate/AccountValidate';
import { BsFillBackspaceFill } from "react-icons/bs";
import { UrlHome } from '../Router';
const value = { email: '', password: '' };
const valueRegis = { fullname: "", email: '', password: '', phonenumber: "", filefrom: "" };

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const RemoveImage = () => setImageUrl("");

  const submitFormRegis = async (data: any) => {
    const result = await dispatch(registerAccount(data)).unwrap();
    if (result.msg === "OK") {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'ยินดีด้วยคุณได้เป็นสมาชิกแล้ว',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        navigate(UrlHome);
        window.location.replace(UrlHome);
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'อีเมล์ซ้ำหรือข้อมูลไม่ถูกต้อง',
        showConfirmButton: false,
        timer: 2000
      });
    };
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

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

  const submitForm = async (data: any) => {
    const result = await dispatch(loginAccount(data)).unwrap();
    if (result.msg === "OK") {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate(UrlHome);
        window.location.replace(UrlHome);
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง',
        showConfirmButton: false,
        timer: 2000
      });
    };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalantd = () => {
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [show, setShow] = React.useState<boolean>(false);

  const login = <div className="w-full max-w-md space-y-8"  style={{ fontFamily: "IBM Plex Sans Thai" }} > 
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        ลงชื่อเข้าใช้บัญชีของคุณ
      </h2>
    </div>
    <Formik initialValues={value}
      validationSchema={LoginValidate}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        submitForm(values);

      }}
    >{({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <Form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST"   >
        <Input type="hidden" name="remember" defaultValue="true" />

        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-5"></div>


          <div className="md:col-span-5">
            <Input type="text"
              placeholder="อีเมล์"
              size="large"
              status={touched.email && errors.email
                ? "error"
                : ""}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="md:col-span-5">

            <Input.Password type="text"
              placeholder="รหัสผ่าน"
              size="large"
              status={touched.password && errors.password
                ? "error"
                : ""}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              จดจำฉัน
            </label>
          </div>

          <div className="text-sm">
            <Link to="#" onClick={() => setShow(!show)} className="font-medium text-indigo-600 hover:text-indigo-500">
              สมัครสมาชิก
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex ml-auto w-full justify-center text-black bg-blueeThrem border-0 py-2 px-6 focus:outline-none rounded"
            style={{color:"white"}}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" style={{ color: 'white' }} aria-hidden="true" />
            </span>
            เข้าสู่ระบบ
          </button>
        </div>
      </Form>
    )}

    </Formik>

  </div>

  const register = <div className="w-full max-w-md space-y-8 "  style={{ fontFamily: "IBM Plex Sans Thai" }} >
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        สมัครสมาชิก
      </h2>
    </div>
    <Formik initialValues={valueRegis}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        submitFormRegis(values);
      }}
    >{({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      setFieldValue,
    }) => {
      const handleChangeImaage: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
        setFieldValue("filefrom", info.file.originFileObj);
      };


      return <Form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">


        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-5">
            <label htmlFor="full_name">ชื่อ-นามสกุล</label>
            <Input type="text"
              size="large"
              status={touched.fullname && errors.fullname
                ? "error"
                : ""}
              name="fullname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullname} id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
            <ErrorMessage name="fullname" component="div" className="text-danger" />
          </div>

          <div className="md:col-span-5">
            <label htmlFor="email">อีเมล์</label>
            <Input type="text"
              size="large"
              status={touched.email && errors.email
                ? "error"
                : ""}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="md:col-span-3">
            <label htmlFor="password">รหัสผ่าน</label>
            <Input.Password type="text"
              size="large"
              status={touched.password && errors.password
                ? "error"
                : ""}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password} id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="phone">เบอร์โทร</label>
            <Input type="text"
              size="large"
              status={touched.phonenumber && errors.phonenumber
                ? "error"
                : ""}
              name="phonenumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phonenumber} id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
            <ErrorMessage name="phonenumber" component="div" className="text-danger" />
          </div>

          <div className="md:col-span-2">
            <Upload
              name="avatar"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChangeImaage}
            >
              <Button loading={loading} icon={<UploadOutlined />}>
                เพิ่มรูปภาพ
              </Button>
            </Upload>

          </div>
          <div className="md:col-span-3">
            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button type='submit'  className="flex ml-auto w-full justify-center text-black bg-blueeThrem border-0 py-2 px-6 focus:outline-none rounded"
            style={{color:"white"}}>ยืนยัน</button>
              </div>
            </div>

          </div>

          <div className="md:col-span-5">
            <div className="form__group u-margin-bottom-medium">
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
                  style={{ width: '120px' }}
                />
              </Badge> : <></>}
            </div>
          </div>


        </div>

      </Form>

    }}
    </Formik>
  </div>

  return (
    <React.Fragment >

      <>
        <button className=' text-white text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium' 
                             style={{ fontFamily: "IBM Plex Sans Thai" }} onClick={showModalantd} >
          เข้าสู่ระบบ
        </button>
        <Modal open={isModalOpen}  footer={false} closeIcon onCancel={handleCancel}>

          {show && <Link to="#" onClick={() => setShow(!show)} >
          <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
                <svg className="fill-stroke" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.91681 7H11.0835" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.91681 7L5.25014 9.33333" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.91681 7.00002L5.25014 4.66669" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm leading-none">กลับ</p>
              </button>
          </Link>}
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {!show ? login : register}
          </div>
        </Modal>
      </>


    </React.Fragment>
  )
}

export default Login