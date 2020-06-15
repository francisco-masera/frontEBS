<template>
  <div>
     <cabecera :user="user"></cabecera>
    <div id="nav"><menuLateral :user="user"></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Detalle de insumo</h1>
      <div v-if="esInsumoVenta">
        <img :src="'@/assets/images/productos/' + insumoEncontrado.imagen" class="imagenProducto"/>
        <h3>{{ insumoEncontrado.denominacion }}
          <b-button size="sm" @click="modificarInsumo(insumoEncontrado.id)" class="botonImagen">
            <img src="@/assets/images/sistema/editar.png" id="imagenAgregar" />
          </b-button>
          <b-button size="sm" @click="openModalEliminar()" class="botonImagen">
            <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar"/>
          </b-button>
        </h3>
        <div class="stock">
          <div id="stockColor" style="background-color:#ED3247"></div>
          Stock {{ stock }}
          <b-badge class="Badgecategoria">{{ insumoEncontrado.categoria }}</b-badge>
        </div>
        <div id="descripcionInsumo">
          <h2>Descripción</h2>
          <p>{{ insumoEncontrado.descripcion }}</p>
        </div>
        <div id="infoProductoVenta">
          <b-card header="Stock actual" class="tarjetaInfo">
            <b-card-text>{{ insumoEncontrado.stockActual }}{{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Stock min" class="tarjetaInfo">
            <b-card-text >{{ insumoEncontrado.stockMin }} {{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Stock max" class="tarjetaInfo">
            <b-card-text>{{ insumoEncontrado.stockMax }} {{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Costo" class="tarjetaInfo">
            <b-card-text>{{ insumoEncontrado.costo }}</b-card-text>
          </b-card>
          <b-card header="Precio de venta" class="tarjetaInfo">
            <b-card-text>${{ insumoEncontrado.precioVenta }}</b-card-text>
          </b-card>
        </div>
        <div class="HistorialCompra">
          Historial de Compra
          <b-table hover responsive small :items="ordenCompra" :fields="tituloTabla" :outlined="true" :per-page="perPage" :current-page="currentPage" :borderless="true" id="tablaInsumos" class="tabla">
            <template v-slot:cell(acción)="row">
              <b-button size="sm" @click="eliminarRegistro(row.item.id)" class="botonImagen">
                <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar"/>
              </b-button>
            </template>
            <template v-slot:cell(precioTotal)>
              {{ ordenCompra.precioUnitario }}
            </template>
          </b-table>
          <b-button pill class="boton" size="md">Añadir </b-button>
          <b-pagination v-model="currentPage" size="sm" align="right" :total-rows="rows" :per-page="perPage" aria-controls="my-tablaInsumos" class="paginador">
          </b-pagination>
        </div>
      </div>

      <div v-else id="insumo">
        <h3>
          {{ insumoEncontrado.denominacion }}
          <b-button size="sm" @click="modificarInsumo()" class="botonImagen">
            <img src="@/assets/images/sistema/editar.png" id="imagenAgregar" />
          </b-button>
          <b-button size="sm" @click="openModalEliminar()" class="botonImagen">
            <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar"/>
          </b-button>
        </h3>
        <div class="stock">
          <div id="stockColor" style="background-color:#ED3247"></div>
          Stock {{ stock }}
          <b-badge class="Badgecategoria">{{ insumoEncontrado.categoria }}</b-badge>
        </div>

        <div id="infoProductoVenta">
          <b-card header="Stock actual" class="tarjetaInfo">
            <b-card-text >{{ insumoEncontrado.stockActual }}{{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Stock min" class="tarjetaInfo">
            <b-card-text>{{ insumoEncontrado.stockMin }}{{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Stock max" class="tarjetaInfo">
            <b-card-text>{{ insumoEncontrado.stockMax }}{{ insumoEncontrado.unidadMedida }}
            </b-card-text>
          </b-card>
          <b-card header="Costo" class="tarjetaInfo">
            <b-card-text>${{ insumoEncontrado.costo }}</b-card-text>
          </b-card>
        </div>
        <div class="HistorialCompra">
          Historial de Compra
          <b-table hover responsive small :items="ordenCompra" :fields="tituloTabla" :outlined="true" :per-page="perPage" :current-page="currentPage" :borderless="true" id="tablaInsumos" class="tabla">
            <template v-slot:cell(acción)="row">
              <b-button size="sm" @click="eliminarRegistro(row.item.id)" class="botonImagen">
                <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar" />
              </b-button>
            </template>
            <template v-slot:cell(precioTotal)>
              {{ ordenCompra.precioUnitario }}
            </template>
          </b-table>
          <b-button pill class="boton" size="md">Añadir </b-button>
          <b-pagination v-model="currentPage" size="sm" align="right" :total-rows="rows" :per-page="perPage" aria-controls="my-tablaInsumos" class="paginador">
          </b-pagination>
        </div>
      </div>
    </b-container>

    <router-view />
    <b-modal ref="modal" hide-footer title="Eliminar insumo" class="modalEliminar">
      <form>
        <b-form-input class="contraseñaForm" placeholder="Contraseña" >          
        </b-form-input>
        <b-button pill class="boton" size="md">Eliminar </b-button>
      </form>
    </b-modal>

    <b-modal ref="modalEliminarRegistro" hide-footer title="Eliminar asiento" class="modalEliminar">
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
export default {
  mounted() {
    this.getInsumosxId();
    this.getOrdenCompra();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
   props: {
        user:{},
      },
  data() {
    return {
      perPage: 4,
      currentPage: 1,
      tituloTabla: [
        "id",
        "fechaDeCompra",
        "cantidad",
        "precioUnitario",
        "precioTotal",
        "acción",
      ],
      esInsumoVenta: false,
      insumosData: [],
      insumoEncontrado: [],
      ordenCompra: [],
      stock: "",
    };
  },

  methods: {
    async getInsumosxId() {
      console.log(this.$props.user);
      var parametroId = parseInt(this.$route.params.id, 10);
      const res = await fetch("/insumos.json");
      const resJson = await res.json();

      this.insumoEncontrado = await resJson.insumos.find(
        (insumo) => insumo.id === parametroId
      );
      this.verificaStock();
      this.verificaInsumo();

    },

    verificaInsumo() {
      if (this.insumoEncontrado.precioVenta != undefined) {
        this.esInsumoVenta = true;
      } else {
        this.esInsumoVenta = false;
      }
    },

    async getOrdenCompra() {
      const res = await fetch("/ordenCompra.json");
      const resJson = await res.json();
      this.ordenCompra = resJson.ordenCompra;
    },

    verificaStock() {
      var clase;
      if (
        parseInt(this.insumoEncontrado.stockActual, 10) <=
        parseInt(this.insumoEncontrado.stockMin, 10)
      ) {
        this.stock = "insuficiente";
        clase = document.getElementById("stockColor");
        
        clase.style.backgroundColor = "#ED3247";
        
      } else if (
        parseInt(this.insumoEncontrado.stockActual, 10) >
          parseInt(this.insumoEncontrado.stockMin, 10) &&
        parseInt(this.insumoEncontrado.stockActual, 10) <
          parseInt(this.insumoEncontrado.stockMax, 10)
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
    openModalEliminar() {
      this.$refs["modal"].show();
    },

    modificarInsumo(id){
      
      this.$router.push({ name: 'ModificarInsumo', params: {user: this.user, id:id }})
      
    },

    eliminarRegistro(){
      this.$refs["modalEliminarRegistro"].show();
    }
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

#imagenAgregar {
  width: 20px;
  margin: 0px;
  margin-left: 10px;
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
</style>
