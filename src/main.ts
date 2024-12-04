import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import '@/assets/styles/app.less'
import { Button, Icon, Field, CellGroup, Card } from 'vant'
import mitt from 'mitt'

// Vant 桌面端适配
import '@vant/touch-emulator'

/* --------------------------------
Vant 中有个别组件是以函数的形式提供的，
包括 Toast，Dialog，Notify 和 ImagePreview 组件。
在使用函数组件时，unplugin-vue-components
无法自动引入对应的样式，因此需要手动引入样式。
------------------------------------- */
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import 'virtual:uno.css'

const app = createApp(App)
const head = createHead()

app.use(head)
  .use(router)
  .use(store)
  .use(Button)
  .use(Icon)
  .use(Field)
  .use(CellGroup)

// 事件发布订阅
app.config.globalProperties.$emitter = mitt()

app.mount('#app')
