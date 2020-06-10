<template>
  <div>
    <div class="header"></div>
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
              <label class="mr-sm-2" for="inline-form-custom-select-pref">Precio de venta</label>
            </td>
            <td>
              <b-form-input v-model="text"></b-form-input>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref">Descripcion</label>
            </td>
            <td>
              <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref">Imagen</label>
            </td>
            <td>
              <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
              <b-form-input v-model="text" placeholder="URL"></b-form-input>
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
              <b-button pill class="boton" size="md">Siguiente</b-button>
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
export default {
  mounted() {},
  components: {
    menuLateral: MenuLateral
  },

  methods: {},
  computed: {}
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