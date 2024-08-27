import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode,process.cwd(), '')
  return {
    define: {
      'process.env.EXPRESS_APP_SERVER_URL': JSON.stringify(env.EXPRESS_APP_SERVER_URL)
    },
    plugins: [react()]
  }
})

