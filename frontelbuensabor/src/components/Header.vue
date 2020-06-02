<template>
  <b-navbar id="header" toggleable="md" type="dark">
    <b-navbar-toggle id="navToggle" target="nav-collapse"></b-navbar-toggle>
    <b-container
      class="col-lg-4 col-md-4 col-sm-3 col-xs-1 ml-lg-5"
      id="logoContainer"
    >
      <b-img
        fluid
        id="brandImg"
        alt=""
        src="@/assets/images/sistema/logo.png"
      ></b-img>
    </b-container>
    <b-container class="col-lg-8 col-md-8 col-sm-9 col-xs-11 mr-5 hamburguer">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="items">          
          <b-nav-item :to="{ name: 'carta' }" >CARTA</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">NOSOTROS</b-nav-item>
          <b-nav-item :to="{ name: 'contacto' }">CONTACTO</b-nav-item>
          <b-nav-item :to="{ name: 'perfil' }"
            >
            <b-img
            :src="require(`@/assets/images/sistema/userDefaultChico.png`)"
            alt=""
            id="foto"
            fluid
            class="botonImagenHeader"
          ></b-img>
          <label id="usuario">Pepito</label
          ></b-nav-item>
          <b-nav-item :to="{ name: 'carrito' }">
            <b-img
              id="carrito"
              fluid
              src="@/assets/images/sistema/carrito.png"
              class="botonImagenHeader"
            ></b-img><label id="usuario">Mi carrito</label
          >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  mounted() {},
  props: ["imagen", "id", "nombre", "screenLength"],

  methods: {},
  data: function() {},
  nombre:"Pepito Gomez",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap");
#header {
  background-color: #1f91b6 !important;
  min-height: 200px;
  max-height: 200px;
  overflow: hidden;
}

#foto {
  border-radius: 50%;
}

.items {
  display: flex;
  align-items: center;
  color: #ffffff;
  
}  

.items>*{
  margin:15px;  
  color: #ffffff;
  
}

.navbar-dark .navbar-nav .nav-link{
  color:rgba(255,255, 255, 1);
  font-size: 12pt;
  font-weight: 700;
}

.botonImagenHeader{
  width: 30px;
  margin-right: 5px;
}

#brandImg {
  margin-top: -50px;
  width: 150px;
}

#logoContainer {
  width: auto;
  margin-left: 0px;
  min-height: 100px;
  float: left;
}

.hamburguer {

  margin-left: 95px;
  border-radius: 15px;
}

.hamburguer > * {
  
  font-family: "Baloo Bhaina 2";
  font-weight: 700;
  font-size: 13pt;
}

.hamburguer #carrito #foto {
  width: 30%;
  padding-inline: 2px;
  height: 30px;
}


#navToggle {
  float: right;
  margin-right: 0px;
  margin-left: 80%;
}

@media screen and (max-width: 767px){

  .hamburguer {
    width: 200px;
    background-color: #ffffff;
    margin-top: 200px;     
    position: absolute; 
    border-radius: 15px;
    -webkit-box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.33);
    -moz-box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.33);
    box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.33);
    
  }

  .navbar-dark .navbar-nav .nav-link{
    color: #1f91b6 ;
    font-size: 12pt;
    font-weight: 700;
  }

.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color:#E7511E;
}

.navbar-dark .navbar-nav .active>.nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show>.nav-link {
  color:#E7511E;
}

  .items>*{
    margin:5px;   
  
  }

  .col-sm-9{
    flex: 0 0 50%;
    float:right;
    right: 0;
  }
}
</style>
