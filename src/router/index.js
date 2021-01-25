import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminPanel from '../views/AdminPanel.vue'
import Greatings from '../views/Greatings.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/adminpanel',
    name: 'AdminPanel',
    component: AdminPanel
  },
  {
    path: '/greatings',
    name: 'Greatings',
    component: Greatings,
  },
  // actchall 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router