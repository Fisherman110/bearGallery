import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/seeking',
    name: 'seeking',
    component: () => import('../views/SeekingView.vue')
  },
  {
    path: '/life',
    name: 'life',
    component: () => import('../views/LifeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
