<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Detalle producto manufacturado</h1>
     
      <div v-if="userCocina">
        <div>
            <img :src="'@/assets/images/productos/' + manufacturadoEncontrado.imagen" class="imagenProducto"/>
        <h3>
          {{manufacturadoEncontrado.denominación}}
         <b-button size="sm" @click="modificarInsumo()" class="botonImagen">
            <img src="@/assets/images/sistema/editar.png" id="imagenAgregar" />
          </b-button>
         </h3>
         <div class="stock">
          <div id="stockColor" style="background-color:#ED3247"></div>
          Stock {{ stock }}
          <b-badge class="categoria">{{ manufacturadoEncontrado.categoría }}</b-badge>
        </div>
         <div id="descripcionInsumo">
          <h2>Descripción</h2>
          <p>{{ manufacturadoEncontrado.descripcion }}</p>
        </div>
         <div class="infoProductoVenta">
     <b-card header="Tiempo" class="tarjetaInfo">
            <b-card-text>{{ manufacturadoEncontrado.tiempo }} 
            </b-card-text>
          </b-card>
         </div>
         <div class="infoIngredientes">
          <h2>Ingredientes</h2>   
          <li
                v-for="(ingrediente, index) in manufacturadoEncontrado.ingredientes"
                :key="index"
              >
                {{ ingrediente }}
              </li>
         </div>
      </div>   
      </div>   
      <div v-else> 
      <div>
            <img :src="'@/assets/images/productos/' + manufacturadoEncontrado.imagen" class="imagenProducto"/>
        <h3>
          {{manufacturadoEncontrado.denominación}}
         <b-button size="sm" @click="modificarInsumo()" class="botonImagen">
            <img src="@/assets/images/sistema/editar.png" id="imagenAgregar" />
          </b-button>
          <b-button size="sm" @click="openModalEliminar()" class="botonImagen">
            <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar"/>
          </b-button>
        </h3>
         <div class="stock">
          <div id="stockColor" style="background-color:#ED3247"></div>
          Stock {{ stock }}
          <b-badge class="categoria">{{ manufacturadoEncontrado.categoría }}</b-badge>
        </div>
         <div id="descripcionInsumo">
          <h2>Descripción</h2>
          <p>{{ manufacturadoEncontrado.descripcion }}</p>
        </div>
         <div class="infoProductoVenta">
          <b-card header="Costo" class="tarjetaInfo">
            <b-card-text>{{ manufacturadoEncontrado.costo }}
            </b-card-text>
          </b-card>
          <b-card header="Precio venta" class="tarjetaInfo">
            <b-card-text >{{ manufacturadoEncontrado.precio }}
            </b-card-text>
          </b-card>
          <b-card header="Tiempo" class="tarjetaInfo">
            <b-card-text>{{ manufacturadoEncontrado.tiempo }} 
            </b-card-text>
          </b-card>
         </div>
         <div class="infoIngredientes">
          <h2>Ingredientes</h2>   
          <li
                v-for="(ingrediente, index) in manufacturadoEncontrado.ingredientes"
                :key="index"
              >
                {{ ingrediente }}
              </li>
         </div>
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
    this.getManufacturadoXid();
   
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {
     
      manufacturadoEncontrado: [],
      userCocina:false
     
    };
  },

  methods: {
    async getManufacturadoXid() {
      var parametroId = parseInt(this.$route.params.id, 10);
      const res = await fetch("/manufacturadosAdmin.json");
      const resJson = await res.json();

      this.manufacturadoEncontrado = await resJson.manufacturados.find(
        (manufacturado) => manufacturado.id === parametroId);
        console.log(this.manufacturadoEncontrado);
          this.verificaStock();

    },
     verificaStock() {
      var clase;
      if (
        parseInt(this.manufacturadoEncontrado.stock, 10)==0){
        this.stock = "insuficiente";
        clase = document.getElementById("stockColor");
        console.log(clase);
        clase.style.backgroundColor = "#ED3247";
        console.log(clase);
        console.log("insuficiente");
      } else{
        this.stock = "suficiente";
        clase = document.getElementById("stockColor");

        clase.style.backgroundColor = "#8BC34A";
        console.log("suficiente");
      }
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
</style>
