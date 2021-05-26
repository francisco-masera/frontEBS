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
            <label class="labelForm">Nombre </label>
            <b-form-input
              class="campoForm form-control"
              v-model.trim="form1.denominacion"
              id="nombreInsumo"
              :state="
                !$v.form1.denominacion.$dirty
                  ? !$v.form1.denominacion.$anyError
                  : !$v.form1.denominacion.$error
              "
              @input="$v.form1.denominacion.$touch()"
            ></b-form-input
            >*

            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.denominacion.$dirty && $v.form1.denominacion.$model == ''"
            >
              La denominacion es obligatoria.
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              class="error"
              v-if="
                $v.form1.denominacion.$dirty &&
                $v.form1.denominacion.$params.alphaNumSpc &&
                $v.form1.denominacion.$model != ''
              "
            >
              Sólo se admiten caracteres alfanuméricos y puntos, comas y barras ( / ).
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm">
            <div class="form-group" style="width: 100%">
              <label class="labelForm">Stock mínimo</label>
              <b-form-input
                form-control
                class="campoForm form-control"
                id="stockMin"
                @keyup="$v.form1.stockMin.$touch()"
                @keydown="formatNumber"
                :state="
                  !$v.form1.stockMin.$dirty
                    ? !$v.form1.stockMin.$anyError
                    : !$v.form1.stockMin.$error
                "
                v-model.trim="form1.stockMin"
              ></b-form-input
              >*
              <b-form-invalid-feedback
                class="error"
                v-if="$v.form1.stockMin.$dirty && $v.form1.stockMin.$model == ''"
              >
                Stock mínimo es obligatorio.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                class="error"
                v-show="
                  $v.form1.stockMin.$params.decimal && $v.form1.stockMin.$model != ''
                "
              >
                Sólo se admiten números mayores o iguales a 0 (cero) en los campos de
                stock
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="lineaForm">
            <div class="form-group" style="width: 100%">
              <label class="labelForm">Stock máximo</label>
              <b-form-input
                class="campoForm form-control"
                id="stockMax"
                v-model.trim="form1.stockMax"
                @input="$v.form1.stockMax.$touch()"
                @keydown="formatNumber"
                :state="
                  !$v.form1.stockMax.$dirty
                    ? !$v.form1.stockMax.$anyError
                    : !$v.form1.stockMax.$error
                "
              ></b-form-input
              >*

              <br />
              <b-form-invalid-feedback
                class="error"
                v-if="$v.form1.stockMax.$dirty && $v.form1.stockMax.$model == ''"
              >
                Stock máximo es obligatorio.
              </b-form-invalid-feedback>

              <b-form-invalid-feedback
                class="error"
                v-show="
                  $v.form1.stockMax.$params.decimal && $v.form1.stockMax.$model != ''
                "
              >
                Sólo se admiten números mayores o iguales a 0 (cero) en los campos de
                stock.
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Unidad de medida</label>
            <b-form-select
              id="unidadMedida"
              class="campoForm"
              v-model="insumoEncontrado.unidadMedida"
              :options="[{ text: 'Seleccione...', value: '' }, 'u', 'kg', 'lt', 'gr']"
            ></b-form-select
            >*
            <b-form-group id="contenedorCheck">
              <b-form-checkbox id="checkbox-1" name="checkbox-1" v-model="esInsumoVenta"
                >Directo a venta</b-form-checkbox
              >
              <b-form-checkbox
                id="checkbox-2"
                name="checkbox-2"
                v-model="insumoEncontrado.esExtra"
                >Extras</b-form-checkbox
              >
            </b-form-group>
          </div>
          <div class="lineaForm">
            <h4 id="datos">*Datos necesarios</h4>
          </div>
          <div class="lineaFormDerecha" style="display: flex">
            <b-button pill class="boton2" size="md" @click="retornaAlStock"
              >Cancelar</b-button
            >
            <b-button pill class="boton" size="md" @click.prevent="siguiente1"
              >Siguiente</b-button
            >
          </div>
        </b-form>
      </div>

      <div id="paso2">
        <h2>Información de venta</h2>
        <b-form id="form2">
          <div class="lineaForm" style="width: 65%">
            <label class="labelForm">Precio de venta</label>
            <b-form-input
              class="campoForm form-control"
              id="precioVenta"
              v-model.trim="form2.precioVenta"
              :state="
                !$v.form2.precioVenta.$dirty
                  ? !$v.form2.precioVenta.$anyError
                  : !$v.form2.precioVenta.$error
              "
              @input="$v.form2.precioVenta.$touch()"
            ></b-form-input
            ><br />*<b-form-invalid-feedback
              class="error"
              v-if="$v.form2.precioVenta.$dirty && $v.form2.precioVenta.$model == ''"
              >El precio de venta es obligatorio. </b-form-invalid-feedback
            ><br />
            <b-form-invalid-feedback
              class="error"
              v-if="
                $v.form2.precioVenta.$params.integer && $v.form2.precioVenta.$model != ''
              "
              >Recuerde ingresar sólo números mayores a 0.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" id="lineaDescripcion" style="width: 65%">
            <label class="labelForm">Descripción</label>
            <b-form-textarea
              id="descripcion"
              class="campoFor form-control"
              v-model.trim="form2.lineaDescripcion"
              :state="
                !$v.form2.lineaDescripcion.$dirty
                  ? !$v.form2.lineaDescripcion.$anyError
                  : !$v.form2.lineaDescripcion.$error
              "
              @input="$v.form2.lineaDescripcion.$touch()"
              placeholder="Ingrese Texto"
              rows="3"
              max-rows="3"
            ></b-form-textarea
            ><br />*
            <b-form-invalid-feedback
              class="error"
              v-if="
                $v.form2.lineaDescripcion.$dirty && $v.form2.lineaDescripcion.$model == ''
              "
              >La descripción es obligatoria.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="width: 65%">
            <label class="labelForm">Imagen</label>
            <b-form-file
              class="campoForm form-control"
              id="imagen"
              v-model.lazy="form2.imagen"
              :state="
                !$v.form2.imagen.$dirty
                  ? !$v.form2.imagen.$anyError
                  : !$v.form2.imagen.$error
              "
              @input="$v.form2.imagen.$touch()"
            ></b-form-file
            ><br />*
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form2.imagen.$dirty && $v.form2.imagen.$model == ''"
              >La foto es obligatoria.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm">
            <h4 id="datos">*Datos necesarios</h4>
          </div>
          <div class="container-fluid" v-if="esNuevo">
            <div class="row lineaFormDerecha">
              <div class="col-4">
                <b-button pill class="boton2" size="md" @click="retornaAlStock"
                  >Cancelar</b-button
                >
              </div>
              <div class="col-4">
                <b-button pill class="boton" size="md" @click="agregarInsumo"
                  >Guardar</b-button
                >
              </div>
              <div class="col-4">
                <b-button pill class="boton" @click.prevent="volverPaso3">Atrás</b-button>
              </div>
            </div>
          </div>
          <div class="container-fluid" v-else>
            <div class="row lineaFormDerecha">
              <div class="col-4">
                <b-button pill class="boton2" size="md" @click="retornaAlStock"
                  >Cancelar</b-button
                >
              </div>
              <div class="col-4">
                <b-button pill class="boton" size="md" @click="updateInsumo"
                  >Guardar</b-button
                >
                >
              </div>
              <div class="col-4">
                <b-button pill class="boton" @click.prevent="volverPaso3">Atrás</b-button>
              </div>
            </div>
          </div>
        </b-form>
      </div>
      <div id="paso3">
        <h2>Categoría</h2>
        <b-form>
          <div class="categoriasPadre">
            <b-button
              class="Badgecategoria"
              v-b-toggle.misBebidas
              @click="guardaCategoria(categoriasData[0].id)"
              >{{ this.categoriasData[0].denominacion }}</b-button
            >
            <b-button
              class="Badgecategoria"
              v-b-toggle.miAlmacen
              @click="guardaCategoria(categoriasData[1].id)"
              >{{ this.categoriasData[1].denominacion }}</b-button
            >
            <b-button
              class="Badgecategoria"
              v-b-toggle.misLacteos
              style="width: max-content"
              @click="guardaCategoria(categoriasData[2].id)"
              >{{ this.categoriasData[2].denominacion }}</b-button
            >
            <b-button
              class="Badgecategoria"
              @click="guardaCategoria(categoriasData[3].id)"
              >{{ this.categoriasData[3].denominacion }}</b-button
            >
            <b-button
              class="Badgecategoria"
              v-b-toggle.misCarnes
              @click="guardaCategoria(categoriasData[4].id)"
              >{{ this.categoriasData[4].denominacion }}</b-button
            >
          </div>
          <div class="categorias2">
            <b-collapse id="misBebidas">
              <b-button
                class="Badgecategoria"
                v-b-toggle.bebidasAlcohol
                @click="guardaCategoria(categoriasData[5].id)"
                >{{ this.categoriasData[5].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                v-b-toggle.bebidasSAlcohol
                @click="guardaCategoria(categoriasData[6].id)"
                >{{ this.categoriasData[6].denominacion }}</b-button
              >
            </b-collapse>
            <b-collapse id="miAlmacen">
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[7].id)"
                >{{ this.categoriasData[7].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[8].id)"
                >{{ this.categoriasData[8].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                v-b-toggle.panificados
                @click="guardaCategoria(categoriasData[9].id)"
                >{{ this.categoriasData[9].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[10].id)"
                >{{ this.categoriasData[10].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[11].id)"
                >{{ this.categoriasData[11].denominacion }}</b-button
              >
            </b-collapse>
            <b-collapse id="misLacteos">
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[12].id)"
                >{{ this.categoriasData[12].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[13].id)"
                >{{ this.categoriasData[13].denominacion }}</b-button
              >
            </b-collapse>
            <b-collapse id="misCarnes">
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[14].id)"
                >{{ this.categoriasData[14].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[15].id)"
                >{{ this.categoriasData[15].denominacion }}</b-button
              >
            </b-collapse>
          </div>
          <div class="categorias3">
            <b-collapse id="bebidasAlcohol">
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[16].id)"
                >{{ this.categoriasData[16].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[17].id)"
                >{{ this.categoriasData[17].denominacion }}</b-button
              >
            </b-collapse>
            <b-collapse id="bebidasSAlcohol">
              <b-button
                class="Badgecategoria"
                v-b-toggle.gasificada
                @click="guardaCategoria(categoriasData[18].id)"
                >{{ this.categoriasData[18].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                v-b-toggle.NoGasificada
                @click="guardaCategoria(categoriasData[19].id)"
                >{{ this.categoriasData[19].denominacion }}</b-button
              >
            </b-collapse>
            <b-collapse id="panificados">
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[20].id)"
                >{{ this.categoriasData[20].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[21].id)"
                >{{ this.categoriasData[21].denominacion }}</b-button
              >
            </b-collapse>
          </div>
          <div class="categorias4">
            <b-collapse id="gasificada">
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[22].id)"
                >{{ this.categoriasData[22].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[23].id)"
                >{{ this.categoriasData[23].denominacion }}</b-button
              >
            </b-collapse>
            <b-collapse id="NoGasificada">
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[24].id)"
                >{{ this.categoriasData[24].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[25].id)"
                >{{ this.categoriasData[25].denominacion }}</b-button
              >
              <b-button
                class="Badgecategoria"
                @click="guardaCategoria(categoriasData[26].id)"
                >{{ this.categoriasData[26].denominacion }}</b-button
              >
            </b-collapse>
          </div>

          <!--    <div class="lineaFormDerecha" style="float: right" v-if="esInsumoVenta">
            <b-button pill class="boton2" size="md" @click="retornaAlStock()"
              >Cancelar</b-button
            >
            <b-button pill class="boton" size="md" @click="siguiente2()"
              >Siguiente</b-button
            >
          </div> -->
          <div class="container-fluid" v-if="esInsumoVenta">
            <div class="row lineaFormDerecha">
              <div class="col-4">
                <b-button pill class="boton2" size="md" @click="retornaAlStock"
                  >Cancelar</b-button
                >
              </div>
              <div class="col-4">
                <b-button pill class="boton" size="md" @click="siguiente2"
                  >Siguiente</b-button
                >
              </div>
              <div class="col-4">
                <b-button pill class="boton" @click.prevent="volverPaso1">Atrás</b-button>
              </div>
            </div>
          </div>
          <div class="container-fluid" v-else-if="esNuevo">
            <div class="row lineaFormDerecha">
              <div class="col-4">
                <b-button pill class="boton2" @click="retornaAlStock">Cancelar</b-button>
              </div>
              <div class="col-4">
                <b-button pill class="boton" @click="agregarInsumo">Guardar</b-button>
              </div>
              <div class="col-4">
                <b-button pill class="boton" @click.prevent="volverPaso1">Atrás</b-button>
              </div>
            </div>
          </div>
          <div class="container-fluid" v-else>
            <div class="row lineaFormDerecha">
              <div class="col-4">
                <b-button pill class="boton2" @click="retornaAlStock">Cancelar</b-button>
              </div>
              <div class="col-4">
                <b-button pill class="boton" @click="updateInsumo">Guardar</b-button>
              </div>
              <div class="col-4">
                <b-button pill class="boton" @click.prevent="volverPaso1sssss"
                  >Atrás</b-button
                >
              </div>
            </div>
          </div>
        </b-form>
      </div>
    </b-container>
    <div class="modalMedida">
      <b-modal ref="modal" hide-footer hide-header centered title>
        <p class="modalTitulo" v-if="esNuevo">¡Insumo agregado con éxito! Aguarde...</p>
        <p class="modalTitulo" v-else>¡Insumo modificado con éxito! Aguarde...</p>
      </b-modal>
    </div>
    <Toast ref="toast" />
    <Loader v-if="loading" :loading="loading" />
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
Vue.use(Vuelidate);
import Vuelidate from "vuelidate";
import {
  requiredIf,
  required,
  minValue,
  decimal,
  helpers,
} from "vuelidate/lib/validators";
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
import axios from "axios";
import $ from "jquery";
import Toast from "@/components/Toast.vue";
import Loader from "@/components/Loader.vue";

const alphaNumSpc = helpers.regex("alphaNumSpc", /^[a-zA-ZÀ-ÿ\d\u00f1\u00d1\s,./]*$/);
export default {
  mounted() {
    this.userVerifica();
    this.getCategorias();
    this.esNuevo = this.$route.params.id == "undefined" ? true : false;
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
    Toast: Toast,
    Loader: Loader,
  },

  data() {
    return {
      loading: false,
      form1: {
        denominacion: "",
        stockMin: "",
        stockMax: "",
      },
      form2: {
        precioVenta: "",
        lineaDescripcion: "",
        imagen: [],
      },
      insumoEncontrado: {
        baja: false,
        denominacion: "",
        esExtra: false,
        esInsumo: false,
        idInsumo: 0,
        rubroInsumo: {
          denominacion: "",
          id: 0,
        },
        stock: {
          actual: 0,
          id: 0,
          maximo: 0,
          minimo: 0,
        },
        unidadMedida: "",
      },
      informacionVenta: {
        type: "InformacionInsumoVenta",
        idInsumo: 0,
        descripcion: "",
        precioVenta: "",
        imagen: "",
        insumo: {},
      },
      esInsumoVenta: false,
      service: new Service(),
      unidad: "",
      categoriasData: [],
      esNuevo: true,
      guardaImagen: "",
    };
  },

  methods: {
    formatNumber(e) {
      console.log(e);
      var $input = $(e.target);
      $input.val($input.val().replace(",", "."));
    },
    siguiente1() {
      this.$v.$touch();
      if (this.$v.form1.$anyError) {
        return false;
      }
      var unidades = document.getElementById("unidadMedida");
      var unidadVal = unidades.selectedIndex;
      if (unidadVal == 0) {
        this.toastr("Debe elegir una unidad de medida.", "¡Atención!");
        return false;
      }
      var stockMin = $("#stockMin").val();
      var stockMax = $("#stockMax").val();
      if (parseFloat(stockMax) < parseFloat(stockMin)) {
        this.toastr("El stock mínimo no puede ser mayor al máximo.", "¡Atención!");
        return false;
      }
      var stockDecimal =
        $("#stockMin").val().includes(".") || $("#stockMax").val().includes(".");
      if (unidadVal == "u" && stockDecimal) {
        this.toastr(
          "Si eligió la unidad de medida 'u' el stock debe ser un número entero.",
          "¡Atención!"
        );
        return false;
      }

      this.insumoEncontrado.denominacion = this.form1.denominacion;
      this.insumoEncontrado.stock.maximo = this.form1.stockMax;
      this.insumoEncontrado.stock.minimo = this.form1.stockMin;

      document.getElementById("paso1").style.display = "none";
      if (document.getElementById("checkbox-2").checked) {
        this.insumoEncontrado.esExtra = true;
      }
      this.verificaInsumo();
      document.getElementById("paso3").style.display = "block";
    },
    volverPaso1() {
      if ($("#paso3").is(":hidden")) {
        document.getElementById("paso1").style.display = "block";
        document.getElementById("paso2").style.display = "none";
      } else {
        document.getElementById("paso1").style.display = "block";
        document.getElementById("paso3").style.display = "none";
      }
    },
    volverPaso3() {
      if (this.esInsumoVenta) {
        document.getElementById("paso3").style.display = "block";
        document.getElementById("paso2").style.display = "none";
      } else {
        document.getElementById("paso1").style.display = "block";
        document.getElementById("paso2").style.display = "none";
      }
    },
    siguiente2() {
      if (this.insumoEncontrado.rubroInsumo.id == 0) {
        this.toastr("Debe elegir una categoría", "¡Atención!");
        return false;
      }
      this.completarCamposForm2();
      document.getElementById("paso3").style.display = "none";
      document.getElementById("paso2").style.display = "block";
    },

    userVerifica() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      if (this.user == "undefined" && this.user != "admin") {
        this.$router.push({ name: "Home" });
      } else {
        this.getInsumosxId();
      }
    },

    async getInsumosxId() {
      var parametroId = parseInt(this.$route.params.id);
      if (!isNaN(parametroId)) {
        await this.service
          .getOne("insumo", parametroId)
          .then((data) => {
            this.insumoEncontrado = data;
          })
          .then(() => {
            this.esNuevo = false;
            this.completarCamposForm1();
            if (!this.insumoEncontrado.esInsumo) {
              this.getInsumoVentaxId();
            }
          });
      }
    },
    completarCamposForm1() {
      this.form1.denominacion = this.insumoEncontrado.denominacion;
      this.form1.stockMax = this.insumoEncontrado.stock.maximo;
      this.form1.stockMin = this.insumoEncontrado.stock.minimo;
    },

    completarCamposForm2() {
      this.form2.lineaDescripcion = this.informacionVenta.descripcion;
      this.form2.precioVenta = this.informacionVenta.precioVenta;
      this.form2.imagen = this.informacionVenta.imagen;
      this.guardaImagen = this.informacionVenta.imagen;
    },

    async getInsumoVentaxId() {
      var parametroId = parseInt(this.$route.params.id);
      this.esInsumoVenta = true;
      await this.service
        .getOne("insumoVenta/insumo", parametroId)
        .then((data) => (this.informacionVenta = data[0]));

      console.log(this.informacionVenta);
    },

    async guardaStock() {
      if (this.esNuevo) {
        await this.service
          .save("stock", this.insumoEncontrado.stock)
          .then((data) => {
            this.insumoEncontrado.stock = data;
            this.loading = !this.loading;
          })
          .catch((e) => {
            this.loading = !this.loading;
            this.toastr(e.response.data.message, "Error al guardar el stock");
            return false;
          });
      } else {
        await this.service
          .update("stock", this.insumoEncontrado.stock, this.insumoEncontrado.stock.id)
          .catch((e) => {
            this.loading = !this.loading;
            this.toastr(e.response.data.message, "Error al actualizar el stock");
            return false;
          });
      }
    },

    async updateInsumo() {
      let img = document.getElementById("imagen").files[0];

      if (img != undefined && img.size / 1024 > 1024) {
        this.toastr("La imagen no debe superar 1MB.", "¡Atención!");
        return false;
      }

      if (this.esInsumoVenta) {
        this.$v.$touch();
        if (this.$v.form2.$anyError) {
          return false;
        }
      }
      this.loading = !this.loading;

      await this.guardaStock();
      await this.service
        .update("insumo", this.insumoEncontrado, this.insumoEncontrado.idInsumo)
        .then(() => (this.loading = !this.loading))
        .catch((e) => {
          this.loading = !this.loading;
          this.toastr(
            e.response.data.message,
            "Error al actualizar el actualizar el insumo:"
          );
          return false;
        });

      if (!this.insumoEncontrado.esInsumo) {
        this.informacionVenta.descripcion = this.form2.lineaDescripcion;
        this.informacionVenta.precioVenta = this.form2.precioVenta;
        this.informacionVenta.insumo = this.insumoEncontrado;

        if (img !== undefined) {
          this.informacionVenta.imagen = img.name;
          await this.guardarImagen(img);
        } else {
          this.informacionVenta.imagen = this.guardaImagen;
        }

        await this.service
          .update("insumoVenta", this.informacionVenta, this.informacionVenta.id)
          .then((data) => {
            this.loading = !this.loading;
            this.informacionVenta = data;
            this.$refs["modal"].show();
            setTimeout(() => this.retornaAlStock(), 3000);
          })
          .catch((e) => {
            this.loading = !this.loading;
            this.toastr(e.response.data.message, "Error al actualizar el insumo");
            return false;
          });
      } else {
        this.loading = !this.loading;
        this.$refs["modal"].show();
        setTimeout(() => this.retornaAlStock(), 3000);
      }
    },
    async agregarInsumo() {
      let img = document.getElementById("imagen").files[0];

      if (img != undefined && img.size / 1024 > 1024) {
        this.toastr("La imagen no debe superar 1MB.", "¡Atención!");
        return false;
      }

      if (this.esInsumoVenta) {
        this.$v.$touch();
        if (this.$v.form2.$anyError) {
          return false;
        }
      }
      this.loading = !this.loading;
      await this.guardaStock();

      await this.service.save("insumo", this.insumoEncontrado).then(async (data) => {
        if (!data.esInsumo) {
          this.informacionVenta.descripcion = this.form2.lineaDescripcion;
          this.informacionVenta.precioVenta = this.form2.precioVenta;
          this.informacionVenta.insumo = data;
          console.log(data);
          this.informacionVenta.imagen = img.name;
          await this.guardarImagen(img).catch(() => {
            this.loading = !this.loading;
            return false;
          });

          await this.service
            .save("insumoVenta", this.informacionVenta)
            .then(() => {
              this.loading = !this.loading;
              this.$refs["modal"].show();
              setTimeout(() => this.retornaAlStock(), 2500);
            })
            .catch((e) => {
              this.loading = !this.loading;
              this.toastr(e.response.data.message, "Error al guardar el insumo");
            });
        }
      });
    },

    async guardarImagen(imagen) {
      var name = imagen.name.toString().replaceAll(" ", "_");
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("name", name);
      await axios
        .post("http://localhost:9001/buensabor/informacionArticulo/uploadImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origins": "*",
            "cache-control": "no-cache",
          },
        })
        .catch((e) => {
          this.loading = !this.loading;
          this.toastr(e.response.data.message, "Error al guardar la imagen");
          return e;
        });
      return true;
    },
    verificaInsumo() {
      if (document.getElementById("checkbox-1").checked) {
        this.esInsumoVenta = true;
        this.insumoEncontrado.esInsumo = false;
      } else {
        this.esInsumoVenta = false;
        this.insumoEncontrado.esInsumo = true;
      }
    },

    async getCategorias() {
      await this.service.getAll("rubroInsumo").then((data) => {
        this.categoriasData = data;
      });
    },
    guardaCategoria(id) {
      this.insumoEncontrado.rubroInsumo.id = id;
    },
    retornaAlStock() {
      window.location.href = "/stockInsumos/";
    },

    toastr(msg, title) {
      this.$refs.toast.emitToast(msg, title);
    },
  },

  computed: {
    isNuevo() {
      return this.esNuevo;
    },
  },
  validations: {
    form1: {
      denominacion: {
        required,
        alphaNumSpc,
      },
      stockMin: {
        required,
        minValue: minValue(0),
        decimal,
      },
      stockMax: {
        required,
        decimal,
        minValue: minValue(0),
      },
    },
    form2: {
      precioVenta: {
        required,
        decimal,
      },
      lineaDescripcion: {
        required,
      },
      imagen: {
        required: requiredIf((esNuevo) => {
          return esNuevo;
        }),
      },
    },
  },
};
</script>
<style>
.error {
  color: #dc3545;
}
#titulo {
  line-height: 1.2rem;
}
#nombreInsumo {
  margin-top: -5px;
  width: 50%;
}
#stockMin {
  margin-top: -5px;
  width: 10%;
  padding: 0%;
}

#stockMax {
  margin-top: -5px;
  width: 20%;
}
#unidadMedida {
  margin-top: -5px;
  width: 20%;
  margin-right: 30px;
}

.lineaForm {
  width: 100%;
  margin-top: 20px;
  min-height: 40px;
}

#precioVenta {
  margin-top: -5px;
  width: 80%;
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

#imagen_BV_file_outer {
  margin-top: -5px;
  width: 90%;
  float: right;
}

.Badgecategoria {
  width: auto;
  margin-top: 5%;
  font-size: 11pt;
}
.divCategorias {
  float: left;
}
.modalTitulo {
  margin-top: 7%;
  text-align: center;
  font-size: 25px;
}
.botonModal {
  border: none;
  background-color: #e7511e;
  color: #ffffff;
  font-weight: 600;
  width: 105px;
  height: 30px;
}

.modalMedida {
  height: 20%;
  width: 20%;
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
</style>
