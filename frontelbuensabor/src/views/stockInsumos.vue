<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral>    
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Stock de insumos</h1>
      <b-nav-form class="buscador">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar insumo"></b-form-input>
          <b-button size="sm" class="botonImagen" type="submit"><img src="@/assets/images/sistema/buscar.png" id="imagenBuscar"/></b-button>
        </b-nav-form>
        <b-table hover responsive  :items="insumosData" :fields="tituloTabla" @row-dblclicked="verDetalle" :outlined=true :per-page="perPage" :current-page="currentPage" :borderless=true id="tablaInsumos" class="tabla">
            <template v-slot:cell(acción)="row">
                <b-button size="sm" @click="agregarInsumo(row.item.id)" class="botonImagen">
                   <img src="@/assets/images/sistema/botonAgregar.png" id="imagenAgregar"/>
                </b-button>

            </template>
       </b-table>    
       <b-button pill class="boton" size="md">Nuevo</b-button>
       <b-pagination v-model="currentPage" size="sm" align="right" :total-rows="rows" :per-page="perPage"  aria-controls="my-tablaInsumos" class="paginador">
        </b-pagination>
    </b-container>
    
    <router-view />
 
  </div>
  
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
export default {
   mounted() {
    this.getInsumos();
  },
  components: {
    "menuLateral": MenuLateral,
    "cabecera":Header
  },
  data() {
      return {
        perPage: 7,
         currentPage: 1,        
        tituloTabla: ['denominacion','unidad', 'costo', 'stockActual', 'categoria','acción'],
        insumosData:[],
        insumo:{
          id:0,
          denominacion:"",
          unidad:"",
          costo:0,
          stockActual:0,
          categoría:"",
        }
      }
    },
    methods: {
      async getInsumos(){
         const res = await fetch("/insumos.json");
        const resJson = await res.json();
        this.insumosData = resJson.insumos;
        console.log(this.insumosData);
      },

      agregarInsumo(){

      },
      verDetalle(record){
        window.location.href = "/insumoDetalle/"+record.id;
        console.log(record);
        
      }
    },
    computed: {
      rows() {
        return this.insumosData.length
      }
    }
  
}
</script>
<style>
h1{
  font-family: 'Baloo Bhaina 2';
  font-weight: 600;
  font-size: 18pt; 
  color:#151515;
  text-align: left;
}


.costado{
    background-image: url("../assets/images/sistema/reticulaVertical.png");
    background-repeat: repeat-y;
    position: absolute;
    left: 0;
    height: 100%;
    min-width: 200px;
    background-size: contain;
}

.informacion{
  
  width: 50%;
  min-height: 100px; 
  margin-left: 30%;
  padding: 20px;
  padding-top:50px;
  font-family: 'Baloo Bhaina 2';
  color:#151515;

}

.header{
  background-color: blue;
  width: 100%;
  top:0;
  min-height: 200px;  
  
}
.buscador{
  float:right;
  margin-bottom: 25px;
}


.botonImagen{
  background-color:transparent;
  border:none;
  padding: 0px;
}
.botonImagen:hover{
  background-color:transparent;
  border:none;
}

.botonImagen:active{
  background-color:transparent;
  border:none;
}
.botonImagen:visited{
  background-color:transparent;
  border:none;
}

.botonImagen:focus{
  background-color:transparent;
  border:none;
}

#imagenBuscar{
  width: 25px;
}

#imagenAgregar{
  width: 20px;
  margin:0px;
}

.tabla{
  text-align: left;
}

.page-link{
   color: #151515;
  border:none;
  
}
.boton{
  float:left;
  background-color: #E7511E;
  width: 105px;
  height: 30px;
  
}


@media screen and (max-width: 774px){
    .costado{
        background-image: url("../assets/images/sistema/reticulaVertical-mobile.png");
        width: 60px;
        min-width: 60px;
    }

    .informacion{
      width: auto;
      min-height: 100px; 
      margin-left: 60px;
      z-index: 0;
    }
    .botonImagen{
      display: inline;
    }
}


@media screen and (max-width: 604px){
    .informacion{
      font-size: 10pt; 
         
    }
    .table td, .table th{
      padding:0.4rem;
    }
    .buscador{
      float:left;
     
    }
 
}

</style>