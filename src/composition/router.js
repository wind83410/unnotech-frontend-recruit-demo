import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('/@/components/BookList.vue'),
    children: [{
      path: ':bookId',
      component: () => import('/@/components/BookEdit.vue')
    }]
  }
]

export const router = createRouter({
  history: createWebHistory('/books/'),
  routes
})