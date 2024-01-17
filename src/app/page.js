'use client'

import { useState } from 'react';
import styles from './page.module.css';
import Button from '@mui/material/Button';
import { ButtonGroup, IconButton, Stack } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

export default function Home() {
  const [names, setNames] = useState('User1');
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <main>
      <div className={styles.main__container}>
        <h1>Hi! Welcome To New Next App {names} </h1>
        <Stack direction={'row'} spacing={1}>
          <h1> Make Favorite  </h1>
          <IconButton size='large' color='primary' onClick={() => setIsFavorite(prev => !prev)} >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton >
        </Stack>

        <ButtonGroup variant='outlined'>
          <Button variant='contained' onClick={() => setNames('User2')}>Click Me</Button>
          <Button variant="outlined" onClick={() => setNames("MUI")}>Change Name</Button>
        </ButtonGroup>
      </div>
    </main>
  )
}
