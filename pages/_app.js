import '../styles/globals.css'
import '../styles/home.css'
import '../styles/popup.css'
import '../styles/patternBackground.css'
import '../styles/gallery.css'
import '../styles/navigator.css'
import '../styles/photosCon.css'
import Nav from '../components/nav'
import SubNav from '../components/subNav/SubNav'
import Footer from '../components/Footer'
import Gtag from 'components/Gtag'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (<>
    <Gtag/>
    <Nav />
    <SubNav />
    <Component {...pageProps} />
    <Footer />
  </>)
}

export default MyApp
