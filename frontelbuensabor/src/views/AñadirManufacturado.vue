<template>
  <div>
   <cabecera></cabecera>
  <div id="nav"><menuLateral></menuLateral>
  </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1 id="titulo" v-if="esNuevo">Añadir producto</h1>
      <h1 id="titulo" v-else>Modificar producto</h1>
      <div id="paso1">
      <h2>Información básica</h2>
      <b-form id="form1">
          <div class="lineaForm">
            <b-form-group>
              <label class="labelForm">
                Nombre *
              </label>
              <b-form-input 
              class="campoForm" 
              v-model.lazy="form1.denominacion" 
              id="nombreInsumo" 
              :state="!$v.form1.denominacion.$invalid"
              placeholder="Ingrese un nombre"/>
              <br/>
              <b-form-invalid-feedback>
                <br/> Este campo es obligatorio.
              </b-form-invalid-feedback>
            </b-form-group>
            </div>
           
            <div class="lineaForm" id="lineaDescripcion">
                <b-form-group>
                  <label class="labelForm">
                    Descripción
                  </label>
                  <b-form-textarea
                  id="descripcion" 
                  class="campoForm" 
                  v-model.lazy="form1.descripcion" 
                  :state="!$v.form1.descripcion.$invalid"
                  placeholder="Ingrese una descripción"
                  rows="3" 
                  max-rows="6"
                  />*
                <b-form-invalid-feedback>
                  <br/> Este campo es obligatorio.
                </b-form-invalid-feedback>
                </b-form-group>
            </div>
             <br>
            <div class="lineaForm">
              <b-form-group>
                <label class="labelForm">
                  Imagen *
                </label>
                <b-form-file
                  class="campoForm"
                  id="imagen"
                  v-model.lazy="form1.imagen"
                  :state="!$v.form1.imagen.$invalid"/>
                   <b-form-invalid-feedback>
                  <br/> Este campo es obligatorio.
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
            
            <div class="lineaForm">
              <b-form-group id="contenedorCheck">
                <b-form-checkbox
                  id="checkbox-1"
                  name="checkbox-1"
                  value="celiaco">
                    Apto para celíacos
                </b-form-checkbox>
                <b-form-checkbox 
                  id="checkbox-2"
                  name="checkbox-1"
                  value="vegano">
                  Producto vegano
                </b-form-checkbox>
                <b-form-checkbox
                  id="checkbox-3"
                  name="checkbox-1"
                  value="vegetariano"
                  v-model="manufacturado.vegetariano">
                  Producto vegetariano
                </b-form-checkbox>
              </b-form-group>
            </div>
            <div class="lineaForm">
                <h4 id="datos">*Datos necesarios</h4>
            </div>
            <div class="lineaFormDerecha" style="float:right">
                <b-button pill class="boton2" size="md">Cancelar</b-button>
                <b-button pill @click.prevent="onSubmit1" class="boton" size="md">Siguiente</b-button>
            </div>
      </b-form>
      </div>

      <div id="paso2">
      <h2>Composición</h2>
      <b-form>
          <div class="lineaForm">
                <label class="labelForm">
                  Ingrediente
                </label>
                <b-form-input  class="campoForm" id="ingrediente" v-model="ingrediente">                    
                </b-form-input>*                
            </div>
            <div class="lineaForm">
                <label class="labelForm">
                  Cantidad
                </label>
                <b-form-input  class="campoForm" id="cantidad" v-model="cantidad">                    
                </b-form-input>  
                <label class="labelForm">
                  Unidad de medida
                </label>
                <b-form-select class="campoForm"  id="unidad"  v-model="unidadMedida" :options="opcionesUnidad" size="sm" ></b-form-select>
                 <b-button pill class="botonAñadirInsumo" @click="buscarIngrediente" size="md">Añadir</b-button>  
            </div>
            <div class="lineaForm">
            <b-table striped hover size="sm" :items="manufacturado.ingredientes"></b-table>
            </div>
             <div class="lineaForm">
                <label class="labelForm">
                  Tiempo en cocina
                </label>
                <b-form-input  class="campoForm" id="tiempoCocina" v-model="manufacturado.tiempo">                    
                </b-form-input>             
            </div>
              <div class="lineaFormDerecha" style="float:right">
                <b-button pill class="boton2" size="md" @click.prevent="siguiente2">Cancelar</b-button>
                <b-button pill class="boton" size="md" @click.prevent="siguiente2">Siguiente</b-button>
            </div>
           
      </b-form>
      </div>

     <div id="paso3">
      <h2>Revisión</h2>
      <b-form>
          <div>
        <div>
            <img :src="'@/assets/images/productos/' + manufacturado.imagen" class="imagenProducto"/>
        <h3>
          {{manufacturado.denominacion}}
         <b-button size="sm" @click="modificarInsumo()" class="botonImagen">
            <img src="@/assets/images/sistema/editar.png" id="imagenAgregar" />
          </b-button>
         </h3>
        
         <div id="descripcionInsumo">
          <h2>Descripción</h2>
          <p>{{ manufacturado.descripcion }}</p>
        </div>
         <div class="infoProductoVenta">
            <b-card header="Tiempo" class="tarjetaInfo">
              <b-card-text>
                {{ manufacturado.tiempo}} 
              </b-card-text>
          </b-card>
         </div>
         <div class="infoIngredientes">
          <h2>Ingredientes</h2>   
          <li
                v-for="(ingrediente, index) in ingredientes"
                :key="index"
              >
                {{ ingrediente.denominacion }} {{ ingrediente.cantidad }} {{ ingrediente.unidadMedida }}
              </li>
         </div>
      </div>   
      </div>   
            <div class="lineaFormDerecha">
                <b-button pill class="boton2" size="md">Cancelar</b-button>
                <b-button pill class="boton" size="md">Guardar</b-button>
            </div>
      </b-form>
      </div>
      
    </b-container>

    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Vue from 'vue';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [validationMixin],
  mounted() {
    this.userVerifica();
    this.esNuevo = this.manufacturado != undefined ? this.esNuevo = false : "";  
    this.manufacturado = JSON.parse(localStorage.getItem("manufacturado"));
    this.recetas = JSON.parse(localStorage.getItem("recetas"));
    this.completarCamposForm1();
  },
  props: {
    user:{},
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },

  data() {
    return {
      checkBoxes: {
        esVegano : true,
        esVegtariano : false,
        esAptoCeliacos : false,
      },
      insumosData: [],
      manufacturado:[],
      recetas : [],
      ingredientes: [],
      esNuevo:true,
      ingrediente:"",
      cantidad:0,
      unidadMedida:"",
      userData: this.$props.user,
      form1: {
        denominacion: "",
        descripcion: "",
        imagen: [],
      },
      opcionesUnidad:[
        {value:null, text:""},
        {value:"kg", text:"kg"},
        {value:"g", text:"g"},
        {value:"l", text:"l"},
        {value:"ml", text:"ml"},
        {value:"u", text:"u"}
      ],
    };
  },

  methods: {
    
    completarCamposForm1(){
      this.form1.denominacion = this.manufacturado.denominacion;
      this.form1.descripcion = this.manufacturado.descripcion;
    },

    siguiente1(){
        document.getElementById("paso1").style.display = "none";
        document.getElementById("paso2").style.display = "block";     
    },

    siguiente2(){
      document.getElementById("paso2").style.display = "none";
      document.getElementById("paso3").style.display = "block";
    },

    buscarIngrediente(){

    },

    userVerifica(){
      this.userData = JSON.parse(sessionStorage.getItem('user'));
      this.userData == undefined  || (this.userData.rol != 'admin' && this.userData.rol != 'cocina') ? 
        this.$router.push({ name: 'Home'}) : "";
    }, 

    onSubmit1() {
      this.$v.$touch();
      if (this.$v.form1.$anyError) {
        return;
      }
      this.siguiente1();
    },

  },

  validations: {
    form1: {
      denominacion: {
        required
      },
      descripcion: {
        required
      },
      imagen : {
        required
      }
    }
  }
};
</script>
<style>


