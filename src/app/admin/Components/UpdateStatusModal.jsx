import { getApi } from '@/api/call.api';
import urlApi from '@/api/url.api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react'
import { showLoading } from 'react-global-loading';
import { toast } from 'react-toastify';

const UpdateStatusModal = ({ buttonComponent, status, blogId, callback }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        showLoading(true);
        let resp = await getApi(urlApi.updateBlogStatus + blogId + "/" + status);
        showLoading(false);
        if (resp.responseCode == 200) {
            handleClose();
            if (callback) {
                callback();
            }
        }else{
            toast.error(resp.message);
        }
    };

    return (
        <>
            <div onClick={handleClickOpen} style={{ width: 'max-content' }}>
                {buttonComponent}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Update Status"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Are You Sure Want To ${status == 1 ? "Publish" : status == 2 ? "Delete" : status == 3 ? "Draft" : ""} This Blog`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">No</Button>
                    <Button onClick={() => handleSubmit()} variant='contained'>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateStatusModal