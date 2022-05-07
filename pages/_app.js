import '../styles/globals.css'
import '../styles/home.css'
import '../styles/popup.css'
import '../styles/patternBackground.css'
import '../styles/gallery.css'
import '../styles/navigator.css'
import '../styles/photosCon.css'
import Nav from '../components/nav'
import SubNav from '../components/subNav/SubNav'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (<>
    <Nav />
    <SubNav />
    <Component {...pageProps} />
  </>)
}

export default MyApp
