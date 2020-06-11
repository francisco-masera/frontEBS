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
  {
    path: "/añadirInsumo3",
    name: "AñadirInsumo3",
    component: () => import("../views/AñadirInsumo.vue"),
  },
  {
    path: "/añadirInsumo",
    name: "AñadirInsumo",
    component: () => import("../views/AñadirInsumo3.vue"),
  },
  {
    path: "/modificarInsumo/:id",
    name: "ModificarInsumo",
    component: () => import("../views/ModificarInsumo.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
