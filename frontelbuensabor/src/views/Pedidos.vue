<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>
    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Pedidos</h1>
      <b-button class="hrefPedido">PENDIENTES</b-button>
      <b-button class="hrefPedido">ENTREGADOS</b-button>
      <b-nav-form class="buscador" id="busqueda">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          v-model="busqueda"
          placeholder="Buscar orden"
          id="inputBusqueda"
        ></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit" id="lupita">
          <img
            src="http://localhost:9001/images/sistema/buscar.png"
            id="imagenBuscar"
          />
        </b-button>
      </b-nav-form>
      <div class="divCard">
        <b-card-group>
          <div
            v-for="pedido in pedidos"
            :key="pedido.numero"
            id="contenedorTarjeta"
          >
            <pedido :pedidoParam="pedido"></pedido>
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
export default {
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
    pedido: Pedido,
  },

  data() {
    return {
      user: {},
      userDelivery: true,
      pedidos: [
        {
          estado: "pendiente",
          hora: "20:30",
          numero: 1234,
          total: 300,
          persona: {
            nombre: "Marcos Fuentes",
            domicilio: "Malandras 234 - Maipu",
            telefono: "2342345",
          },

          detalle: [
            { cantidad: 1, text: "Pizza muzzarella" },
            { cantidad: 2, text: "Cerveza Andes Origen" },
            { cantidad: 2, text: "Flan casero" },
          ],
        },

        {
          estado: "pendiente",
          hora: "20:30",
          numero: 3456,
          total: 300,
          persona: {
            nombre: "Mario Pereyra",
            domicilio: "Milagros 234 - GodoyCruz",
            telefono: "23400098",
          },

          detalle: [
            { cantidad: 1, text: "Pizza muzzarella" },
            { cantidad: 2, text: "Cerveza Andes Origen" },
            { cantidad: 2, text: "Flan casero" },
          ],
        },

        {
          estado: "pendiente",
          hora: "20:30",
          numero: 1234,
          total: 300,
          persona: {
            nombre: "Carlos Milo",
            domicilio: "Magallanes 1234 - Ciudad",
            telefono: "2612345345",
          },

          detalle: [
            { cantidad: 1, text: "Pizza muzzarella" },
            { cantidad: 2, text: "Cerveza Andes Origen" },
            { cantidad: 2, text: "Flan casero" },
            { cantidad: 2, text: "Flan casero" },
            { cantidad: 2, text: "Flan casero" },
          ],
        },
      ],
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
  },
};
</script>
<style>
#imagenBuscar {
  width: 25px;
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

  padding-top: 80px;
}
#contenedorTarjeta {
  margin-top: 10px;
  width: 800px;
}

@media screen and (min-width: 320px) and (max-width: 450px) {
  #contenedorTarjeta {
    width: 300px;
  }
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