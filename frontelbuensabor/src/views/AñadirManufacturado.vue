<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
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
              <label class="labelForm">Nombre *</label>
              <b-form-input
                class="campoForm"
                v-model.lazy="form1.denominacion"
                id="denominacionManufacturado"
                :state="!$v.form1.denominacion.$invalid"
                placeholder="Ingrese un nombre"
              />
              <br />
              <b-form-invalid-feedback>
                <br />Este campo es obligatorio.
                <br />Recuerde ingresar sólo letras.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="lineaForm" id="lineaDescripcion">
            <b-form-group>
              <label class="labelForm">Descripción</label>
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
                <br />Este campo es obligatorio.
                <br />Recuerde ingresar sólo letras.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <br />
          <div class="lineaForm">
            <b-form-group id="contenedorCheck">
              <b-form-checkbox
                id="checkbox-1"
                name="checkbox-1"
                v-model="manufacturado.aptoCeliaco"
              >Apto para celíacos</b-form-checkbox>
              <b-form-checkbox
                id="checkbox-2"
                name="checkbox-1"
                v-model="manufacturado.vegano"
              >Producto vegano</b-form-checkbox>
              <b-form-checkbox
                id="checkbox-3"
                name="checkbox-1"
                v-model="manufacturado.vegetariano"
              >Producto vegetariano</b-form-checkbox>
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

      <div id="paso2" style="display:none">
        <h2>Composición</h2>
        <b-form id="form2">
          <div class="lineaForm">
            <b-table
              hover
              responsive="sm"
              fixed
              :items="insumosData"
              :fields="camposTablaInsumos"
              :outlined="true"
              :per-page="perPage"
              :current-page="currentPage"
              :borderless="true"
              id="tablaInsumos"
              class="tabla"
            >
              <template v-slot:cell(seleccionado)="row">
                <b-form-group>
                  <b-form-checkbox
                    :key="row.item.idInsumo"
                    v-model="row.item.clicked"
                    @change="
                      cambiarEstadoIngrediente($event, row.item.idInsumo)
                    "
                  ></b-form-checkbox>
                </b-form-group>
              </template>
              <template v-slot:cell(denominacion)="row">{{ row.item.denominacion }}</template>
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
          <b-toast id="toast-insumos" variant="warning" solid>
            <template v-slot:toast-title>
              <div class="d-flex flex-grow-1 align-items-baseline">
                <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                <strong class="mr-auto">¡Atención!</strong>
              </div>
            </template>
            Marque al menos un elemento
            <br />de la tabla para continuar.
          </b-toast>
          <div class="lineaForm">
            <b-form-group>
              <label class="labelForm">Tiempo en cocina</label>
              <b-form-input
                type="number"
                class="campoForm"
                id="tiempoCocina"
                v-model.lazy="form2.tiempoCocina"
                :state="!$v.form2.tiempoCocina.$invalid"
              ></b-form-input>
              <b-form-invalid-feedback>
                <br />Este campo es obligatorio
                <br />y sólo admite números mayores a cero
                <br />sin coma ni punto.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="lineaFormDerecha" style="float:right">
            <b-button pill class="boton2" size="md" @click="volver">Cancelar</b-button>
            <b-button pill class="boton" size="md" @click.prevent="onSubmit2">Siguiente</b-button>
          </div>
        </b-form>
      </div>

      <div id="paso3">
        <b-form id="form3">
          <div class="lineaForm">
            <b-table hover responsive="sm" fixed :fields="camposTablaDetalle" :items="ingredientes">
              <template v-slot:cell(ingrediente)="row">{{ row.item.denominacion }}</template>
              <template slot="unidadMedida" slot-scope="row">
                <b-form-group>
                  <b-form-input v-model="row.item.unidadMedida" readonly />
                </b-form-group>
              </template>
              <template v-slot:cell(cantidad)="row">
                <cantidad
                  name="cantidadesInput"
                  :idInsumo="row.item.idInsumo"
                  @kpress="onDataInput($event, row.item.idInsumo, '')"
                ></cantidad>
              </template>
            </b-table>
            <b-button pill class="boton2" size="md" @click="volver">Cancelar</b-button>
            <b-button pill class="boton" size="md" @click.prevent="onSubmit3">Siguiente</b-button>
          </div>
          <b-toast id="toast-datos" variant="warning" solid>
            <template v-slot:toast-title>
              <div class="d-flex flex-grow-1 align-items-baseline">
                <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                <strong class="mr-auto">¡Atención!</strong>
              </div>
            </template>
            Todos los datos de esta página son
            <br />obligatorios para continuar.
            <br />Recuerde: Las cantidades deben ser sólo números.
            <br />Verifique los datos.
          </b-toast>
        </b-form>
      </div>

      <br />
      <div id="revision" style="display:none">
        <h2>Revisión</h2>
        <br />
        <b-form id="formRevision">
          <div>
            <h3>
              {{ manufacturado.denominacion }}
              <b-button size="sm" id="btn-editar" class="botonImagen">
                <img src="http://localhost:9001/images/sistema/editar.png" id="imagenAgregar" />
              </b-button>
            </h3>
            <div id="descripcionInsumo">
              <h2>Descripción</h2>
              <p>{{ manufacturado.descripcion }}</p>
            </div>
            <div class="infoProductoVenta">
              <b-card header="Tiempo" class="tarjetaInfo">
                <b-card-text>{{ manufacturado.tiempoCocina }} min</b-card-text>
              </b-card>
            </div>
            <div class="lineaForm">
              <b-form-group>
                <label class="labelForm">Imagen *</label>
                <b-form-file
                  class="campoForm"
                  id="imagen"
                  v-model.lazy="formRevision.imagen"
                  :state="!$v.formRevision.imagen.$invalid"
                />
                <b-form-invalid-feedback>
                  <br />Este campo es obligatorio.
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="infoIngredientes">
              <h2>Ingredientes</h2>
              <li id="listaIngredientes" v-for="(receta, index) in recetasNuevas" :key="index">
                {{ receta.insumo.denominacion }}
                {{ receta.cantidadInsumo }}
                {{ receta.insumo.unidadMedida }}
              </li>
            </div>
            <b-toast id="toast-img" variant="warning" solid>
              <template v-slot:toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                  <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                  <strong class="mr-auto">¡Atención!</strong>
                </div>
              </template>
              La imagen seleccionada no es válida.
            </b-toast>
            <div class="modalMedida">
              <b-modal ref="modal" hide-footer hide-header centered title>
                <p class="modalTitulo">¡Sugerencia agregada con éxito!</p>
                <p class="posicion">
                  <b-button pill size="md" class="botonModal" @click="retornaAlCatalogo()">Aceptar</b-button>
                </p>
              </b-modal>
            </div>
          </div>
          <div class="lineaFormDerecha">
            <b-button pill class="boton2" size="md" @click="volver">Cancelar</b-button>
            <b-button pill class="boton" size="md" @click.prevent="guardar">Guardar</b-button>
          </div>
        </b-form>
      </div>
    </b-container>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
