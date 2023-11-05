import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AddMultipleLocations } from '../../app/models/AddMultipleLocations';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchDetailTrip, resetDetailTrip } from '../../app/store/tripSlice';
import Footer from '../../components/user/Footer'

import Navbar, { loadAccountStorage } from '../../components/user/Navbar'
import Comment from './Comment';
import TabLocation from './TabLocation';
import Swal from 'sweetalert2';



function DetailTrip() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch()
  const { detailTrip } = useAppSelector((state) => state.trip);
  const account = loadAccountStorage();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    return Swal.fire('กรุณาเข้าสู่ระบบก่อน')
  };


  useEffect(() => {
    dispatch(fetchDetailTrip(id))
  }, [id, dispatch]);

  const addMultipleLocationsLength = detailTrip?.addMultipleLocations?.length;
  if (addMultipleLocationsLength !== undefined) {
  }








  return (
    <React.Fragment>
      <Navbar />
      <div className="text-gray-700 body-font overflow-hidden bg-white mt-5 ">
        <div className=" px-5  mx-auto ">

          <div className="lg:w-5/5 mx-auto flex flex-wrap ">

            <img className="lg:w-1/2  rounded border border-gray-200" src={detailTrip?.imageTrip} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{detailTrip?.tripName}</h1>
              <div className="flex mb-4">
                <h1 className="leading-relaxed">ระดับ {detailTrip?.classTrip.name}</h1>
              </div>

              <p className="leading-relaxed">{detailTrip?.detail}</p>


              <div className="flex mt-6 items-center ">
                <p className="leading-relaxed text-gray-900">จำนวนคนที่รับ {detailTrip?.amount} คน</p>
              </div>
              <div className="flex" >
                <span className="title-font font-medium  text-2xl text-gray-900">ราคา : {new Intl.NumberFormat().format(detailTrip?.price as any)} บาท(ต่อคน) </span>
                {account ? (
                  <Link to={"/FormRent"} state={detailTrip} className="flex ml-auto text-black bg-blueeThrem border-0 py-2 px-6 focus:outline-none rounded" style={{ color: "white" }}>จอง</Link>
                ) : (
                  <Link to={"#"} onClick={handleLogin} state={detailTrip} className="flex ml-auto text-black bg-blueeThrem border-0 py-2 px-6 focus:outline-none rounded" style={{ color: "white" }}>จอง</Link>
                )}
              </div>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5" />
              <div className='title-font font-medium text-1xl text-black"'>ตารางการจัดกิจกรรม</div>
              <br />
              <Link to={detailTrip && detailTrip!.file.toString() || ""} target="_blank" className=" ml-auto text-black bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" style={{ color: "white" }}>เอกสาร</Link>
            </div>

          </div>
          <br />

          {detailTrip && detailTrip!.addMultipleLocations?.length > 0 ? <TabLocation addMultipleLocations={detailTrip?.addMultipleLocations as any} /> : ""}

        </div>

      </div>

      <Comment></Comment>
      <Footer />
    </React.Fragment>
  )
}

export default DetailTrip