'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, MenuItem, Stack, TextField, TextareaAutosize } from '@mui/material';
import { WithContext as ReactTags } from 'react-tag-input';
import createBlogStyle from "./style.module.css"

const CustomEditor = dynamic(() => {
    return import('./../../../Components/CustomEditor');
}, { ssr: false });

export default function CreateBlog() {

    const [files, setFiles] = useState([]);
    const [tags, setTags] = useState([]);

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

    const currencies = [
        {
            value: 'Latest Jobs',
            label: 'Latest Jobs',
        },
        {
            value: 'Blog',
            label: 'Blog',
        },
    ];

    return (
        <>
            <TextField label="Blog Title" sx={{ width: 1, mb: 2 }} />
            <TextField
                id="outlined-multiline-static"
                label="Summery & Description"
                multiline
                rows={4}
                sx={{ width: 1, mb: 2 }}
            />
            <TextField
                id="outlined-select-currency"
                select
                label="Category"
                defaultValue="EUR"
                sx={{ width: 1, mb: 2 }}
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <br />
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
            {
                <img id='image-preview' alt='' style={{ maxWidth: '100%', maxHeight: '400px', marginTop: 10, marginLeft: 'auto', marginRight: 'auto' }} />
            }
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
            <hr style={{ margin: '15px 0px' }} />
            <CustomEditor initialData='<h1>Hello from CKEditor in Next.js!</h1>' />

            <div style={{display:'flex',justifyContent:'end'}}>
                <Stack sx={{ mt: 2 }} direction={"row"} gap={2}>
                    <Button variant="contained" color="info">
                        Save Draft
                    </Button>
                    <Button variant="contained" color="success">
                        Publish
                    </Button>
                </Stack>
            </div>
        </>
    )
}