Vue.use(Vuelidate);
import { required, numeric, integer } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { helpers } from "vuelidate/lib/validators";
import Vuelidate from "vuelidate";
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import DetalleCantidad from "@/components/DetalleCantidad.vue";
import Service from "@/service/Service.js";
import Formatter from "@/utilidades/Formatters.js";
import axios from "axios";

export default {
  mixins: [validationMixin],
  mounted() {
    this.verificarUsuario();
    this.esNuevo =
      this.$route.params.id != "undefined" ? !this.esNuevo : this.esNuevo;
  },
  props: {
    user: {},
  },
  components: {
    cabecera: Header,
    menuLateral: MenuLateral,
    cantidad: DetalleCantidad,
  },

  data() {
    return {
      service: new Service(),
      formatter: new Formatter(),
      form1: {
        denominacion: "",
        descripcion: "",
      },

      form2: {
        tiempoCocina: "",
      },

      formRevision: {
        imagen: [],
      },
      camposTablaInsumos: [
        { key: "seleccionado", label: "Seleccionar" },
        { key: "denominacion", label: "Denominación" },
      ],
      camposTablaDetalle: [
        { key: "ingrediente", label: "Ingrediente" },
        { key: "unidadMedida", label: "UnidadMedida" },
        { key: "cantidad", label: "Cantidad" },
      ],
      opcionesUnidad: [
        { value: null, text: "" },
        { value: "kg", text: "kg" },
        { value: "g", text: "g" },
        { value: "l", text: "l" },
        { value: "ml", text: "ml" },
        { value: "u", text: "u" },
      ],

      manufacturado: {},

      cantidades: [],
      ingredientes: [],
      insumosData: [],
      recetasNuevas: [],
      selected: [],

      currentPage: 1,
      esNuevo: true,
      perPage: 7,
      titulo: "",
      userData: this.$props.user,
    };
  },

  methods: {
    verificarUsuario() {
      this.userData = JSON.parse(sessionStorage.getItem("user"));
      this.userData == undefined || this.userData.rol != "cocina"
        ? this.$router.push({ name: "Home" })
        : "";
      this.$route.params.id !== "undefined" ? this.getManufacturadoXId() : "";
    },

    async getManufacturadoXId() {
      await this.service
        .getOne("manufacturado", this.$route.params.id)
        .then((data) => (this.manufacturado = data))
        .then(() =>
          this.$route.params.id != "undefined"
            ? this.completarCamposForm1()
            : ""
        );
    },

    completarCamposForm1() {
      this.form1.denominacion = this.manufacturado.denominacion;
      this.form1.descripcion = this.manufacturado.descripcion;
    },

    onSubmit1() {
      this.$v.$touch();
      if (this.$v.form1.$anyError) {
        return;
      }
      this.manufacturado.denominacion = document.getElementById(
        "denominacionManufacturado"
      ).value;
      this.manufacturado.descripcion = document.getElementById(
        "descripcionManufacturado"
      ).value;
      this.manufacturado.aptoCeliaco = document.getElementById(
        "checkbox-1"
      ).checked;
      const vegano = document.getElementById("checkbox-2").checked;
      const vegetariano = vegano
        ? true
        : document.getElementById("checkbox-3").checked;
      this.manufacturado.vegano = vegano;
      this.manufacturado.vegetariano = vegetariano;
      this.siguiente1();
    },

    siguiente1() {
      document.getElementById("paso1").style.display = "none";
      document.getElementById("paso2").style.display = "block";
      this.getInsumos();
      this.$route.params.id != "undefined" ? this.completarCamposForm2() : "";
    },

    async getInsumos() {
      await this.service.getAll("insumo/insumosProduccion").then((data) => {
        this.insumosData = data;
      });
    },

    completarCamposForm2() {
      this.form2.tiempoCocina = this.manufacturado.tiempoCocina;
    },

    agregarIngrediente(id) {
      let ingrediente = this.insumosData.find((i) => i.idInsumo == id);
      console.log(ingrediente);
      this.ingredientes.push(ingrediente);
    },

    eliminarIngrediente(id) {
      let idx = this.ingredientes.findIndex((i) => i.idInsumo == id);
      this.ingredientes.splice(idx, 1);
    },

    cambiarEstadoIngrediente(valor, id) {
      console.log(valor, id);
      let existe = this.ingredientes.some((i) => {
        return i.idInsumo == id ? true : false;
      });
      if (existe)
        valor ? this.agregarIngrediente(id) : this.eliminarIngrediente(id);
      else if (valor) this.agregarIngrediente(id);
    },

    onSubmit2() {
      this.$v.touch;
      if (this.$v.form2.$anyError) {
        return;
      }
      if (this.ingredientes.length > 0) {
        this.manufacturado.tiempoCocina = parseInt(
          document.getElementById("tiempoCocina").value
        );
        this.siguiente2();
      } else {
        this.$bvToast.show("toast-insumos");
      }
    },

    siguiente2() {
      document.getElementById("paso2").style.display = "none";
      document.getElementById("paso3").style.display = "block";
    },

    onDataInput(valor, idInsumo, target) {
      let item = {};
      let index = -1;
      if (target == "unidad") {
        item = this.buscarItem(idInsumo, target);
        item.unidadMedida = valor;
        index = this.encontrarIndice(idInsumo, this.ingredientes);
        this.ingredientes[index] = item;
      } else {
        index = this.encontrarIndice(idInsumo, this.cantidades);
        item = this.buscarItem(idInsumo, target);
        valor = parseFloat(valor);
        this.onUpdateCantidad(valor, index, item, idInsumo);
      }
    },

    buscarItem(id, target) {
      if (target == "unidad") {
        return this.ingredientes.find(
          (ingrediente) => ingrediente.idInsumo == id
        );
      } else {
        return this.cantidades.find((item) => item.id == id);
      }
    },

    encontrarIndice(id, array) {
      if (array.length > 0) return array.findIndex((i) => i.id == id);
      else return -1;
    },

    onUpdateCantidad(valor, index, item, id) {
      if (index == -1) {
        this.cantidades.push({ cantidad: valor, id: id });
      } else if (isNaN(valor) && item != undefined) {
        this.cantidades.splice(index, 1);
      } else if (valor == null) {
        valor = String(item.cantidad).split("");
        valor.pop();
        valor = valor.join("");
        this.actualizarValorCantidad(valor, item, index);
      } else {
        this.actualizarValorCantidad(valor, item, index);
      }
    },

    actualizarValorCantidad(valor, item, index) {
      item.cantidad = valor;
      this.cantidades.splice(index, 1, item);
    },

    onSubmit3() {
      let camposCompletos = this.verificarDatosForm3();
      if (camposCompletos) {
        this.cantidades.forEach((c) => this.setRecetasNuevas(c.cantidad, c.id));
        this.siguiente3();
      } else {
        this.$bvToast.show("toast-datos");
      }
    },

    setRecetasNuevas(cantidad, idInsumo) {
      let insumo = this.ingredientes.find((i) => i.idInsumo == idInsumo);
      this.recetasNuevas.push({ cantidadInsumo: cantidad, insumo: insumo });
    },

    siguiente3() {
      document.getElementById("paso3").style.display = "none";
      document.getElementById("revision").style.display = "block";
    },

    verificarDatosForm3() {
      let cantidadesLen = document.getElementsByName("cantidadesInput").length;
      let rExp = new RegExp(
        "(^|[ \\t])([-+]?(\\d+|\\.\\d+|\\d+\\.\\d*))($|[^+-.])"
      );
      let soloNumeros = this.cantidades.every((c) => rExp.test(c.cantidad));
      return (
        soloNumeros &&
        this.cantidades.length == cantidadesLen &&
        this.ingredientes.every((e) => e.unidadMedida != null)
      );
    },

    async guardar() {
      this.$v.$touch();
      if (this.$v.formRevision.$anyError) {
        return;
      }
      let img = document.getElementById("imagen").files[0];
      let sugerencia = Object.assign({}, this.manufacturado);

      delete sugerencia.id;
      sugerencia.imagen = img.name;

      let estadoImagen = await this.guardarImagen(img);
      let estadoSugerencia = false;

      estadoImagen === true
        ? (estadoSugerencia = await this.guardarSugerencia(sugerencia))
        : this.$bvToast.show("toast-img");

     if(typeof estadoSugerencia === "object"){
       this.guardarRecetas(estadoSugerencia);
        this.$refs["modal"].show();
     }else{
       this.toastError(); 
     }
               
         
    },

   toastError(append = false) {
        this.$bvToast.toast(`Surgió un error al cargar la nueva sugerencia`, {
          title: `Error`,
          toaster: 'b-toaster-top-center',
          solid: true,
          appendToast: append
        })
      },
    retornaAlCatalogo() {
      window.location.href = "/catalogoManu/";
    },

    async guardarImagen(imagen) {
      const formData = new FormData();
      formData.append("file", imagen);
      await axios
        .post(
          "http://localhost:9001/buensabor/sugerencia/uploadImg",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origins": "*",
              "cache-control": "no-cache",
            },
          }
        )
        .catch((error) => {
          console.log(error);
          return error;
        });
      return true;
    },

    async guardarSugerencia(sugerencia) {
      await this.service
        .save("sugerencia", sugerencia)
        .then((data) => (sugerencia = data))
        .catch((error) => {
          console.log(error);
          return error;
        });
      return sugerencia;
    },

    guardarRecetas(sugerencia) {
      
      let sugerenciaChef = this.setKeyIdSugerencia(sugerencia);
      this.recetasNuevas.forEach((r) => {
        r.sugerenciaChef = sugerenciaChef;
        this.auxGuardarRecetas(r);
        return;
      });
    },

    async auxGuardarRecetas(receta) {
      await axios.post(
        "http://localhost:9001/buensabor/recetaSugerida/guardarReceta/" +
          receta.sugerenciaChef.idSugerencia,
        receta
      );
    },

    setKeyIdSugerencia(sugerencia) {
      sugerencia.idSugerencia = sugerencia.id;
      delete sugerencia.id;
      return sugerencia;
    },

    volver() {
      this.esNuevo
        ? this.$router.push({ path: "/catalogoManu/" })
        : this.$router.push({
            path: "/manufacturadoDetalle/" + this.manufacturado.id,
          });
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
        required,
        alpha: helpers.regex("alpha", /^[a-zA-ZÀ-ž\s]*$/),
      },
      descripcion: {
        required,
        alpha: helpers.regex("alpha", /^[a-zA-ZÀ-ž\s]*$/),
      },
    },

    form2: {
      tiempoCocina: {
        required,
        numeric,
        integer,
      },
    },

    formRevision: {
      imagen: {
        required,
      },
    },
  },
};
</script>
<style>
#titulo {
  line-height: 1.2rem;
  color: #151515;
}
#nombreInsumo {
  margin-top: -5px;
  width: 85%;
}
#cantidad {
  margin-top: -5px;
  width: 20%;
  margin-right: 30px;
}

