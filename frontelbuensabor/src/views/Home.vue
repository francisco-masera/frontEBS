<template>
  <div id="home">
    <div id="home1">
      <cabecera v-bind:es-home="true"></cabecera>
      <div id="buscador">
        <h1>Lo pedís, lo llevamos...</h1>
        <b-form-input id="inputBuscador"></b-form-input>
        <b-button size="sm" class="botonImagenBuscador">
          <img
            src="http://localhost:9001/images/sistema/buscar.png"
          />
        </b-button>
      </div>
      <div id="pasosCuadro">
        <div class="pasos">
          <img
            src="http://localhost:9001/images/sistema/icono pasos-01.png"
            width="70px"
            class="imgPasos"
          />
          <div class="pasosTexto">
            <strong>Seleccioná</strong> los productos<br />
            que quieras.
          </div>
        </div>
        <div class="pasos">
          <img
            src="http://localhost:9001/images/sistema/icono pasos-02.png"
            width="90px"
            class="imgPasos"
          />
          <div class="pasosTexto">
            <strong>Elegí</strong> el método de<br />
            pago que prefieras.
          </div>
        </div>
        <div class="pasos">
          <img
            src="http://localhost:9001/images/sistema/icono pasos-03.png"
            width="90px"
            class="imgPasos"
          />
          <div class="pasosTexto">
            <strong>Seleccioná</strong> la forma<br />
            de entrega.
          </div>
        </div>
      </div>
    </div>
    <div id="home2">
      

      <b-card-group class="platos">
        <h2>Los que todos amamos</h2>
        <div v-if="windowMobile" class="contenedorCard--mobile">
          <div
            class="contenedorTarjeta"
            v-for="manufacturado in manufacturadosData"
            :key="manufacturado.id"
          >
            <plato-item
              :manufacturadoParam="manufacturado"
            ></plato-item>
        </div>
        </div>
        <div v-else class="contenedorCard">
          <div
            class="contenedorTarjeta"
            v-for="manufacturado in manufacturadosData"
            :key="manufacturado.id"
          >
            <plato-item
              :manufacturadoParam="manufacturado"
            ></plato-item>
        </div>
        </div>
        
      
      </b-card-group>
      <br>
      <b-button class="botonPlatos">¡Todos nuestros platos!</b-button>
    </div>

      <div class="abajo"></div>
      <div id="home3">
        <div class="cuadro">
          <img
            src="http://localhost:9001/images/sistema/nosotros.png"
          />
        </div>
        <div class="cuadro" style="background-color:#1f91b6">
            <div class="cuadroText">
              <h1 style="color:white">Un poco sobre nosotros</h1>
              Comenzamos este emprendimiento en el año 2017, con la esperanza de poder crecer como profesionales y generar una gran amistad entre nosotros. Nos enfocamos en un producto de calidad, intentando brindar lo mejor de nosotros para que nuestros clientes queden satisfechos. 
              ¡Esperamos verte nuevamente por aquí!
            </div>
        </div>
        
        <div class="cuadro" style="background-color:#e7511e">
            <div class="cuadroText">
              <h1 style="color:white">¡Contáctanos!</h1>
              
            </div>
        </div>
        

      </div>
      <div class="footer">
        <img
            src="http://localhost:9001/images/sistema/logo-01.png"
          />
      </div>
      <div class="abajo"></div>
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
      if(window.innerWidth<=426){
        this.windowMobile = true
      }else{
        this.windowMobile = false
      }
  },
  data() {
    return {
      windowHeight:false,
      manufacturadosData: [],
      service: new Service(),
    };
  },
  methods: {
    async getManufacturados() {
      await this.service.getAll("manufacturado").then((data) => {
        this.manufacturadosData = data;
      });
    },
  },
};
</script>
<style>
#buscador h1 {
  color: #ffffff;
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 22pt;
}

h2 {
  color: #151515;
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 22pt;
}
#home {
  background-color: #ededed;
}
#home1 {
  background-image: url("http://localhost:9001/images/sistema/fondo.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 750px;
  width: 100%;
}

#home2 {
  text-align: center;
  padding-top: 65px;
  width: 100%;
}
#inputBuscador {
  background-color: rgba(255, 255, 255, 0.5);
  border-color: black;
  border: 2;
  width: 100%;
  color:black;
}
#buscador {
  width: 35%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
