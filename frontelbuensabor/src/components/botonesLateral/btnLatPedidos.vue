<template>
  <div>
    <b-nav-item :key="6" href="" class="botonesMenu">
      <b-img
        src="http://localhost:9001/images/sistema/Pedidos.png"
        fluid
        class="iconosMenu"
      ></b-img>
      <span v-if="rol != 'cajero' && rol != 'admin'">Mis pedidos</span>
      <span v-else>Pedidos en curso</span>
    </b-nav-item>
  </div>
</template>
<script>
export default {
  props: ["rol"],
};
</script>