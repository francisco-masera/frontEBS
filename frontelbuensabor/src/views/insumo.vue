<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Detalle de insumo</h1>
      <div v-if="esInsumoVenta">
        <img :src="'http://localhost:9001/images/productos/' + insumoEncontrado.imagen" class="imagenProducto"/>
        <h3>{{ insumoEncontrado.insumo.denominacion }}
          <b-button size="sm"  @click="modificarInsumo(insumoEncontrado.idInsumo)" class="botonImagen">
            <img src="@/assets/images/sistema/editar.png" id="imagenAgregar" />
          </b-button>
          <b-button size="sm" @click="openModalEliminar()" class="botonImagen">
            <img
              src="@/assets/images/sistema/eliminar.png"
              id="imagenAgregar"
            />
          </b-button>
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
            <b-card-text>${{ultimaCompra.precioUnitario}}</b-card-text>
          </b-card>
          <b-card header="Precio de venta" class="tarjetaInfo">
            <b-card-text>${{ insumoEncontrado.precioVenta }} </b-card-text>
          </b-card>
        </div>
        <div class="HistorialCompra">
          Historial de Compra
          <b-table
            hover
            responsive
            small
            :items="ordenCompra"
            :fields="tituloTabla"
            :outlined="true"
            :per-page="perPage"
            :current-page="currentPage"
            :borderless="true"
            id="tablaInsumos"
            class="tabla"
          >
            <template v-slot:cell(acción)="row">
              <b-button
                size="sm"
                @click="eliminarRegistro(row.item.id)"
                class="botonImagen"
              >
                <img
                  src="@/assets/images/sistema/eliminar.png"
                  id="imagenAgregar"
                />
              </b-button>
            </template>
            
          </b-table>
          <b-button pill class="boton" size="md">Añadir </b-button>
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
        <h3>
          {{ insumoEncontrado.denominacion }}
          <b-button
            size="sm"
            @click="modificarInsumo(insumoEncontrado.idInsumo)"
            class="botonImagen"
          >
            <img src="@/assets/images/sistema/editar.png" id="imagenAgregar" />
          </b-button>
          <b-button size="sm" @click="openModalEliminar()" class="botonImagen">
            <img
              src="@/assets/images/sistema/eliminar.png"
              id="imagenAgregar"
            />
          </b-button>
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
            <b-card-text>${{ ultimaCompra.precioUnitario }}</b-card-text>
          </b-card>
        </div>
        <div class="HistorialCompra">
          Historial de Compra
          <b-table
            hover
            responsive
            small
            :items="ordenCompra"
            :fields="tituloTabla"
            :outlined="true"
            :per-page="perPage"
            :current-page="currentPage"
            :borderless="true"
            id="tablaInsumos"
            class="tabla"
          >
            <template v-slot:cell(acción)="row">
              <b-button
                size="sm"
                @click="eliminarRegistro(row.item.id)"
                class="botonImagen"
              >
                <img
                  src="@/assets/images/sistema/eliminar.png"
                  id="imagenAgregar"
                />
              </b-button>
            </template>
           
          </b-table>
          <b-button pill class="boton" size="md">Añadir </b-button>
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
        <b-form-input  v-model="contraseniaEliminar" class="contraseñaForm" placeholder="Contraseña">
        </b-form-input>
        <b-button pill class="boton" size="md" @click="eliminarInsumo()">Eliminar </b-button>
      </form>
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
import axios from "axios";

