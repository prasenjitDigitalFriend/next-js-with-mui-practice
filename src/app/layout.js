import { Inter } from 'next/font/google'
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next-JS Practice',
  description: 'Created By Prasenjit_Dev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AppRouterCacheProvider> */}
          {children}
        {/* </AppRouterCacheProvider> */}
      </body>
    </html>
  )
}
