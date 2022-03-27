import '../styles/globals.css'
import '../styles/home.css'
import '../styles/popup.css'
import '../styles/patternBackground.css'
import '../styles/gallery.css'
import '../styles/navigator.css'
import '../styles/photosCon.css'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return <Component {...pageProps} />
}

export default MyApp
