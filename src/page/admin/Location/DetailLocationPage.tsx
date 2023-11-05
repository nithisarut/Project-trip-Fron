import React from 'react'
import { useLocation } from 'react-router-dom';
import NavAdmin from '../../../components/admin/NavAdmin';
import { ImageDetailLocation } from '../../user/TabLocation';
import { Button } from 'antd';
import ModalAddimage from './ModalAddimage';

function DetailLocationPage() {
  const { state } = useLocation();

  return (
    <React.Fragment>

      <NavAdmin>
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">{state.locationName} </h1>
              <h3 className="text-sm  font-medium text-gray-800"></h3>
              <p className="font-normal text-base leading-6 text-gray-600 ">{state.details}</p>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">สถานที่ตั้ง</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">ประเภท {state.typeName}  </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">ตำบล  {state.subDistrict} </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">อำเภอ {state.district}  </span>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-8/12 ">
              <img className="w-full h-full" src={state.image} alt="A group of People" />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
            <div className="w-full lg:w-12/12 lg:pt-8">
              <ModalAddimage id={state.locationID} />
              <ImageDetailLocation locationId={state.locationID} />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
            <div className="w-full lg:w-12/12 lg:pt-8">
            </div>
          </div>
        </div>
      </NavAdmin>

    </React.Fragment>
  )
};

 

export default DetailLocationPage