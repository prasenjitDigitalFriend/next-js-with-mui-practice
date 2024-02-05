'use client'

import AppBarComponent from '@/Components/AppBarComponent';
import { getApi } from '@/api/call.api';
import urlApi from '@/api/url.api';
import { Chip } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react'
import { GlobalLoading, showLoading } from 'react-global-loading';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { toast } from 'react-toastify';

const SingleBLog = ({ params }) => {

  const fetchBlogs = async () => {
    showLoading(true);
    let url = `${urlApi.getBlogById}${params.blog}`;
    const resp = await getApi(url);
    showLoading(false);
    if (resp.responseCode === 200) {
      return resp.data;
    } else {
      toast.error("No Data Available!!!");
    }
  }

  const { data: blogData } = useQuery({
    queryKey: ['blogs-details', params.blog],
    queryFn: fetchBlogs,
    placeholderData: keepPreviousData,
    staleTime: 5000
  })

  return (
    <>
      <GlobalLoading />
      <AppBarComponent />
      <div className="main-container" style={{ marginTop: 40, marginBottom: 40 }}>
        <Chip
          color="primary"
          size="small"
          variant="outlined"
          label={`Blog`}
          sx={{ mb: 3 }}
        />
        <Image src={blogData?.image } height={0} width={0} style={{ height: '100%', width: '100%', maxHeight: '50vh', objectFit: 'cover', borderRadius: '16px', marginBottom: '30px' }} alt='' sizes='100vw' />
        <h2>
          {blogData?.title}
        </h2>
        <br />
        <h4>{blogData?.description}</h4>
        <br />
        <br />
        <div dangerouslySetInnerHTML={{ __html: blogData?.blogText }}></div>
        <br />
        <div style={{display:'flex',gap:10}}>
          <FacebookShareButton url={`https://edepto.in/blog/blog/${blogData?._id}`}>
            <FacebookIcon round size={40}/>
          </FacebookShareButton>
          <WhatsappShareButton url={`https://edepto.in/blog/blog/${blogData?._id}`} title={`Read This Blog About : ${blogData?.title} :`}>
            <WhatsappIcon round size={40} />
          </WhatsappShareButton>
        </div>
      </div>
    </>
  )
}

export default SingleBLog