import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { useRouter } from 'next/navigation';

const BlogCard = ({ blogData }) => {

    const router = useRouter();

    return (
        <Box sx={{ flex: { md: '0 0 33.333333%' }, width: '100%', p: 2 }} onClick={() => {
            router.push(`/blog/${blogData?._id}`)
        }}>
            <Card sx={{ width: '100%' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={blogData?.image}
                        alt="Blog Thumbnail"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {blogData.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {blogData?.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default BlogCard