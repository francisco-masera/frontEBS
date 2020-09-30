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
        responsive="sm"
        small
        :items="sugerenciasData"
        :fields="titulosTabla"
        :per-page="perPage"
        :current-page="currentPage"
        :outlined="true"
        :borderless="true"
        class="tabla"
      >
        <template v-for="(costo, i) in costos">
          <div :key="i">{{ costo }}</div>
        </template>

        <template v-slot:cell(detalles)="row">
          <b-button pill class="boton" @click="verDetalle(row.item)"
            >Detalles</b-button
          >
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
import Service from "@/service/Service.js";
import Formatter from "@/utilidades/Formatters.js";
import axios from "axios";
export default {
  mounted() {
    this.verificarUsuario();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      titulosTabla: [
        { key: "denominacion", label: "Denominación" },
        { key: "descripcion", label: "Descripción" },
        { key: "costo", label: "Costo" },
        { key: "detalles", label: "Detalles" },
      ],
      sugerenciasData: [],
      service: new Service(),
      formatter: new Formatter(),
      costos: [],
      user: {},
    };
  },
  methods: {
    verificarUsuario() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      if (this.user != null)
        this.user.rol != "admin"
          ? this.$router.push({ name: "Home" })
          : this.getSugerencias();
      else this.$router.push({ name: "Home" });
    },
    async getSugerencias() {
      await this.service.getAll("sugerencia").then((data) => {
        this.sugerenciasData = data;
      });
      await this.obtenerCostos();
    },

    async obtenerCostos() {
      let idsManufStr = this.generarStringIds();
      await axios
        .get("http://localhost:9001/buensabor/sugerencia/costos", {
          params: {
            idsSugerenciasStr: idsManufStr,
          },
        })
        .then((response) => {
          this.costos = response.data;
          this.agregarCostos();
          return;
        })
        .catch((error) => console.log(error));
      console.log(this.sugerenciasData);
    },

    agregarCostos() {
      this.sugerenciasData.forEach(
        (sugerencia, i) =>
          (sugerencia.costo = this.formatter.formatMoney(this.costos[i]))
      );
    },

    generarStringIds() {
      let idManuf = [];
      this.sugerenciasData.forEach((sugerencia) => idManuf.push(sugerencia.id));
      let idsManufStr = idManuf.join(",");
      return idsManufStr;
    },

    verDetalle(record) {
      this.$router.push({ path: "/sugerencia/" + record.id });
    },

    computed: {
      rows() {
        return this.sugerenciasData.length;
      },
    },
  },
};
</script>

<style>
.Badgecategoria {
  width: 100px;
  margin-left: 0px;
  font-size: 11pt;
}

.boton {
  margin: 0 0 5px 0;
}
</style>
