import { createRouter, createWebHistory } from 'vue-router'
import Menu from "@/views/menu/Menu.vue"
import Game from '@/views/game/Game.vue'

const routes = [
  {
    path: '/',
    name: 'menu',
    component: Menu
  },
  {
    path: '/game',
    name: 'game',
    component: Game
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
