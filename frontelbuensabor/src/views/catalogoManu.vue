<template>  
<div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    
  <div v-if="userCocina"> 
   <b-container class="informacion">  
  <h1>Catálogo manufacturados</h1>
      <b-nav-form class="buscador">
        <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar manufacturado"></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit">
          <img src="@/assets/images/sistema/buscar.png" id="imagenBuscar" />
        </b-button>
      </b-nav-form>
          <b-form-select
            :options="categoriasData"
            value-field="denominacion"
            text-field="denominacion"
            v-model="categoriasData.denominacion"
            class="selectCategorias"
          >
          <b-form-select-option>Filtrar por categoría</b-form-select-option>
          </b-form-select>
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
        :filter="categoriasData.denominacion"
        class="tabla"
        @row-dblclicked="verDetalle"
      >
        <template v-slot:cell(denominacion)="row">{{row.item.denominacion}}</template>
        <template v-slot:cell(categoria)="row">
          <b-badge class="Badgecategoria">{{row.item.rubro.denominacion}}</b-badge>
        </template>
        <template v-slot:cell(tiempo)="row">{{row.item.tiempoCocina + " min"}}</template>
        <template v-slot:cell(stock)>
          <div id="stockColor" style="background-color:#ED3247"></div>
        </template>
      </b-table>
      <b-button pill class="boton" @click="nuevoManufacturado" size="md">Nuevo</b-button>
      <b-pagination
        v-model="currentPage"
        size="sm"
        align="right"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-tablaInsumos"
        class="paginador"
      ></b-pagination>
  
    </b-container>   
    <router-view />
  </div>
  <div v-else>
  <b-container class="informacion">  
   <h1>Catálogo manufacturados</h1>
      <a id="seleccion-manufacturado" href>
        <span class="hrefManu">PRODUCTOS</span>
      </a>
      <a id="seleccion-manufacturado" href>
        <span class="hrefManu" style="margin-left:30px; margin-right:10px">CATEGORÍAS</span>
      </a>
      <b-nav-form class="buscador">
        <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar producto"></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit">
          <img src="@/assets/images/sistema/buscar.png" id="imagenBuscar" />
        </b-button>
      </b-nav-form>
        <b-form-select
            :options="categoriasData"
            value-field="denominacion"
            text-field="denominacion"
            v-model="categoriasData.denominacion"
            class="selectCategorias"
          >
          <b-form-select-option>Filtrar por categoría</b-form-select-option>
          </b-form-select>
         
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
        :filter="categoriasData.denominacion"
        @row-dblclicked="verDetalle"
      >
      <template v-slot:cell(precio)="row">$ {{row.item.precioVenta}}</template>
       <template v-slot:cell(categoria)="row">
          <b-badge class="Badgecategoria">{{row.item.rubro.denominacion}}</b-badge>
        </template>
        <template v-slot:cell(stock)>
          <div id="stockColor" style="background-color:#ED3247"></div>
        </template>
      </b-table>
    
      <b-pagination
        v-model="currentPage"
        size="sm"
        align="right"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-tablaInsumos"
        class="paginador"
      ></b-pagination>
   
       </b-container>   
    <router-view />
 </div>  
</div>

</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
export default {
  mounted() {    
    this.getManufacturados();
    this.userVerifica();
    this.getCategorias();
    
  },
   components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
 
  data() {
    return {
      user:{},
      perPage: 7,
      currentPage: 1,
      tituloTabla: [],
      manufacturadosData: [],
      categoriasData:{},
      manufacturados:{},
      userCocina:true,
      stock: true,
      service: new Service(),
   
    };
  },
  methods: {
    
    nuevoManufacturado() {
      this.$router.push({ name: 'AñadirManufacturado'})
    },

    userVerifica(){
        this.user=JSON.parse(sessionStorage.getItem('user'));
        
        if(this.user.rol=="cocina"){
          console.log("cocina");
          this.userCocina=true;
        }else if(this.user.rol=="admin"){
          this.userCocina=false;
          console.log("admin");
        }else{
          this.$router.push({ name: 'Home'});
        }
    },

    verDetalle(item){
      console.log("detalle")
      this.$router.push({ path: '/manufacturadoDetalle/'+ item.id})
    },
     
  
    async getManufacturados() {
      await this.service.getAll("manufacturado").then(data => {
        this.manufacturadosData = data;
        console.log(this.manufacturadosData)
        if (this.userCocina === true) {
          this.tituloTabla = ["denominacion", "categoria", "stock", "tiempo"];
        } else {
          this.tituloTabla = [
            "denominacion",
            "costo",
            "precio",
            "categoria",
            "stock"
          ];
        }
        this.verificaStock();
      });
    },
    
    async getCategorias(){
      await this.service.getAll("rubroManufacturado").then(data => {
      this.categoriasData = data;
      console.log(this.categoriasData);
      
      })
    
    },
    verificaStock() {
      var clase;
      if (this.stock === false) {
        clase = document.getElementById("stockColor");
        console.log(clase);
        console.log(this.stock);
        clase.style.backgroundColor = "#ED3247";
        console.log(clase);
        console.log("insuficiente");
      } else {
        clase = document.getElementById("stockColor");
        clase.style.backgroundColor = "#8BC34A";
        console.log("suficiente");
      }
    },
    agregarInsumo() {}
  },
  
  computed: {
    rows() {
      return this.manufacturadosData.length;
    }
  }
};
</script>
<style>
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
.hrefManu {
  float: left;
  color: black;
  margin-bottom: 15px;
}
span:hover {
  border-bottom: solid 1px;
  color: #e7541e;
}
#stockColor {
  width: 20px;
  height: 20px;
  border-radius: 300px;
  float: left;
  margin-right: 10px;
}
.Badgecategoria{
  width: 105px;
  margin-left: 0px;
  font-size: 11pt;
 
}
.selectCategorias {
  border: solid 1px;
  border-color: lightgray;
  width: 200px;
  margin-bottom: 20px;
}
</style>
