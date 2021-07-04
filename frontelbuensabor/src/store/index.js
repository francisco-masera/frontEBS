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
    carrito: { items: [], idPedido: 0 },
    carritoKey: 0,
    idCliente: cliente != undefined ? cliente.id : "",
    subtotal: 0,
    total: 0,
    descuento: 0,
    envio: 0,
    formaPago: undefined
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
          precioVenta: i.precioVenta,
          denominacion: i.denominacion,
          idItem: 0
        }
        items.push(item);

      });

      var carrito = {
        idCliente: state.idCliente, formaPago: false, tipoEntrega: false,
        estado: 'En Espera', numero: 0, horaEstimada: null, items: items,
        tiempoEstimado: 0,
      };

      carrito = JSON.parse(JSON.stringify(carrito));
      axios.post("http://localhost:9001/buensabor/pedido/saveCarrito/", carrito, config);
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
    delItem(state, idArticuloVenta)
    {
      axios.delete("http://localhost:9001/buensabor/detallePedido/quitarItem/" + idArticuloVenta + "/" + state.carrito.idPedido, config)
        .then(() =>
        {
          var idx = state.carrito.items.findIndex(i => i.idArticuloVenta == idArticuloVenta);
          state.carrito.items.splice(idx, 1);
        }).catch(e => console.log(e));
    },
    delCarrito(state)
    {
      axios.delete("http://localhost:9001/buensabor/pedido/eliminarPedido/" + state.idCliente, config).catch(e => console.log(e));
    },
    resetCarrito(state)
    {
      state.carrito = {
        idCliente: state.idCliente, formaPago: false, tipoEntrega: false,
        estado: 'En Espera', numero: 0, horaEstimada: null, items: [],
        tiempoEstimado: 0,
      };

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
        state.total = state.carrito.items.reduce((a, b) => (a + (b.precioVenta * b.cantidad)), 0) + - state.descuento + state.envio;
    },
    setEnvio(state, isEnvio)
    {
      state.envio = isEnvio ? 50 : 0
    },
    setFormaPago(state, isEfectivo)
    {
      state.formaPago = isEfectivo;
      state.carrito.formaPago = isEfectivo;
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
    /*    updateCarrito({ commit, state }, producto)
       {
         state.carrito.forEach(() =>
         {
           commit("setPedido", producto);
         });
       }, */
    delItem({ commit }, idArticuloVenta)
    {
      commit("delItem", idArticuloVenta);
    },
    delCarrito({ commit })
    {
      commit("delCarrito");
    },
    getCarrito({ commit })
    {
      commit("getCarrito");
    },
    resetCarrito({ commit })
    {
      commit("resetCarrito");
    },
    setCarritoKey({ commit })
    {
      commit("setCarritoKey");
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
    },
    setFormaPago({ commit }, isEfectivo)
    {
      commit("setFormaPago", isEfectivo);
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
