'use client'

import React, { useState } from 'react'

import styles from '../page.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import AppBarComponent from '@/Components/AppBarComponent';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import urlApi from '@/api/url.api';
import { getApi } from '@/api/call.api';
import { toast } from 'react-toastify';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { Search } from '@mui/icons-material';
import BlogCard from '../home/components/BlogCard';
import { useRouter } from 'next/navigation';

const Home = () => {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const router = useRouter();

    const fetchBlogs = async () => {
        let url = `${urlApi.getAllBlog}?page=${page}&limit=9&categoryFilter=2`;
        if (search) {
            url += `&search=${search}`
        }
        const resp = await getApi(url);

        if (resp.responseCode === 200) {
            return resp.data;
        } else {
            toast.error("No More Data Available!!!");
            setPage(old => Math.max(old - 1, 1))
        }
    }

    const fetchTopBlogs = async () => {
        let url = `${urlApi.getSlidersBlog}?&categoryFilter=2`;
        const resp = await getApi(url);
        if (resp.responseCode === 200) {
            return resp.data;
        } else {
            toast.error("No More Data Available!!!");
        }
    }

    const { data: topBlogs } = useQuery({
        queryKey: ['top-jobs'],
        queryFn: fetchTopBlogs,
        placeholderData: keepPreviousData,
        staleTime: 5000
    });

    const { isLoading, data: blogs, error } = useQuery({
        queryKey: ['job-update', page, search],
        queryFn: fetchBlogs,
        placeholderData: keepPreviousData,
        staleTime: 5000
    });

    const prevFunc = () => {
        setPage(prev => Math.max(prev - 1, 1));
    }

    const nextFunc = () => {
        setPage(prev => prev + 1);
    }

    return (
        <>
            <AppBarComponent />
            <div className="main-container">

                <Box sx={{ width: '100%', textAlign: { xs: 'center', sm: 'end' }, mt: 2 }}>
                    <FormControl sx={{ width: { xs: '100%', sm: 'auto' }, marginLeft: 'auto' }} size='small' variant="outlined">
                        <InputLabel sx={{ color: 'white' }} htmlFor="search-field">Search...</InputLabel>
                        <OutlinedInput
                            sx={{ width: 1, color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' }, '.mui-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                            inputlabelprops={{ style: { color: 'white' } }} inputProps={{ style: { color: 'white' } }}
                            id="search-field"
                            type='text'
                            onChange={debounce((e) => {
                                setPage(1);
                                setSearch(e.target.value)
                            }, 400)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(e) => { setSearch(document.getElementById("search-field").value); }}
                                        edge="end"
                                    >
                                        {<Search sx={{ color: 'white' }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Box>

                {search.length == 0 && <Swiper
                    spaceBetween={50}
                    loop
                    navigation={true}
                    autoplay={true}
                    modules={[Navigation]}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    className={styles.mySwiper}
                    slidesPerView={1}
                >
                    {
                        topBlogs?.map((data, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div style={{ position: "relative" }} className={styles?.swiper_inside_container}>
                                        <img src={data?.image} alt="" />
                                        <div style={{
                                            position: 'absolute',
                                            height: '100%',
                                            width: '100%',
                                            background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)',
                                            top: 0,
                                            left: 0,
                                        }}>
                                            <Button sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)' }} variant='contained' onClick={() => {
                                                router.push(`/blog/${data?._id}`)
                                            }}>Read Full Blog</Button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>}

                <div className={styles.blog_card_container}>
                    {
                        blogs?.map((data, index) => {
                            return (
                                <BlogCard blogData={data} key={data?._id} />
                            )
                        })
                    }
                </div>

                <div style={{ display: 'flex', justifyContent: 'end', padding: 15 }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" disabled={page === 1} startIcon={<ArrowBackIosNewIcon />} onClick={prevFunc}>
                            Previous
                        </Button>
                        <Button variant="contained" disabled={blogs?.length < 9} endIcon={<NavigateNextIcon />} onClick={nextFunc}>
                            Next
                        </Button>
                    </Stack>
                </div>
            </div>
        </>
    )
}

export default Home