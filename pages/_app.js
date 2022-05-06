import '../styles/globals.css'
import '../styles/home.css'
import '../styles/popup.css'
import '../styles/patternBackground.css'
import '../styles/gallery.css'
import '../styles/navigator.css'
import '../styles/photosCon.css'
import Nav from '../components/nav'
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (<>
    <Head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </Head>
    <Nav />
    <Component {...pageProps} />
  </>)
}

export default MyApp
