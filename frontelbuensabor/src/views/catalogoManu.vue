<template>
  <div>
    <div class="header"></div>
    <div id="nav"><menuLateral></menuLateral>    
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Catálogo manufacturados</h1>
      <b-nav-form class="buscador">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar manufacturado"></b-form-input>
          <b-button size="sm" class="botonImagen" type="submit"><img src="@/assets/images/sistema/buscar.png" id="imagenBuscar"/></b-button>
        </b-nav-form>
        <b-dropdown right text="Filtrar por categoría" class="filtroCategoria" variant="white">
        <b-dropdown-item>Pizza</b-dropdown-item>
        <b-dropdown-item>Hamburguesa</b-dropdown-item>
        <b-dropdown-item>Papas</b-dropdown-item>
        <b-dropdown-item>Postre</b-dropdown-item>
        </b-dropdown>
        <b-table hover responsive  :items="manufacturadosData" :fields="tituloTabla"  :outlined=true :per-page="perPage" :current-page="currentPage" :borderless=true id="tablaManufac" class="tabla">
            
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
export default {
   mounted() {
    this.getInsumos();
  },
  components: {
    "menuLateral": MenuLateral
  },
  data() {
      return {
        perPage: 7,
         currentPage: 1,        
        tituloTabla: ['denominación','categoría', 'stock', 'tiempo'],
        manufacturadosData:[],
        manufacturados:{
          denominacion:"",
          categoria:"",
          stock:"",
          tiempo:"",
        }
      }
    },
    methods: {
      async getInsumos(){
         const res = await fetch("/manufacturados.json");
        const resJson = await res.json();
        this.manufacturadosData = resJson.manufacturados;
        console.log(this.manufacturadosData);
      },

      agregarInsumo(){

      }
    },
    computed: {
      rows() {
        return this.manufacturadosData.length
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

.filtroCategoria{
  float:left;
  margin-bottom: 25px;
  border:1px solid lightgray;
  height: 32px;
  
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