export default {
  mounted() {
    this.getInsumoxId();
  
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
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
      oCompra:{
        "id":0,
        "fechaDeCompra":0,
        "cantidad":0,
        "precioUnitario":0,
        "precioTotal":0
      },
      esInsumoVenta: false,
      insumoEncontrado: [],
      insumoVentaEncontrado: [],     
      ordenCompra: [],
      stock: "",
      ultimaCompra: [],
      estadoEliminado: false,
      contraseniaEliminar: "",
      contraseniaVerificada: false,
      service: new Service(),
    };
  },

  methods: {
    async getInsumoxId() {
      var insumo = [];
      var parametroId = parseInt(this.$route.params.id);
      await this.service.getOne("insumo", parametroId).then((data) => {
         
        insumo = data;
        
        if(!insumo.esInsumo){          
          this.getInsumoVentaxId();
          
        }else{
          this.insumoEncontrado=insumo;
        
          this.getUltimaCompra();
          this.getOrdenCompra();
          this.verificaStockInsumo();
        }
      });
    },

    async getInsumoVentaxId() {
      var parametroId = parseInt(this.$route.params.id);
      await this.service.getOne("insumoVenta/insumo",parametroId).then(data=>{
        this.insumoEncontrado = data[0];
              
        this.esInsumoVenta=true;
       
        this.getUltimaCompra();
        this.getOrdenCompra();
        this.verificaStockVenta();
        
      });     
      

    },

    
    /*async saveInsumo(){
      const res =  await fetch("/saveInsumo.json");
      const resJson = await res.json();
      this.insumoService = this.service.save(
        "insumo",
        resJson.insumos[0],
        resJson.insumos[0].id
      );
      console.log(this.insumoService);
    },

    async updateInsumo() {
      const res = await fetch("/saveInsumo.json");
      const resJson = await res.json();
      this.insumoService = this.service.update(
        "insumo",
        resJson.insumos[0],
        resJson.insumos[0].id
      );
      console.log(this.insumoService);
    },*/

    async eliminarInsumo() {
      let id = parseInt(this.$route.params.id); 
      this.contraseniaVerificada = this.verificarContrasenia();
      console.log(this.contraseniaVerificada);
      this.contraseniaVerificada ?
      await this.service
        .delete("insumo", id)
        .then((response) => 
          this.estadoEliminado = response.data[0]) :
      console.log("error");
    },

    async verificarContrasenia() {
      let contraseniaEliminar = this.contraseniaEliminar;
      console.log(contraseniaEliminar);
       await axios.get(
        "http://localhost:9001/buensabor/persona/validarContrasenia/" +
          1,{ params: {
            "password" : contraseniaEliminar
            },
          }
      ).then((response)=> this.datos = response.data[0])
    },

    async getOrdenCompra() {
       var parametroId = parseInt(this.$route.params.id, 16);
      await this.service.getOne("compras/historialCompras",parametroId).then(data=>{
        data.forEach(o => {
          
          var dateStr=o.fechaCompra; //returned from mysql timestamp/datetime field
          var a=dateStr.slice(2,-15);
          console.log(dateStr);
          console.log(a);
          var m=dateStr.slice(7,-12);
          var d=dateStr.slice(10,-9);          
          var formatedDate = d+"/"+m+"/"+a;
          var precioTotal = o.cantidad*o.precioUnitario;
         this.ordenCompra.push({"id":o.id,"fechaDeCompra":formatedDate,
          "cantidad":o.cantidad,"precioUnitario":o.precioUnitario,"precioTotal":precioTotal});
        });       
        
        
       
      });
    },

    async getUltimaCompra() {
      var parametroId = parseInt(this.$route.params.id, 16);
      await this.service
        .getOne("compras/historial", parametroId)
        .then((data) => {
          this.ultimaCompra = data[0];
        });
    },

    verificaStockInsumo() {
      var clase;
      if (
        parseInt(this.insumoEncontrado.stockActual, 10) <=
        parseInt(this.insumoEncontrado.stockMin, 10)
      ) {
        this.stock = "insuficiente";
        clase = document.getElementById("stockColor");
        console.log(clase);
        clase.style.backgroundColor = "#ED3247";
        console.log(clase);
        console.log("insuficiente");
      } else if (
        parseInt(this.insumoEncontrado.stockActual, 10) >
          parseInt(this.insumoEncontrado.stockMin, 10) &&
        parseInt(this.insumoEncontrado.stockActual, 10) <
          parseInt(this.insumoEncontrado.stockMax, 10)
      ) {
        this.stock = "moderado";
        clase = document.getElementById("stockColor");
        console.log(clase);
        clase.style.backgroundColor = "#FFEB3B";
        console.log(clase);
      } else {
        this.stock = "suficiente";
        clase = document.getElementById("stockColor");

        clase.style.backgroundColor = "#8BC34A";
        console.log("suficiente");
      }
    },

    verificaStockVenta() {
      var clase;
      if (
        parseInt(this.insumoEncontrado.insumo.stock.actual, 10) <=
        parseInt(this.insumoEncontrado.insumo.stock.minimo, 10)
      ) {
        this.stock = "insuficiente";
        clase = document.getElementById("stockColor");
        console.log(clase);
        clase.style.backgroundColor = "#ED3247";
        console.log(clase);
        console.log("insuficiente");
      } else if (
        parseInt(this.insumoEncontrado.insumo.stock.actual, 10) >
          parseInt(this.insumoEncontrado.insumo.stock.minimo, 10) &&
        parseInt(this.insumoEncontrado.insumo.stock.actual, 10) <
          parseInt(this.insumoEncontrado.insumo.stock.maximo, 10)
      ) {
        this.stock = "moderado";
        clase = document.getElementById("stockColor");
        console.log(clase);
        clase.style.backgroundColor = "#FFEB3B";
        console.log(clase);
      } else {
        this.stock = "suficiente";
        clase = document.getElementById("stockColor");

        clase.style.backgroundColor = "#8BC34A";
        console.log("suficiente");
      }
    },

    openModalEliminar() {
      this.$refs["modal"].show();
    },

    modificarInsumo(id) {
      window.location.href = "/modificarInsumo/" + id;
      console.log(id);
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
