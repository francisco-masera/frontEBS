<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Añadir insumo</h1>
      <h2>Información básica</h2>
      <b-form class="estiloForm">
        <table>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-select-pref">Nombre</label>
            </td>
            <td>
              <b-form-input v-model="nombre" id="nombre"></b-form-input>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-input-pref">Stock mínimo</label>
            </td>
            <td>
              <b-form-input v-model="minimo" type="number"></b-form-input>
            </td>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-input-pref">Stock máximo</label>
            </td>
            <td>
              <b-form-input v-model="maximo" type="number"></b-form-input>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mr-sm-2" for="inline-form-custom-input-pref">Unidad de medida</label>
            </td>
            <td>
              <b-form-select
                id="inline-form-custom-select-pref"
                v-model="medida"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="[{ text: 'Seleccione...', value: null }, 'u', 'kg', 'lt','gr']"
                :value="null"
              ></b-form-select>
            </td>
            <td>
              <b-form-checkbox
                id="checkbox-1"
                v-model="checkVenta"
                name="checkbox-1"
                value="venta"
                unchecked-value="no_venta"
              >Directo a venta</b-form-checkbox>
              <b-form-checkbox
                id="checkbox-1"
                v-model="checkExtra"
                name="checkbox-1"
                value="extra"
                unchecked-value="no_extra"
              >Extras</b-form-checkbox>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <b-button pill class="boton" size="md">Cancelar</b-button>
            </td>
            <td>
              <b-button pill class="boton" size="md" @click="guardaDatos()">Siguiente</b-button>
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
 
  methods: {
   guardaDatos(){
    
     var inputNombre = document.getElementById("nombre");
     localStorage.setItem("name", inputNombre.value);
     window.location.href = "/añadirInsumo2/"; 
   }
  }
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