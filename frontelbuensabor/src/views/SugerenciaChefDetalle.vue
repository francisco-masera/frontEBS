<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Sugerencias del chef</h1>
      <h1>Detalle producto</h1>

      <div>
        <img
          :src="
            'http://localhost:9001/images/productos/sugeridos/' +
              sugerenciaEncontrada.imagen
          "
          class="imagenProducto"
          id="imgInsumo"
        />
        <h3>{{ sugerenciaEncontrada.denominacion }}</h3>

        <div id="descripcionInsumo">
          <h2>Descripción</h2>
          <p>{{ sugerenciaEncontrada.descripcion }}</p>
        </div>
        <div class="infoProductoVenta">
          <b-card header="Costo" class="tarjetaInfo">
            <b-card-text>{{ this.formatter.formatMoney(costo) }}</b-card-text>
          </b-card>
          <b-card header="Tiempo" class="tarjetaInfo">
            <b-card-text
              >{{ sugerenciaEncontrada.tiempoCocina }} min.</b-card-text
            >
          </b-card>
        </div>
        <div class="infoIngredientes">
          <h2>Ingredientes</h2>
          <ul>
            <li v-for="(receta, index) in recetas" :key="index">
              {{ receta.insumo.denominacion }} {{ receta.cantidadInsumo
              }}{{ receta.insumo.unidadMedida }}
            </li>
          </ul>
        </div>
        <div class="botonesSugerencia">
          <b-button pill class="boton" size="md" @click="abreModalAceptar"
            >Aprobar</b-button
          >
          <b-button pill class="boton" size="md" @click="abremodalDenegar"
            >Denegar</b-button
          >
        </div>

        <div class="modalMedida">
          <b-modal ref="modalDeniega" hide-footer hide-header centered title>
            <p class="modalTitulo">¿Desea eliminar la sugerencia?</p>

            <p class="posicion">
              <b-button
                pill
                size="md"
                class="botonModal"
                @click="denegarSugerencia"
                >Aceptar</b-button
              >
              <b-button pill size="md" class="botonModal" @click="vuelveDetalle"
                >Cancelar</b-button
              >
            </p>
          </b-modal>
        </div>
        <b-modal ref="modal" hide-footer title="Aprobar producto">
          <form>
            <div>
              <p style="text-align: left; font-weight: 600">
                Precio sugerido: {{ formatter.formatMoney(precioSugerido) }}
              </p>
              <b-form-input
                type="number"
                step="0.01"
                class="sugerenciaForm"
                value="0.0"
                id="precio"
              ></b-form-input>
            </div>
            <div>
              <p style="text-align: left; font-weight: 600; margin-top:5%">
                Seleccione una categoría para el producto
              </p>
              <b-form-select
                v-model="informacionVenta.rubro"
                size="sm"
                class="mt-3"
                id="rubrosSelect"
              >
                <b-form-select-option
                  v-for="rubro in rubros"
                  :key="rubro.id"
                  :value="rubro.id"
                  v-model="rubro.id"
                >
                  {{ rubro.denominacion }}
                </b-form-select-option>
              </b-form-select>
            </div>
            <b-button pill class="boton" size="md" @click="aceptarSugerencia"
              >Agregar</b-button
            >
          </form>
        </b-modal>

        <b-modal ref="modalConfirmacion" hide-footer hide-header centered title>
          <p class="modalTitulo">
            Sugerencia Aceptada
          </p>
          <p class="modalTitulo">Sugerencia Rechazada</p>
          <p class="posicion">
            <b-button
              pill
              size="md"
              class="botonModal"
              @click="vuelveSugerencias"
              >Aceptar</b-button
            >
          </p>
        </b-modal>
      </div>
    </b-container>

    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
