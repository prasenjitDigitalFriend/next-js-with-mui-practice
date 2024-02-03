'use client'

import Link from 'next/link';
import styles from '../../page.module.css';
import { Box, Button, ButtonGroup, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Pagination, Stack } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import EditBlogCard from '../Components/EditBlogCard';
import { getApi } from '@/api/call.api';
import urlApi from '@/api/url.api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
export default function AllBlogAdminPage() {

    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [search, setSearch] = useState("");

    const fetchBlogs = async () => {
        let url = `${urlApi.getAllBlogForAdmin}?page=${page}&limit=9`
        if (statusFilter) {
            url += `&statusFilter=${statusFilter}`
        }
        if (categoryFilter) {
            url += `&categoryFilter=${categoryFilter}`
        }
        if (search) {
            url += `&search=${search}`
        }
        const resp = await getApi(url);
        if (resp.responseCode === 200) {
            return resp.data;
        }else{
            toast.error("No More Data Available!!!")
            setPage(old=>Math.max(old-1,1))
        }
    }

    const { isLoading, data: blogs, error } = useQuery({
        queryKey: ['blogs', page, statusFilter, categoryFilter, search],
        queryFn: fetchBlogs,
        placeholderData: keepPreviousData,
    });

    function onReset() {
        setPage(1);
        setStatusFilter(null);
        setCategoryFilter(null);
    }

    const prevFunc = () => {
        setPage(prev => Math.max(prev - 1, 1));
    }

    const nextFunc = () => {
        setPage(prev => prev + 1);
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 15, flexWrap: 'wrap', gap: '10px' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                    <FormControl sx={{ width: { xs: '100%', sm: 'auto' } }} size='small' variant="outlined">
                        <InputLabel sx={{ color: 'white' }} htmlFor="search-field">Search...</InputLabel>
                        <OutlinedInput
                            sx={{ width: 1, color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' }, '.mui-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }} inputProps={{ style: { color: 'white' } }}
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
                                        onClick={(e) => { console.log(document.getElementById("search-field").value); }}
                                        edge="end"
                                    >
                                        {<Search sx={{ color: 'white' }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button variant={statusFilter == null ? 'contained' : 'outlined'} onClick={() => { setPage(1); setStatusFilter(null) }} >All</Button>
                        <Button variant={statusFilter == 1 ? 'contained' : 'outlined'} onClick={() => { setPage(1); setStatusFilter(1) }} >Active</Button>
                        <Button variant={statusFilter == 3 ? 'contained' : 'outlined'} onClick={() => { setPage(1); setStatusFilter(3) }} >Draft</Button>
                        <Button variant={statusFilter == 2 ? 'contained' : 'outlined'} onClick={() => { setPage(1); setStatusFilter(2) }} >Inactive</Button>
                    </ButtonGroup>

                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button variant={categoryFilter == null ? 'contained' : 'outlined'} onClick={() => { setPage(1); setCategoryFilter(null) }} >All</Button>
                        <Button variant={categoryFilter == 1 ? 'contained' : 'outlined'} onClick={() => { setPage(1); setCategoryFilter(1) }} >Blog</Button>
                        <Button variant={categoryFilter == 2 ? 'contained' : 'outlined'} onClick={() => { setPage(1); setCategoryFilter(2) }} >Job</Button>
                    </ButtonGroup>

                    <Button variant='contained' color='error' onClick={() => onReset()} >Clear</Button>
                </Box>

                <Box sx={{ width: { xs: '100%',sm:'auto' } }}>
                    <Link href={"/admin/createBlog"}>
                        <Button variant='contained' sx={{width:'100%'}} startIcon={<Add />} >Create New</Button>
                    </Link>
                </Box>
            </div>
            <div className={styles.blog_card_container}>
                {
                    blogs?.map((data, index) => {
                        return (
                            // <Link key={data} href={`/blog/${data}`}>
                            <EditBlogCard key={data?._id} blogData={data} />
                            // </Link>
                        )
                    })
                }
            </div>

            <div style={{ display: 'flex', justifyContent: 'end', padding: 15 }}>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" disabled={page === 1} startIcon={<ArrowBackIosNewIcon />} onClick={prevFunc}>
                        Previous
                    </Button>
                    <Button variant="contained" endIcon={<NavigateNextIcon />} onClick={nextFunc}>
                        Next
                    </Button>
                </Stack>
            </div>
        </>
    )
}