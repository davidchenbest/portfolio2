import Script from 'next/script'
const GTAG_ID = process.env.GTAG_ID

export default function Gtag() {
    if (!GTAG_ID) return null
    return <>
        <Script strategy='afterInteractive' async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} />
        <Script strategy='afterInteractive' id='gtag-script'>
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GTAG_ID}');
        `}</Script>
    </>
}