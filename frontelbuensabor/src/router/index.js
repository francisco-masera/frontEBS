import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ingreso from '../views/Ingreso.vue'
import Stock from '../views/stockInsumos.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
 {
    path:'/ingreso',
    name:'Ingreso',
    component:Ingreso
  },

  {
    path:'/stockInsumos',
    name:'stock',
    component:Stock
  }
 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
