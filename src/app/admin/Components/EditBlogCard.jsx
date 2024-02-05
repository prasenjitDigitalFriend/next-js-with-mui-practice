import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Badge, Box, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import UpdateStatusModal from './UpdateStatusModal';

const EditBlogCard = ({ blogData,callback}) => {
    const router = useRouter();
    return (
        <>
            <Box sx={{ flex: { md: '0 0 33.333333%' }, width: '100%', p: 2 }}>
                <Card sx={{ position: 'relative', width: '100%' }}>
                    <div style={{
                        position: 'absolute',
                        backgroundColor: blogData?.status == 1 ? '#77D15C' : blogData?.status == 2 ? "#f76752" : '#D1AF06',
                        right: 0,
                        padding: 5,
                        fontSize: 14,
                        borderRadius: '1px',
                        color: '#373737',
                        textTransform: 'capitalize'
                    }}>
                        {blogData?.statusString.toLowerCase()}
                    </div>
                    <CardMedia
                        component="img"
                        height="140"
                        image={blogData?.image}
                        alt="blog thumbnail"
                    />
                    <CardContent>
                        <Chip label={blogData?.categoryString} color="primary" size='small' variant="contained" sx={{ fontSize: 12 }} />
                        <Typography gutterBottom variant="h5" component="div">
                            {blogData?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {blogData?.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {blogData?.status == 1 && <UpdateStatusModal callback={callback} blogId={blogData?._id} status={3} buttonComponent={<Button size="small" variant='outlined' color='secondary'>{"Make Draft"}</Button>} />}
                        {blogData?.status == 3 && <UpdateStatusModal callback={callback} blogId={blogData?._id} status={1} buttonComponent={<Button size="small" variant='outlined' color='primary'>{"Make Publish"}</Button>} />}
                        {blogData?.status == 2 && <UpdateStatusModal callback={callback} blogId={blogData?._id} status={1} buttonComponent={<Button size="small" variant='outlined' color='info'>Restore</Button>} />}
                        {blogData?.status != 2 && <UpdateStatusModal callback={callback} blogId={blogData?._id} status={2} buttonComponent={<Button size="small" color='error'>Delete</Button>} />}
                        <Button size="small" color="info" onClick={() => router.push(`/admin/editBlog/${blogData?._id}`)}>Edit</Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default EditBlogCard