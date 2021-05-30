<template>
  <div id="home">
    <div id="home1">
      <cabecera v-bind:es-home="true"></cabecera>
      <div id="buscador">
        <h1>Lo pedís, lo llevamos...</h1>
        <b-form-input id="inputBuscador" placeholder="¿Qué comemos hoy?" v-model="buscarText"> </b-form-input>
        <b-button size="sm" class="botonImagenBuscador"  @click="buscar()">
          <img
            src="http://localhost:9001/images/sistema/buscar.png"
          />
        </b-button>
      </div>
      <div v-if="windowMobile" id="pasosCuadro--mobile">
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
      <div v-else  id="pasosCuadro">
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
            v-for="manufacturado in venta"
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
            v-for="manufacturado in venta"
            :key="manufacturado.id"
          >
            <plato-item
              :manufacturadoParam="manufacturado"
            ></plato-item>
        </div>
        </div>
        
      
      </b-card-group>
      <br>
      <b-button class="botonPlatos" @click="$router.push({ path:'/menu'})">¡Todos nuestros platos!</b-button>
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
              <div class="enlaces">
              <a :href="'//www.facebook.com/elbuensabor'" target="_blank"><img src='images/facebook.svg'>ElBuenSabor</a>
              <br/>
              <a :href="'//www.instagram.com/elbuensabor'" target="_blank"><img src='images/instagram.svg'>elbuensabor</a>
               <br/>
              <a :href="'mailto:info@elbuensabor.com'" target="_blank"><img src='images/correo.svg'>info@elbuensabor.com</a>
               <br/>
              <a :href="'tel:+54 261 156789873'" ><img src='images/telefono.svg'>+54 261 156789873</a>
              <br/>
              <a :href="'https://maps.google.com/?q=-32.890848,-68.839388'" ><img src='images/direccion.svg'>San Martín 1087, Mendoza</a>
            </div>
            </div>
        </div>
        <div class="cuadro">
          <iframe
            :src="
              'https://maps.google.com/maps?q=-32.890848,-68.839388&z=15&output=embed'
            "
            width="100%"
            height="100%"
            frameborder="0"
            style="border: 0"
            ></iframe>
          </div>

      </div>
      <div class="footer">
        <img
            src="http://localhost:9001/images/sistema/logo-01.png"
          />
      </div>
      <div class="abajo"></div>
      <Loader v-if="loading" :loading="loading" />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Plato from "@/components/Manufacturado.vue";
import Service from "@/service/Service.js";
import Loader from "@/components/Loader.vue";
import Utils from "@/utilidades/Utils.js";
export default {
  components: {
    cabecera: Header,
    "plato-item": Plato,
    Loader: Loader
  },
  mounted() {
    this.getAllProductos();
      if(window.innerWidth<=426){
        this.windowMobile = true
      }else{
        this.windowMobile = false
      }
     
  },
  data() {
    return {
      windowHeight:false,
      venta: [],
      service: new Service(),
      loading: true,
      utils: new Utils(),
      buscarText:""
    };
  },
  methods: {
      getAllProductos() {
      this.service
        .getAll("manufacturado/masVendidos")
        .then((r) => r.forEach((d) => this.venta.push(d)))
        .then(
          this.service
            .getAll("insumoVenta/masVendidos")
            .then((r) => {
              r.forEach((d) => this.venta.push(d));
              this.loading= false;
            })
        ).catch(this.loading= false)
    },
    buscar(){
      this.$router.push({ name:"MenuBuscar", params:{ buscar:this.buscarText }});
    }
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
#inputBuscador::placeholder{
  color: white;
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
#pasosCuadro--mobile{
  display: none;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;  
}
.cuadro{
  width: 50%;
  display: inline-block;
  height: 428px;
}
.enlaces{
  padding-left: 20px;
}
.enlaces a{
  font-family: "Baloo Bhaina 2";
    color: white;
    font-size: 16pt;
  }

.cuadro img{
  width: 100%;
  height: auto;
}
.enlaces a img{
  display: inline-block;
  margin-top: -4px;
  margin-right: 5px;
  width:22px;
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
 .cuadro{
   width: 100%;
 }
 .enlaces a{
    font-size: 14pt;
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
  #pasosCuadro--mobile {
    margin-top: 220px;
    min-height: 50px;
      height: 100%;
    width: 100vw;
    display: flex;
    overflow-x: scroll;
  text-align: left;
  margin-left: 5%;
  margin-right: 5%;
  }
  .pasos{
    min-width: 340px;
    margin: 10px;
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
  .footer img{
  width: 40%;
}
}
@media (max-width: 375px) {
 #buscador h1{
    font-size: 20pt;
  }
}
@media (max-width: 320px) {
   
  #buscador h1{
    font-size: 18pt;
  }
.enlaces{
  padding-left: 10px;
}
 .footer img{
  width: 60%;
}
}

</style>
