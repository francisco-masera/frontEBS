<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Detalle de insumo</h1>
      <div v-if="!esInsumoVenta">
        <h3>
          {{ insumoEncontrado.denominacion }}
          <b-btn-group>
            <b-button
              size="sm"
              @click="modificarInsumo(insumoEncontrado.idInsumo)"
              class="botonImagen"
            >
              <img
                src="http://localhost:9001/images/sistema/editar.png"
                id="imagenAgregar"
              />
            </b-button>
            <b-button
              size="sm"
              @click="openModalEliminar()"
              class="botonImagen"
            >
              <img
                src="http://localhost:9001/images/sistema/eliminar.png"
                id="imagenAgregar"
              />
            </b-button>
          </b-btn-group>
        </h3>
        <div class="stock">
          <div id="stockColor" style="background-color:#ED3247"></div>
          Stock {{ stock }}
          <b-badge class="Badgecategoria">{{
            insumoEncontrado.rubroInsumo.denominacion
          }}</b-badge>
        </div>

        <div id="infoProductoVenta">
          <b-card header="Stock actual" class="tarjetaInfo">
            <b-card-text
              >{{ insumoEncontrado.stock.actual
              }}{{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Stock min" class="tarjetaInfo">
            <b-card-text
              >{{ insumoEncontrado.stock.minimo
              }}{{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Stock max" class="tarjetaInfo">
            <b-card-text
              >{{ insumoEncontrado.stock.maximo
              }}{{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Costo" class="tarjetaInfo">
            <b-card-text>{{ costo }}</b-card-text>
          </b-card>
        </div>
        <div class="HistorialCompra">
          Historial de Compra
          <b-table
            hover
            responsive
            small
            :items="ordenCompra"
            :fields="titulosTabla"
            :outlined="true"
            :per-page="perPage"
            :current-page="currentPage"
            :borderless="true"
            id="tablaInsumos"
            class="tabla"
          >
            <template v-slot:cell(accion)="row">
              <b-button
                size="sm"
                @click="eliminarRegistro(row.item.idInsumo)"
                class="botonImagen"
              >
                <img
                  src="http://localhost:9001/images/sistema/eliminar.png"
                  id="imagenAgregar"
                />
              </b-button>
            </template>
          </b-table>
          <b-button pill class="boton" size="md">Agregar Existencia</b-button>
          <b-pagination
            v-model="currentPage"
            size="sm"
            align="right"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-tablaInsumos"
            class="paginador"
          >
          </b-pagination>
        </div>
      </div>

      <div v-else id="insumo">
        <img
          :src="
            'http://localhost:9001/images/productos/' + insumoEncontrado.imagen
          "
          class="imagenProducto"
        />
        <h3>
          {{ insumoEncontrado.insumo.denominacion }}
          <b-btn-group>
            <b-button
              size="sm"
              @click="modificarInsumo(insumoEncontrado.insumo.idInsumo)"
              class="botonImagen"
            >
              <img
                src="http://localhost:9001/images/sistema/editar.png"
                id="imagenAgregar"
              />
            </b-button>
            <b-button size="sm" @click="openModalEliminar" class="botonImagen">
              <img
                src="http://localhost:9001/images/sistema/eliminar.png"
                id="imagenAgregar"
              />
            </b-button>
          </b-btn-group>
        </h3>
        <div class="stock">
          <div id="stockColor" style="background-color:#ED3247"></div>
          Stock {{ stock }}
          <b-badge class="Badgecategoria">{{
            insumoEncontrado.insumo.rubroInsumo.denominacion
          }}</b-badge>
        </div>
        <div id="descripcionInsumo">
          <h2>Descripción</h2>
          <p>{{ insumoEncontrado.descripcion }}</p>
        </div>
        <div id="infoProductoVenta">
          <b-card header="Stock actual" class="tarjetaInfo">
            <b-card-text
              >{{ insumoEncontrado.insumo.stock.actual }}
              {{ insumoEncontrado.insumo.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Stock min" class="tarjetaInfo">
            <b-card-text
              >{{ insumoEncontrado.insumo.stock.minimo }}
              {{ insumoEncontrado.insumo.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Stock max" class="tarjetaInfo">
            <b-card-text
              >{{ insumoEncontrado.insumo.stock.maximo }}
              {{ insumoEncontrado.insumo.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Costo" class="tarjetaInfo">
            <b-card-text>{{ costo }}</b-card-text>
          </b-card>
          <b-card header="Precio de venta" class="tarjetaInfo">
            <b-card-text
              >{{ this.formatter.formatMoney(insumoEncontrado.precioVenta) }}
            </b-card-text>
          </b-card>
        </div>
        <div class="HistorialCompra">
          Historial de Compra
          <b-table
            hover
            responsive
            small
            :items="ordenCompra"
            :fields="titulosTabla"
            :outlined="true"
            :per-page="perPage"
            :current-page="currentPage"
            :borderless="true"
            id="tablaInsumos"
            class="tabla"
          >
            <template v-slot:cell(accion)="row">
              <b-button
                size="sm"
                @click="eliminarRegistro(row.item.idInsumo)"
                class="botonImagen"
              >
                <img
                  src="http://localhost:9001/images/sistema/eliminar.png"
                  id="imagenAgregar"
                />
              </b-button>
            </template>
          </b-table>
          <b-button pill class="boton" size="md">Agregar Existencia</b-button>
          <b-pagination
            v-model="currentPage"
            size="sm"
            align="right"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-tablaInsumos"
            class="paginador"
          >
          </b-pagination>
        </div>
      </div>
    </b-container>
    <router-view />
    <b-modal
      ref="modal"
      hide-footer
      title="Eliminar insumo"
      class="modalEliminar"
    >
      <form>
        <b-form-input
          v-model="contraseniaEliminar"
          class="contraseñaForm"
          placeholder="Contraseña"
        >
        </b-form-input>
        <b-button pill class="boton" size="md" @click="verificarContrasenia"
          >Eliminar</b-button
        >
      </form>
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
        ¡Insumo eliminado con éxito!
      </b-toast>
      <b-toast id="toast-eliminar-error" variant="warning" solid>
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
        ¡La contraseña no es correcta!
      </b-toast>
    </b-modal>
    <b-modal
      ref="modalEliminarRegistro"
      hide-footer
      title="Eliminar asiento"
      class="modalEliminar"
    >
      <form>
        ¿Desea anular el asiento de compra?
        <b-button pill class="boton" size="md">Anular</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
import Formatter from "@/utilidades/Formatters.js";
import axios from "axios";
export default {
  mounted() {
    this.verificarUsuario();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {
      perPage: 4,
      currentPage: 1,
      titulosTabla: [
        { key: "fechaDeCompra", label: "Fecha De Compra" },
        { key: "cantidad", label: "Cantidad" },
        { key: "precioUnitario", label: "Precio Unitario" },
        { key: "precioTotal", label: "Precio Total" },
        { key: "accion", label: "Acción" },
      ],

      oCompra: {
        id: 0,
        fechaDeCompra: 0,
        cantidad: 0,
        precioUnitario: 0,
        precioTotal: 0,
      },

      costo: 0,
      esInsumoVenta: false,
      insumoEncontrado: [],
      ordenCompra: [],
      stock: "",
      estadoEliminado: false,
      contraseniaEliminar: "",
      contraseniaVerificada: false,
      service: new Service(),
      formatter: new Formatter(),
    };
  },

  methods: {
    verificarUsuario() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.user === undefined || this.user.rol !== "admin"
        ? this.$router.push({ name: "Home" })
        : this.getInsumoxId();
    },

    async getInsumoxId() {
      var parametroId = parseInt(this.$route.params.id);
      let insumo = await this.service.getOne("insumo", parametroId);
      await this.setInsumo(insumo);
    },

    async setInsumo(insumo) {
      if (!insumo.esInsumo) {
        await this.getInsumoVentaxId().then(() => this.getOrdenCompra(insumo));
      } else {
        this.insumoEncontrado = insumo;
        this.getOrdenCompra(insumo);
      }
    },

    async getInsumoVentaxId() {
      var parametroId = parseInt(this.$route.params.id);
      this.esInsumoVenta = true;
      await this.service
        .getOne("insumoVenta/insumo", parametroId)
        .then((data) => (this.insumoEncontrado = data[0]));
    },

    async getOrdenCompra(insumo) {
      let parametroId = parseInt(this.$route.params.id);
      let precio = 0;
      await this.service
        .getOne("compras/historialCompras", parametroId)
        .then((data) => {
          data.forEach((o, i) => {
            let dateTime = o.fechaCompra;
            let date = dateTime.split("T")[0];
            date = date.split("-");
            let time = dateTime.split("T")[1];
            time = time.split(":");

            dateTime = new Date(
              date[0],
              date[1] - 1,
              date[2],
              time[0],
              time[1],
              time[2]
            )
              .toLocaleString()
              .replace(",", "")
              .replace(/:.. /, " ");

            i == 0 ? (precio = o.precioUnitario) : "";

            let precioTotal = o.cantidad * o.precioUnitario;
            this.ordenCompra.push({
              id: o.id,
              fechaDeCompra: dateTime,
              cantidad: o.cantidad,
              precioUnitario: this.formatter.formatMoney(o.precioUnitario),
              precioTotal: this.formatter.formatMoney(precioTotal),
            });
          });
        });
      this.setCosto(precio);
      this.verificarStockVenta(insumo);
    },

    setCosto(precioUnitario) {
      this.costo =
        precioUnitario === undefined
          ? this.formatter.formatMoney(0.0)
          : this.formatter.formatMoney(precioUnitario);
    },

    verificarStockVenta(insumo) {
      let clase;
      if (parseInt(insumo.stock.actual) <= parseInt(insumo.stock.minimo)) {
        this.stock = "insuficiente";
        clase = document.getElementById("stockColor");
        clase.style.backgroundColor = "#ED3247";
      } else if (
        parseInt(insumo.stock.actual) > parseInt(insumo.stock.minimo) &&
        parseInt(insumo.stock.actual) < parseInt(insumo.stock.maximo)
      ) {
        this.stock = "moderado";
        clase = document.getElementById("stockColor");
        clase.style.backgroundColor = "#FFEB3B";
      } else {
        this.stock = "suficiente";
        clase = document.getElementById("stockColor");

        clase.style.backgroundColor = "#8BC34A";
      }
    },

    async eliminarInsumo() {
      let id =
        this.insumoEncontrado.insumo === undefined
          ? this.insumoEncontrado.idInsumo
          : this.insumoEncontrado.insumo.idInsumo;
      this.service
        .delete("insumo", id)
        .then(
          this.$bvToast.show("toast-eliminar-exito"),
          this.$refs["modal"].hide()
        );
    },

    async verificarContrasenia() {
      let contraseniaVerificada = await axios
        .get("http://localhost:9001/buensabor/persona/validarContrasenia", {
          params: {
            id: this.user.id,
            password: this.contraseniaEliminar,
          },
        })
        .then((res) => res.data);
      console.log(contraseniaVerificada);
      contraseniaVerificada
        ? this.eliminarInsumo()
        : this.$bvToast.show("toast-eliminar-error");
    },

    openModalEliminar() {
      this.$refs["modal"].show();
    },

    modificarInsumo(id) {
      window.location.href = "/modificarInsumo/" + id;
    },

    eliminarRegistro() {
      this.$refs["modalEliminarRegistro"].show();
    },
  },
  computed: {
    rows() {
      return this.ordenCompra.length;
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

.HistorialCompra {
  width: 100%;
  margin-top: 20px;
  float: left;
}
.HistorialCompra table {
  font-size: 10pt;
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
.modal-dialog .boton {
  margin-top: 20px;
  margin-left: auto;
  margin-right: 40%;
  float: right;
}
.boton {
  width: auto;
}
</style>
