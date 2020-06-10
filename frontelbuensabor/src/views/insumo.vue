<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral>    
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1>Detalle de insumo</h1>
        <div v-if="esInsumoVenta" id="venta">
          <img :src="'@/assets/images/productos/' + insumoEncontrado.imagen" class="imagenProducto"/>
            
            <h3>
               {{insumoEncontrado.denominacion}}
                <b-button size="sm" @click="modificarInsumo()" class="botonImagen">
                   <img src="@/assets/images/sistema/editar.png" id="imagenAgregar"/>
                </b-button>
                <b-button size="sm" @click="eliminarInsumo()" class="botonImagen">
                   <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar"/>
                </b-button>
            </h3>
            <div class="stock">
                <div id="stockColor" style="background-color:#ED3247"></div>Stock {{stock}} 
                <b-badge class="categoria">{{insumoEncontrado.categoria}}</b-badge>
            </div>
            <div id="descripcionInsumo">
                <h2>Descripción</h2>
                <p>{{insumoEncontrado.descripcion}}</p>
            </div>
            <div id="infoProductoVenta">
              <b-card  header="Stock actual" class="tarjetaInfo">
                <b-card-text>{{insumoEncontrado.stockActual}} {{insumoEncontrado.unidadMedida}}</b-card-text>
              </b-card>            
              <b-card  header="Stock min" class="tarjetaInfo">
                <b-card-text>{{insumoEncontrado.stockMin}} {{insumoEncontrado.unidadMedida}}</b-card-text>
              </b-card>
              <b-card  header="Stock max" class="tarjetaInfo">
                <b-card-text>{{insumoEncontrado.stockMax}} {{insumoEncontrado.unidadMedida}}</b-card-text>
              </b-card>
              <b-card  header="Costo" class="tarjetaInfo">
                <b-card-text>{{insumoEncontrado.costo}}</b-card-text>
              </b-card>
              <b-card  header="Precio de venta" class="tarjetaInfo">
                <b-card-text>${{insumoEncontrado.precioVenta}}</b-card-text>
              </b-card>
            </div>
            <div class="HistorialCompra">
                Historial de Compra
               <b-table hover responsive small :items="ordenCompra" :fields="tituloTabla"  :outlined=true :per-page="perPage" :current-page="currentPage" :borderless=true id="tablaInsumos" class="tabla">
                  <template v-slot:cell(acción)="row">
                    <b-button size="sm" @click="eliminarInsumo(row.item.id)" class="botonImagen">
                      <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar"/>
                    </b-button>
                  </template>
                  <template v-slot:cell(precioTotal)>
                    {{ordenCompra.precioUnitario}}
                  </template>
                 
                </b-table>   
                <b-button pill class="boton" size="md">Añadir </b-button>
                <b-pagination v-model="currentPage" size="sm" align="right" :total-rows="rows" :per-page="perPage"  aria-controls="my-tablaInsumos" class="paginador">
                </b-pagination>
            </div>           
            
            
        </div>
         
        <div v-else id="insumo">          
            <h3>
                {{insumoEncontrado.denominacion}}
                <b-button size="sm" @click="modificarInsumo()" class="botonImagen">
                   <img src="@/assets/images/sistema/editar.png" id="imagenAgregar"/>
                </b-button>
                <b-button size="sm" @click="eliminarInsumo()" class="botonImagen">
                   <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar"/>
                </b-button>
            </h3>
            <div class="stock">
                <div id="stockColor"  style="background-color:#ED3247"></div>Stock {{stock}} 
                <b-badge class="categoria">{{insumoEncontrado.categoria}}</b-badge>
            </div>
            
            <div id="infoProductoVenta">
              <b-card  header="Stock actual" class="tarjetaInfo">
                <b-card-text>{{insumoEncontrado.stockActual}} {{insumoEncontrado.unidadMedida}}</b-card-text>
              </b-card>            
              <b-card  header="Stock min" class="tarjetaInfo">
                <b-card-text>{{insumoEncontrado.stockMin}} {{insumoEncontrado.unidadMedida}}</b-card-text>
              </b-card>
              <b-card  header="Stock max" class="tarjetaInfo">
                <b-card-text>{{insumoEncontrado.stockMax}} {{insumoEncontrado.unidadMedida}}</b-card-text>
              </b-card>
              <b-card  header="Costo" class="tarjetaInfo">
                <b-card-text>${{insumoEncontrado.costo}}</b-card-text>
              </b-card>
              
            </div>
            <div class="HistorialCompra">
                Historial de Compra
                <b-table hover responsive small :items="ordenCompra" :fields="tituloTabla"  :outlined=true :per-page="perPage" :current-page="currentPage" :borderless=true id="tablaInsumos" class="tabla">
                  <template v-slot:cell(acción)="row">
                    <b-button size="sm" @click="eliminarInsumo(row.item.id)" class="botonImagen">
                      <img src="@/assets/images/sistema/eliminar.png" id="imagenAgregar"/>
                    </b-button>
                  </template>
                  <template v-slot:cell(precioTotal)>
                    {{ordenCompra.precioUnitario}}
                  </template>
                 
                </b-table>    
                <b-button pill class="boton" size="md">Añadir </b-button>
                <b-pagination v-model="currentPage" size="sm" align="right" :total-rows="rows" :per-page="perPage"  aria-controls="my-tablaInsumos" class="paginador">
                </b-pagination>
            </div>           
            
        </div>
    </b-container>
    
    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
