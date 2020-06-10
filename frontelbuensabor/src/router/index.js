<<<<<<< HEAD
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
=======
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Ingreso from "../views/Ingreso.vue";
import Stock from "../views/stockInsumos.vue";
>>>>>>> 48a972f6d7145d05a4d98811f7070db725228e77

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
<<<<<<< HEAD
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
    path:'/insumoDetalle/:id',
    name:'insumo',
    component: () => import('../views/insumo.vue')
=======
  {
    path: "/ingreso",
    name: "Ingreso",
    component: Ingreso,
  },

  {
    path: "/detalleInsumo",
    name: "DetalleInsumo",
    component: () => import("../views/DetalleInsumo.vue"),
>>>>>>> 48a972f6d7145d05a4d98811f7070db725228e77
  },

  {
    path: "/stockInsumos",
    name: "stock",
    component: Stock,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