#unidad {
  margin-top: -5px;
  width: 10%;
  margin-right: 20px;
}
#unidadMedida {
  margin-top: -5px;
  width: 40%;
  margin-right: 30px;
}

.lineaForm {
  width: 100%;
  margin-top: 20px;
  min-height: 40px;
}

#datos {
  float: right;
}

#paso1 {
  display: block;
}

#paso2 {
  display: none;
}

#paso3 {
  display: none;
}

#ingrediente {
  margin-top: -5px;
  width: 65%;
}

#lineaDescripcion {
  min-height: 80px;
}

#descripcion {
  float: right;
  width: 80%;
  margin-left: 10px;
  border: 1px solid #ced4da;
}

#imagen__BV_file_outer_ {
  margin-top: -5px;
  width: 88%;
  float: right;
}

#listaIngredientes {
  margin-left: 18px;
}

.botonAñadirInsumo {
  background-color: transparent;
  color: #e7511e;
  border: none;
}

.botonAñadirInsumo:hover {
  background-color: #e7511e;
  color: #ffffff;
  border: none;
}

.botonAñadirInsumo:active {
  background-color: #e7511e;
  color: #ffffff;
  border: none;
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

#btn-editar {
  float: none;
}

  .modalTitulo {
    margin-top: 7%;
    text-align: center;
    font-size: 25px;
  }
  .botonModal {
    border: none;
    background-color: #e7511e !important;
    color: #ffffff;
    font-weight: 600;
    width: 105px;
    height: 30px;
  }
  .posicion {
    text-align: center;
  }
  .modalMedida {
    height: 20%;
    width: 20%;
  }

@media screen and (max-width: 604px) {
  .lineaForm {
    min-height: 80px;
  }

  #imagen__BV_file_outer_ {
    width: 80%;
  }

  #unidad {
    width: 70px;
  }

  #cantidad {
    width: 70px;
  }

  .botonAñadirInsumo {
    float: left;
  }


}
</style>
