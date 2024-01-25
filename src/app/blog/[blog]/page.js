'use client'

import AppBarComponent from '@/Components/AppBarComponent';
import { Chip } from '@mui/material';
import Image from 'next/image';
import React from 'react'

const SingleBLog = ({ params }) => {
  return (
    <>
      <AppBarComponent />
      <div className="main-container" style={{ marginTop: 40, marginBottom: 40 }}>
        <Chip
          color="primary"
          size="small"
          variant="outlined"
          label={`Blog ${params.blog}`}
          sx={{mb:3}}
        />
        <Image src={'/images/blog.jpg'} height={0} width={0} style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '16px', marginBottom: '30px' }} alt='' sizes='100vw' />
        <h2>
          Uttar Pradesh Police UPP Constable Sports Quota 2023 Apply Online for 546 Male / Female Post
        </h2>
        <br />
        <br />
        <p>Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don&apos;t plan and prepare adequately. In this blog article, we&apos;ll explore tips and tricks for a memorable journey and how to make the most of your travels.

          One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.</p>
      </div>
    </>
  )
}

export default SingleBLog