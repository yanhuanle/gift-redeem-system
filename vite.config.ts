import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'
import { createVitePlugins } from './build'
import { exclude, include } from './build/optimize'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_APP_PUBLIC_PATH || '/',
    plugins: createVitePlugins(mode),

    server: {
      host: true,
      port: 3000,
      hmr: true,
      proxy: {
        '/api': {
          target: '',
          ws: false,
          changeOrigin: true,
        },
      },
    },

    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        'vue': 'vue/dist/vue.esm-bundler.js', // compile template
      },
    },

    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          // https://github.com/wswmsword/postcss-mobile-forever
          viewport({
            appSelector: '#app',
            viewportWidth: 375,
            maxDisplayWidth: 600,
            rootContainingBlockSelectorList: [
              'van-tabbar',
              'van-popup',
            ],
          }),
        ],
      },
    },

    build: {
      outDir: "dist",
      assetsDir: "assets",
      cssCodeSplit: false,
      assetsInlineLimit: 8 * 1024,
      chunkSizeWarningLimit: 1000,
      sourcemap: true,
      terserOptions: {
        compress: {
          //生产环境移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 关闭文件计算
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件(字体，图片等)
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },

    optimizeDeps: { include, exclude },
  }
}