#pasosCuadro {
  margin-top: 220px;
  min-height: 50px;
  text-align: center;
  width: 100%;
  display:flex;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
}
.pasos {
  color: white;
  font-family: "Baloo Bhaina 2";
  font-weight: 400;
  font-size: 14pt;
  padding-left: 1%;
  padding-right: 1%;
  display: inline-block;
  text-align: left;
}
.pasosTexto {
  display: block;
  float: left;
  padding: 20px;
}
.imgPasos {
  float: left;
}

.botonImagenBuscador {
  background-color: transparent;
  border: none;
  padding: 0px;
  outline: none;
  position: relative;
    float: right;
    z-index: 98;
    min-width: 0px;
    margin-top: -30px;
    margin-right: 10px;
}
.botonImagenBuscador img{
  width: 60%;
}

.botonImagenBuscador:hover {
  background-color: transparent !important;
  border: none !important;
  outline: none;
}

.botonImagenBuscador:active {
  background-color: transparent !important;
  border: none !important;
  outline: none;
}
.botonImagenBuscador:visited {
  background-color: transparent !important;
  border: none !important;
  outline: none;
}

.botonImagenBuscador:focus {
  background-color: transparent !important;
  border: none !important;
  outline: none;
}
.platos{
  width: 70%;
  display: inline-block;
  text-align: center;
}
.contenedorCard{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.contenedorTarjeta {
  max-width: 350px;
  margin: 10px;
  display: inline-block;
  min-width: 200px;
  margin-bottom: 50px;
}
.contenedorCard--mobile{
  display: none;
}
.card-body{
  padding:0px;
  text-align: left;
}

.botonPlatos{
  background-color: #e7511e;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 90px;
}
.botonPlatos:hover{
  border: #e7511e;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  color: #e7511e;
}

.botonPlatos:visited{
   background-color: #e7511e;
  color: #ffffff;
}
.botonPlatos:focus{
   background-color: #e7511e;
  color: #ffffff;
}
.botonPlatos:visited{
   background-color: #e7511e;
  color: #ffffff;
}

.botonPlatos:active{
   border: #e7511e!important;
  background-color: #ffffff !important;
  border-style: solid!important;
  border-width: 1px!important;
  color: #e7511e!important;
}

#home3{
  width: 100%;
  
}
.cuadro{
  width: 50%;
  display: inline-block;
  height: 428px;
}
.cuadro img{
  width: 100%;
  height: auto;
}

.cuadroText{
  width: 80%;
  margin: 10%;
  text-align: left;
  color: white;
}

.footer{
  background-color: #1f91b6;
  text-align: center;
  width: 100%;
  padding: 30px;
}
.footer img{
  width: 20%;
}
@supports(object-fit: cover){
    .cuadro img{
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
}
@media (max-width: 1600px) { 
    .platos{
      width: 80%;
    }
}
@media (max-width: 1600px) { 
    .platos{
      width: 80%;
    }
}
@media (max-width: 1280px) {
  .platos{
  width: 90%;
}
}
@media (max-width: 769px) {
  .contenedorTarjeta {
    width: 300px;
    min-width: inherit;
  }
  }
  
@media (max-width: 640px) {
   #buscador {
    width: 70%;
  }
  #pasosCuadro {
  margin-top: 150px;
}
 .contenedorTarjeta {
    width: 250px;
    min-width: inherit;
  }

}

@media (max-width: 426px) {
  #pasosCuadro {
  display:block;
  text-align: left;
  margin-left: 5%;
  margin-right: 5%;
  }
  #buscador {
    width: 80%;
  }
  .contenedorCard--mobile{
    height: 100%;
    width: 100vw;
    display: flex;
    overflow-x: scroll;
    padding-top: 30px;
    margin-bottom: 20px;
    margin-right: 30px;
    padding-right: 40px;
  }
  .contenedorTarjeta{
    min-width: 300px;
  }
}
@media (max-width: 375px) {
 #buscador h1{
    font-size: 20pt;
  }
   #pasosCuadro {
  margin-top: 80px;
}
}
@media (max-width: 320px) {
   #pasosCuadro img{
     width: 20%;
     margin-right: 80%;
  }
  #buscador h1{
    font-size: 18pt;
  }

}

</style>
