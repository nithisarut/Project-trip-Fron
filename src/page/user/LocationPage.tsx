import React, { useEffect } from 'react'
import Footer from '../../components/user/Footer'
import Navbar from '../../components/user/Navbar'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { fetchLocationAsync } from '../../app/store/locationSlice';
import usePagination from '../../app/hooks/usePagination';
import DetailLocation from './DetailLocation';

function LocationPage() {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const { Search } = Input;
    const {
        locationsLoaded,
        location
    } = useAppSelector(state => state.location);//
    useEffect(() => {
        dispatch(fetchLocationAsync(""));
    }, [locationsLoaded, dispatch]);

    const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 5 });
  return (
    <React.Fragment>
        <Navbar/>
         <div className="mx-auto container px-6 xl:px-0 py-12">
            <div className="flex flex-col">
                <div className="flex flex-col justify-center">
                    <div className="relative">
                        <img className="hidden sm:block w-full" style={{height:"400px"}} src="https://www.hintokrivercamp.com/wp-content/uploads/2020/07/5d8c43bd925b346fda443ae8.jpg.webp" alt="sofa" />
                        <img className="sm:hidden w-full"  style={{height:"200"}} src="https://www.hintokrivercamp.com/wp-content/uploads/2020/07/5d8c43bd925b346fda443ae8.jpg.webp" alt="sofa" />
                        <div className="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start">
                            <p className="text-3xl sm:text-4xl font-semibold leading-9 text-white">สถานที่ท่องเที่ยวในจังหวัดกาญจนบุรี</p>
                        </div>
                    </div>
                </div>
              <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
              {React.Children.toArray(location?.data.map((item, index) => index >= minIndex &&
                                index < maxIndex && <div className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-10 flex justify-center items-center">
                        <img className="group-hover:opacity-60 transition duration-500" src={item.image} alt="sofa-2" />
                        <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
                            <div>
                                <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">{item.locationName}</p>
                            </div>
                            <div>
                                <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800">{item.typeName}</p>
                            </div>
                        </div>
                       
                        <div className="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500">
                         
                           <DetailLocation data ={item}/>
                          
                        </div>
                    </div>
                   ))}
                </div>
                
            </div>
        </div>
        
        <Footer/>
    </React.Fragment>
  )
}

export default LocationPage