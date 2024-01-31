'use client'

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Book as BookIcon, Category, Home as HomeIcon, Logout } from '@mui/icons-material';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GlobalLoading } from 'react-global-loading';


const drawerWidth = 240;

export default function Layout({ children, props }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const pathname = usePathname();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const menuItems = [
        {
            id: 1,
            name: 'Home',
            icon: <HomeIcon color='primary' />,
            link: "/admin/dashboard"
        },
        {
            id: 2,
            name: 'All Blogs',
            icon: <BookIcon color='primary' />,
            link: "/admin/allBlog"
        }, {
            id: 3,
            name: 'Categories',
            icon: <Category color='primary' />,
            link: "/admin/categories"
        },
        {
            id: 4,
            name: 'Logout',
            icon: <Logout color='error' />,
            link: "/admin/login"
        }
    ]

    const drawer = (
        <div>
            <Toolbar sx={{ backgroundColor: 'transparent' }}>
                <Typography sx={{ backgroundColor: 'transparent' }} variant='h4'>Edepto</Typography>
            </Toolbar>
            <Divider />
            <List sx={{ backgroundColor: 'transparent' }}>
                {menuItems.map((text, index) => (
                    <Link href={text?.link} key={text?.id}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {text?.icon}
                                </ListItemIcon>
                                <ListItemText primary={text?.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {pathname != "/admin/login" && <>
                {/* <CssBaseline /> */}
                {/* <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar variant='regular' sx={{ background: '#9965f4' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Edepto Blog
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'transparent' },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'transparent', color: 'white' },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </>}
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {/* <Toolbar /> */}

                <GlobalLoading />
                {children}
            </Box>
        </Box>
    )
}