<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral :user="user"></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Stock de insumos</h1>
      <b-nav-form class="buscador">
        <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar insumo" v-model="busqueda"></b-form-input>
        <b-button size="sm" class="botonImagen" type="submit">
          <img src="@/assets/images/sistema/buscar.png" id="imagenBuscar"/>
        </b-button>
      </b-nav-form>

      <b-table hover responsive :items="insumosData" 
      :fields="tituloTabla" 
      @row-dblclicked="verDetalle" 
      :outlined="true" 
      :per-page="perPage" 
      :current-page="currentPage" 
      :borderless="true" 
      id="tablaInsumos" 
      class="tabla"
      :filter="busqueda">
        
        <template v-slot:cell(acción)="row">
          <b-button size="sm" @click="agregarInsumoCompra(row.item.id)" class="botonImagen">
            <img src="@/assets/images/sistema/botonAgregar.png" id="imagenAgregar"/>
          </b-button>
        </template>

        <template v-slot:cell(categoria)="row">
          <b-badge class="Badgecategoria" >{{row.item.rubroInsumo.denominacion}}</b-badge>          
        </template>

        <template v-slot:cell(stockActual)="row">
         {{row.item.stock.actual}}          
        </template>
          <template v-for="(costo, i) in costos">
          <div :key="i"> {{costo}} </div>
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
import Service from "@/service/Service.js";
import axios from "axios";
import Formatter from "@/utilidades/Formatters.js";
export default {
  mounted() {
    this.userVerifica();
    this.getInsumos();
    
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
     
  data() {
    return {
      user:{},

      perPage: 7,
      currentPage: 1,
      tituloTabla: [
        "denominacion",
        "unidadMedida",
        "categoria",
        "stockActual",
        "costo",
        "acción",
      ],
      insumosData: [],
      costos:[],
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
        },
        service : new Service(),
        preciosUnitarios: [],
        formatter: new Formatter(),
        busqueda:''
      };
  },
  methods: {
   userVerifica(){
      this.user=JSON.parse(sessionStorage.getItem('user'));
      if(this.user==undefined){
        this.$router.push({ name: 'Home'})
      }
      if(this.user.rol != "admin"){
        this.$router.push({ name: 'Home'})
      }
    },

     async getInsumos() {
      await this.service.getAll("insumo").then(data=>{
        this.insumosData = data;
        this.getPreciosUnitariosActuales();
      }); 
       console.log("tercero");     
      
       
    },
   
    agregarInsumo() {
      window.location.href = "/añadirInsumo/"; 
    },
    
    verDetalle(record) {
      window.location.href = "/insumoDetalle/" + record.idInsumo;
      
    },
   
    async getPreciosUnitariosActuales() {
      
      await axios.get("http://localhost:9001/buensabor/compras/preciosUnitariosActuales/")
      .then((response) => {
        this.preciosUnitarios = response.data;     
        this.setPreciosUnitariosActuales()
      });
      console.log("segundo");     
      
    },

  

      setPreciosUnitariosActuales(){
      console.log("primero");
      for (let index = 0; index < this.preciosUnitarios.length; index++) { 
        this.costos.push(this.preciosUnitarios[index].precioUnitario);
      }
      console.log(this.costos)
       
      this.insumosData.forEach((insumo, i) =>
        this.costos[i] != undefined ? this.insumosData[i].costo = 
         this.formatter.formatMoney(this.costos[i]) : this.insumosData[i].costo = "Sin registros"
      );
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
  width: 140px;
  margin-left: 0px;
  font-size: 11pt;
}


</style>
