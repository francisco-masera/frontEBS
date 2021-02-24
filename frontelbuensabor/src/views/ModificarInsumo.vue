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
            <label class="labelForm">Nombre</label>
            <b-form-input
              class="campoForm"
              v-model.trim="form1.denominacion"
              id="nombreInsumo"
              @input="$v.form1.denominacion.$touch()"
              :state="
                !$v.form1.denominacion.$dirty
                  ? !$v.form1.denominacion.$anyError
                  : !$v.form1.denominacion.$error
              "
            ></b-form-input
            >*
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.denominacion.$dirty && $v.form1.denominacion.$model == ''"
            >
              El nombre es obligatorio
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              class="error"
              v-if="
                $v.form1.denominacion.$params.alpha && $v.form1.denominacion.$model != ''
              "
            >
              Sólo se admiten letras en este campo.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm">
            <div class="form-group" style="width: 100%">
              <label class="labelForm">Stock mínimo</label>
              <b-form-input
                form-control
                class="campoForm"
                id="stockMin"
                @input="$v.form1.stockMin.$touch()"
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
                  $v.form1.stockMin.$params.positivos && $v.form1.stockMin.$model != ''
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
                class="campoForm"
                id="stockMax"
                v-model.trim="form1.stockMax"
                @input="$v.form1.stockMax.$touch()"
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
                  $v.form1.stockMax.$params.positivos && $v.form1.stockMax.$model != ''
                "
              >
                Sólo se admiten números mayores o iguales a 0 (cero) en los campos de
                stock.
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Unidad de medida</label>
            <select id="unidadMedida" class="custom-select campoForm">
              <option
                v-for="(option, index) in [
                  { text: 'Unidad de medida...', value: 0 },
                  { text: 'u', value: 1 },
                  { text: 'kg', value: 2 },
                  { text: 'lt', value: 3 },
                  { text: 'gr', value: 4 },
                ]"
                :key="index"
                :value="option.value"
                :selected="option.value == form1.unidad ? 'selected' : ''"
              >
                {{ option.text }}
              </option>
              *
            </select>
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
            <b-button pill class="boton" size="md" @click.prevent="siguiente1()"
              >Siguiente</b-button
            >
          </div>
        </b-form>
      </div>

      <div id="paso2">
        <h2>Información de venta</h2>
        <b-form id="form2">
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Precio de venta</label>
            <b-form-input
              class="campoForm"
              form-control
              id="precioVenta"
              v-model="form2.precioVenta"
              :state="
                !$v.form2.precioVenta.$dirty
                  ? !$v.form2.precioVenta.$anyError
                  : !$v.form2.precioVenta.nombre.$error
              "
              @input="$v.form2.precioVenta.$touch()"
            ></b-form-input
            >*<b-form-invalid-feedback
              class="error"
              v-if="$v.form2.precioVenta.$dirty && $v.form2.precioVenta.$model == ''"
              >Este campo es obligatorio.
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              class="error"
              v-show="
                $v.form2.precioVenta.$params.positivos &&
                $v.form2.precioVenta.$model != ''
              "
              >Recuerde ingresar sólo números mayores a 0.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" id="lineaDescripcion" style="display: flex">
            <label class="labelForm">Descripción</label>
            <b-form-textarea
              id="descripcion"
              class="campoForm"
              v-model.lazy="form2.lineaDescripcion"
              :state="!$v.form2.lineaDescripcion.$invalid"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea
            >*
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Imagen</label>
            <b-form-file
              class="campoForm"
              id="imagen"
              v-model.lazy="form2.imagen"
              :state="!$v.form2.imagen.$invalid"
            ></b-form-file
            >*
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm">
            <h4 id="datos">*Datos necesarios</h4>
          </div>
          <div class="lineaFormDerecha" style="float: right" v-if="esNuevo">
            <b-button pill class="boton2" size="md" @click="retornaAlStock"
              >Cancelar</b-button
            >
            <b-button pill class="boton" size="md" @click.prevent="agregarInsumo"
              >Guardar</b-button
            >
          </div>
          <div class="lineaFormDerecha" style="float: right" v-else>
            <b-button pill class="boton2" size="md" @click="retornaAlStock"
              >Cancelar</b-button
            >
            <b-button pill class="boton" size="md" @click.prevent="updateInsumo()"
              >Guardar</b-button
            >
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

          <div class="lineaFormDerecha" style="float: right" v-if="esInsumoVenta">
            <b-button pill class="boton2" size="md" @click="retornaAlStock()"
              >Cancelar</b-button
            >
            <b-button pill class="boton" size="md" @click="siguiente2()"
              >Siguiente</b-button
            >
          </div>
          <div class="lineaFormDerecha" style="float: right" v-else-if="esNuevo">
            <b-button pill class="boton2" size="md" @click="retornaAlStock()"
              >Cancelar</b-button
            >
            <b-button pill class="boton" size="md" @click="agregarInsumo()"
              >Guardar</b-button
            >
          </div>
          <div class="lineaFormDerecha" style="float: right" v-else>
            <b-button pill class="boton2" size="md" @click="retornaAlStock()"
              >Cancelar</b-button
            >
            <b-button pill class="boton" size="md" @click="updateInsumo()"
              >Guardar</b-button
            >
          </div>
        </b-form>
      </div>
    </b-container>
    <div class="modalMedida">
      <b-modal ref="modal" hide-footer hide-header centered title>
        <p class="modalTitulo" v-if="esNuevo">¡Insumo agregado con éxito! Aguarde...</p>
        <p class="modalTitulo" v-else>¡Insumo modificado con éxito! Aguarde...</p>
        <p class="posicion"></p>
      </b-modal>
    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
