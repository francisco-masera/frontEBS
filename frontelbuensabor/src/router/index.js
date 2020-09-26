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
    path: "/modificarManufacturado/:id",
    name: "ModificarManufacturado",
    component: () => import("../views/AñadirManufacturado.vue"),
  },
  {
    path: "/misDatos/:id",
    name: "MisDatos",
    component: () => import("../views/misDatos.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
