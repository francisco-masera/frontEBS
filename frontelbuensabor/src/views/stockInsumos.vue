<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral :user="user"></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Stock de insumos</h1>
      <b-nav-form class="buscador">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Buscar insumo"
          v-model="busqueda"
        ></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit">
          <img
            src="http://localhost:9001/images/sistema/buscar.png"
            id="imagenBuscar"
          />
        </b-button>
      </b-nav-form>

      <b-table
        hover
        responsive="sm"
        :items="insumosData"
        :fields="tituloTabla"
        :outlined="true"
        :per-page="perPage"
        :current-page="currentPage"
        :borderless="true"
        id="tablaInsumos"
        class="tabla"
        :filter="busqueda"
        :tbody-tr-class="filaBaja"
      >
        <template v-slot:cell(categoria)="row">
          <b-badge class="Badgecategoria">{{
            row.item.rubroInsumo.denominacion
          }}</b-badge>
        </template>

        <template v-slot:cell(stockActual)="row">
          {{ row.item.stock.actual }}
        </template>
        <template v-for="(precio, i) in preciosUnitarios">
          <div :key="i"></div>
        </template>
        <template v-slot:cell(detalle)="row">
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
        aria-controls="my-tablaInsumos"
        class="paginador"
      >
      </b-pagination>
      <b-button pill class="boton" size="md" @click="agregarInsumo"
        >Nuevo</b-button
      >
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
    this.userVerifica();
    this.getPreciosUnitariosActuales();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },

  data() {
    return {
      user: {},

      perPage: 7,
      currentPage: 1,

      tituloTabla: [
        { key: "denominacion", label: "Denominación" },
        { key: "unidadMedida", label: "U.Medida" },
        { key: "categoria", label: "Categoría" },
        { key: "stockActual", label: "Stock" },
        { key: "precio", label: "Precio" },
        { key: "detalle", label: "Detalle" },
      ],
      toastCantidadVisible: false,
      insumosData: [],
      costos: [],
      insumo: {
        id: 0,
        denominacion: "",
        unidad: "",
        precio: 0,
        stockActual: 0,
        categoría: "",
      },

      insumoEncontrado: {
        id: "",
        denominacion: "",
        unidad: "",
        precio: 0,
        categoria: "",
        unidadMedida: 0,
        stockActual: 0,
        stockMin: 0,
        stockMax: 0,
        precioVenta: 0,
        descripcion: "",
        imagen: "",
      },
      service: new Service(),
      preciosUnitarios: [],
      formatter: new Formatter(),
      busqueda: "",

      compra: {
        insumo: {},
        fechaCompra: "",
        cantidad: 0,
        precioUnitario: 0,
      },
    };
  },
  methods: {
    userVerifica() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      if (this.user == undefined || this.user.rol != "admin") {
        this.$router.push({ name: "Home" });
      }
    },

    filaBaja(item, type) {
      if (!item || type !== "row") return;
      if (item.baja === true) return "table-danger";
    },

    agregarInsumo() {
      this.$router.push({ path: "/modificarInsumo/" + undefined });
    },

    verDetalle(record) {
      window.location.href = "/insumoDetalle/" + record.idInsumo;
    },

    async refrescarTabla(id) {
      let precio = 0;
      let insumo = await this.service.getOne("insumo", id);
      await this.service
        .getOne("compras/precioUnitario", id)
        .then((res) => (precio = res))
        .then(
          setTimeout(() => {
            this.setInsumoOnRefresh(insumo, precio, id);
          }, 500)
        );
    },

    setInsumoOnRefresh(insumo, precio, id) {
      insumo.precio =
        precio != 0.0 ? this.formatter.formatMoney(precio) : "Sin Registro";
      this.insumosData.map((i, index) =>
        i.idInsumo == id ? this.insumosData.splice(index, 1, insumo) : ""
      );
    },

    async getInsumos() {
      await this.service.getAll("insumo").then((data) => {
        this.insumosData = data;
      });
      return this.insumosData;
    },

    async getPreciosUnitariosActuales() {
      let insumos = [];
      await axios
        .get(
          "http://localhost:9001/buensabor/compras/preciosUnitariosActuales/"
        )
        .then((response) => (this.preciosUnitarios = response.data))
        .then((insumos = await this.getInsumos()))
        .then(this.setPreciosUnitariosActuales(insumos));
    },

    auxSetPrecios(insumo) {
      const item = this.preciosUnitarios.find(
        (precio) => insumo.idInsumo == precio.insumo.idInsumo
      );
      return item != undefined
        ? this.formatter.formatMoney(item.precioUnitario)
        : "Sin Registro";
    },

    setPreciosUnitariosActuales(insumos) {
      insumos.forEach(
        (insumo, i) => (insumos[i].precio = this.auxSetPrecios(insumo))
      );
      this.preciosUnitarios = insumos;
    },

    agregarInsumoCompra(insumo) {
      this.getInsumoxId(insumo.idInsumo);
      this.$refs["modal"].show();
    },

    async getInsumoxId(id) {
      await this.service.getOne("insumo", id).then((data) => {
        this.insumoEncontrado = data;
      });
    },

    toast(data, append = false) {
      this.$bvToast.toast(
        `Se incorporaron ${data.cantidad} existencias al producto`,
        {
          title: `Alta de producto`,
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: append,
        }
      );
    },

    verificarStockMaximo(e) {
      if (
        parseInt(e) + parseInt(this.insumoEncontrado.stock.actual) >
          parseInt(this.insumoEncontrado.stock.maximo) &&
        !this.toastCantidadVisible
      ) {
        this.toastCantidadVisible = true;
        this.$bvToast.toast(
          "Con esta compra sobrepasa el stock máximo\r\
        Stock Máximo Actual: " +
            this.insumoEncontrado.stock.maximo,
          {
            title: "¡Atención!",
            toaster: "b-toaster-top-center",
            solid: true,
            autoHideDelay: 1500,
          }
        );
        setTimeout(() => (this.toastCantidadVisible = false), 2000);
      }
    },

    async añadirCompra() {
      this.compra.fechaCompra = this.compra.fechaCompra.concat("T00:00:00");
      this.compra.insumo.idInsumo = this.insumoEncontrado.id;

      await this.service.save("compras", this.compra).then((data) => {
        this.toast(data);
        this.$refs["modal"].hide();
        this.compra.fechaCompra = "";
        this.compra.cantidad = 0;
        this.compra.precioUnitario = 0;
        this.compra.insumo = {};
        this.getPreciosUnitariosActuales();
      });
    },
  },
  computed: {
    rows() {
      return this.insumosData.length;
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

#imagenBuscar {
  width: 25px;
}

#imagenAgregar {
  width: 20px;
  margin: 0px;
}

.estiloForm {
  font-size: 12px;
  margin-left: 100px;
  font-family: "Baloo Bhaina 2";
  text-align: left;
}

.Badgecategoria {
  width: 140px;
  margin-left: 0px;
  font-size: 11pt;
}

#tablaInsumos {
  width: 100%;
}

.boton {
  margin: auto;
}
#botonModal {
  margin-top: 10%;
  margin-left: 20%;
}

#medida {
  margin-left: 10%;
  margin-top: 5%;
}
</style>
