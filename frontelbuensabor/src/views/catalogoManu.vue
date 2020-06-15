<template>
  <div v-if="userCocina">
    <div class="header"></div>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Catálogo manufacturados</h1>
      <b-nav-form class="buscador">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Buscar manufacturado"
        ></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit"
          ><img src="@/assets/images/sistema/buscar.png" id="imagenBuscar"
        /></b-button>
      </b-nav-form>
      <b-dropdown
        right
        text="Filtrar por categoría"
        class="filtroCategoria"
        variant="white"
      >
        <b-dropdown-item>Pizza</b-dropdown-item>
        <b-dropdown-item>Hamburguesa</b-dropdown-item>
        <b-dropdown-item>Papas</b-dropdown-item>
        <b-dropdown-item>Postre</b-dropdown-item>
      </b-dropdown>
      <b-table
        hover
        responsive
        :items="manufacturadosData"
        :fields="tituloTabla"
        :outlined="true"
        :per-page="perPage"
        :current-page="currentPage"
        :borderless="true"
        id="tablaManufac"
        class="tabla"
      >
      </b-table>
      <b-button pill class="boton" size="md">Nuevo</b-button>
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
    </b-container>

    <router-view />
  </div>
  <div v-else>
       <div class="header"></div>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Catálogo manufacturados</h1>
       <a id="seleccion-manufacturado" href="http://localhost:8080/catalogoManu"
        ><span class="hrefManu">PRODUCTOS</span></a
      >
      <a id="seleccion-manufacturado" href=""
        ><span class="hrefManu" style="margin-left:50px">CATEGORÍAS</span></a
      >
      <b-nav-form class="buscador">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Buscar producto"
        ></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit"
          ><img src="@/assets/images/sistema/buscar.png" id="imagenBuscar"
        /></b-button>
      </b-nav-form>
      <b-dropdown
        right
        text="Filtrar por categoría"
        class="filtroCategoria"
        variant="white"
      >
        <b-dropdown-item>Pizza</b-dropdown-item>
        <b-dropdown-item>Hamburguesa</b-dropdown-item>
        <b-dropdown-item>Papas</b-dropdown-item>
        <b-dropdown-item>Postre</b-dropdown-item>
      </b-dropdown>
      <b-table
        hover
        responsive
        :items="manufacturadosData"
        :fields="tituloTabla"
        :outlined="true"
        :per-page="perPage"
        :current-page="currentPage"
        :borderless="true"
        id="tablaManufac"
        class="tabla"
      >
      </b-table>
    
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
    </b-container>

    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
export default {
  mounted() {
    this.getManufacturados();
  },
  components: {
    menuLateral: MenuLateral,
  },
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      tituloTabla: [],
      manufacturadosData: [],
      manufacturados:{},
      userCocina:true
    };
  },
  methods: {
    async getManufacturados() {
    
    
      if(this.userCocina===true){
       this.tituloTabla= ["denominación", "categoría", "stock", "tiempo"];
      const res = await fetch("/manufacturados.json");
      const resJson = await res.json();
      this.manufacturadosData = resJson.manufacturados;
      console.log(this.manufacturadosData);  
      }else{
        this.tituloTabla=["denominación", "costo", "precio", "categoría","stock"]
         const res = await fetch("/manufacturadosAdmin.json");
      const resJson = await res.json();
      this.manufacturadosData = resJson.manufacturados;
      console.log(this.manufacturadosData);
     }
      
    },

    agregarInsumo() {},
  },
  computed: {
    rows() {
      return this.manufacturadosData.length;
    },
  },
};
</script>
<style>
.header {
  background-color: blue;
  width: 100%;
  top: 0;
  min-height: 200px;
}

#imagenBuscar {
  width: 25px;
}

#imagenAgregar {
  width: 20px;
  margin: 0px;
}

.filtroCategoria {
  float: left;
  margin-bottom: 25px;
  border: 1px solid lightgray;
  height: 32px;
}
.hrefManu{
float:left;
color:black;
margin-bottom: 15px;

}
span:hover{
border-bottom: solid 1px;
 color: #e7541e;
}

</style>
