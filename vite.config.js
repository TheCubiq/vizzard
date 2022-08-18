import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 6969,
  },
  plugins: [
    Userscript({
      entry: 'src/main.js',
      headers: {
        'name': 'Vizzard',
        'author': 'Cubiq The Creator',
        'license': 'MIT',
        'match': 'https://vizzy.io/*',
        'icon': 'https://vizzy.io/favicon.ico',
        'description': 'customize the look and feel of the vizzy website!',
      },
    }),
  ],
})
