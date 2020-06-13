<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Sugerencias del chef</h1>
      <h1>Detalle producto</h1>
     
    
        <div>
            <img :src="'@/assets/images/productos/' + sugerenciaEncontrada.imagen" class="imagenProducto"/>
        <h3>
          {{sugerenciaEncontrada.denominación}}
         <b-button size="sm" @click="modificarInsumo()" class="botonImagen">
            <img src="@/assets/images/sistema/editar.png" id="imagenAgregar" />
          </b-button>
         </h3>
         <div class="stock">
          <b-badge class="categoria">{{ sugerenciaEncontrada.categoria }}</b-badge>
        </div>
         <div id="descripcionInsumo">
          <h2>Descripción</h2>
          <p>{{ sugerenciaEncontrada.descripcion }}</p>
        </div>
         <div class="infoProductoVenta">
     
       <b-card header="Costo" class="tarjetaInfo">
            <b-card-text>{{ sugerenciaEncontrada.costo }} 
            </b-card-text>
       </b-card>
     <b-card header="Tiempo" class="tarjetaInfo">
            <b-card-text>{{ sugerenciaEncontrada.tiempo }} 
            </b-card-text>
            
          </b-card>
         </div>
         <div class="infoIngredientes">
          <h2>Ingredientes</h2>   
          <li
                v-for="(ingrediente, index) in sugerenciaEncontrada.ingredientes"
                :key="index"
              >
                {{ ingrediente }}
              </li>
         </div>
         <div class="botonesSugerencia">
               <b-button pill class="boton" size="md">Aprobar </b-button>
                <b-button pill class="boton" size="md">Denegar </b-button>
         </div>
      </div>   
  
    
   
    </b-container>

    <router-view />
    <b-modal ref="modal" hide-footer title="Eliminar insumo" class="modalEliminar">
      <form>
        <b-form-input class="contraseñaForm" placeholder="Contraseña" >          
        </b-form-input>
        <b-button pill class="boton" size="md">Eliminar </b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
export default {
  mounted() {
    this.getSugerenciaXid();
   
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {
     
      sugerenciaEncontrada: [],
     
     
    };
  },

  methods: {
    async getSugerenciaXid() {
      var parametroId = parseInt(this.$route.params.id, 10);
      const res = await fetch("/sugerenciaChef.json");
      const resJson = await res.json();

      this.sugerenciaEncontrada = await resJson.sugerencias.find(
        (sugerencia) => sugerencia.id === parametroId);
        console.log(this.sugerenciaEncontrada);
       

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
.botonesSugerencia{
    float: right;
}
</style>