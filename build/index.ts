import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { unheadVueComposablesImports } from '@unhead/vue'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import transformerDirective from "@unocss/transformer-directives";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver, /* TDesignResolver */ } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
// import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
// import { VitePWA } from 'vite-plugin-pwa'
// import Sitemap from 'vite-plugin-sitemap'
// import VueDevTools from 'vite-plugin-vue-devtools'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// import { createViteVConsole } from './vconsole'
import vueJsx from '@vitejs/plugin-vue-jsx';

export function createVitePlugins(mode) {
  return [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
      routesFolder: 'src/views',
      dts: 'src/typed-router.d.ts',
    }),

    vue(),
    vueJsx(),

    // https://github.com/jbaubree/vite-plugin-sitemap
    // Sitemap(),

    // https://github.com/pengzhanbo/vite-plugin-mock-dev-server
    // mockDevServerPlugin(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      resolvers: [
        VantResolver(),
        // TDesignResolver({
        //   library: 'mobile-vue'
        // })
      ],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'components.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      // resolvers: [TDesignResolver({
      //   library: 'mobile-vue'
      // })],
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink'],
          // '@/utils/i18n': ['i18n', 'locale'],
          'vue-i18n': ['useI18n'],
        },
        unheadVueComposablesImports,
      ],
      dts: 'auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/config',
        'src/utils',
      ],
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18nPlugin({
      // locale messages resource pre-compile option
      include: resolve(dirname(fileURLToPath(import.meta.url)), '../../src/locales/**'),
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS({
      transformers: [transformerDirective()],
    }),

    // https://github.com/vadxq/vite-plugin-vconsole
    // createViteVConsole(mode),

    // https://github.com/vuejs/devtools-next
    // VueDevTools(),

    // https://github.com/antfu/vite-plugin-pwa
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
    //   manifest: {
    //     name: 'vue3-mobile',
    //     short_name: 'vue3-mobile',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: '/pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable',
    //       },
    //     ],
    //   },
    // }),
  ]
}
