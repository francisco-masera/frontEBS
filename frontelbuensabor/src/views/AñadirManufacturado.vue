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
                id="denominacionManufacturado" 
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
              id="descripcionManufacturado" 
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
                v-model="manufacturado.aptoCeliaco">
                  Apto para celíacos
              </b-form-checkbox>
              <b-form-checkbox 
                id="checkbox-2"
                name="checkbox-1"
                v-model="manufacturado.vegano">
                Producto vegano
              </b-form-checkbox>
              <b-form-checkbox
                id="checkbox-3"
                name="checkbox-1"
                v-model="manufacturado.vegetariano">
                Producto vegetariano
              </b-form-checkbox>
            </b-form-group>
          </div>
          <div class="lineaForm">
              <h4 id="datos">*Datos necesarios</h4>
          </div>
          <div class="lineaFormDerecha" style="float:right">
              <b-button pill class="boton2" size="md" @click="volver">Cancelar</b-button>
              <b-button pill class="boton" size="md" @click.prevent="onSubmit1">Siguiente</b-button>
          </div>
        </b-form>
      </div>

      <div id="paso2">
        <h2>Composición</h2>
        <b-form>
          <div class="lineaForm">
            <b-table 
              hover responsive selectable
              select-mode="multi"
              :items="insumosData" 
              :fields="camposTablaInsumos" 
              :outlined="true" 
              :per-page="perPage" 
              :current-page="currentPage" 
              :borderless="true"
              @row-selected="agregarInsumo"
              id="tablaInsumos" 
              class="tabla">
               <template v-slot:table-colgroup="scope">
                <col
                  v-for="field in scope.fields"
                  :key="field.idInsumo"
                  hidden
                  id="idInsumo"
                >
              </template>
              <template v-slot:cell(denominacion)="row">
                {{ row.item.denominacion }}
              </template>
              <template v-slot:cell(unidadMedida)>
               <b-dropdown id="listaUnidades" text="Unidad de medida" class="m-2">
                  <b-dropdown-header>
                    Elija una unidad de medida
                  </b-dropdown-header>
                  <b-dropdown-item v-for="opcion in opcionesUnidad" :key="opcion.key">
                    {{opcion.text}}
                  </b-dropdown-item>
               </b-dropdown>
              </template>
               <template v-slot:cell(cantidad)>
                  <b-form-input type="number" id="cantidadInsumo" step="0.01" min="0.00"/>
              </template>
            </b-table>
          </div>
          <div class="lineaForm">
            <label class="labelForm">
              Tiempo en cocina
            </label>
            <b-form-input type="number" class="campoForm" id="tiempoCocina" v-model="manufacturado.tiempoCocina">                    
            </b-form-input>             
          </div>
          <div class="lineaFormDerecha" style="float:right">
            <b-button pill class="boton2" size="md" @click="volver">Cancelar</b-button>
            <b-button pill class="boton" size="md" @click.prevent="onSubmit2">Siguiente</b-button>
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
                {{ manufacturado.denominacion }}
                <b-button size="sm" id="btn-editar" class="botonImagen">
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
                  {{ manufacturado.tiempoCocina }} min 
                </b-card-text>
                </b-card>
              </div>
              <div class="infoIngredientes">
                <h2>Ingredientes</h2>   
                <li
                  v-for="(ingrediente, index) in recetaNueva"
                  :key="index"
                >
                  {{ ingrediente.denominacion }} {{ ingrediente.cantidadInsumo }} {{ ingrediente.unidadMedida }}
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

import MenuLateral from '@/components/MenuLateral.vue';
import Header from "@/components/Header.vue";
import Vue from 'vue';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import Service from '@/service/Service.js';
import Formatter from '@/utilidades/Formatters.js';
export default {
  mixins: [validationMixin],
  mounted() {
    this.userVerifica();
    this.esNuevo = this.manufacturado != undefined ? this.esNuevo = false : "";  
    this.manufacturado = JSON.parse(sessionStorage.getItem("manufacturado"));
    this.recetas = JSON.parse(sessionStorage.getItem("recetas"));
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
      service: new Service(), 
      formatter: new Formatter(),
      form1: {
        denominacion: "",
        descripcion: "",
        imagen: [],
      },

      opcionesUnidad: [
        {key: 1, value: "Kg", text: "Kilogramos"},
        {key: 2, value: "g", text: "Gramos"},
        {key: 3, value: "l", text: "Litros"},
        {key: 4, value: "ml", text: "Mililitros"},
        {key: 5, value: "u", text: "Unidades"}
      ],

      ingredientes: [],
      insumosData: [],
      manufacturado: [],
      recetas: [],
      recetaNueva: [],
      camposTablaInsumos: [
        {key: 'denominacion', label: 'Denominación'},
        {key: 'unidadMedida', label: 'Undidad de Medida'},
        {key: 'cantidad', label: 'Cantidad'}
      ],

      currentPage: 1,  
      esNuevo: true,
      ingrediente: "",
      perPage: 7,
      unidadMedida: "",
      userData: this.$props.user
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
        this.getInsumos();  
    },

    siguiente2(){
      document.getElementById("paso2").style.display = "none";
      document.getElementById("paso3").style.display = "block";
    },

    async getInsumos() {
      await this.service.getAll("insumo").then(data=>{
        this.insumosData = data;
      }); 
    },

    agregarInsumo(items){
      this.recetaNueva = items;
      console.log(items.unidadMedida);
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
      this.manufacturado.denominacion = document.getElementById("denominacionManufacturado").value;
      this.manufacturado.descripcion = document.getElementById("descripcionManufacturado").value;
      this.manufacturado.imagen = document.getElementById("imagen").files[0];
      this.manufacturado.aptoCeliaco = document.getElementById("checkbox-1").checked;
      const vegano = document.getElementById("checkbox-2").checked;
      const vegetariano = vegano ? "true" : document.getElementById("checkbox-3").checked; 
      this.manufacturado.vegano = vegano;
      this.manufacturado.vegetariano = vegetariano;
      sessionStorage.setItem("manufacturado", this.manufacturado);
      this.siguiente1();
    },
  
    onSubmit2(){
      const recetaNueva = this.recetaNueva.length > 0 
      ? this.recetaNueva : 
      "No se han seleccionado ingredientes";
      sessionStorage.setItem("recetaNueva", recetaNueva);
      this.manufacturado.tiempoCocina = document.getElementById("tiempoCocina").value;
      sessionStorage.setItem("manufacturado", this.manufacturado);
      this.siguiente2();
    },
    
    volver(){
      sessionStorage.removeItem("recetas");
      sessionStorage.removeItem("manufacturado");
      this.$router.push({ path: "/catalogoManu/"});
    },
  },
  
  computed: {
    rows() {
      return this.insumosData.length;
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

#btn-editar{
  float: none;
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