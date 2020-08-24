<template>  
<div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    
  <div v-if="userCocina"> 
   <b-container class="informacion">  
  <h1>Catálogo manufacturados</h1>
      <b-nav-form class="buscador">
        <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar manufacturado" v-model="busqueda"></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit">
          <img src="http://localhost:9001/images/sistema/buscar.png" id="imagenBuscar" />
        </b-button>
      </b-nav-form>
         
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
        :filter="busqueda"
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
   
    <b-button class="hrefManu" @click="cambiarAProductos()">PRODUCTOS</b-button>
    <b-button class="hrefManu" @click="cambiarACategorias()">CATEGORÍAS</b-button>
    <div v-if="esProducto">      
      <b-nav-form class="buscador">
        <b-form-input size="sm" class="mr-sm-2" v-model="busqueda" placeholder="Buscar producto"></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit">
          <img src="http://localhost:9001/images/sistema/buscar.png" id="imagenBuscar" />
        </b-button>
      </b-nav-form>
       
         
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
        :filter="busqueda"
        @row-dblclicked="verDetalle"
      >
      <template v-slot:cell(precio)="row">{{ formatter.formatMoney(row.item.precioVenta) }}</template>
       <template v-slot:cell(categoria)="row">
          <b-badge class="Badgecategoria">{{row.item.rubro.denominacion}}</b-badge>
        </template>
        <template v-slot:cell(stock)>
          <div id="stockColor" style="background-color:#ED3247"></div>
        </template>
         <template v-for="(costo, i) in costos">
          <div :key="i"> {{costo}} </div>
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
   </div>
      <div v-else>
        <b-table
        hover
        responsive
       :small="true"
        :items="categoriasData"
        :fields="titulos"        
        :outlined="true"
        :borderless="true"
        class="tabla"
        id="tablaCategoriaManufacturado"
      >
        <template v-slot:cell(accion)="row" style="float:right">
          <b-btn-group id="admin-btn-grp"> 
                 <b-button size="sm" @click="agregarCategoriaModal(row.item.id)" class="botonImagen">
                  <img src="http://localhost:9001/images/sistema/editar.png" id="imagenAgregar" />
                </b-button>
                <b-button size="sm" @click="eliminarCategoriaModal(row.item.id)" class="botonImagen">
                  <img src="http://localhost:9001/images/sistema/eliminar.png" id="imagenAgregar"/>
                </b-button>
              </b-btn-group>
        </template>
      </b-table>
       <b-button pill class="boton" size="md" @click="agregarCategoriaModal()">¡Agregar!</b-button>
      </div>
       </b-container>   
    <router-view />
    <b-modal ref="modalAgregarCategoria" hide-footer title="Agregar categoría" class="modalCategoria">
      <form>
        <b-form-input class="campoForm" placeholder="Nombre de categoria" v-model="categoriaNueva.denominacion">          
        </b-form-input>
        <b-button pill class="boton" size="md" @click="agregarCategoria()">Guardar</b-button>
      </form>
    </b-modal>
    <b-modal ref="eliminarCategoriaModal" hide-footer title="Eliminar categoria">
      ¿Está seguro que desea eliminar la categoría {{categoriaEliminar.denominacion}}?
      <b-button pill class="boton" size="md" @click="eliminarCategoria()">Eliminar</b-button>
      <b-button pill class="boton2" size="md" @click="cancelar()">Cancelar</b-button>
    </b-modal>
    
    
 </div>  
</div>

