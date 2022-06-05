import "../styles/globals.scss"
import "katex/dist/katex.min.css"
import { AppProps } from "next/app"
import Head from "next/head"

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Lightspeed Blog</title>
                <meta property="og:locale" content="en" />
                <meta name="theme-color" content="#11131f" />
                <link rel="icon" href="/favicon.png" type="image/png" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
