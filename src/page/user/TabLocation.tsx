
import React, { useEffect, useState } from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { Image } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchDetailImageLocationAsync } from '../../app/store/detailImageLocation';
import { useParams } from 'react-router-dom';
import { AddMultipleLocations } from '../../app/models/AddMultipleLocations';
import { Images } from '../../app/models/Images';
import agent from '../../app/api/agent';
import { StarIcon } from '@heroicons/react/24/outline';
import { RadioGroup } from '@headlessui/react';
import useImageDetail from '../admin/Location/useImageDetail';
interface Props {
  addMultipleLocations: any[]
}

var bgColors = {
  "BlueThream": "#576CBC",

};

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function TabLocation({ addMultipleLocations }: Props) {

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])




  const data = addMultipleLocations.map((data: any) => ({
    label: data.location.locationName,
    value: data.location.locationName,
    desc: <>
    
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">{data.location.locationName}</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">{data.location.details}</p>
                    <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">สถานที่ตั้ง</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">

                <li className="text-gray-400">
                    <span className="text-gray-600">ประเภท {data.location.type}</span>
                  </li>

                  <li className="text-gray-400">
                    <span className="text-gray-600">ตำบล {data.location.district}</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">อำเภอ {data.location.subDistrict}</span>
                  </li>

                </ul>
              </div>
            </div>

                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src={data.location.image} alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-12/12 lg:pt-8">
                    {data.locationID ? <ImageDetailLocations locationId={data.locationID} /> : ""}
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
              
                <div className="w-full lg:w-12/12 lg:pt-8">
                  
                
                </div>
            </div>
        </div>

      

     





    </>,
  }));





  return (
    <React.Fragment>
      <Tabs value={addMultipleLocations[0].location.locationName} >
        <TabsHeader style={{ backgroundColor: bgColors.BlueThream }}  >
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </React.Fragment>
  )
}

export const ImageDetailLocation = ({ locationId }: any) => {
  const { AddImage , ImageDetail } = useImageDetail();

  useEffect(() => {
    loadImage()
  }, [locationId]);

  const loadImage = async () => {
    AddImage(locationId);
  };

  return  <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2   lg:gap-4 shadow-lg rounded-md">
    {ImageDetail.length !== 0 ? (
      <> {ImageDetail.map(img => {
        return    <div key={img.id} className="p-4 pb-6 flex justify-center flex-col items-center">
        <Image className="md:block hidden" src={img.imageSum} alt="Alexa featured Img" />
        <Image className="md:hidden block" src={img.imageSum} alt="Alexa featured Img" />
  
    </div>

      })} </>
    ) : (
      <>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
                      
       </>
    )}





  </div>
}

const ImageDetailLocations = ({ locationId }: any) => {
  const [images , setImages] = useState<Images[]>([]);
  useEffect(() => {
    loadImage()
  }, [locationId]);

  const loadImage = async () => {
    const { data } = await agent.Images.getByIdImages(locationId);
    if(data){
      setImages(data)
    
  }};

  return  <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2   lg:gap-4 shadow-lg rounded-md">
    {images.length !== 0 ? (
      <> {images.map(img => {
        return    <div key={img.id} className="p-4 pb-6 flex justify-center flex-col items-center">
        <Image className="md:block hidden" src={img.imageSum} alt="Alexa featured Img" />
        <Image className="md:hidden block" src={img.imageSum} alt="Alexa featured Img" />
  
    </div>

      })} </>
    ) : (
      <>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
        <div className="p-4 pb-6 flex justify-center flex-col items-center">
            <img className="md:block hidden" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
            <img className="md:hidden block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="Elijah featured img" />
        </div>
                      
       </>
    )}





  </div>
}


export default TabLocation
