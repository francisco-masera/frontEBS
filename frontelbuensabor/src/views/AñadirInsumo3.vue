<template>
  <div>
    <div class="header"></div>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Añadir insumo</h1>
      <h2>Categorías</h2>
         <div
          v-for="cate in categoriasData"
          :key="cate.id"
          style="margin-top:15px"
        >
         <b-button pill class="boton" size="md" id="botonCategiria" @click="guardaCategoria(cate.id)">{{cate.denominacion}}</b-button>  
        </div>

        <div class="botonesInsu">
            <b-button pill class="boton" size="md">Cancelar</b-button> 
            <b-button pill class="botonDerecha" size="md" @click="modalGuardaInsumo()">Guardar</b-button>
        </div>
    </b-container>
    <div>
  

  <b-modal ref="modal" hide-footer hide-header centered title>
    <p class="modalTitulo">Insumo agregado con éxito!</p>
     <p class="botonModal"><b-button pill size="md" class="boton" @click="retornaAlStock()">Aceptar</b-button></p> 
  </b-modal>
</div>
    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Service from "@/service/Service.js";
export default {
  mounted() {
   
   this.getCategorias();
   
  },
  components: {
    menuLateral: MenuLateral
  },
  data() {
    return {
     
       
    categoriasData: [],
  
     stock:{
     "actual":0,
     "maximo":0,
     "minimo":0 
     },

     stockRetornado:{
     "id":0,
     "actual":0,
     "maximo":0,
     "minimo":0 
     },

    insumo:{
      "baja":false,
      "denominacion":'',
      "esExtra":false,
      "esInsumo":false,
      "unidadMedida":'',
      "stock": {
      "id": 0,
       },
      "rubroInsumo":{
        "id":0
      }
      }, 

     service: new Service(),  
      rubroId:"",
    };
  },
  methods: {
   async modalGuardaInsumo() {
     this.stock.actual = 0;
     this.stock.maximo = localStorage.getItem("stockMaxInsumo");
     this.stock.minimo = localStorage.getItem("stockMinimo");
     await this.service.save("stock",this.stock).then(data => {
     this.stockRetornado = data;
    
     
      });
     this.insumo.baja = 0;
     this.insumo.denominacion = localStorage.getItem("nombreInsumo");
     if(localStorage.getItem("checkbox-2")==='true'){
       this.insumo.esExtra = true;
     }else{
       this.insumo.esExtra = false;
     }
     if(localStorage.getItem("checkbox-1")==='true'){
      this.insumo.esInsumo = false; 
     }else{
       this.insumo.esInsumo = true; 
     }
     this.insumo.unidadMedida = localStorage.getItem("selectUnidad");
     this.insumo.stock.id = this.stockRetornado.id;
     this.insumo.rubroInsumo.id = this.rubroId; 
     await this.service.save("insumo",this.insumo).then(data =>{
     this.insumo = data;
     })
     this.$refs['modal'].show();

   },

   guardaCategoria(id){
      this.rubroId=id;
   },
        
      retornaAlStock(){
         window.location.href = "/stockInsumos/";
      },
      
     

      guardaDatos(){
         let botonCategiria = document.getElementById("botonCategoria");
         window.localStorage.setItem("botonCategoria", botonCategiria);
         console.log(localStorage.getItem("botonCategoria"));
      },

     async getCategorias(){
       await this.service.getAll("rubroInsumo").then(data => {
       this.categoriasData = data; 
      
      });
       console.log(this.categoriasData);
   
  },
  }
  
};
</script>
<style>
.header {
  background-color: blue;
  width: 100%;
  top: 0;
  min-height: 200px;
}
.botonesInsu{
   margin-top: 280px; 
   margin-left: 450px;
   display: inline-flex;
  
}
.botonDerecha{
  
  background-color: #e7511e;
  width: 105px;
  height: 30px;
    float: right;
}
.botonModal{
 
  width: 105px;
  height: 30px; 
  text-align: center;
  margin-left: 180px;
 
 
}
.modalTitulo{
    font-size: 20px;
    text-align: center;
   
}

</style>