<template>
  <b-card class="tarjeta">
      <b-card-img class="imagen" :src="'http://localhost:9001/images/productos/' + manufacturadoParam.imagen"/>
      <strong>{{manufacturadoParam.denominacion}}</strong>
      <b-card-text>
       {{ manufacturadoParam.descripcion }}
      </b-card-text>
      <b-card-text class="precio">
       ${{ manufacturadoParam.precioVenta}}
      </b-card-text>
      
    </b-card>
  
</template>

<script>
export default {
  props: ["manufacturadoParam"],
};
</script>

<style>
.tarjeta{
    background-color: transparent;
    border:none;
}
.precio{
    font-size: 16pt;
    font-weight: 600;
    text-align: right;
}
</style>
