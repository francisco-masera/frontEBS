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
          <b-nav-item :to="{ name: 'carta' }">CARTA</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">NOSOTROS</b-nav-item>
          <b-nav-item :to="{ name: 'contacto' }">CONTACTO</b-nav-item>
          <b-img
            :src="require(`@/assets/images/sistema/userDefaultChico.png`)"
            alt=""
            id="foto"
            fluid
          ></b-img>
          <b-nav-item :to="{ name: 'perfil' }"
            ><label id="usuario"></label
          ></b-nav-item>
          <b-nav-item :to="{ name: 'carrito' }">
            <b-img
              id="carrito"
              fluid
              src="@/assets/images/sistema/carrito.png"
            ></b-img>
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
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap");
#header {
  background-color: #1f91b6 !important;
  min-height: 150px;
  max-height: 200px;
}

#foto {
  border-radius: 50%;
}

.items {
  display: flex;
  align-items: center;
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
  background-color: rgb(31, 179, 231, 40%);
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
.navbar-dark .navbar-nav .nav-link {
  color: #151515;
}

#navToggle {
  float: right;
  margin-right: 0px;
  margin-left: 80%;
}
</style>
