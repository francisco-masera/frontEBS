<template>
  <b-card class="tarjeta">
    <b-container>
      <b-card-img
        style="height: auto; max-height: 180px"
        class="imagen img-fluid"
        :src="
          'http://localhost:9001/images/productos/' + manufacturadoParam.imagen
        "
      />
      <strong>{{ manufacturadoParam.denominacion }}</strong>
    </b-container>
    <b-container style="text-align: left">
      <b-card-text>
        {{ manufacturadoParam.descripcion }}
      </b-card-text>
      <b-card-text class="precio" style="float:right;">
        ${{ manufacturadoParam.precioVenta }}
      </b-card-text>
    </b-container>
  </b-card>
</template>

<script>
export default {
  props: ["manufacturadoParam"],
};
</script>

<style>
.tarjeta {
  background-color: transparent;
  border: none;
}
.precio {
  font-size: 16pt;
  font-weight: 600;
  text-align: right;
}
</style>
