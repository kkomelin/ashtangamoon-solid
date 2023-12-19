import { defineConfig } from 'vite'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'
import solid from 'vite-plugin-solid'

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  includeAssets: [
    'img/apple-touch-icon.png',
    'img/favicon-16x16.png',
    'img/favicon-32x32.png',
    'img/favicon.ico',
  ],
  manifest: {
    id: '/?utm_source=pwa',
    start_url: '/?utm_source=pwa',
    name: 'Ashtanga Moon',
    short_name: 'Ashtanga Moon',
    description:
      'Displays next full and new moon dates and visualizes current moon phase',
    background_color: '#193d61',
    theme_color: '#193d61',
    icons: [
      {
        src: '/img/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: 'img/screenshot-wide.png',
        sizes: '3200x1600',
        form_factor: 'wide',
      },
      {
        src: 'img/screenshot.png',
        sizes: '1200x1200',
      },
    ],
  },
  useCredentials: true,
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.ts',
  registerType: 'autoUpdate',
  selfDestroying: false,
  devOptions: {
    enabled: process.env.NODE_ENV === 'development',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

export default defineConfig({
  plugins: [solid(), VitePWA(pwaOptions)],
})
