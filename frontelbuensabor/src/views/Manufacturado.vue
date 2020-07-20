<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
      <b-container class="informacion">
        <h1>Detalle producto manufacturado</h1>
     
        <div v-if="this.esCocinero()">
          <div>
            <img :src="'http://localhost:9001/images/productos/' + manufacturadoEncontrado.imagen" class="imagenProducto"/>
            <h3>
              {{ manufacturadoEncontrado.denominacion }}
              <b-button id="cocina-btn-grp" size="sm" @click="modificarInsumo" class="botonImagen">
                <img src="http://localhost:9001/images/sistema/editar.png" id="imagenAgregar" />
              </b-button>
            </h3>
            <div class="stock">
              <div id="stockColor"></div>
              <b-badge class="categoria">{{ manufacturadoEncontrado.rubro.denominacion }}</b-badge>
            </div>
            <div id="descripcionInsumo">
              <h2>Descripción</h2>
              <p>{{ manufacturadoEncontrado.descripcion }}</p>
            </div>
            <div class="infoProductoVenta">
              <b-card header="Tiempo" class="tarjetaInfo">
                <b-card-text>{{ manufacturadoEncontrado.tiempoCocina }} min</b-card-text></b-card>
            </div>
            <div class="infoIngredientes">
              <h2>Ingredientes</h2>   
              <ul>
                <li
                  v-for="(receta, index) in recetas"
                  :key="index"
                >
                  {{ receta.insumo.denominacion }} {{ receta.cantidadInsumo }}{{ receta.insumo.unidadMedida }}
                </li>
              </ul>
            </div>
          </div>   
        </div>   
        <div v-else> 
          <div>
            <img :src="'http://localhost:9001/images/productos/' + manufacturadoEncontrado.imagen" class="imagenProducto"/>
            <div>
              <h3>
                {{ manufacturadoEncontrado.denominacion }}
              <b-btn-group id="admin-btn-grp"> 
                 <b-button size="sm" @click="modificarInsumo" class="botonImagen">
                  <img src="http://localhost:9001/images/sistema/editar.png" id="imagenAgregar" />
                </b-button>
                <b-button size="sm" @click="openModalEliminar" class="botonImagen">
                  <img src="http://localhost:9001/images/sistema/eliminar.png" id="imagenAgregar"/>
                </b-button>
              </b-btn-group>
              </h3>
            </div>
            <div class="stock">
              <div id="stockColor"></div>
              <b-badge class="categoria">{{ manufacturadoEncontrado.rubro.denominacion }}</b-badge>
            </div>
            <div id="descripcionInsumo">
              <h2>Descripción</h2>
              <p>{{ manufacturadoEncontrado.descripcion }}</p>
            </div>
            <div class="infoProductoVenta">
              <b-card header="Costo" class="tarjetaInfo">
                <b-card-text>{{ this.formatter.formatMoney(this.costo) }}</b-card-text>
              </b-card>
              <b-card header="Precio venta" class="tarjetaInfo">
                <b-card-text >{{ this.formatter.formatMoney(manufacturadoEncontrado.precioVenta) }}
                </b-card-text>
              </b-card>
              <b-card header="Tiempo" class="tarjetaInfo">
                <b-card-text>{{ manufacturadoEncontrado.tiempoCocina }} min</b-card-text>
              </b-card>
            </div>
            <div class="infoIngredientes">
              <h2>Ingredientes</h2>   
              <ul>
                <li
                  v-for="(receta, index) in recetas"
                  :key="index"
                >
                  {{ receta.insumo.denominacion }} {{ receta.cantidadInsumo }}{{ receta.insumo.unidadMedida }}
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
      costos: [],
      costo: 0.0,
    };
  },

  methods: {
    esCocinero (){
     return JSON.parse(sessionStorage.getItem("user")).rol == "cocina";
    },

    async getManufacturadoXId() {
      let idManufacturado = parseInt(this.$route.params.id, 10);
      await this.service.getOne("manufacturado", idManufacturado).then((data)=>{      
        this.manufacturadoEncontrado = data;
        this.getRecetas(idManufacturado);
      });
    },

    async getRecetas(id){
      await axios.get("http://localhost:9001/buensabor/manufacturado/recetasManufacturado/" 
      + id)
      .then((response)=> this.recetas = response.data);
      await this.obtenerCosto();
      this.verificarStock();
      
    },

    verificarStock() {
      let stockBajo = this.recetas.some(receta => 
        receta.insumo.stock.actual < receta.cantidadInsumo
      ); 
      this.asignarColorStock(stockBajo);
    },

    asignarColorStock(stockBajo){
      let claseStock = document.getElementById("stockColor");
      console.log(stockBajo);
      if (stockBajo){
        this.stock = "insuficiente";
        console.log(claseStock);
        claseStock.style.backgroundColor = "#ED3247";
        console.log(claseStock);
        console.log("insuficiente");

      } else {
        this.stock = "suficiente";
        claseStock.style.backgroundColor = "#8BC34A";
        console.log("suficiente");
      }
    },
    
    async obtenerCosto(){
      let idsInsumos = [];
      this.recetas.forEach(receta => idsInsumos.push(receta.insumo.idInsumo));
      let idsInsumosStr = idsInsumos.join(",");
      await axios.get("http://localhost:9001/buensabor/manufacturado/costo", { 
        params : {
          "idsInsumosStr" : idsInsumosStr
        }
      }).then(response => this.costos = response.data);

      let sumatoria = 0;
      this.costos.forEach((costo, index) => sumatoria += costo * this.recetas[index].cantidadInsumo);
      this.costo = sumatoria;
    },

    modificarInsumo(){
      sessionStorage.setItem("manufacturado", JSON.stringify(this.manufacturadoEncontrado));
      sessionStorage.setItem("recetas", JSON.stringify(this.recetas));
      this.$router.push({ path: "/modificarManufacturado/"});
    }
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

.modal-dialog .boton {
  margin-top: 20px;
  margin-left: auto;
  margin-right: 40%;
  float: right;
}

.infoProductoVenta{
    float: right;
}

#admin-btn-grp{
  float: center; 
}

#cocina-btn-grp{
  float: unset; 
}
</style>
