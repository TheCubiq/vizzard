import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 6969,
  },
  plugins: [
    Userscript({
      entry: 'src/main.js',
      headers: {
        'name': 'Vizzard',
        'author': 'Cubiq The Creator',
        'supportURL': 'https://github.com/TheCubiq/vizzard',
        'namespace': 'https://github.com/TheCubiq/vizzard',
        'license': 'GPL-3.0',
        'match': 'https://vizzy.io/*',
        'icon': 'https://vizzy.io/favicon.ico',
        'require': 'https://greasyfork.org/scripts/449986-vizzardvers/code/VizzardVers.user.js',
        'description': 'customize the look and feel of the vizzy website!',
      },
    }),
  ],
})
