<template>
  <div>
    <topbar></topbar>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>
    <div class="costado"></div>

    <b-container class="informacion">
      <h1>Catálogo manufacturados</h1>
      <a id="seleccion-manufacturado" href="http://localhost:8080/catalogoManu"
        ><span style="float:left">PRODUCTOS</span></a
      >
      <a id="seleccion-manufacturado" href=""
        ><span style="float:left; margin-left:50px">CATEGORÍAS</span></a
      >
      <b-table
        hover
        responsive
        :items="items"
        :fields="titulos"
        :per-page="4"
        :current-page="1"
        :outlined="true"
        :borderless="true"
        class="tabla"
      >
        <template slot="cell(accion)" style="float:right">
          <b-button size="sm" class="botonImagen">
            <img
              src="@/assets/images/sistema/editar.png"
              alt=""
              id="btnEditar"
            />
          </b-button>
          <b-button size="sm" class="botonImagen">
            <img
              src="@/assets/images/sistema/eliminar.png"
              alt=""
              id="btnEliminar"
            />
          </b-button>
        </template>
      </b-table>
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
    topbar: Header,
  },
  data() {
    return {
      items: [
        { articulo: "Pizza" },
        { articulo: "Postres" },
        { articulo: "Hamburguesas" },
        { articulo: "Papas" },
        { accion: "" },
        { accion: "" },
      ],
      titulos: [
        { key: "articulo", label: "" },
        { key: "accion", label: "" },
      ],
    };
  },
};
</script>

<style>
#seleccion-manufacturado {
  color: black;
}

#seleccion-manufacturado:hover {
  color: #e7541e;
}

#btnEditar {
  width: 20px;
  margin: 0px;
}

#btnEliminar {
  width: 20px;
  margin: 0px;
}
</style>
