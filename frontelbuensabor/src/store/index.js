import Vue from 'vue'
import Vuex from 'vuex'
/* import Service from "@/service/Service.js"; */
import axios from "axios";

Vue.use(Vuex)
/* const service = new Service(); */
const config = {
  headers: {
    "Content-type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origins": "*",
    "Access-Control-Allow-Methods": ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
    "Access-Control-Allow-Headers": "Content-Type",
    "cache-control": "no-cache",
  },
};
const cliente = JSON.parse(sessionStorage.getItem("user"));

export default new Vuex.Store({
  state: {
    carrito: { items: [] },
    carritoKey: 0,
    idCliente: cliente != undefined ? cliente.id : "",
    subtotal: 0,
    total: 0,
    descuento: 0,
    envio: 0
  },
  mutations: {

    setCarrito(state)
    {

      var items = [];
      state.carrito.items.forEach(i =>
      {
        var item = {
          idArticuloVenta: i.idArticuloVenta,
          cantidad: i.cantidad,
          idPedido: i.idPedido,
          precioVenta: i.precioVenta,
          denominacion: i.denominacion,
          idItem: 0
        }
        items.push(item);

      });

      var carrito = {
        idCliente: state.idCliente, formaPago: false, tipoEntrega: false,
        estado: 'Pendiente', numero: 0, horaEstimada: null, items: items
      };

      carrito = JSON.parse(JSON.stringify(carrito));
      axios.post("http://localhost:9001/buensabor/pedido/saveCarrito/", carrito, config);
    },
    setPedido(state)
    {
      axios.put("http://localhost:9001/buensabor/pedido/carritoPendiente", state.carrito, config);

    },
    getCarrito(state)
    {
      axios.get("http://localhost:9001/buensabor/pedido/getCarritoPediente/" + state.idCliente, config).then(data =>
      {
        state.carrito = data.data;
        state.subtotal = data.data.items.reduce((a, b) => (a + (b.precioVenta * b.cantidad)), 0);
        state.total = state.carrito.items.reduce((a, b) => (a + (b.precioVenta * b.cantidad)), 0) + state.descuento + state.envio;
      }).catch((e) =>
      {
        console.log(e);

      });
      return state.carrito;

    },
    delItem(state, params)
    {
      axios.delete("http://localhost:9001/buensabor/detallePedido/quitarItem/" + params.idArticuloVenta + "/" + params.idPedido, config).then(() =>
      {
        var idx = state.carrito.items.findIndex(i => i.idArticuloVenta == params.idArticuloVenta);
        state.carrito.items.splice(idx, 1);
      }).catch();
    },
    setCarritoKey(state)
    {
      state.carritoKey += 1;
    },
    setIdCliente(state, id)
    {
      state.idCliente = id;
    },
    setSubtotal(state)
    {
      if (state.carrito.items.length != 0)
        state.subtotal = state.carrito.items.reduce((a, b) => (a + (b.precioVenta * b.cantidad)), 0)
    },
    setTotal(state)
    {
      if (state.carrito.items.length != 0)
        state.total = state.carrito.items.reduce((a, b) => (a + (b.precioVenta * b.cantidad)), 0) + state.descuento + state.envio;
    },
    setEnvio(state, isEnvio)
    {
      state.envio = isEnvio ? 50 : 0
    },

  },
  actions: {

    addItemCarrito({ commit, state }, producto)
    {

      var existe = state.carrito.items.find(i => i.idArticuloVenta == producto.idArticuloVenta) != undefined;
      if (existe)
      {
        state.carrito.items[
          state.carrito.items.findIndex(i => i.idArticuloVenta == producto.idArticuloVenta)
        ].cantidad += producto.cantidad;
      } else
      {
        state.carrito.items.push(producto);
      }
      commit('setCarrito', producto);
    },
    updateCarrito({ commit, state }, producto)
    {
      state.carrito.forEach(() =>
      {
        commit("setPedido", producto);
      });
    },
    getCarrito({ commit })
    {
      commit("getCarrito");
    },
    setCarritoKey({ commit })
    {
      commit("setCarritoKey");
    },
    delItem({ commit }, params)
    {

      commit("delItem", params);
    },
    setIdCliente({ commit }, id)
    {
      commit("setIdCliente", id);
    },
    setSubtotal({ commit })
    {
      commit("setSubtotal");
    },
    setTotal({ commit, state })
    {
      commit("setTotal");
      return state.total;
    },
    setEnvio({ commit }, isEnvio)
    {
      commit("setEnvio", isEnvio);
    }
  },
  modules: {
  },
  getters: {
    carrito: state => state.carrito,
    carritoKey: state => state.carritoKey,
    idCliente: state => state.idCliente,
    subtotal: state => state.subtotal,
    total: state => state.total,
  },

})
