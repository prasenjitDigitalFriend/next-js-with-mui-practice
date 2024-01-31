'use client';

import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react';
import loginStyle from "./style.module.css"

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postApi } from '@/api/call.api';
import urlApi from '@/api/url.api';
import { toast } from 'react-toastify';

import { showLoading } from 'react-global-loading'

import cookieCutter from 'cookie-cutter'

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function login(postData) {
    showLoading(true);
    let resp = await postApi(postData, urlApi.login)
    showLoading(false);
    if (resp.responseCode === 200) {
      cookieCutter.set('sessionData', resp.data.sessionId);
      localStorage.setItem('sessionData', resp.data.sessionId);
      router.replace("/admin/dashboard")
    } else {
      toast.error(resp.message);
    }
  }

  const mutation = useMutation({
    mutationFn: (postData) => {
      return login(postData)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    let postData = {
      "username": document.getElementById('username').value,
      "password": document.getElementById('password').value
    }

    mutation.mutate(postData);

  }

  useEffect(() => {
    cookieCutter.set('sessionData', "", { expires: new Date(0) });
    localStorage.setItem('sessionData', "");
  }, []);


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
          <form className={loginStyle.login_form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="Email"
              id="username"
              sx={{ mb: 2, width: '100%' }}
              InputProps={{
                startAdornment: <InputAdornment position="start">@</InputAdornment>,
              }}
            />
            <FormControl sx={{ mb: 4, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="password"
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