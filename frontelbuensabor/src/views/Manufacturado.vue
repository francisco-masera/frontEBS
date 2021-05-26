<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Detalle producto manufacturado</h1>

      <div v-if="this.esCocinero()">
        <div>
          <img
            :src="
              'http://localhost:9001/images/productos/' + manufacturadoEncontrado.imagen
            "
            class="imagenProducto"
          />
          <h3>
            {{ manufacturadoEncontrado.denominacion }}
            <b-button
              id="cocina-btn-grp"
              size="sm"
              @click="modificarInsumo"
              class="botonImagen"
            >
              <img
                src="http://localhost:9001/images/sistema/editar.png"
                id="imagenAgregar"
              />
            </b-button>
          </h3>
          <div class="stock">
            <div id="stockColor" style="background-color: #ed3247"></div>
            <b-badge class="categoria">{{
              manufacturadoEncontrado.rubro.denominacion
            }}</b-badge>
          </div>
          <div id="descripcionInsumo">
            <h2>Descripción</h2>
            <p>{{ manufacturadoEncontrado.descripcion }}</p>
          </div>
          <div class="infoProductoVenta">
            <b-card header="Tiempo" class="tarjetaInfo">
              <b-card-text
                >{{ manufacturadoEncontrado.tiempoCocina }} min</b-card-text
              ></b-card
            >
          </div>
          <div class="infoIngredientes">
            <h2>Ingredientes</h2>
            <ul>
              <li v-for="(receta, index) in recetas" :key="index">
                {{ receta.insumo.denominacion }} {{ receta.cantidadInsumo
                }}{{ receta.insumo.unidadMedida }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <img
            :src="
              'http://localhost:9001/images/productos/' + manufacturadoEncontrado.imagen
            "
            class="imagenProducto"
          />
          <div>
            <h3>
              {{ manufacturadoEncontrado.denominacion }}
              <b-btn-group id="admin-btn-grp">
                <b-checkbox
                  class="slideAB"
                  switch
                  @change="mostrarModalAB"
                  size="sm"
                  v-model="switchChecked"
                  ref="switchModal"
                />
              </b-btn-group>
            </h3>
          </div>
          <div class="stock">
            <div id="stockColor"></div>
            <b-badge class="categoria">{{
              manufacturadoEncontrado.rubro.denominacion
            }}</b-badge>
          </div>
          <div id="descripcionInsumo">
            <h2>Descripción</h2>
            <p>{{ manufacturadoEncontrado.descripcion }}</p>
          </div>
          <div class="infoProductoVenta">
            <b-card header="Costo" class="tarjetaInfo">
              <b-card-text>{{ this.formatter.formatMoney(costo) }}</b-card-text>
            </b-card>
            <b-card header="Precio venta" class="tarjetaInfo">
              <b-card-text
                >{{ this.formatter.formatMoney(manufacturadoEncontrado.precioVenta) }}
              </b-card-text>
            </b-card>
            <b-card header="Tiempo" class="tarjetaInfo">
              <b-card-text>{{ manufacturadoEncontrado.tiempoCocina }} min</b-card-text>
            </b-card>
          </div>
          <div class="infoIngredientes">
            <h2>Ingredientes</h2>
            <ul>
              <li v-for="(receta, index) in recetas" :key="index">
                {{ receta.insumo.denominacion }} {{ receta.cantidadInsumo
                }}{{ receta.insumo.unidadMedida }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </b-container>

    <router-view />
    <b-modal ref="modal" hide-footer title="Eliminar insumo" class="modalEliminar">
      <form>
        <b-form-input class="contraseñaForm" placeholder="Contraseña"></b-form-input>
        <b-button pill class="boton" size="md">Eliminar </b-button>
      </form>
    </b-modal>

    <b-modal
      ref="modalAB"
      title="Alta/Baja"
      class="modalEliminar"
      @close="setEstadoCheckBaja"
      no-close-on-esc
      hide-footer
      no-close-on-backdrop
      modal-header-close
    >
      ¿Confirma que desea modificar el estado de este manufacturado?
      <b-button pill class="boton botonEliminar" size="sm" @click="cambiarEstadoBaja"
        >Aceptar</b-button
      >

      <!-- Toast que muestra la confirmación de eliminado con éxito-->
      <b-toast id="toast-eliminar-exito" variant="success" solid>
        <template v-slot:toast-title>
          <div class="d-flex flex-grow-1 align-items-baseline">
            <b-img
              blank
              blank-color="#ff5555"
              class="mr-2"
              width="12"
              height="12"
            ></b-img>
          </div>
        </template>
        ¡Insumo modificado con éxito!
      </b-toast>
    </b-modal>
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
import axios from "axios";
import Formatter from "@/utilidades/Formatters.js";

export default {
  mounted() {
    this.getManufacturadoXId();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {
      manufacturadoEncontrado: [],
      service: new Service(),
      formatter: new Formatter(),
      recetas: [],
      costo: 0,
      switchChecked: undefined,
    };
  },

  methods: {
    esCocinero() {
      return JSON.parse(sessionStorage.getItem("user")).rol == "cocina";
    },

    async getManufacturadoXId() {
      let idManufacturado = parseInt(this.$route.params.id);
      await this.service.getOne("manufacturado", idManufacturado).then((data) => {
        this.manufacturadoEncontrado = data;
        this.switchChecked = !this.manufacturadoEncontrado.baja;
        this.getRecetas(idManufacturado);
      });
    },

    async getRecetas(id) {
      await axios
        .get("http://localhost:9001/buensabor/manufacturado/recetasManufacturado/" + id)
        .then((response) => (this.recetas = response.data));
      await this.obtenerCosto();
      await this.verificarStock();
    },

    /* verificarStock() {
      let stockBajo = this.recetas.some(receta =>
        receta.insumo.stock.actual < receta.cantidadInsumo
      );
      this.asignarColorStock(stockBajo);
    }, */

    async verificarStock() {
      await this.service
        .getOne("stock/estadoStockManufacturado", this.$route.params.id)
        .then((estado) => this.asignarColorStock(estado));
    },

    asignarColorStock(stock) {
      let claseStock = document.getElementById("stockColor");
      if (!stock) {
        this.stock = "insuficiente";
        claseStock.style.backgroundColor = "#ED3247";
      } else {
        this.stock = "suficiente";
        claseStock.style.backgroundColor = "#8BC34A";
      }
    },

    generarStringCantidades() {
      let cantidadesInsumos = [];
      this.recetas.forEach((receta) => cantidadesInsumos.push(receta.cantidadInsumo));
      let cantidadesInsumosStr = cantidadesInsumos.join(",");

      return cantidadesInsumosStr;
    },

    generarStringIds() {
      let idsInsumos = [];
      this.recetas.forEach((receta) => idsInsumos.push(receta.insumo.idInsumo));
      let idsInsumoStr = idsInsumos.join(",");

      return idsInsumoStr;
    },

    async obtenerCosto() {
      let idsInsumosStr = this.generarStringIds();
      let cantidadesInsumos = this.generarStringCantidades();

      await axios
        .get("http://localhost:9001/buensabor/manufacturado/costo", {
          params: {
            idsInsumosStr: idsInsumosStr,
            cantidadInsumos: cantidadesInsumos,
          },
        })
        .then((response) => (this.costo = response.data));
    },

    modificarInsumo() {
      this.$router.push({
        path: "/modificarManufacturado/" + this.manufacturadoEncontrado.id,
      });
    },

    mostrarModalAB() {
      this.$refs.modalAB.show();
      this.modalABAbierto = true;
    },

    async cambiarEstadoBaja() {
      let id = parseInt(this.$route.params.id);
      await this.service
        .delete("manufacturado", id)
        .then((data) => (this.manufacturadoEncontrado = data))
        .then(
          this.$bvToast.show("toast-eliminar-exito"),
          (this.switchChecked = !!this.manufacturadoEncontrado.baja),
          this.$refs.modalAB.hide()
        );
    },
    setEstadoCheckBaja() {
      this.$refs.switchModal.checked = this.manufacturadoEncontrado.baja;
      this.switchChecked = !this.switchChecked;
    },
  },
};
</script>
<style>
.buscador {
  float: right;
  margin-bottom: 25px;
}

#imagenBuscar {
  width: 25px;
}

.imagenProducto {
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 30px;
}

#stockColor {
  width: 20px;
  height: 20px;
  border-radius: 300px;
  float: left;
  margin-right: 10px;
}