import axios from "axios";
import Formatter from "@/utilidades/Formatters.js";
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
      service: new Service(),
      formatter: new Formatter(),
      recetas: [],
      costo: 0.0,
      precioSugerido: 0.0,
      informacionVenta: {
        id: 0,
        type: "ArticuloManufacturado",
        descripcion: "",
        precioVenta: 0.0,
        imagen: "",
        aptoCeliaco: 0,
        baja: false,
        denominacion: "",
        tiempoCocina: 15,
        vegano: 0,
        vegetariano: 0,
        rubro: { id: 0 },
      },
      rubros: [],
    };
  },

  methods: {
    async getSugerenciaXid() {
      let parametroId = parseInt(this.$route.params.id, 10);
      await this.service.getOne("sugerencia", parametroId).then((data) => {
        this.sugerenciaEncontrada = data;
        this.getRecetas(parametroId);
      });
    },

    async getRecetas(id) {
      await axios
        .get(
          "http://localhost:9001/buensabor/sugerencia/recetasSugerencia/" + id
        )
        .then((response) => (this.recetas = response.data));
      await this.obtenerCosto();
    },

    async obtenerCosto() {
      let idsInsumos = [];
      this.recetas.forEach((receta) => idsInsumos.push(receta.insumo.idInsumo));
      let idsInsumosStr = idsInsumos.join(",");
      let cantInsumo = await this.generarStringCantidades();

      await axios
        .get("http://localhost:9001/buensabor/sugerencia/costo", {
          params: {
            idsInsumosStr: idsInsumosStr,
            cantidadInsumos: cantInsumo,
          },
        })
        .then((response) => (this.costo = response.data));
    },
    async generarStringCantidades() {
      let cantInsumo = [];
      this.recetas.forEach((receta) => cantInsumo.push(receta.cantidadInsumo));
      let cantInsumoStr = cantInsumo.join(",");

      return cantInsumoStr;
    },

    abremodalDenegar() {
      this.$refs["modalDeniega"].show();
    },

    abreModalAceptar() {
      this.cargaRubrosManu();
      this.calcularPrecioSugerido();
      this.$refs["modal"].show();
    },

    vuelveSugerencias() {
      this.$refs["modalConfirmacion"].show();
      window.location.href = "/sugerenciaChef";
    },
    async cargaRubrosManu() {
      await this.service.getAll("rubroManufacturado").then((data) => {
        this.rubros = data;
      });
    },
    calcularPrecioSugerido() {
      let precioSugerido = this.costo + this.costo * 0.2;

      this.precioSugerido = precioSugerido;
    },

    vuelveDetalle() {
      this.$refs["modalDeniega"].hide();
    },

    async denegarSugerencia() {
      await this.service
        .deleteRecetas(
          "recetaSugerida/eliminaRecetas/",
          this.sugerenciaEncontrada.id
        )
        .then(() => {
          this.eliminarSugerencia();
        })
        .then(() => this.deleteImg())
        .then(() => {
          this.toastInfo(
            "Sugerencia eliminada.\nCompletando la transacción.",
            "Información"
          );
          this.$refs["modalDeniega"].hide();
        })
        .catch(() => this.toastInfo("Error al eliminar los registros.", "Error"))
        .then(() =>
          setTimeout(() => (window.location.href = "/sugerenciaChef/"), 5000)
        );
    },

    async deleteImg() {
      const nombre = this.sugerenciaEncontrada.imagen;
      await axios.get("http://localhost:9001/buensabor/sugerencia/deleteImg", {
        params: { nombre },
      });
    },

    async aceptarSugerencia() {
      this.informacionVenta.descripcion = this.sugerenciaEncontrada.descripcion;
      this.informacionVenta.imagen = this.sugerenciaEncontrada.imagen;
      this.informacionVenta.denominacion = this.sugerenciaEncontrada.denominacion;
      this.informacionVenta.aptoCeliaco = this.sugerenciaEncontrada.aptoCeliaco;
      this.informacionVenta.tiempoCocina = this.sugerenciaEncontrada.tiempoCocina;
      this.informacionVenta.vegano = this.sugerenciaEncontrada.vegano;
      this.informacionVenta.vegetariano = this.sugerenciaEncontrada.vegetariano;
      this.informacionVenta.precioVenta = document.getElementById(
        "precio"
      ).value;

      let rubroSeleccionado = document.getElementById("rubrosSelect");
      let rubroId =
        rubroSeleccionado.options[rubroSeleccionado.selectedIndex].value;
      this.informacionVenta.rubro = parseInt(rubroId);
      await this.guardarSugerencia()
        .then((data) => this.guardarRecetas(data))
        .then(() => this.denegarSugerencia())
        .then(this.moveImg())
        .then(() => {
          this.toastInfo(
            "Artículo guardado con éxito.\nCompletando la transacción,",
            "Información"
          );
          this.$refs["modal"].hide();
        })
        .then(() =>
          setTimeout(() => (window.location.href = "/sugerenciaChef/"), 5000)
        )
        .catch(() => this.toastInfo("Error al aceptar la sugerencia.", "Error"));
    },

    async guardarSugerencia() {
      let sugerencia = await this.service
        .save("manufacturado", this.informacionVenta)
        .then((data) => (this.informacionVenta = data))
        .catch((error) => {
          console.log(error);
          return false;
        });

      return sugerencia;
    },

    async moveImg() {
      const nombre = this.sugerenciaEncontrada.imagen;
      const lastDot = nombre.lastIndexOf(".");
      const ext = nombre.substring(lastDot + 1);

      await axios.get("http://localhost:9001/buensabor/sugerencia/moveImg", {
        params: { nombre, ext },
      });
    },

    async eliminarSugerencia() {
      await this.service.delete("sugerencia", this.sugerenciaEncontrada.id);
    },

    toastInfo(mensaje, titulo, append = false) {
      this.$bvToast.toast(mensaje, {
        title: titulo,
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },

    async guardarImagen(formData) {
      await axios
        .post(
          "http://localhost:9001/buensabor/manufacturado/uploadImg",
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

    guardarRecetas(manufacturado) {
      let error = false;
      this.recetas.forEach(
        (r) =>
          (error =
            typeof this.auxGuardarRecetas(r, manufacturado) == "string"
              ? true
              : false)
      );
      return error;
    },

    async auxGuardarRecetas(receta, manufacturado) {
      receta.manufacturado = manufacturado;
      return await axios.post(
        `http://localhost:9001/buensabor/receta/guardarReceta/${manufacturado.id}`,
        receta
      );
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

.sugerenciaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 60%;
  font-size: 11pt;
  margin-left: 20%;
  text-align: center;
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
.infoProductoVenta {
  float: right;
}
.botonesSugerencia {
  float: left;
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
</style>
