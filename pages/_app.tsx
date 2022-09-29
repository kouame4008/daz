import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Spinner from '../public/assets/spinner.svg';
import * as React from 'react';
import { AnimatePresence } from 'framer-motion'
import { DefaultSeo } from 'next-seo'
import { BASE_URL } from '../config/APIrouter';
import styled from 'styled-components';
import Image from 'next/image';
import { AuthProvider, ProtectRoute } from './api/auth/auth-actions';

declare const window: any

const Loader = styled.section`
  position: fixed;
  width : 100%;
  height : 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top : 0;
  left : 0;
  background-color: #FFF;
  z-index: 10;
`

function MyApp({ Component, pageProps, router }: AppProps) {
  const url = `${BASE_URL}${router.route}`
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => { setLoading(false) }, 2000)
  })

  return (
    <React.Fragment>
      {!loading ? <>
        <DefaultSeo
          titleTemplate="%s - Daz-delivery"
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url,
            description: 'The personal website for James Wallis, developer.',
            site_name: 'James Wallis | wallis.dev',
            images: [],
          }}
          canonical={url}
        />
        <AuthProvider>
          <ProtectRoute>
            <AnimatePresence
              mode='wait'
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Component {...pageProps} canonical={url} key={url} />
            </AnimatePresence>
          </ProtectRoute>
        </AuthProvider>
      </>
        :
        <section className='Loader'>
          {/* <img src={Spinner.src} alt="" /> */}
          <div style={{ width: '150px', height: '150px' }}>
            <Image
              src={Spinner.src}
              width={150}
              height={150}
              alt={"Loader"}
            />
          </div>
        </section>
      }
    </React.Fragment>

    // <Component {...pageProps} canonical={url} key={url} />
  )
}

export default MyApp
