import '../styles/globals.css'
// pages/_app.js
import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}