export default {
   mounted() {
    this.getInsumosxId();
    this.getOrdenCompra();
    
  },
  components: {
    "menuLateral": MenuLateral,
    "cabecera":Header
  },
  data() {
      return {
        perPage: 4,
        currentPage: 1,   
        tituloTabla: ['id','fechaDeCompra', 'cantidad', 'precioUnitario','precioTotal','acción'],
        esInsumoVenta:false,
        insumosData:[],
        insumoEncontrado:[],
        ordenCompra:[],
        stock:"",
       
      }
    },
    
    methods: {
     async getInsumosxId(){
        var parametroId = parseInt(this.$route.params.id,10);        
        const res = await fetch("/insumos.json");
        const resJson = await res.json();         
        
        this.insumoEncontrado = await resJson.insumos.find(
        insumo => insumo.id === parametroId
      );
      this.verificaStock();
      this.verificaInsumo();
      
     },

      verificaInsumo(){
          if(this.insumoEncontrado.precioVenta != undefined){
            this.esInsumoVenta=true;
          }else{
            this.esInsumoVenta=false;            
          }

      },

      async getOrdenCompra(){
          const res = await fetch("/ordenCompra.json");
          const resJson = await res.json();
          this.ordenCompra = resJson.ordenCompra;
          
          
      },

      verificaStock(){
        var clase
        if(parseInt(this.insumoEncontrado.stockActual,10) <= parseInt(this.insumoEncontrado.stockMin,10)){
          this.stock="isuficiente";
          clase = document.getElementById('stockColor');
          console.log(clase);
          clase.style.backgroundColor = "#ED3247";            
          console.log(clase);
          console.log("insuficiente");
        }else if(parseInt(this.insumoEncontrado.stockActual,10) > parseInt(this.insumoEncontrado.stockMin,10) && parseInt(this.insumoEncontrado.stockActual,10) < parseInt(this.insumoEncontrado.stockMax,10)){
            this.stock="moderado";
            clase = document.getElementById('stockColor');
            console.log(clase);
            clase.style.backgroundColor = "#FFEB3B";            
            console.log(clase);
        }else{
            this.stock="suficiente";
            clase = document.getElementById('stockColor');
            
            clase.style.backgroundColor = "#8BC34A";   
            console.log("suficiente");
        }
      }

    },
    computed: {
      rows() {
        return this.ordenCompra.length
      }
    }
  
}
</script>
<style>

