<template>
  <div>
    <div class="header"></div>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Añadir insumo</h1>
      <h2>Información básica</h2>
      <b-form inline>
        <table>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref">Nombre</label>
            </td>
            <td>
              <b-form-input v-model="text"></b-form-input>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-input-pref">Stock mínimo</label>
            </td>
            <td>
              <b-form-input v-model="text"></b-form-input>
            </td>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-input-pref">Stock máximo</label>
            </td>
            <td>
              <b-form-input v-model="text"></b-form-input>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-input-pref">Unidad de medida</label>
            </td>
            <td>
              <b-form-select
                id="inline-form-custom-select-pref"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="[{ text: 'Seleccione...', value: null }, 'Unidades', 'Kilogramos', 'Mililitros']"
                :value="null"
              ></b-form-select>
            </td>
            <td> <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="venta"
      unchecked-value="no_venta"
    >
      Directo a venta
    </b-form-checkbox>
    <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="extra"
      unchecked-value="no_extra"
    >
      Extras
    </b-form-checkbox>
    </td>
          </tr>
          <tr>
            <td></td>
            <td> <b-button pill class="boton" size="md">Cancelar</b-button></td>
            <td> <b-button pill class="boton" size="md">Siguiente</b-button></td>
          </tr>
        </table>
      </b-form>
    </b-container>

    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
export default {
  mounted() {
    this.getInsumos();
  },
  components: {
    menuLateral: MenuLateral
  },
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      tituloTabla: ["denominación", "categoría", "stock", "tiempo"],
      manufacturadosData: [],
      manufacturados: {
        denominacion: "",
        categoria: "",
        stock: "",
        tiempo: ""
      }
    };
  },
  methods: {
    async getInsumos() {
      const res = await fetch("/manufacturados.json");
      const resJson = await res.json();
      this.manufacturadosData = resJson.manufacturados;
      console.log(this.manufacturadosData);
    },

    agregarInsumo() {}
  },
  computed: {
    rows() {
      return this.manufacturadosData.length;
    }
  }
};
</script>
<style>
h1 {
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 18pt;
  color: #151515;
  text-align: left;
}

h2 {
  font-family: "Baloo Bhaina 2";
  font-weight: 500;
  font-size: 15pt;
  color: #151515;
  text-align: left;
}

.costado {
  background-image: url("../assets/images/sistema/reticulaVertical.png");
  background-repeat: repeat-y;
  position: absolute;
  left: 0;
  height: 100%;
  min-width: 200px;
  background-size: contain;
}

.informacion {
  width: 50%;
  min-height: 100px;
  margin-left: 30%;
  padding: 20px;
  padding-top: 50px;
  font-family: "Baloo Bhaina 2";
  color: #151515;
}

.header {
  background-color: blue;
  width: 100%;
  top: 0;
  min-height: 200px;
}
.buscador {
  float: right;
  margin-bottom: 25px;
}

.botonImagen {
  background-color: transparent;
  border: none;
  padding: 0px;
}
.botonImagen:hover {
  background-color: transparent;
  border: none;
}

.botonImagen:active {
  background-color: transparent;
  border: none;
}
.botonImagen:visited {
  background-color: transparent;
  border: none;
}

.botonImagen:focus {
  background-color: transparent;
  border: none;
}

#imagenBuscar {
  width: 25px;
}

#imagenAgregar {
  width: 20px;
  margin: 0px;
}

.tabla {
  text-align: left;
}

.page-link {
  color: #151515;
  border: none;
}
.boton {
  float: left;
  background-color: #e7511e;
  width: 105px;
  height: 30px;
}

.filtroCategoria {
  float: left;
  margin-bottom: 25px;
  border: 1px solid lightgray;
  height: 32px;
}

@media screen and (max-width: 774px) {
  .costado {
    background-image: url("../assets/images/sistema/reticulaVertical-mobile.png");
    width: 60px;
    min-width: 60px;
  }

  .informacion {
    width: auto;
    min-height: 100px;
    margin-left: 60px;
  }
  .botonImagen {
    display: inline;
  }
}

@media screen and (max-width: 604px) {
  .informacion {
    font-size: 10pt;
  }
  .table td,
  .table th {
    padding: 0.4rem;
  }
  .buscador {
    float: left;
  }
}
</style>