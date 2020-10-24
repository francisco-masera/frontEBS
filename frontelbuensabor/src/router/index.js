import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";

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
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/catalogoManu",
    name: "CatalogoManu",
    component: () => import("../views/catalogoManu.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/insumoDetalle/:id",
    name: "Insumo",
    component: () => import("../views/insumo.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/categoriaManufacturados",
    name: "CategoriaManufacturados",
    component: () => import("../views/CategoriaManufacturados.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/modificarInsumo/:id",
    name: "ModificarInsumo",
    component: () => import("../views/ModificarInsumo.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/sugerenciaChef",
    name: "SugerenciaChef",
    component: () => import("../views/SugerenciaChef.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/manufacturadoDetalle/:id",
    name: "manufacturado",
    component: () => import("../views/Manufacturado.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/sugerencia/:id",
    name: "SugerenciaChefDetalle",
    component: () => import("../views/SugerenciaChefDetalle.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/modificarManufacturado/:id",
    name: "ModificarManufacturado",
    component: () => import("../views/AñadirManufacturado.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/misDatos/:id",
    name: "MisDatos",
    component: () => import("../views/misDatos.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/formEmpleado/",
    name: "FormularioEmplado",
    component: () => import("../views/FormularioEmpleado.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) next("/");
      else next();
    });
  } else next();
});

export default router;
