<template>
  <div>
    <cabecera :user="user"></cabecera>
    <div id="nav"><menuLateral :user="user"></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Stock de insumos</h1>
      <b-nav-form class="buscador">
        <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar insumo"></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit">
          <img src="@/assets/images/sistema/buscar.png" id="imagenBuscar"/>
        </b-button>
      </b-nav-form>
      <b-table hover responsive :items="insumosData" :fields="tituloTabla" @row-dblclicked="verDetalle" :outlined="true" :per-page="perPage" :current-page="currentPage" :borderless="true" id="tablaInsumos" class="tabla">
        <template v-slot:cell(acción)="row">
          <b-button size="sm" @click="agregarInsumoCompra(row.item.id)" class="botonImagen">
            <img src="@/assets/images/sistema/botonAgregar.png" id="imagenAgregar"/>
          </b-button>
        </template>
        <template v-slot:cell(categoria)="row">
          <b-badge class="Badgecategoria" >{{row.item.categoria}}</b-badge>
          
        </template>
      </b-table>
      <b-button pill class="boton" size="md" @click="agregarInsumo()">Nuevo</b-button>
      <b-pagination v-model="currentPage" size="sm" align="right" :total-rows="rows" :per-page="perPage" aria-controls="my-tablaInsumos" class="paginador">
      </b-pagination>
    </b-container>
     <b-modal ref="modal" hide-footer hide-header centered title>
    <h2>Añadir existencia</h2>
    <h4>{{insumoEncontrado.denominacion}}</h4>
    <form class="estiloForm">
      <table>
       <tr>
        <td>
       <label class="mr-sm-2" for="inline-form-custom-select-pref">Fecha</label>
       </td>
      <td>
       <b-form-datepicker  for="inline-form-custom-select-pref" id="example-datepicker" size="sm"></b-form-datepicker>
      </td>
      </tr>
      <tr>
        <td> <label class="mr-sm-2" for="inline-form-custom-select-pref">Unidad de medida</label></td>
        <td>{{insumoEncontrado.unidadMedida}}</td>
      </tr>
      <tr>
        <td> <label class="mr-sm-2" for="inline-form-custom-select-pref">Cantidad</label></td>
        <td> <b-form-input></b-form-input></td>
      </tr>
      <tr>
        <td> <label class="mr-sm-2" for="inline-form-custom-select-pref">Precio por unidad</label></td>
        <td> <b-form-input></b-form-input></td>
      </tr>
      <tr>
       <b-button pill class="boton" size="md">Añadir</b-button>
      </tr>
      </table>
    </form>
    
  </b-modal>
    <router-view />
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
      props: {
        user:{},
      },
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      tituloTabla: [
        "denominacion",
        "unidad",
        "costo",
        "stockActual",
        "categoria",
        "acción",
      ],
      insumosData: [],
      insumo: {
        id: 0,
        denominacion: "",
        unidad: "",
        costo: 0,
        stockActual: 0,
        categoría: "",
      },
       insumoEncontrado: {
            id:"",
            denominacion:"",
            unidad:"",
            costo:0,
            categoria:"",
            unidadMedida:0,
            stockActual:0,
            stockMin:0,
            stockMax:0,
            precioVenta:0,
            descripcion: "",
            imagen:""
        }
    };
  },
  methods: {
    async getInsumos() {
      
      const res = await fetch("/insumos.json");
      const resJson = await res.json();
      this.insumosData = resJson.insumos;
     
    },

    agregarInsumo() {
      window.location.href = "/añadirInsumo/"; 
    },
    verDetalle(record) {
      this.$router.push({ name: 'Insumo', params: {user: this.user, id:record.id }})
      
    },
    agregarInsumoCompra(id){   
     this.$refs['modal'].show()  
      this.getInsumoXid(id);
    },
    async getInsumoXid(id) {
      
      const res = await fetch("/insumos.json");
      const resJson = await res.json();
      
      this.insumoEncontrado = await resJson.insumos.find(
        insumo => insumo.id === id
      );
      
    }
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

.estiloForm{
  font-size: 12px;
  margin-left: 100px;
  font-family: "Baloo Bhaina 2";
  text-align: left;
}

.Badgecategoria{
  width: 90px;
  margin-left: 0px;
  font-size: 11pt;
}


</style>
