import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactProvider } from '../context/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReactProvider>
        <Component {...pageProps} />
      </ReactProvider>
    </>
  )

}

export default MyApp
