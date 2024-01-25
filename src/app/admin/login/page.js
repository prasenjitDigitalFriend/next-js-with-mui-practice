'use client';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material'
import React from 'react';
import loginStyle from "./style.module.css"

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/admin/dashboard")
  }


  return (
    <main className="main-container">
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh'
      }}>
        <div className={loginStyle.login_container}>
          <div className={loginStyle.main_image}>
            <img src='/images/login.jpg' alt="" />
          </div>
          <form className={loginStyle.login_form} onSubmit={(e)=>handleSubmit(e)}>
            <TextField
              label="Mobile"
              id="outlined-start-adornment"
              name='name'
              sx={{ mb: 2, width: '100%' }}
              InputProps={{
                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
              }}
            />
            <FormControl sx={{ mb: 4, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button variant="contained" type="submit">Login</Button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login