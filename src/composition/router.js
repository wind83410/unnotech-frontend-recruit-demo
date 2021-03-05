import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  path: '/',
  component: () => import('/@/components/HelloWorld')
}]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})