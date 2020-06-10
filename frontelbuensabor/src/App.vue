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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 18pt;
  color: #151515;
  text-align: left;
}

h2 {
  font-family: "Baloo Bhaina 2";
  font-weight: 600;
  font-size: 13pt;
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

.abajo {
  background-image: url("./assets/images/sistema/reticula.png");
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
  background-color: #e7511e;
  width: 105px;
  height: 30px;
}

.buscador {
  float: right;
  margin-bottom: 25px;
}
.botonImagen {
  background-color: transparent;
  border: none;
  padding: 0px;
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

.costado {
  background-image: url("./assets/images/sistema/reticulaVertical.png");
  background-repeat: repeat-y;
  position: absolute;
  left: 0;
  height: 100%;
  min-width: 200px;
  background-size: contain;
}

.informacion {
  width: 50%;
  min-height: 100px;
  margin-left: 30%;
  padding: 20px;
  padding-top: 50px;
  font-family: "Baloo Bhaina 2";
  color: #151515;
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
    background-image: url("./assets/images/sistema/reticulaVertical-mobile.png");
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
