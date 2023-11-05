import React, { useEffect } from 'react'
import { Slide } from 'react-slideshow-image'
import Footer from '../../components/user/Footer'
import Navbar from '../../components/user/Navbar'
import 'react-slideshow-image/dist/styles.css'

import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { Link } from 'react-router-dom'
import { fetchTripNew } from '../../app/store/tripSlice'
import { Badge, Button } from 'antd'


const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '500px'
}
const slideImages = [
    {
        url: 'https://drive.google.com/uc?id=1LLluyyXkwDBb0jir7_3T69PHJKMQ60mj',
        caption: 'Slide 1'
    },
    {
        url: 'https://drive.google.com/uc?id=1pt5XM7GIJjHZpAl12Ca73mE9pc1fZH5S',
        caption: 'Slide 2'
    },
    {
        url: 'https://drive.google.com/uc?id=1WpapXQnNi1xcdLNDrqqrw53uauifpL7s',
        caption: 'Slide 3'
    },
];
function Home() {



    const dispatch = useAppDispatch();
    const { tripnewLoaded, tripnew } = useAppSelector((state) => state.trip);

    useEffect(() => {
        if (!tripnewLoaded) dispatch(fetchTripNew());
    }, [tripnewLoaded, dispatch])

    console.log(tripnew)



    return (
        <React.Fragment>
            <Navbar />
            <div className="slide-container bg-gray-100">
                <Slide>
                    {slideImages.map((slideImage, index) => (
                        <div key={index}>
                            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>

            <div className="relative overflow-hidden mt-5">
                <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                สำรวจธรรมชาติของจังหวัดกาญจนบุรี
                            </h1>
                            <p className="mt-4 text-xl text-gray-500">
                                ทริปท่องเที่ยวสบาย ๆ ไปตามภูมิภาคเพื่อพบกับแหล่งประวัติศาสตร์สมัยสงครามโลกครั้งที่2 หรือมุ่งหน้าปีนภูเขาสุดท้าทาย
                            </p>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img
                                                        src="https://www.thelostpassport.com/wp-content/uploads/2018/08/Kanchanaburi-Travel-Guide.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://cdn.getyourguide.com/img/location/5b923231e197c.jpeg/75.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://www.tripsavvy.com/thmb/DwZw2Snzqr26ZSvnK7OueZ2NDMg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/elephants-kanchanaburi-thailand-5b819c8246e0fb00505f9e31.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://www.serenatahotels.com/wp-content/uploads/2021/04/DJI_0078.jpg.webp"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://a.cdn-hotels.com/gdcs/production166/d626/d49e05e8-d3cf-4e6a-b823-78b8546f445f.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://content.r9cdn.net/rimg/dimg/00/f8/2e3cd183-city-44602-16e3ebf76bb.jpg?width=1366&height=768&xhint=1095&yhint=1625&crop=true"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/47/e7/4f/taweechai-elephant-camp.jpg?w=1200&h=1200&s=1"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to={"/Trip"}
                                    className="inline-block rounded-md border border-transparent bg-blueeThrem py-3 px-8 text-center font-medium text-white hover:bg-bg-orangeThrem"
                                >
                                    แพ็กเกจทัวร์ทั้งหมด
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='space-y-4 border-b border-gray-300 pb-6  '></div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">แพ็กเกจมาใหม่</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                    
                    {tripnew ? tripnew.data?.map((data: any, index: any) => (
<div className=' transform hover:scale-105 transition duration-500'>
<Badge.Ribbon placement='start' text="ใหม่" style={{ backgroundColor: "green" }}>
                                <div className="bg-blackThrem ">

                                    <div className="mx-auto container py-8">
                                        <div className="flex flex-wrap items-center lg:justify-between justify-center">

                                            <div className="mx-2 w-72 lg:mb-0 mb-8">
                                                <div>
                                                    <img src={data.imageTrip} className="w-full h-44" />
                                                </div>
                                                <div className="bg-white">
                                                    <div className="flex items-center justify-between px-4 pt-4">
                                                        <div>

                                                        </div>
                                                        <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                                                            <p className="text-xs text-yellow-500">{data.classTripName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex items-center">
                                                            <h2 className="font-semibold">{data.tripName}</h2>
                                                        </div>
                                                        <div className="flex mt-4">
                                                            <div>
                                                                <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">ออกเดินทาง {new Date(data.dateTimeStart).toLocaleString("th-TH", {
                                                                    year: "numeric",
                                                                    month: "numeric",
                                                                    day: "2-digit",
                                                                })}</p>
                                                            </div>
                                                            <div className="pl-2">
                                                                <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">ถึง {new Date(data.dateTimeEnd).toLocaleString("th-TH", {
                                                                    year: "numeric",
                                                                    month: "numeric",
                                                                    day: "2-digit",
                                                                })}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between py-4">
                                                        <Link key={index} to={`/DetailTrip/${data.id}`} className=" text-black bg-blueeThrem border-0 py-1 px-2 focus:outline-none rounded" style={{color:"white"}}>รายละเอียด</Link>
                                                            <h3 className="text-indigo-700 text-xs font-semibold">ราคา {new Intl.NumberFormat().format(data?.price as any)} บาท </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              
                            </Badge.Ribbon>
</div>
                       
                       

                       
                    )) : "ไม่มีสินค้า"}
                </div>
            </div>

            <Footer />
        </React.Fragment>
    )
}

export default Home