#titulo{
    line-height: 1.2rem;
    color: #151515;
}
#nombreInsumo{
    margin-top: -5px;
    width: 85%;
}
#cantidad{
    margin-top: -5px;
    width: 20%;
    margin-right: 30px;
}

#unidad{
    margin-top: -5px;
    width: 10%;
    margin-right: 20px;
}
#unidadMedida{
    margin-top: -5px;
    width: 40%;
    margin-right: 30px;

}

.lineaForm{
   width: 100%;
    margin-top: 20px;
    min-height: 40px;
}
.lineaFormDerecha{
  margin-top: 50px;
  float:right;
  margin-right: 0px;
  margin-bottom: 50px;
}

#datos{
    float:right;
}

#paso1{
  display:block;
}
#paso2{
  display:none;
}
#paso3{
  display:none;
}
#ingrediente{
    margin-top: -5px;
    width: 65%;
}

#lineaDescripcion{
  min-height: 80px;
}

#descripcion{
 float:right;
  width: 80%;
  margin-left: 10px;
  border:1px solid #ced4da;
}

#imagen__BV_file_outer_{
  margin-top: -5px;
  width: 88%;
  float:right;
}

.botonAñadirInsumo{
  background-color: transparent;
  color:#e7511e;
  border:none;
}

.botonAñadirInsumo:hover{
  background-color: #e7511e;
  color:#FFFFFF;
  border:none;
}

.botonAñadirInsumo:active{
  background-color: #e7511e;
  color:#FFFFFF;
  border:none;
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

@media screen and (max-width: 604px) {
  .lineaForm{
    min-height: 80px;
  }

  #imagen__BV_file_outer_{
    width: 80%;
  }

  #unidad{
    width: 70px;
  }

  #cantidad{
    width: 70px;
  }

  .botonAñadirInsumo{
    float:left;
  }

}
</style>