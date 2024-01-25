'use client'

import React from 'react'

import styles from './page.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import AppBarComponent from '@/Components/AppBarComponent';
import { Pagination } from '@mui/material';
import BlogCard from './home/components/BlogCard';

const Home = () => {

    return (
        <>
            <AppBarComponent />
            <div className="main-container">
                <Swiper
                    spaceBetween={50}
                    loop
                    navigation={true}
                    autoplay={true}
                    modules={[Navigation]}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    className={styles.mySwiper}
                >
                    <SwiperSlide>
                        <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,landscape' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,car' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,tree' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,space' />
                    </SwiperSlide>
                </Swiper>

                <div className={styles.blog_card_container}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((data, index) => {
                            return (
                                <Link key={data} href={`/blog/${data}`}>
                                    <BlogCard />
                                </Link>
                            )
                        })
                    }
                </div>

                <div className={styles.pagination_container}>
                    <Pagination count={10} shape="rounded" color='primary' variant='text' className={styles.pagination} />
                </div>
            </div>
        </>
    )
}

export default Home