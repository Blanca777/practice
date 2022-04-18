import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../components/Upload.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
