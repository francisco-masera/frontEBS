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
          v-for="cate in categorias"
          :key="cate.id"
          style="margin-top:15px"
        >
         <b-button pill class="boton" size="md">{{cate.nombre}}</b-button>  
        </div>

        <div class="botonesInsu">
            <b-button pill class="boton" size="md">Cancelar</b-button> 
            <b-button pill class="botonDerecha" size="md" @click="modalGuardaInsumo()">Guardar</b-button>
        </div>
    </b-container>
    <div>
  

  <b-modal ref="modal" hide-footer hide-header centered title>
    <p class="modalTitulo">Insumo agregado con éxito!</p>
     <p class="botonModal"><b-button pill size="md" class="boton">Aceptar</b-button></p> 
  </b-modal>
</div>
    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
export default {
  mounted() {
    this.getCategorias();
  },
  components: {
    menuLateral: MenuLateral
  },
  data() {
    return {
     
      
     
    categorias:[
        {id:1,nombre:"Bebidas",subcategoria:["Gasificada","Con alcohol","Sin alcohol"]},
        {id:2,nombre:"Almacen",subcategoria:["Postres","Embutidos"]},
        {id:3,nombre:"Panificados",subcategoria:["Harinas","Panes"]}

    ]
       
      
    };
  },
  methods: {
   modalGuardaInsumo() {
         this.$refs['modal'].show()   
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