</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import Service from "@/service/Service.js";
import Formatter from "@/utilidades/Formatters.js";
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
      costos:[],
      busqueda:'',
      formatter: new Formatter(),
      esProducto:true,
      estadoEliminado: false,
      categoriaNueva:{
        denominacion:"",
        baja:false
      },
      titulos: [
        { key: "denominacion", label: "" },
        { key: "accion", label: "" },
      ],
      categoriaEliminar:{},
    };
  },
  methods: {
    
    nuevoManufacturado() {
      this.$router.push({ path: "/modificarManufacturado/" + undefined})
    },

    userVerifica(){
        this.user=JSON.parse(sessionStorage.getItem('user'));
        
        if(this.user.rol=="cocina"){
          this.userCocina=true;
        }else if(this.user.rol=="admin"){
          this.userCocina=false;
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
        if (this.userCocina === true) {
          this.tituloTabla = [
            {key:"denominacion", label:"Denominación"},
            {key:"categoria", label:"Categoría"},
            {key:"stock", label:"Stock"},
            {key:"tiempo", label:"Tiempo"}
          ]
        } else {
          this.tituloTabla = [
            {key:"denominacion", label:"Denominación"},
            {key:"costo", label:"Costo"},
            {key:"precio", label:"Precio"},
            {key:"categoria", label:"Categoría"},
            {key:"stock", label:"Stock"},
          ];
        }
        this.obtenerCostos();
      });
        this.verificaStock();
    },
    
    agregarCostos(){
      this.manufacturadosData.forEach((manufacturado, i) =>
        this.manufacturadosData[i].costo = this.formatter.formatMoney(this.costos[i])
      );
    },
    async getCategorias(){
      await this.service.getAll("rubroManufacturado").then(data => {
      this.categoriasData = data;
      })
    
    },
     async obtenerCostos(){
      let idsManufStr = this.generarStringIds();
      await axios.get("http://localhost:9001/buensabor/manufacturado/costos", { 
        params : {
          "idsManufacturadosStr" : idsManufStr,
          }
      }).then(response => {
        this.costos = response.data; 
        this.agregarCostos();
      });
    },
  
    generarStringIds(){
      let idManuf = [];
      this.manufacturadosData.forEach(manufacturado => idManuf.push(manufacturado.id));
      let idsManufStr = idManuf.join(",");
      return idsManufStr;
    },

    cambiarAProductos(){
      this.esProducto=true;
    },
    cambiarACategorias(){
      this.esProducto=false;
    },

    verificaStock() {
      var clase;
      if (this.stock === false) {
        clase = document.getElementById("stockColor");
        
        clase.style.backgroundColor = "#ED3247";
      } else {
        clase = document.getElementById("stockColor");
        clase.style.backgroundColor = "#8BC34A";
      }
    },

    agregarCategoriaModal(id){      
      if(id==undefined){
         this.categoriaNueva.denominacion="";
      }else{
        this.categoriasData.forEach(categoria => {
          if(categoria.id==id){
            this.categoriaNueva = categoria;
          }
        })
      }
      this.$refs["modalAgregarCategoria"].show();
      
   },

   eliminarCategoriaModal(id){
     this.categoriasData.forEach(categoria => {
          if(categoria.id==id){
            this.categoriaEliminar = categoria;
          }
        })
     this.$refs["eliminarCategoriaModal"].show();
    
   },

    async eliminarCategoria(){
      await this.service
        .delete("rubroManufacturado", this.categoriaEliminar.id)
        .then(data =>{
          this.categoriaEliminar =data;
          this.$bvToast.toast(`Categoría eliminada`, {        
          autoHideDelay: 5000,
          toaster:'b-toaster-top-center',
          solid: true,
        });
        this.$refs["eliminarCategoriaModal"].hide();
        this.getCategorias();
        }
        )      
    },
     

   cancelar(){
     this.$refs["eliminarCategoriaModal"].hide();
   },

   async agregarCategoria(){
     console.log(this.categoriaNueva);
      if(this.categoriaNueva!=""){
         await this.service.save("rubroManufacturado",this.categoriaNueva).then(data =>{
          this.categoriaNueva = data;
          this.$bvToast.toast(`Categoría añadida con éxito`, {        
          autoHideDelay: 5000,
          toaster:'b-toaster-top-center',
          solid: true,
        });
        this.categoriaNueva={};
        this.$refs["modalAgregarCategoria"].hide();
        this.getCategorias();
        console.log(this.categoriaNueva)

      },)
       
    }else{
       this.$bvToast.toast(`El campo de categoría no puede estar vacio`, {        
          autoHideDelay: 5000,
          toaster:'b-toaster-top-center',
          solid: true,
      })
     
    }
   },
  },
  computed: {
    rows() {
      return this.manufacturadosData.length;
    }
   
  },
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

.modal-body{
  padding: 30px;
  min-height: 30px;
  text-align: center;
}
.modal-body .campoForm{
    margin-left: 0px;
    justify-content: space-around;
    display: flex;
  }

.modal-body .boton{
  margin-top: 30px;
  margin-bottom: 30px;
  float:right;
}

.modal-body .boton2{
  float:right;
  margin-bottom: 30px;
   margin-top: 30px;
}

.selectCategorias {
  border: solid 1px;
  border-color: lightgray;
  width: 200px;
  margin-bottom: 20px;
}
.hrefManu {
  float: left;
  color: black;
  margin-bottom: 15px;
  background-color: transparent;
  border: none;
}

.hrefManu:hover {  
  text-decoration:underline;
  color: #e7541e;
 background-color: transparent;
}
.hrefManu:active {  
  background-color: transparent;
  color: #e7541e;
   
}
.hrefManu:not(:disabled) {  
  background-color: transparent;
  color: #e7541e; 
}

.hrefManu:focus {  
  text-decoration:underline;
  color: #e7541e;
  font-weight: 700;
 background-color: transparent;
}

#tablaCategoriaManufacturado{
  border:0px !important;
  border-bottom: 1px solid #151515 !important;

}
</style>