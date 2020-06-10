import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ingreso from '../views/Ingreso.vue'
import stockInsumos from '../views/stockInsumos.vue'
import catalogoManu from '../views/catalogoManu.vue'
import AñadirInsumo from '../views/AñadirInsumo.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
 {
    path:'/ingreso',
    name:'Ingreso',
    component: () => import('../views/Ingreso.vue')
  },


 {
    path:'/stockInsumos',
    name:'stockInsumos',
    component: () => import('../views/stockInsumos.vue')
  
  },
  {
    path:'/catalogoManu',
    name:'catalogoManu',
    component: () => import('../views/catalogoManu.vue')
  },
  {
    path:'/añadirInsumo',
    name:'AñadirInsumo',
    component:AñadirInsumo
  }
 
  
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
