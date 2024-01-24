'use client'

import { Controls, Player } from "@lottiefiles/react-lottie-player"
import { ArrowForward } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter();

  return (
    <main className="main-container">
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center',marginTop: 'auto', marginBottom:'auto',height:'100%',paddingTop:'40px'
      }}>
        <Player
          loop
          autoplay
          src={"/animation/main.json"}
          style={{ maxHeight: '100%',height: '600px' }}
        >
        </Player>
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" endIcon={<ArrowForward />} onClick={() => router.replace("/login")} >Login / Signup</Button>
        </div>
      </div>
    </main>
  )



}
