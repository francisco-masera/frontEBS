import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ingreso",
    name: "Ingreso",
    component: () => import("../views/Ingreso.vue"),
  },

  {
    path: "/stockInsumos",
    name: "stockInsumos",
    component: () => import("../views/stockInsumos.vue"),
  },
  {
    path: "/catalogoManu",
    name: "catalogoManu",
    component: () => import("../views/catalogoManu.vue"),
  },

  {
    path: "/insumoDetalle/:id",
    name: "insumo",
    component: () => import("../views/insumo.vue"),
  },

  {
    path: "/categoriaManufacturados",
    name: "categoriaManufacturados",
    component: () => import("../views/CategoriaManufacturados.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
