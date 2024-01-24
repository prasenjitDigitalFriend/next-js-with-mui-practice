'use client'

import React from 'react'

import { useState } from 'react';
import styles from './style.module.css';
import Button from '@mui/material/Button';
import { AppBar, Box, Container, IconButton, Toolbar, Typography, Menu, MenuItem, Tooltip, Avatar, TextField } from '@mui/material';
import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


const pages = ['Home', 'Job Updates', 'Latest Updates'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Home = () => {
    const [names, setNames] = useState('');

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const AppBarComponent = () => {
        return (
            <AppBar position="static" sx={{ bgcolor: '#2a2a2a', }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                                disableScrollLock
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={names} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                disableScrollLock
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    }
    return (
        <>
            <AppBarComponent />
            <div className="main-container">
                    <Swiper
                        spaceBetween={50}
                        loop
                        navigation={true}
                        autoplay={true}
                        modules={[Navigation]}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        className={styles.mySwiper}
                    >
                        <SwiperSlide>
                            <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,landscape' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,car' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,tree' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,space' />
                        </SwiperSlide>
                    </Swiper>
                </div>
        </>
    )
}

export default Home