h1{
  font-family: 'Baloo Bhaina 2';
  font-weight: 600;
  font-size: 18pt; 
  color:#151515;
  text-align: left;
}

h2{
  font-family: 'Baloo Bhaina 2';
  font-weight: 600;
  font-size: 13pt; 
  color:#151515;
  text-align: left;
}

h3{
   font-family: 'Baloo Bhaina 2';
  font-weight: 600;
  font-size: 22pt; 
  color:#151515;
  text-align: left;
}



.costado{
    background-image: url("../assets/images/sistema/reticulaVertical.png");
    background-repeat: repeat-y;
    position: absolute;
    left: 0;
    height: 100%;
    min-width: 200px;
    background-size: contain;
}

.informacion{
  
  width: 50%;
  min-height: 100px; 
  margin-left: 30%;
  padding: 20px;
  padding-top:50px;
  font-family: 'Baloo Bhaina 2';
  color:#151515;
  text-align: left;

}


.buscador{
  float:right;
  margin-bottom: 25px;
}


.botonImagen{
    
  background-color:transparent;
  border:none;
  padding: 0px;
}
.botonImagen:hover{
  background-color:transparent;
  border:none;
}

.botonImagen:active{
  background-color:transparent;
  border:none;
}
.botonImagen:visited{
  background-color:transparent;
  border:none;
}

.botonImagen:focus{
  background-color:transparent;
  border:none;
}

#imagenBuscar{
  width: 25px;
}

#imagenAgregar{    
  width: 20px;
  margin:0px;
  margin-left: 10px;
}

.tabla{
  text-align: left;
}

.page-link{
   color: #151515;
  border:none;
  
}
.boton{
  float:left;
  background-color: #E7511E;
  width: 105px;
  height: 30px;
  
}

.imagenProducto{
    width: 100%;
    border-top-left-radius:15px;
    border-top-right-radius:15px;
    height: 300px;
    object-fit:cover;
    margin-bottom: 30px;
}

#stockColor{
    
    width: 20px;
    height: 20px;
    border-radius:300px;
    float:left;
    margin-right: 10px;
}

.categoria{
    border: 1px solid  #E7511E;
    margin-left: 30px;
    padding: 5px;
    color: #E7511E;
    font-weight: 400;
    font-size: 12pt;
    background-color: #FFFFFF;
    border-radius: 10px;
    width: 130px;
    
}

#descripcionInsumo{
    margin-top: 20px;
}

#descripcionInsumo p{
    
 font-family: 'Baloo Bhaina 2';
  font-weight: 400;
  font-size: 11pt; 
  color:#151515;
  line-height : 17px;
  }

.tarjetaInfo{
  text-align: center;
  width: 116px;
  float:left;
  margin:5px;
  border-radius: 15px;
  font-weight: 400;
  font-size: 11pt; 
  color:#151515;
}

.card-header{
  background-color: #151515;
  padding-left:5px;
  padding-right:5px;
  border-radius: 15px;
  color:#FFFFFF;
}

.card-body{
  padding-top: 10px;
  padding-bottom: 10px;
}

.HistorialCompra{ 
  width: 100%;
  margin-top: 20px;
  float:left;
  
}
.HistorialCompra table{
font-size: 10pt;
}



@media screen and (max-width: 774px){
    .costado{
        background-image: url("../assets/images/sistema/reticulaVertical-mobile.png");
        width: 60px;
        min-width: 60px;
    }

    .informacion{
      width: auto;
      min-height: 100px; 
      margin-left: 60px;
      z-index: 0;
    }
    .botonImagen{
      display: inline;
    }
}


@media screen and (max-width: 604px){
    .informacion{
      font-size: 10pt; 
         
    }
    .table td, .table th{
      padding:0.4rem;
    }
    .buscador{
      float:left;
     
    }
 
}

</style>