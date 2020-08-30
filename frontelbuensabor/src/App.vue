<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap");

h1 {
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 18pt;
  color: #151515;
  text-align: left;
}

h2 {
  font-family: "Baloo Bhaina 2";
  font-weight: 500;
  font-size: 15pt;
  color: #151515;
  text-align: left;
}

h3 {
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 22pt;
  color: #151515;
  text-align: left;
}

h4 {
  font-family: "Baloo Bhaina 2";
  font-weight: 400;
  font-size: 11pt;
}

p {
  font-family: "Baloo Bhaina 2";
  font-weight: 400;
  font-size: 12pt;
  color: #151515;
}

.labelForm {
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 12pt;
  color: #151515;
  float: left;
}

.campoForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  font-size: 11pt;
  margin-left: 10px;
  float: left;
}

.abajo {
  background-image: url("http://localhost:9001/images/sistema/reticula.png");
  background-repeat: repeat-x;
  width: 100%;
  background-color: #f2e6d1;
  min-height: 60px;
  background-size: contain;
  bottom: 0;
  margin-top: 0px;
}

.boton {
  float: left;
  border: none;
  background-color: #e7511e;
  color: #ffffff;
  font-weight: 600;
  width: 105px;
  height: 30px;
  margin: 5px;
  margin-bottom: 90px;
}

.boton:hover {
  border: #e7511e;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  color: #e7511e;
}

.boton:active {
  float: left;
  border: none;
  background-color: #e7511e;
  color: #ffffff;
}
.boton:visited {
  float: left;
  border: none;
  background-color: #e7511e;
  color: #ffffff;
}

.boton:focus {
  border: #e7511e;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  color: #e7511e;
}

.boton2 {
  float: left;
  color: #e7511e !important;
  border: #e7511e;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  font-weight: 600;
  width: 105px;
  height: 30px;

  margin: 5px;
}

.boton2:hover {
  border: none;
  background-color: #e7511e;
  color: #ffffff !important;
}
.boton2:focus {
  border: none;
  background-color: #e7511e;
  color: #ffffff !important;
}

.boton2:visited {
  border: #e7511e;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  color: #e7511e;
}
.boton2:active {
  border: #e7511e;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  color: #e7511e;
}

.buscador {
  float: right;
  margin-bottom: 25px;
}

.botonImagen {
  background-color: transparent;
  border: none;
  padding: 0px;
  display: inline-block;
  margin: 5px;
}

.botonImagen:hover {
  background-color: transparent;
  border: none;
}

.botonImagen:active {
  background-color: transparent;
  border: none;
}
.botonImagen:visited {
  background-color: transparent;
  border: none;
}

.botonImagen:focus {
  background-color: transparent;
  border: none;
}

.tarjetaInfo {
  text-align: center;
  width: 116px;
  float: left;
  margin: 5px;
  border-radius: 15px;
  font-weight: 400;
  font-size: 11pt;
  color: #151515;
}

.infoProductoVenta {
  float: right;
}

.lineaFormDerecha {
  margin-top: 50px;
  float: right;
  margin-right: 0px;
  margin-bottom: 50px;
}
.costado {
  background-image: url("http://localhost:9001/images/sistema/reticulaVertical.png");
  background-repeat: repeat-y;
  position: absolute;
  left: 0;
  height: 100%;
  min-width: 200px;
  background-size: contain;
}
.imagenProducto {
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 30px;
}

.informacion {
  width: 50%;
  min-height: 100px;
  margin-left: 30%;
  padding: 20px;
  padding-top: 50px;
  font-family: "Baloo Bhaina 2";
  color: #151515;
  margin-bottom: 100px;
}

#imagenAgregar {
  width: 20px;
  margin: 0px;
  margin-left: 10px;
}
.page-link {
  color: #151515;
  border: none;
}

.tabla {
  text-align: left;
}

@media screen and (max-width: 774px) {
  .costado {
    background-image: url("http://localhost:9001/images/sistema/reticulaVertical-mobile.png");
    width: 60px;
    min-width: 60px;
  }

  .informacion {
    width: auto;
    min-height: 100px;
    margin-left: 60px;
    z-index: 0;
  }
  .botonImagen {
    display: inline;
  }
}

.Badgecategoria {
  border: 1px solid #e7511e;
  margin-left: 30px;
  padding: 5px;
  color: #e7511e;
  font-weight: 400;
  font-size: 12pt;
  background-color: #ffffff;
  border-radius: 10px;
  /* width: 130px; */
  width: auto;
  min-width: 18px;
}

@media screen and (max-width: 604px) {
  .informacion {
    font-size: 10pt;
  }
  .table td,
  .table th {
    padding: 0.4rem;
  }
  .buscador {
    float: left;
  }
}
</style>