.categoria {
  border: 1px solid #e7511e;
  margin-left: 30px;
  padding: 5px;
  color: #e7511e;
  font-weight: 400;
  font-size: 12pt;
  background-color: #ffffff;
  border-radius: 10px;
  width: 130px;
}

#descripcionInsumo {
  margin-top: 20px;
}

#descripcionInsumo p {
  font-family: "Baloo Bhaina 2";
  font-weight: 400;
  font-size: 11pt;
  color: #151515;
  line-height: 17px;
}

.tarjetaInfo {
  text-align: center;
  width: 116px;
  float: left;
  margin: 5px;
  border-radius: 15px;
  font-weight: 400;
  font-size: 11pt;
  color: #151515;
}

.card-header {
  background-color: #151515;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 15px;
  color: #ffffff;
}

.card-body {
  padding-top: 10px;
  padding-bottom: 10px;
}

.contraseñaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 60%;
  font-size: 11pt;
  margin-left: 20%;
}

.modal-dialog {
  margin-top: 200px;
  text-align: center;
  font-family: "Baloo Bhaina 2";
  font-weight: 400;
  font-size: 11pt;
  justify-content: center;
}

/* .modal-dialog .#1f91b6 {
  margin-top: 20px;
  margin-left: auto;
  margin-right: 40%;
  float: right;
} */

.infoProductoVenta {
  float: right;
}

.boton {
  width: auto;
  min-width: 105px;
}

#admin-btn-grp {
  float: center;
}
#cocina-btn-grp {
  float: unset;
}
</style>
