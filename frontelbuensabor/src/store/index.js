import Vue from 'vue'
import Vuex from 'vuex'
/* import Service from "@/service/Service.js"; */
/* import axios from "axios"; */
Vue.use(Vuex)
/* const service = new Service(); */
export default new Vuex.Store({
  state: {
    carrito: {}
  },
  mutations: {

    setCarrito(state, payload)
    {
      state.carrito[payload.idArticuloVenta] = { ...payload };
      console.log(state.carrito);
      /*  axios.post("http://localhost:9001/buensabor/pedido/pedidoPendiente", state.carrito, {
         headers: {
           "Content-Type": "application/json",
           "Access-Control-Allow-Origins": "*",
           "cache-control": "no-cache",
         }
       }); */
    }
  },
  actions: {

    addItemCarrito({ commit, state }, producto)
    {
      Object.prototype.hasOwnProperty.call(state.carrito, producto.idArticuloVenta)
        ? producto.cantidad = state.carrito[producto.idArticuloVenta].cantidad + producto.cantidad
        : "";
      commit('setCarrito', producto);
    },
    updateCarrito({ commit, state }, producto)
    {
      state.carrito.forEach(() =>
      {
        commit("setCarrito", producto);
      });
    }
  },
  modules: {
  }
})
