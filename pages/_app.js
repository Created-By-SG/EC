// pages/_app.js
import '../styles/globals.css'
import Layout from '../components/Layout'
import { GameNavProvider } from '../lib/GameNavContext'

export default function App({ Component, pageProps }) {
  return (
    <GameNavProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GameNavProvider>
  )
}
