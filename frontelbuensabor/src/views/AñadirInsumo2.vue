<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Añadir insumo</h1>
      <h2>Información de venta</h2>
      <b-form inline class="estiloForm">
        <table>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref"
                >Precio de venta</label
              >
            </td>
            <td>
              <b-form-input
                v-model="text"
                id="precioVentaInsumo"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref"
                >Descripcion</label
              >
            </td>
            <td>
              <b-form-textarea
                id="descripcionInsumo"
                v-model="text"
                placeholder="Ingresa una descripción..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref"
                >Imagen</label
              >
            </td>
            <td>
              <b-form-file
                v-model="file2"
                class="mt-3"
                plain
                id="imagenInsumo"
              ></b-form-file>
              <b-form-input
                v-model="text"
                placeholder="URL"
                id="urlInsumo"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <b-button pill class="boton" size="md">Volver</b-button>
            </td>
            <td>
              <b-button pill class="boton" size="md" @click="guardarDatos()"
                >Siguiente</b-button
              >
            </td>
          </tr>
        </table>
      </b-form>
    </b-container>

    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
export default {
  mounted() {},
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {};
  },
  methods: {
    guardarDatos() {
      let precioVentaInsumo = document.getElementById("precioVentaInsumo")
        .value;
      let descripcionInsumo = document.getElementById("descripcionInsumo")
        .value;
      let imagenInsumo = document.getElementById("imagenInsumo").value;
      let urlInsumo = document.getElementById("urlInsumo").value;
      window.localStorage.setItem("name", precioVentaInsumo);
      window.localStorage.setItem("name", descripcionInsumo);
      window.localStorage.setItem("name", imagenInsumo);
      window.localStorage.setItem("name", urlInsumo);

      console.log(precioVentaInsumo);
      console.log(descripcionInsumo);
      console.log(imagenInsumo);
      console.log(urlInsumo);
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
</style>
