import Head from "next/head";
import META_DATA from '../meta-data'

export default function Headers({ name }) {
    const data = META_DATA[name] ? META_DATA[name] : {}
    const title = data['title']
    const description = data['description']
    const keywords = data['keywords']
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
