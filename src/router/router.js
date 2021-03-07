import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('/@/pages/BookList.vue'),
    children: [
      {
        path: ':bookId',
        component: () => import('/@/pages/BookDetail.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory('/books/'),
  routes
})
