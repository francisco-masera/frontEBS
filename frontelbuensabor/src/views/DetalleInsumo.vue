<template>
  <div>
    <cabecera />
    <div class="costado"></div>
    <menuLateral />
    <b-container id="contenedorPrincipal">
      <h2 id="titulo">Detalle de insumo</h2>
      <b-card-group id="group">
        <b-card>
          <b-card-title id="denominacion">
            <span>{{ this.insumoEncontrado.denominacion }} </span>
          </b-card-title>
          <b-button class="botonImagen" size="sm" id="btnEditar">
            <img src="@/assets/images/sistema/editar.png" />
          </b-button>
          <b-button class="botonImagen" size="sm" id="btnEliminar">
            <img src="@/assets/images/sistema/eliminar.png" />
          </b-button>
        </b-card>
        <b-card>
          <span id="estado"></span>
          <span id="stock">{{ this.stock }}</span>
          <b-button pill class="boton">Almacén</b-button>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
export default {
  mounted() {
    this.getInsumo();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {
      insumoEncontrado: [],
      estado: "",
      stock: "Stock Suficiente",
    };
  },
  methods: {
    async getInsumo() {
      const res = await fetch("/articulosInsumo.json");
      const resJson = await res.json();
      this.insumoEncontrado = await resJson.insumos.find(
        (insumo) => insumo.id == 1
      );
    },
    async estadoStock() {
      return this.estado;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap");

#contenedorPrincipal {
  font-family: "Baloo Bhaina 2";
  color: #151515;
}

#denominacion {
  float: left;
}

.botonImagen > * {
  width: 20px;
}

#group {
  display: inline-block;
  align-items: initial;
}

#group > * {
  border: none;
  padding-inline: 150px;
}

#estado {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: red;
  float: left;
}

#stock {
  float: left;
}

#titulo {
  margin-top: 30px;
  display: inline-block;
  width: 50%;
  padding-inline: 150px;
  text-align: justify;
  font-family: "Baloo Bahina 2";
  font-weight: 600;
  font-size: 18pt;
  color: #151515;
}
</style>
