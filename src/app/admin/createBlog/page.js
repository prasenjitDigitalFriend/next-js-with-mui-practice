'use client'

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField, TextareaAutosize } from '@mui/material';
import { WithContext as ReactTags } from 'react-tag-input';
import createBlogStyle from "./style.module.css"
import { useMutation } from '@tanstack/react-query';
import { showLoading } from 'react-global-loading';
import { imageUploadApi, postApi } from '@/api/call.api';
import urlApi from '@/api/url.api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CustomEditor = dynamic(() => {
    return import('./../../../Components/CustomEditor');
}, { ssr: false });

export default function CreateBlog() {

    const [files, setFiles] = useState([]);
    const [tags, setTags] = useState([]);
    const editorRef = useRef(null);
    const [categoryDropdown, setCategoryDropdown] = useState("");

    const router = useRouter();

    const handleChange = (e) => {
        setFiles(e.target.files[0]);
        document.getElementById('image-preview').src = URL.createObjectURL(e.target.files[0]);
    }

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const KeyCodes = {
        comma: 188,
        enter: 13
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const categories = [
        {
            value: 1,
            label: 'Blog',
        }, {
            value: 2,
            label: 'Latest Jobs',
        },
    ];

    async function createBlog(postData) {
        showLoading(true);
        let resp = await postApi(postData, urlApi.createBlog)
        showLoading(false);
        if (resp.responseCode === 200) {
            toast.success(resp.message);
            router.back();
        } else {
            toast.error(resp.message);
        }
    }

    const mutation = useMutation({
        mutationFn: (postData) => {
            return createBlog(postData)
        },
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let postData = {
            title: document.getElementById('post-title').value,
            description: document.getElementById('post-summery').value,
            image:  await imageUpload(),
            keywords: tags,
            category: categoryDropdown,
            blogText: editorRef.current.getContent(),
            status: 1,
            atSlider: document.getElementById('add-slider-checkbox').checked ? 1 : 2
        }

        mutation.mutate(postData);
    }

    const handleDraft = async (e) => {
        e.preventDefault();
        let postData = {
            title: document.getElementById('post-title').value,
            description: document.getElementById('post-summery').value,
            image: await imageUpload(),
            keywords: tags,
            category: categoryDropdown,
            blogText: editorRef.current.getContent(),
            status: 3,
            atSlider: 2,
        }
        mutation.mutate(postData);
    }

    const imageUpload = async () => {
        showLoading(true);
        let formData = new FormData();
        formData.append('image', files);

        let resp = await imageUploadApi(formData, urlApi.uploadImage);
        showLoading(false);
        if (resp.responseCode === 200) {
            return resp.data
        } else {
            toast.error(resp.message);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', gap: '15px', flexWrap: { md: 'nowrap', sm: 'wrap', xs: 'wrap' } }}>
                <Box sx={{ width: { xl: 3 / 5, lg: 3 / 5, md: 3 / 5, sm: 1, xs: 1 } }}>
                    <TextField label="Blog Title" sx={{ width: 1, mb: 2, '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' }, '.mui-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }} id='post-title'
                        InputLabelProps={{ style: { color: 'white' } }} inputProps={{ style: { color: 'white' } }} />
                    <TextField
                        label="Summery & Description"
                        multiline
                        rows={4}
                        sx={{ width: 1, mb: 2, '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' }, '.mui-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                        InputLabelProps={{ style: { color: 'white' } }} inputProps={{ style: { color: 'white' } }}
                        id='post-summery'
                    />
                    <ReactTags
                        tags={tags}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        inputFieldPosition="top"
                        autocomplete
                        allowDragDrop={false}
                        classNames={{
                            tagInputField: createBlogStyle.tagInputField,
                            tag: createBlogStyle.singleTag,
                            remove: createBlogStyle.removeIcon,
                            selected: createBlogStyle.selectedArea
                        }}
                    />
                    <TextField
                        id="post-category"
                        select
                        label="Category"
                        sx={{ width: 1, mb: 2, mt: 2, color: 'white', '.mui-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': { color: 'white' }, '.MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' }, '.mui-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                        onChange={(e) => setCategoryDropdown(e.target.value)}
                        InputLabelProps={{ style: { color: 'white' } }} inputProps={{ style: { color: 'white' } }}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <FormControlLabel control={<Checkbox id='add-slider-checkbox' />} label="Add To Slider" />
                </Box>

                <Box sx={{ width: { xl: 2 / 5, lg: 2 / 5, md: 2 / 5, sm: 1, xs: 1 } }}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Main Image
                        <input onChange={handleChange}
                            type="file"
                            hidden
                        />
                    </Button>
                    <br />
                    <img id='image-preview' alt='' style={{ maxWidth: '100%', maxHeight: '400px', marginTop: 10, marginLeft: 'auto', marginRight: 'auto' }} />

                </Box>
            </Box>

            <hr style={{ margin: '15px 0px' }} />

            <CustomEditor initialData='' editorRef={editorRef} />

            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Stack sx={{ mt: 2 }} direction={"row"} gap={2}>
                    <Button variant="contained" color="info" onClick={handleDraft}>
                        Save Draft
                    </Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Publish
                    </Button>
                </Stack>
            </div>
        </>
    )
}