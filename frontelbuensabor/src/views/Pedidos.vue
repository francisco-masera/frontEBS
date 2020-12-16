<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>
    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Pedidos</h1>
      <b-button class="hrefPedido" @click="cambiarAPendientes"
        >PENDIENTES</b-button
      >
      <b-button class="hrefPedido" @click="cambiarAEntregados"
        >ENTREGADOS</b-button
      >
      <b-nav-form class="buscador" id="busqueda">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          v-model="busquedaOrden"
          placeholder="Buscar orden"
          id="inputBusqueda"
        ></b-form-input>
        <b-button size="sm" class="botonImagen" type="button" id="lupita" @click="this.busquedaPedidos()">
          <img
            src="http://localhost:9001/images/sistema/buscar.png"
            id="imagenBuscar"
          />
        </b-button>
      </b-nav-form>
      <div v-if="pedidosPendientes" class="divCard">
        <b-card-group>
          <div
            v-for="pedido in filtroPendientes"
            :key="pedido.id"
            id="contenedorTarjeta"
          >
            <pedido :pedidoParam="pedido"></pedido>
          </div>
        </b-card-group>
      </div>
      <div v-else class="divCard">
        <b-card-group>
          <div
            v-for="pedido in filtroEntregados"
            :key="pedido.id"
            id="contenedorTarjeta"
          >
            <pedido :pedidoParam="pedido" ></pedido>
          </div>
        </b-card-group>
      </div>
    </b-container>
  </div>
</template>
<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Pedido from "@/components/Pedido.vue";
import Service from "@/service/Service.js";

export default {
  mounted() {
    this.getDomicilios();
    this.getPedidos();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
    pedido: Pedido,
  },

  data() {
    return {
      user: {},
      userDelivery: true,
      pedidosDelivery: {},
      service: new Service(),
      domicilios: {},
      pedidosPendientes: true,
      filtroPendientes: {},
      filtroEntregados:{},
      busquedaOrden:""
    };
  },

  methods: {
    userVerifica() {
      this.user = JSON.parse(sessionStorage.getItem("user"));

      if (this.user.rol == "delivery") {
        this.userDelivery = true;
      } else if (this.user.rol == "admin") {
        this.userDelivery = false;
      } else {
        this.$router.push({ name: "Home" });
      }
    },

    async getDomicilios() {
      await this.service.getAll("domicilio").then((data) => {
        this.domicilios = data;
      });
    },

    async getPedidos() {
      await this.service.getAll("pedido").then((data) => {
        this.pedidosDelivery = data;
        this.agregaDomicilioPedido();
        this.cargaPendientes();
      });
    },

    agregaDomicilioPedido() {
      this.pedidosDelivery.forEach((pedido) => {
        this.domicilios.forEach((domicilio) => {
          if (pedido.cliente.id == domicilio.persona.id) {
            pedido.cliente.domicilio = domicilio;
          }
        });
      });

      console.log(this.pedidosDelivery);
    },
    cambiarAPendientes() {
      this.pedidosPendientes = true;
      this.cargaPendientes();
    },

    cargaPendientes() {
      if (this.pedidosPendientes) {
        this.filtroPendientes = this.pedidosDelivery.filter(
          (pedido) => pedido.estado == "Pendiente"
        );
      }
      console.log(this.filtroPendientes);
    },

     cargaEntregados() {
      if (!this.pedidosPendientes) {
        this.filtroEntregados = this.pedidosDelivery.filter(
          (pedido) => pedido.estado == "Entregado"
        );
      }
      console.log(this.filtroEntregados);
    },

    cambiarAEntregados() {
      this.pedidosPendientes = false;
      this.cargaEntregados();
    },

    locatorButtonPressed() {
     navigator.geolocation.getCurrentPosition(
     position => {
       console.log(position.coords.latitude);
       console.log(position.coords.longitude);
     },
     error => {
       console.log(error.message);
     },
  )   
}

    
  },
  computed:{
    busquedaPedidos(){
      return this.filtroPendientes.prototype.filter((pedido)=>{
        return pedido.numero == this.busquedaOrden;
      })
    }
  }
};
</script>
<style>
#imagenBuscar {
  width: 25px;
}
.form-inline {
  flex-wrap: nowrap;
}
.hrefPedido {
  float: left;
  color: black;
  margin-bottom: 15px;
  background-color: transparent;
  border: none;
}
.hrefPedido:hover {
  text-decoration: underline;
  color: #e7541e;
  background-color: transparent;
}
.hrefPedido:active {
  background-color: transparent;
  color: #e7541e;
}
.hrefPedido:not(:disabled) {
  background-color: transparent;
  color: #e7541e;
}

.hrefPedido:focus {
  text-decoration: underline;
  color: #e7541e;
  font-weight: 700;
  background-color: transparent;
}
.divCard {
  min-height: 50px;
  display: inline-block;
}
#contenedorTarjeta {
  margin-top: 10px;
  width: 800px;
}

@media screen and (max-width: 550px) {
  .divCard {
    width: 95%;
  }
  #contenedorTarjeta {
    width: 100%;
  }
}

@media screen and (min-width: 320px) and (max-width: 450px) {
  #busqueda {
    width: 100%;
    margin-top: 20px;
    min-height: 40px;
  }
  #inputBusqueda {
    float: left;
  }

  #lupita {
    border-right: 0px;
    border-left: 0px;
    border-top: 0px;
    border-bottom: 1;

    margin-left: 10px;
    float: left;
  }
}
</style>