import * as Yup from 'yup';
const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const LoginValidate = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('กรุณากรอกอีเมล์').matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง"),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน").min(5, "รหัสผ่านต้องมากกว่า 5 ตัว"),
});

export const CarValidate = Yup.object().shape({
  VehicleName: Yup.string().required('กรุณากรอกข้อมูล'),
  VehicleRegistration: Yup.string().required("กรุณากรอกข้อมูล"),
  Company: Yup.string().required("กรุณากรอกข้อมูล"),
  DriverName: Yup.string().required("กรุณากรอกข้อมูล"),
  NumberOFSeats: Yup.string().required("กรุณากรอกข้อมูล"),
 
});

export const LocationValidate = Yup.object().shape({
  VehicleName: Yup.string().required('กรุณากรอกข้อมูล'),
  VehicleRegistration: Yup.string().required("กรุณากรอกข้อมูล"),
  Company: Yup.string().required("กรุณากรอกข้อมูล"),
  DriverName: Yup.string().required("กรุณากรอกข้อมูล"),
  NumberOFSeats: Yup.string().required("กรุณากรอกข้อมูล"),
 
});

