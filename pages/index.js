import Head from 'next/head'
import PortfolioContainer from '../components/portfolio/portfolioContainer'

export default function Home() {
  return (
    <>
      <Head>
        <title>{process.env.TITLE_NAME}</title>
      </Head>
      <PortfolioContainer />
    </>
  )
}