Vue.use(Vuelidate);
import Vuelidate from "vuelidate";
import { requiredIf, required, helpers } from "vuelidate/lib/validators";
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
import axios from "axios";
const alpha = helpers.regex("alpha", /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/);
const positivos = helpers.regex("positivos", /^(?:[1-9]\d*|0)?(?:[\\.\\,]\d+)?$/);
export default {
  mounted() {
    this.userVerifica();
    this.getCategorias();
    this.esNuevo = this.$route.params.id != "undefined" ? !this.esNuevo : this.esNuevo;
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },

  data() {
    return {
      form1: {
        denominacion: "",
        stockMin: "",
        stockMax: "",
        unidad: 0,
      },
      form2: {
        precioVenta: "",
        lineaDescripcion: "",
        imagen: "",
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
    siguiente1() {
      this.$v.$touch();
      if (this.$v.form1.$anyError) {
        return;
      }
      var unidades = document.getElementById("unidadMedida");
      var unidadVal = unidades.selectedIndex;
      if (unidadVal == 0) {
        this.$bvToast.toast(`Debe elegir una unidad de medida`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }
      this.insumoEncontrado.denominacion = this.form1.denominacion;
      this.insumoEncontrado.stock.maximo = this.form1.stockMax;
      this.insumoEncontrado.stock.minimo = this.form1.stockMin;
      this.insumoEncontrado.unidadMedida = unidades[unidadVal].text;
      document.getElementById("paso1").style.display = "none";
      if (document.getElementById("checkbox-2").checked) {
        this.insumoEncontrado.esExtra = true;
      }
      this.verificaInsumo();
      document.getElementById("paso3").style.display = "block";
    },

    siguiente2() {
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
        await this.service.getOne("insumo", parametroId).then((data) => {
          this.insumoEncontrado = data;
        });
        this.esNuevo = false;
        this.completarCamposForm1();
        if (!this.insumoEncontrado.esInsumo) {
          this.getInsumoVentaxId();
        }
      }
    },
    completarCamposForm1() {
      this.form1.denominacion = this.insumoEncontrado.denominacion;
      this.form1.stockMax = this.insumoEncontrado.stock.maximo;
      this.form1.stockMin = this.insumoEncontrado.stock.minimo;
      switch (this.insumoEncontrado.unidadMedida) {
        case "u":
          this.form1.unidad = 1;
          break;
        case "kg":
          this.form1.unidad = 2;
          break;
        case "lt":
          this.form1.unidad = 3;
          break;
        case "gr":
          this.form1.unidad = 4;
          break;
        default:
          this.form1.unidad = 0;
          break;
      }
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
        await this.service.save("stock", this.insumoEncontrado.stock).then((data) => {
          this.insumoEncontrado.stock = data;
        });
      } else {
        await this.service.update(
          "stock",
          this.insumoEncontrado.stock,
          this.insumoEncontrado.stock.id
        );
      }
    },

    async updateInsumo() {
      let img = document.getElementById("imagen").files[0];

      if (img != undefined && img.size / 1024 > 512) {
        this.$bvToast.toast(`La imagen no debe superar los 512KB`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }

      if (this.esInsumoVenta) {
        this.$v.$touch();
        if (this.$v.form2.$anyError) {
          return;
        }
      }

      await this.guardaStock();
      await this.service
        .update("insumo", this.insumoEncontrado, this.insumoEncontrado.idInsumo)
        .then(() => {
          this.$refs["modal"].show();

          setTimeout(() => this.retornaAlStock(), 2000);
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
            this.informacionVenta = data;
            this.$refs["modal"].show();

            setTimeout(() => this.retornaAlStock(), 2000);
          });
      }
    },
    async agregarInsumo() {
      try {
        let img = document.getElementById("imagen").files[0];

        if (img != undefined && img.size / 1024 > 512) {
          this.$bvToast.toast(`La imagen no debe superar los 512KB`, {
            title: `¡Atención!`,
            toaster: "b-toaster-top-center",
            solid: true,
          });
          return;
        }

        if (this.esInsumoVenta) {
          this.$v.$touch();
          if (this.$v.form2.$anyError) {
            return;
          }
        }

        await this.guardaStock();
        var res = false;
        await this.service
          .save("insumo", this.insumoEncontrado)
          .then((data) => {
            this.insumoEncontrado = data;
          })
          .then(async () => {
            if (!this.insumoEncontrado.esInsumo) this.setInsumoVenta(img);
          })
          .then(() => {
            if (!this.insumoEncontrado.esInsumo) this.guardarImagen(img);
          })
          .then(() => {
            if (!this.insumoEncontrado.esInsumo)
              this.service.save("insumoVenta", this.informacionVenta);
          })

          .then((data) => (res = data));
        if (res != false) {
          this.$refs["modal"].show();
          setTimeout(() => this.retornaAlStock(), 3000);
        }
      } catch (e) {
        console.error(e);
      }
    },

    async setInsumoVenta(img) {
      this.informacionVenta.descripcion = this.form2.lineaDescripcion;
      this.informacionVenta.precioVenta = this.form2.precioVenta;
      this.informacionVenta.insumo = this.insumoEncontrado;
      this.informacionVenta.imagen = img.name;
    },

    async guardarImagen(imagen) {
      const formData = new FormData();
      formData.append("file", imagen);
      await axios
        .post("http://localhost:9001/buensabor/informacionArticulo/uploadImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origins": "*",
            "cache-control": "no-cache",
          },
        })
        .catch((error) => {
          return error;
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
        alpha,
      },
      stockMin: {
        required,
        positivos,
      },
      stockMax: {
        required,
        positivos,
      },
    },
    form2: {
      precioVenta: {
        required,
        positivos,
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
#titulo {
  line-height: 1.2rem;
}
#nombreInsumo {
  margin-top: -5px;
  width: 50%;
}
#stockMin {
  margin-top: -5px;
  width: 20%;
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
  margin-top: 4vh;
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
.error {
  color: #e43561;
  font-size: 1em;
}
</style>
