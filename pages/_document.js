import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <body className='dark:bg-slate-600 dark:text-slate-200'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}