import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { AppBar, Box, Container, IconButton, Toolbar, Typography, Menu, MenuItem, Tooltip, Avatar, TextField, Pagination, Drawer } from '@mui/material';
import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material';
import Image from 'next/image';

import style from "./component.module.css"

import logo from "../../public/images/logo.png";
import Link from 'next/link';

const pages = ['Home', 'Job Updates'];

const AppBarComponent = () => {


    var openApp = function () {
        window.location.replace('edepto://edepto.in');
    };

    function detect() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            openApp();
            setTimeout(() => {
                window.location.replace("https://play.google.com/store/apps/details?id=com.app.edepto&pli=1")
            }, 700);
            return "Android";
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        else {
            window.open("https://test.edepto.in", "_blank");
        }

        return "unknown";
    }


    const [state, setState] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#2a2a2a', }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                    }}>
                        <Link href={'https://www.edepto.in'}>
                            <Image src={logo} alt='' style={{ maxWidth: 120, height: 'auto' }} />
                        </Link>
                    </Box>

                    <Box sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                    }}>

                        <Link href={'https://www.edepto.in'}>
                            <Image src={logo} alt='' style={{ maxWidth: 110, height: 'auto' }} />
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                // onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor={'left'}
                            open={state}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: { backgroundColor: '#3a3a3a' }
                            }}
                        >
                            <Box sx={{ py: 4, px: 3 }}>
                                {pages.map((page) => (
                                    <MenuItem key={page}
                                    // onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center" sx={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                                <Box sx={{ mt: 4 }}>
                                    <button className={style.login__register__button} onClick={()=>detect()}>Login/Register</button>
                                </Box>
                            </Box>
                        </Drawer>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <button className={style.login__register__button} onClick={()=>detect()} >Login/Register</button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default AppBarComponent