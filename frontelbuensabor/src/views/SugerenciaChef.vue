<template>
  <div>
    <cabecera />
    <div id="nav">
      <menuLateral />
    </div>
    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Sugerencias del chef</h1>
      <b-table
        hover
        responsive
        small
        :items="sugerenciasData"
        :fields="titulosTabla"
        :per-page="perPage"
        :current-page="currentPage"
        :outlined="true"
        :borderless="true"
        class="tabla"
      >
        <template v-slot:cell(categoria)="row">
          <b-badge class="Badgecategoria" >{{row.item.categoria}}</b-badge>          
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        size="sm"
        align="right"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="tabla-sugerencia"
        class="paginador"
      >
      </b-pagination>
    </b-container>
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
export default {
  mounted() {
    this.getInsumos();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      titulosTabla: ["denominación", "costo", "categoria", "estado"],
      sugerenciasData: [],
    };
  },
  methods: {
    async getInsumos() {
      const res = await fetch("/sugerenciaChef.json");
      const resJson = await res.json();
      this.sugerenciasData = resJson.sugerencias;
      this.sugerenciasData.forEach((element) => {
        element.costo = "$" + element.costo;
        element.esNuevo
          ? (element.estado = "Nuevo")
          : (element.estado = "Modificación");
      });
      console.log(this.sugerenciasData);
    },
  },
  computed: {
    rows() {
      return this.sugerenciasData.length;
    },
  },
};
</script>

<style>
.Badgecategoria{
  width: 100px;
  margin-left: 0px;
  font-size: 11pt;
}
</style>
