import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/logo_192.png"></link>
                <meta name="theme-color" content="#fff" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
