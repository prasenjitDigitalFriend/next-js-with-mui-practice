'use client'

import { getApi } from '@/api/call.api';
import urlApi from '@/api/url.api';
import { Check, Delete, LabelOff } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {

  const fetchTopBlogs = async () => {
    let url = `${urlApi.getBlogCounts}`;
    const resp = await getApi(url);
    if (resp.responseCode === 200) {
      return resp.data;
    } else {
      toast.error("No More Data Available!!!");
    }
  }

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchTopBlogs,
    staleTime: 5000,
    placeholderData: keepPreviousData
  })

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: 15, flexWrap: 'wrap', gap: '10px' }}>
        <Card sx={{ padding: '15px' }}>
          <CardActionArea>
            <Stack direction={"row"} spacing={10} alignItems={'center'} justifyContent={'center'}>
              <Typography variant="h4" component="h4" lineHeight={'normal'}>
                {"Blogs"}
              </Typography>
              <Typography variant="h1" color="text.secondary" lineHeight={'normal'}>
                {dashboardData?.totalCount ?? 0}
              </Typography>
            </Stack>
            <CardContent>
              <Stack direction={"row"} spacing={5} alignItems={'center'}>
                <Chip icon={<Check />} label={dashboardData?.activeCount ?? 0} variant="outlined" color="success" sx={{ padding: 1 }} />
                <Chip icon={<LabelOff />} label={dashboardData?.draftCount ?? 0} variant="outlined" color="warning" sx={{ padding: 1 }} />
                <Chip icon={<Delete />} label={dashboardData?.inActiveCount ?? 0} variant="outlined" color="error" sx={{ padding: 1 }} />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  )
}

export default AdminDashboard