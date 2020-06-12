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
       <b-button pill class="boton" size="md" @click="agregarCategoria()">¡Agregar!</b-button>
    </b-container>
    <router-view />
    <b-modal ref="modal" hide-footer title="Agregar categoría" class="modalEliminar">
      <form>
        <b-form-input class="contraseñaForm" placeholder="Nombre de categoria" >          
        </b-form-input>
        <b-button pill class="boton" size="md">Agregar </b-button>
      </form>
    </b-modal>
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
  methods:{
   agregarCategoria(){
       this.$refs["modal"].show();
   } 
  }
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
.agregarForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 60%;
  font-size: 11pt;
  margin-left: 20%;
}

.contraseñaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 60%;
  font-size: 11pt;
  margin-left: 20%;
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
</style>
