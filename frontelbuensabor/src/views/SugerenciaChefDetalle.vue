<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Sugerencias del chef</h1>
      <h1>Detalle producto</h1>

      <div>
        <img
          :src="'@/assets/images/productos/' + sugerenciaEncontrada.imagen"
          class="imagenProducto"
        />
        <h3>
          {{sugerenciaEncontrada.denominacion}}
          <b-btn-group id="admin-btn-grp"> 
                 <b-button size="sm" @click="modificarInsumo(insumoEncontrado.idInsumo)" class="botonImagen">
                  <img src="http://localhost:9001/images/sistema/editar.png" id="imagenAgregar" />
                </b-button>
               
          </b-btn-group>
        </h3>
        
        <div id="descripcionInsumo">
          <h2>Descripción</h2>
          <p>{{ sugerenciaEncontrada.descripcion }}</p>
        </div>
        <div class="infoProductoVenta">
          <b-card header="Costo" class="tarjetaInfo">
            <b-card-text>{{ sugerenciaEncontrada.costo }}</b-card-text>
          </b-card>
          <b-card header="Tiempo" class="tarjetaInfo">
            <b-card-text>{{ sugerenciaEncontrada.tiempo }}</b-card-text>
          </b-card>
        </div>
        <div class="infoIngredientes">
          <h2>Ingredientes</h2>
          <li
            v-for="(ingrediente, index) in sugerenciaEncontrada.ingredientes"
            :key="index"
          >{{ ingrediente }}</li>
        </div>
        <div class="botonesSugerencia">
          <b-button pill class="boton" size="md" @click="aceptarSugerencia()">Aprobar</b-button>
          <b-button pill class="boton" size="md">Denegar</b-button>
        </div>
      </div>
    </b-container>

    <router-view />
    <b-modal ref="modal" hide-footer title="Aprobar producto">
      <p style="text-align: left; font-weight: 600;" >Precio sugerido: ${{sugerenciaEncontrada.precio}}</p>
      <form>
        <div> 
      <b-form-input class="sugerenciaForm" placeholder="Precio" ></b-form-input>
        </div> 
        <b-button pill class="boton" size="md">Agregar</b-button>
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
    this.getSugerenciaXid();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header
  },
  data() {
    return {
      sugerenciaEncontrada: [],
      service: new Service(),
      recetas: [],
      costos: [],
    };
  },

  methods: {

    async getSugerenciaXid() {
      let parametroId = parseInt(this.$route.params.id, 10);
      await this.service.getOne("sugerencia", parametroId).then((data)=>{      
        this.sugerenciaEncontrada = data;
        this.getRecetas(parametroId);
      });
    },
    
    async getRecetas(id){
      await axios.get("http://localhost:9001/buensabor/sugerencia/" 
      + id)
      .then((response)=> this.recetas = response.data);
      await this.obtenerCosto();
      
      
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


    aceptarSugerencia() {
      this.$refs["modal"].show();
    }
  }
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

.sugerenciaForm {
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
.infoProductoVenta {
  float: right;
}
.botonesSugerencia {
  float: right;
}



</style>