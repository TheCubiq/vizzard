import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 7979,
  },
  plugins: [
    Userscript({
      entry: 'src/main.js',
      headers: {
        'name': 'Vizzard-Local',
        'author': 'Cubiq The Creator',
        'supportURL': 'https://github.com/TheCubiq/vizzard',
        'namespace': 'https://github.com/TheCubiq/vizzard',
        'license': 'GPL-3.0',
        'match': 'https://vizzy.io/*',
        'icon': 'https://vizzy.io/favicon.ico',
        'require': 'file:///D:/Users/kubaj/programovani/js/vizzard/versionCheck.js',
        'description': 'customize the look and feel of the vizzy website!',
      },
    }),
  ],
})
