import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const EditBlogCard = ({ blogData }) => {
    const router = useRouter();
    return (
        <>
            <Box sx={{ flex: { md: '0 0 33.333333%' }, width: '100%', p: 2 }}>
                <Card sx={{ position: 'relative', width: '100%' }}>
                    <div style={{
                        position: 'absolute',
                        backgroundColor: blogData?.status == 1 ? '#77D15C' : blogData?.status == 2 ? "#961502" : '#D1AF06',
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
                        image={"https://source.unsplash.com/random/1920x1080/?car"}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {blogData?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {blogData?.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color='error'>Delete</Button>

                        <Button size="small" color="info" onClick={()=>router.push("/admin/editBlog")}>Edit</Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default EditBlogCard