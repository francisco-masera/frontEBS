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
    name: "StockInsumos",
    component: () => import("../views/stockInsumos.vue"),
  },
  {
    path: "/catalogoManu",
    name: "CatalogoManu",
    component: () => import("../views/catalogoManu.vue"),
  },

  {
    path: "/insumoDetalle/:id",
    name: "Insumo",
    component: () => import("../views/insumo.vue"),
  },

  {
    path: "/categoriaManufacturados",
    name: "CategoriaManufacturados",
    component: () => import("../views/CategoriaManufacturados.vue"),
  },

  {
    path: "/añadirInsumo",
    name: "AñadirInsumo",
    component: () => import("../views/AñadirInsumo.vue"),
  },

  {
    path: "/añadirInsumo2",
    name: "AñadirInsumo2",
    component: () => import("../views/AñadirInsumo2.vue"),
  },
  {
    path: "/añadirInsumo3",
    name: "AñadirInsumo3",
    component: () => import("../views/AñadirInsumo3.vue"),
  },

  
  {
    path: "/modificarInsumo/:id",
    name: "ModificarInsumo",
    component: () => import("../views/ModificarInsumo.vue"),
  },
  {
    path: "/sugerenciaChef",
    name: "SugerenciaChef",
    component: () => import("../views/SugerenciaChef.vue"),
  },
  {
    path: "/manufacturadoDetalle/:id",
    name: "manufacturado",
    component: () => import("../views/Manufacturado.vue"),
  },
  {
    path: "/sugerencia/:id",
    name: "SugerenciaChefDetalle",
    component: () => import("../views/SugerenciaChefDetalle.vue"),
  },

  {
    path: "/añadirManufacturado",
    name: "AñadirManufacturado",
    component: () => import("../views/AñadirManufacturado.vue"),
  },
  {
    path: "/añadirManufacturado/:id",
    name: "AñadirManufacturadoID",
    component: () => import("../views/AñadirManufacturado.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
