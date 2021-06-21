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
          placeholder="Buscar orden o cliente"
          id="inputBusqueda"
          @input="verificaEstadoInput()"
        ></b-form-input>
        <b-button
          size="sm"
          class="botonImagen"
          type="button"
          id="lupita"
          @click="busquedaPedidos()"
        >
          <img
            :src="require('@/assets/images/buscar.png')"
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
            <pedido
              :pedidoParam="pedido"
              :domicilioParam="
                domicilios.find((d) => d.persona.id == pedido.cliente.id)
              "
            ></pedido>
          </div>
        </b-card-group>
      </div>
      <div v-if="pedidosEntregados" class="divCard">
        <b-card-group>
          <div
            v-for="pedido in filtroEntregados"
            :key="pedido.id"
            id="contenedorTarjeta"
          >
            <pedido
              :pedidoParam="pedido"
              :domicilioParam="
                domicilios.find((d) => d.persona.id == pedido.cliente.id)
              "
            ></pedido>
          </div>
        </b-card-group>
      </div>
      <div v-if="!pedidosEntregados && !pedidosPendientes" class="divCard">
        <b-card-group>
          <div
            v-for="pedido in filtroBuscados"
            :key="pedido.id"
            id="contenedorTarjeta"
          >
            <pedido
              :pedidoParam="pedido"
              :domicilioParam="
                domicilios.find((d) => d.persona.id == pedido.cliente.id)"
            ></pedido>
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
import Formatters from "@/utilidades/Formatters.js";

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
      pedidosEntregados: false,
      filtroPendientes: {},
      filtroEntregados: {},
      filtroBuscados: {},
      busquedaOrden: "",
      formatter: new Formatters(),
      timeout: null,
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
        //	this.agregaDomicilioPedido();
        this.adjustmentHour();
        this.cargaPendientes();
      });
    },
    adjustmentHour() {
      this.pedidosDelivery.forEach((pedido) => {
        pedido.hora = this.formatter.formatHour(pedido.hora);
      });
    },


			cambiarAPendientes() {
				this.pedidosPendientes = true;
				this.pedidosEntregados = false;
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
      this.pedidosEntregados = true;
      this.pedidosPendientes = false;
      this.cargaEntregados();
    },

    /*cargaBuscados(filtrados) {
      this.pedidosPendientes = false;
      this.pedidosEntregados = false;
      if (!filtrados == undefined && !filtrados == null) {
        this.filtroBuscados = filtrados;
      }
      console.log(this.filtroBuscados);
    },
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },*/
    busquedaPedidos() {
      if (this.busquedaOrden != "") {
        this.filtroBuscados = this.pedidosDelivery.filter((pedido) => {
          return (
            pedido.numero == this.busquedaOrden ||
            pedido.cliente.nombre == this.busquedaOrden ||
            pedido.cliente.apellido == this.busquedaOrden ||
            pedido.cliente.nombre + " " + pedido.cliente.apellido ==
              this.busquedaOrden
          );
        });

        if (this.filtroBuscados != undefined && this.filtroBuscados != null) {
          this.pedidosPendientes = false;
          this.pedidosEntregados = false;
        }
      }

      console.log(this.filtroBuscados);
    },

    verificaEstadoInput() {
      var inputBusqueda = document.getElementById("inputBusqueda").value;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.productos = [];
        if (inputBusqueda == "") {
         
          if(this.pedidosPendientes == false){
           
          this.getPedidos();
          this.cambiarAPendientes();
          }else{
            
          this.getPedidos();
          this.cambiarAEntregados();
          }
        }
      }, 800);
    },
  },
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