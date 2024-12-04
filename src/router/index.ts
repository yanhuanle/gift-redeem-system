import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import useUserStore from '@/stores/modules/user'
// import useRouteTransitionNameStore from '@/stores/modules/routeTransitionName'
// import useRouteCacheStore from '@/stores/modules/routeCache'
// import type { EnhancedRouteLocation } from './types'

NProgress.configure({ showSpinner: true, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...routes
  ],
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
