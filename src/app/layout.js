import { Inter } from 'next/font/google'
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Script from 'next/script';
import TanStackProvider from '@/providers/TanStackProvider';
import { ToastContainer } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next-JS Practice',
  description: 'Created By Prasenjit_Dev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin" />

      <body className={inter.className} suppressHydrationWarning={true}>
      <ToastContainer autoClose={500} />
        <TanStackProvider>
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>
        </TanStackProvider>
      </body>
    </html>
  )
}
