<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>

    <div class="costado"></div>
    <b-container class="informacion">
      <h1 id="titulo">Modificar insumo</h1>
      <div  id="paso1">
      <h2>Información básica</h2>
      <b-form>
          <div class="lineaForm">
                <label class="labelForm">
                  Nombre
                </label>
                <b-form-input class="campoForm" v-model="insumoEncontrado.denominacion" id="nombreInsumo">
                </b-form-input>*
            </div>
            <div class="lineaForm">
                <label class="labelForm">
                  Stock mínimo
                </label>
                <b-form-input  class="campoForm" id="stockMin" v-model="insumoEncontrado.stockMin">
                </b-form-input>
                <label class="labelForm">
                  Stock máximo
                </label>
                <b-form-input  class="campoForm" id="stockMax" v-model="insumoEncontrado.stockMax">
                </b-form-input>*
            </div>
            <div class="lineaForm">
                <label class="labelForm">
                  Unidad de medida
                </label>
                <b-form-select id="unidadMedida" class="campoForm"
                :options="[{ text: 'Seleccione...', value: null }, 'Unidades', 'Kilogramos', 'Mililitros']"
                :value="null"
              ></b-form-select>*
              <b-form-group id="contenedorCheck">
                  <b-form-checkbox id="checkbox-1" name="checkbox-1" value="venta" v-model="esInsumoVenta" unchecked-value="no_venta">
                      Directo a venta
                    </b-form-checkbox>
                    <b-form-checkbox id="checkbox-2"  name="checkbox-1" value="extra" v-model="insumoEncontrado.esExtra" unchecked-value="no_extra">
                        Extras
                    </b-form-checkbox>
                </b-form-group>
            </div>
            <div class="lineaForm">
                <h4 id="datos">*Datos necesarios</h4>
            </div>
            <div class="lineaFormDerecha" style="float:right">
                <b-button pill class="boton2" size="md">Cancelar</b-button>
                <b-button pill class="boton" size="md" @click="siguiente1" >Siguiente</b-button>
            </div>
      </b-form>
      </div>

      <div  id="paso2">
      <h2>Información de venta</h2>
      <b-form>
          <div class="lineaForm">
                <label class="labelForm">
                  Precio de venta
                </label>
                <b-form-input  class="campoForm" id="precioVenta" v-model="insumoEncontrado.precioVenta">
                </b-form-input>*
            </div>
            <div class="lineaForm" id="lineaDescripcion">
                <label class="labelForm">
                  Descripción
                </label>
                <b-form-textarea id="descripcion" class="campoForm" v-model="insumoEncontrado.descripcion" placeholder="Enter something..." rows="3" max-rows="6">
                </b-form-textarea>*
            </div>
            <div class="lineaForm">
                <label class="labelForm">
                  Imagen
                </label>
                <b-form-file  class="campoForm" id="imagen"></b-form-file>
            </div>
            <div class="lineaForm">
                <h4 id="datos">*Datos necesarios</h4>
            </div>
            <div class="lineaFormDerecha" style="float:right">
                <b-button pill class="boton2" size="md">Cancelar</b-button>
                <b-button pill class="boton" size="md" @click="siguiente2" >Siguiente</b-button>
            </div>
      </b-form>
      </div>

     <div  id="paso3">
      <h2>Categoría</h2>
      <b-form>
          <div class="lineaForm" v-for="rubro in rubroInsumos" :key="rubro.id">
              
               <b-button pill class="boton2" size="md">{{rubro.denominacion}}</b-button>
              
          </div>
            
            <div class="lineaFormDerecha" style="float:right">
                <b-button pill class="boton2" size="md">Cancelar</b-button>
                <b-button pill class="boton" size="md">Guardar</b-button>
            </div>
      </b-form>
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
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {  
    rubroInsumos:[
        {id:1, denominacion:"Bebidas"},
        {id:2, denominacion:"Lacteos"},
        {id:11, denominacion:"con alcohol"},
        {id:12, denominacion:"sin alcochol"},
        {id:21, denominacion:"Leche"},
        {id:22, denominacion:"Quesos"},
        {id:111, denominacion:"Vinos"},
        {id:112, denominacion:"Cerveza"},
        {id:222, denominacion:"Cremoso"},
    ],
      
      insumoEncontrado:[],
      esInsumoVenta: false,
    };
    
  },

  methods: {
    siguiente1(){
      document.getElementById("paso1").style.display="none";
      if(this.esInsumoVenta){
        document.getElementById("paso2").style.display="block";
      }else{
        document.getElementById("paso3").style.display="block";
      }
    },
    siguiente2(){
      document.getElementById("paso2").style.display="none";
      document.getElementById("paso3").style.display="block";
    },

    async getInsumosxId() {
      var parametroId = parseInt(this.$route.params.id, 10);
      const res = await fetch("/insumos.json");
      const resJson = await res.json();
      this.insumoEncontrado = await resJson.insumos.find(
        (insumo) => insumo.id === parametroId
      );
      console.log(this.insumoEncontrado);
      this.verificaInsumo();
     
    },
    verificaInsumo() {
      if (this.insumoEncontrado.precioVenta != undefined) {
        this.esInsumoVenta = true;
        console.log("venta");
      } else {
        this.esInsumoVenta = false;
        console.log("no venta");
      }
    },
   
  }
};
</script>
<style>


#titulo{
    line-height: 1.2rem;
}
#nombreInsumo{
    margin-top: -5px;
    width: 85%;
}
#stockMin{
    margin-top: -5px;
    width: 30%;
    margin-right: 30px;
}

#stockMax{
    margin-top: -5px;
    width: 30%;
}
#unidadMedida{
    margin-top: -5px;
    width: 40%;
    margin-right: 30px;

}

.lineaForm{
   width: 100%;
    margin-top: 20px;
    min-height: 40px;
}

#datos{
    float:right;
}

#paso1{
  display:block;
}
#paso2{
  display:none;
}
#paso3{
  display:none;
}
#precioVenta{
    margin-top: -5px;
    width: 80%;
}

#lineaDescripcion{
  min-height: 80px;
}

#descripcion{
 float:right;
  width: 80%;
  margin-left: 10px;
  border:1px solid #ced4da;
}

#imagen__BV_file_outer_{
   margin-top: -5px;
    width: 90%;
    float:right;
}

</style>