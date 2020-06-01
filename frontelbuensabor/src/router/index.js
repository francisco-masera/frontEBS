import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ingreso from '../views/Ingreso.vue'
import stockInsumos from '../views/stockInsumos.vue'
import catalogoManu from '../views/catalogoManu.vue'



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
    path:'/stockInsu',
    name:'stockInsumos',
    component:stockInsumos
  },
  {
    path:'/catalogoManu',
    name:'catalogoManu',
    component:catalogoManu
  },

 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
