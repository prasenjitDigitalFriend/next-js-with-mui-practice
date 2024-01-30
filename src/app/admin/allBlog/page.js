import Link from 'next/link';
import styles from '../../page.module.css';
import { Button, Pagination } from '@mui/material';
import { Add } from '@mui/icons-material';
import EditBlogCard from '../Components/EditBlogCard';
export default function AllBlogAdminPage() {

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Link href={"/admin/createBlog"}>
                    <Button variant='contained' startIcon={<Add />}>Create New</Button>
                </Link>
            </div>
            <div className={styles.blog_card_container}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((data, index) => {
                        return (
                            // <Link key={data} href={`/blog/${data}`}>
                            <EditBlogCard key={data} />
                            // </Link>
                        )
                    })
                }
            </div>

            <div className={styles.pagination_container}>
                <Pagination count={10} shape="rounded" color='primary' variant='text' className={styles.pagination} />
            </div>
        </>
    )
}