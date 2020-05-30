<template>
  <div class="header">
    <b-navbar toggleable="md" type="dark">
      <b-img
        class="col-lg-2 col-md-4 col-sm-2"
        id="brandImg"
        src="@/assets/images/sistema/logo.png"
      ></b-img>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto items">
          <b-nav-item>CARTA</b-nav-item>
          <b-nav-item>NOSOTROS</b-nav-item>
          <b-nav-item>CONTACTO</b-nav-item>
          <b-img
            :src="require(`@/assets/images/sistema/userDefaultChico.png`)"
            alt=""
            id="imagen"
          ></b-img>
          <b-nav-item><label id="usuario"></label></b-nav-item>
          <b-navbar-nav class="pl-5">
            <b-img id="carrito" src="@/assets/images/sistema/carrito.png">
            </b-img>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  mounted() {},
  props: ["imagen", "id", "nombre"],

  methods: {},
};
</script>
<style>
.header {
  background-color: #1f91b6 !important;
  min-height: 150px;
  max-height: 200px;
}

#imagen {
  margin-top: 45px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: -28px;
}

.items > * {
  margin-top: 40px;
  margin-left: 25px;
  font-size: 15px;
  font-weight: bolder;
}

#carrito {
  margin-top: 5px;
  width: 30px;
  height: 30px;
}

#brandImg {
  width: 150px;
  margin-top: 20px;
  margin-left: 80px;
}
</style>
