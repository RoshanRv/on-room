import "../styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "@components/Header/Header"
import Toast from "@components/Toast/Toast"
export const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <div className="relative flex flex-col min-h-screen font-disp">
            <Header />
            <Component {...pageProps} />
            <Toast />
        </div>
    </QueryClientProvider>
)

export default MyApp
