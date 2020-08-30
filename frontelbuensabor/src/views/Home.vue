<template>
  <div id="home">
    <div id=home1>
      <cabecera v-bind:es-home="true"></cabecera>
      <div id="buscador">
        <h1>Lo pedís, lo llevamos...</h1>
        <b-form-input id="inputBuscador"></b-form-input>  
        <b-button
            size="sm"
            class="botonImagen"
          >
            <img src="http://localhost:9001/images/sistema/buscar.png" id="imagenBuscar" />
          </b-button>      
      </div>
      <div id="pasosCuadro">
        <div class="pasos">
          <img src="http://localhost:9001/images/sistema/icono pasos-01.png" width="70px" class="imgPasos">
          <div class="pasosTexto">
             <strong>Seleccioná</strong> los productos<br> que quieras.
          </div>         
        </div>
        <div class="pasos">
          <img src="http://localhost:9001/images/sistema/icono pasos-02.png" width="90px" class="imgPasos">
          <div class="pasosTexto">
             <strong>Elegí</strong> el método de<br> pago que prefieras.
          </div>         
        </div>
        <div class="pasos">
          <img src="http://localhost:9001/images/sistema/icono pasos-03.png" width="90px" class="imgPasos">
          <div class="pasosTexto">
             <strong>Seleccioná</strong> la forma<br> de entrega.
          </div>         
        </div>
        
      
      </div>
   
  </div>
  <div id="home2">
    <h2>Los que todos amamos</h2>

      <b-card-group deck>
        <div class="contenedorTarjeta"
          v-for="manufacturado in manufacturadosData"
          :key="manufacturado.id"
         
        >
          <plato-item :manufacturadoParam="manufacturado" class="tarjetaPlato"></plato-item>
        </div>
      </b-card-group>
    </div>
    <b-row>
      <b-col class="abajo" xs="12" sm="12" md="12" lg="12" xl="12"></b-col>
    </b-row>
  </div>
</template>
<script>

import Header from "@/components/Header.vue";
import Plato from "@/components/Manufacturado.vue";
import Service from "@/service/Service.js";

export default {
 
  components: {    
    cabecera: Header,
    "plato-item": Plato,
  },
  mounted() {    
    this.getManufacturados();
    
  },
  data() {
    return {
     
      manufacturadosData: [],
      service: new Service(),
   
    };
  },
  methods: {    
  
    async getManufacturados() {
      await this.service.getAll("manufacturado").then(data => {
        this.manufacturadosData = data;        
       
      });
    },
}
}
</script>
<style>
#buscador h1{
  color:#FFFFFF;
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 22pt;
}

h2{
   color: #151515;
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 22pt;
}
#home{
  background-color: #F2E6D1;
 
}
#home1{  
  background-image: url("http://localhost:9001/images/sistema/fondo.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  min-height: 750px;
  width: 100%;  
}

#home2{
  min-height: 50px;
   padding-left: 150px;
  padding-right: 150px;
  padding-top: 80px;
}
#inputBuscador{
  background-color: rgba(255, 255, 255, 0.5);
  border-color: black;
  border:2;
  width: 90%;
}
#buscador{
  width: 40%;
  margin-top:40px;
  margin-left: auto;
  margin-right: auto;
}
#pasosCuadro{
  margin-top: 220px;
  min-height: 50px;
  margin-left: 100px;
   margin-right: 100px;
}
.pasos{
  color:white;
  font-family: "Baloo Bhaina 2";
  font-weight: 400;
  font-size: 14pt;
  float:left;
  margin-left: 40px;
  margin-right: 40px;
}
.pasosTexto{
  display: block;
  float:left;
  padding: 20px;
}
.imgPasos{
  float:left;
}

.botonImagen{
float:left;
}

.tarjetaPlato{
  width: 100%;
  float:left;
  
}
.contenedorTarjeta{
  margin:20px;
  width: 25%;
  background-color: transparent;
}
.imagenBuscar{
float:left;
width: 10px;
}
</style>




