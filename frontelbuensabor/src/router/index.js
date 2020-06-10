import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AñadirInsumo3 from '../views/AñadirInsumo3.vue'

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
    path:'/añadirInsumo3',
    name:'AñadirInsumo3',
    component:AñadirInsumo3
  }
 
  
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
