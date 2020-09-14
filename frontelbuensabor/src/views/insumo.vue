<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Detalle de insumo</h1>
      <!-- Renderiza insumo que no se vende directamente, es decir que son insumos propiamente dichos--> 
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

            <b-checkbox
              switch
              @change="mostrarModalAB"
              size="sm"
              v-model="switchChecked"
              ref="switchModal"
            />
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
            responsive="sm"
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
            
          </b-table>
          <b-button pill class="boton" size="md" @click="agregarInsumoCompra()">Agregar Existencia</b-button>
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



<!-- Renderiza insumo que se vende directamente, como las bebidas-->       
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
            <b-checkbox
              switch
              @change="mostrarModalAB"
              size="sm"
              v-model="switchChecked"
              ref="switchModal"
            />
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
            responsive="sm"
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
            
          </b-table>
          <b-button pill class="boton" size="md" @click="agregarInsumoCompra()">Agregar Existencia</b-button>
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
      ref="modalAB"
      title="Alta/Baja"
      class="modalEliminar"
      @close="setEstadoCheckBaja"
      no-close-on-esc
      hide-footer
      no-close-on-backdrop
      modal-header-close
    >
      <form class="estiloForm">
        <b-form-input
          v-model="contraseniaUsuario"
          class="contraseñaForm"
          placeholder="Contraseña"
        >
        </b-form-input>
        <b-button pill class="boton botonEliminar" size="sm" @click="verificarContrasenia"
          >Modificar estado</b-button
        >
      </form>

      <!-- Toast que muestra la confirmación de eliminado con éxito-->
      <b-toast id="toast-eliminar-exito" variant="success" solid>
        <template v-slot:toast-title>
          <div class="d-flex flex-grow-1 align-items-baseline">
            <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12" ></b-img>
          </div>
        </template>
        ¡Insumo modificado con éxito!
      </b-toast>

      <!-- Toast que muestra el error en la eliminación del insumo por error en contraseña-->
      <b-toast id="toast-eliminar-error" variant="warning" solid>
        <template v-slot:toast-title>
          <div class="d-flex flex-grow-1 align-items-baseline">
            <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12" ></b-img>
          </div>
        </template>
        ¡La contraseña no es correcta!
      </b-toast>
    </b-modal>

 
   <!-- Modal para para añadir un registro de compra-->
    <b-modal ref="modalAñadir" hide-footer hide-header centered title>
      <h2>Añadir existencia</h2>
      <h4>{{ compra.insumo.denominacion }}</h4>
      <form class="estiloForm">
        <table>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref">
                Fecha
              </label>
            </td>
            <td>
              <b-form-datepicker for="inline-form-custom-select-pref" id="example-datepicker" size="sm" v-model="compra.fechaCompra">
              </b-form-datepicker>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref">
                Unidad de medida
              </label>
            </td>
            <td>{{ compra.insumo.unidadMedida }}</td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref">
                Cantidad
              </label>
            </td>
            <td>
              <b-form-input v-model="compra.cantidad">
              </b-form-input>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref">
                Precio por unidad
              </label>
            </td>
            <td>
              <b-form-input v-model="compra.precioUnitario">
              </b-form-input>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <b-button pill class="boton botonAñadirExistencia" size="md" @click="añadirCompra()">
                Añadir
              </b-button>
            </td>
          </tr>
        </table>
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
      ],

      compra: {
        insumo:{},
        fechaCompra:"",
        cantidad:0,
        precioUnitario:0,
      },
      
      costo: 0,
      esInsumoVenta: false,
      insumoEncontrado: [],
      ordenCompra: [],
      stock: "",
      contraseniaUsuario: "",
      contraseniaVerificada: false,
      switchChecked: undefined,
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
        this.switchChecked = !this.insumoEncontrado.baja;
      }
    },

    async getInsumoVentaxId() {
      var parametroId = parseInt(this.$route.params.id);
      this.esInsumoVenta = true;
      await this.service
        .getOne("insumoVenta/insumo", parametroId)
        .then((data) => (this.insumoEncontrado = data[0]))
        .then((this.switchChecked = !this.insumoEncontrado.baja));
    },

    async getOrdenCompra(insumo) {
      this.ordenCompra=[];
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
      if (parseFloat(insumo.stock.actual) <= parseFloat(insumo.stock.minimo)) {
        this.stock = "insuficiente";
        clase = document.getElementById("stockColor");
        clase.style.backgroundColor = "#ED3247";
      } else if (
        parseFloat(insumo.stock.actual) > parseFloat(insumo.stock.minimo) &&
        parseFloat(insumo.stock.actual) < parseFloat(insumo.stock.maximo)
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

    async cambiarEstadoBaja() {
      let id =
        this.insumoEncontrado.insumo === undefined
          ? this.insumoEncontrado.idInsumo
          : this.insumoEncontrado.insumo.idInsumo;

      await this.service
        .delete("insumo", id)
        .then((data) => (this.insumoEncontrado = data))
        .then(
          this.$bvToast.show("toast-eliminar-exito"),
          (this.switchChecked = !!this.insumoEncontrado.baja),
          this.$refs.modalAB.hide()
        );
    },

    async verificarContrasenia() {
      let contraseniaVerificada = await axios
        .get("http://localhost:9001/buensabor/persona/validarContrasenia", {
          params: {
            id: this.user.id,
            password: this.contraseniaUsuario,
          },
        })
        .then((res) => res.data);
      contraseniaVerificada
        ? this.cambiarEstadoBaja()
        : (this.$bvToast.show("toast-eliminar-error"),
          (this.switchChecked = !!this.switchChecked));
    },

    modificarInsumo(id) {
      window.location.href = "/modificarInsumo/" + id;
    },

    mostrarModalAB() {
      this.$refs.modalAB.show();
      this.modalABAbierto = true;
    },

    setEstadoCheckBaja() {
      this.$refs.switchModal.checked = this.insumoEncontrado.baja;
      this.switchChecked = !this.switchChecked;
    },

   

  //Abre modal para cargar nuevo stock de insumos
    agregarInsumoCompra() {
      console.log(this.insumoEncontrado)
      this.$refs["modalAñadir"].show();
      if(this.insumoEncontrado.esInsumo){
        this.compra.insumo = this.insumoEncontrado;
        }else{
          this.compra.insumo=this.insumoEncontrado.insumo;
        }
    },

  //Muestra la confirmación de la carga de insumo
    toast(data, append = false) {
        this.$bvToast.toast(`Se incorporaron ${data.cantidad} existencias al producto`, {
          title: `Alta de producto`,
          toaster: 'b-toaster-top-center',
          solid: true,
          appendToast: append
        })
      },

  //Hace la petición al back para añadir el nuevo registro de compra, el cual en el back hace la logica de aumento de stock
    async añadirCompra(){ 
      this.compra.fechaCompra = this.compra.fechaCompra.concat("T00:00:00");
            
      await this.service.save("compras",this.compra)
      .then((data) => {
        this.toast(data);
        this.$refs["modalAñadir"].hide();
        this.compra.fechaCompra='';
        this.compra.cantidad=0;
        this.compra.precioUnitario=0;
        this.compra.insumo={};    
        this.getOrdenCompra(this.compra.insumo);
      })
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
  margin: 1.75rem auto;
  max-width: 500px;
  font-family: "Baloo Bhaina 2";
  font-weight: 400;
  font-size: 11pt;
  justify-content: center;
  height: auto;
}
.estiloForm{
  text-align: center;
}
.estiloForm table{
  display: inline;
  text-align: left;
}

.botonAñadirExistencia{
  margin-bottom: 10px;
  display: block;
  margin-left: 180px;
  margin-right: 180px;
  margin-top:20px;
}

.boton {
  width: auto;
  min-width: 105px;
}

.botonEliminar{
  display: inline-block;
  float:none;
  margin-top: 20px;
  margin-bottom:10px;
}
</style>
