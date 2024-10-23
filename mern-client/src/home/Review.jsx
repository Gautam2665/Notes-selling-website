import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa6';
import {Avatar} from 'flowbite-react';
import proPic from "../assets/profile.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Review = () => {
  return (
    <div className='my-12 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</h2>
        <div>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui dignissimos a molestias nemo porro dolor, blanditiis exercitationem asperiores odio autem officiis non in dolorum quas fugiat facilis dolorem quibusdam repellendus!</p>
                    <Avatar 
                        alt="Avatar of smith"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg front-medium'>Mark Smith</h5>
                    <p>CEO, Company Inc.</p>
                </div>
            </div>
            
        </SwiperSlide>

        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui dignissimos a molestias nemo porro dolor, blanditiis exercitationem asperiores odio autem officiis non in dolorum quas fugiat facilis dolorem quibusdam repellendus!</p>
                    <Avatar 
                        alt="Avatar of smith"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg front-medium'>Ari May</h5>
                    <p>HR, Cisco Inc.</p>
                </div>
            </div>
            
        </SwiperSlide>

        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui dignissimos a molestias nemo porro dolor, blanditiis exercitationem asperiores odio autem officiis non in dolorum quas fugiat facilis dolorem quibusdam repellendus!</p>
                    <Avatar 
                        alt="Avatar of smith"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg front-medium'>Aleah Castillo</h5>
                    <p>CEO, GreatLerning Inc.</p>
                </div>
            </div>
            
        </SwiperSlide>

        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui dignissimos a molestias nemo porro dolor, blanditiis exercitationem asperiores odio autem officiis non in dolorum quas fugiat facilis dolorem quibusdam repellendus!</p>
                    <Avatar 
                        alt="Avatar of smith"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg front-medium'>Lina Parker</h5>
                    <p>CEO, CHALO Inc.</p>
                </div>
            </div>
            
        </SwiperSlide>

        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui dignissimos a molestias nemo porro dolor, blanditiis exercitationem asperiores odio autem officiis non in dolorum quas fugiat facilis dolorem quibusdam repellendus!</p>
                    <Avatar 
                        alt="Avatar of smith"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg front-medium'>Jhon Doe</h5>
                    <p>CEO, Company Inc.</p>
                </div>
            </div>
            
        </SwiperSlide>

      </Swiper>      
        </div>
    </div>
  )
}

export default Review
