import Head from "next/head";
import META_DATA from '../meta-data'

export default function Headers({ name }) {
    const title = META_DATA[name]['title']
    const description = META_DATA[name]['description']
    const keywords = META_DATA[name]['keywords']
    return (
        <Head>
            {title &&
                <>
                    <title>{title}</title><meta property="og:title" content={title} /></>
            }
            {description &&
                <>
                    <meta name="description" content={description} />
                    <meta property="og:description" content={description} /></>
            }
            {keywords && <meta name="keywords" content={keywords} />}

        </Head>
    )
}
