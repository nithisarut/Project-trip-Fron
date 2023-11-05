import { CloseOutlined } from '@ant-design/icons';
import { Props } from '@headlessui/react/dist/types';
import { Avatar, Badge, Button, Image, Input, message } from 'antd';
import Upload, { RcFile, UploadProps } from 'antd/es/upload';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import agent from '../../app/api/agent';
import { fetchAccount, setAccount } from '../../app/store/accountSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import Footer from '../../components/user/Footer'
import Navbar from '../../components/user/Navbar'



export const loadAccountStorage = () => JSON.parse(localStorage.getItem('account')!);
function EditProfile() {
    interface Props {
        values?: any;
    }
    const dispatch = useAppDispatch();


    const [imageUrl, setImageUrl] = useState<string>();
    const { state } = useLocation();
    const { account } = useAppSelector((state) => state.account);
    const RemoveImage = () => setImageUrl("");
    const accountStorage = loadAccountStorage();
    const [statusInput, setStatusInput] = useState<boolean>(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (!account) dispatch(fetchAccount());

    }, [account, dispatch]);

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };


    const submitForm = async (value: any) => {
      
        const result = await agent.Account.updateAccount(value, account?.id);
        if (result.msg === "OK")
            Swal.fire({
                position: "center",
                icon: "success",
                title: "บันทึกข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => navigate(-1))
    };

    const values = {
        Id: state ? state.id : "",
        FullName: state ? state.name : "",
        Email: state ? state.email : '',
        Password: state ? state.password : '',
        Phonenumber: state ? state.phoneNumber : "",
        FormFiles: state ? state.image : "",
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
    const handleUpdateAccount = async ({ values }: Props) => {

        if (accountStorage) {
            const { data } = await agent.Account.updateAccount(
                values ? values : values,
                account?.id
            );

            localStorage.setItem(
                "account",
                JSON.stringify({ ...accountStorage, account: data })
            );
            dispatch(setAccount({ account: data }));
            console.log(data)

        }

    };

    return (
        <React.Fragment>
            <Navbar />


            <div className="h-full">
                <Formik initialValues={values}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(() => {
                            handleUpdateAccount({ values: values }); submitForm(values);
                            console.log(values)
                        }));



                    }}>{({

                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                    }) => {
                        const props: UploadProps = {
                            name: "Filefrom",
                            multiple: false,
                            onChange: (info) => {
                                if (info.file.status === "uploading") {
                                    setLoading(true);
                                    return;
                                }
                                getBase64(info.file.originFileObj as RcFile, (url) => {
                                    setLoading(false);
                                    setImageUrl(url);
                                });
                                setFieldValue("Filefrom", info.file.originFileObj);
                            },
                        };

                        const RemoveImage = () => {
                            setFieldValue("Filefrom", "");
                            setImageUrl("");
                        };
                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className=" block md:flex">

                                    <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                                        <div className="flex justify-between">
                                            <span className="text-xl font-semibold block"></span>
                                            <button className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">บันทึกข้อมูล</button>
                                        </div>
                                        <div className="w-full p-8 mx-2 flex justify-center">
                                            <Upload
                                                {...props}
                                                beforeUpload={beforeUploadAntd}
                                                showUploadList={false}
                                            >
                                                {imageUrl ? (state.image ? (
                                                    <Badge
                                                        count={
                                                            <Button
                                                                type="primary"
                                                                shape="circle"
                                                                htmlType="button"
                                                                danger
                                                                icon={<CloseOutlined />}
                                                                onClick={RemoveImage}
                                                                size="small"
                                                                style={{ marginLeft: "5px" }}
                                                            />
                                                        }
                                                    ><Image
                                                    src={imageUrl}
                                                    alt="avatar"
                                                    className="rounded-circle"
                                                    style={{width:"300px"}}
                                                />

                                                    </Badge>
                                                ) : (
                                                    <></>
                                                )

                                                ) : (
                                                    <Image
                                                        src={values?.FormFiles}
                                                        alt="avatar"
                                                        className="rounded-circle"
                                                        style={{width:"300px"}}
                                                    />
                                                )}


                                               
                                            </Upload>
                                            
                                        </div>
                                        <Button
                                                    loading={loading}
                                                    type="default"
                                                    htmlType="button"
                                                    style={{ marginTop: "10px" }}
                                                >

                                                    เลือกรูปภาพ
                                                </Button>
                                    </div>

                                    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                                        <div className="rounded  shadow p-6">
                                            <div className="pb-6">
                                                <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">ชื่อ - นามสกุล</label>
                                                <div >
                                                    <Input
                                                        style={{ fontFamily: "Sriracha, cursive" }}
                                                        type="text"
                                                        size="large"
                                                        status={touched.FullName && errors.FullName ? "error" : ""}
                                                        name="FullName"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.FullName}
                                                
                                                    />
                                                </div>
                                            </div>
                                            <div className="pb-4">
                                                <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">อีเมล์</label>
                                                <Input
                                                    style={{ fontFamily: "Sriracha, cursive" }}
                                                    type="text"
                                                    size="large"
                                                    status={touched.Email && errors.Email ? "error" : ""}
                                                    name="Email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.Email}
                                             
                                                />
                                            </div>
                                            <div className="pb-4">
                                                <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">เบอร์โทร</label>
                                                <Input
                                                    style={{ fontFamily: "Sriracha, cursive" }}
                                                    type="text"
                                                    size="large"
                                                    status={touched.Phonenumber && errors.Phonenumber ? "error" : ""}
                                                    name="Phonenumber"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.Phonenumber}
                                       
                                                />
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </Form>);
                    }}
                </Formik>
            </div>

            <Footer />
        </React.Fragment>
    )
}

export default EditProfile