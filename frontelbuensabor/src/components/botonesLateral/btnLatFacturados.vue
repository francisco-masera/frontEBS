<template>
  <div>
    <b-nav-item :key="7" href="" class="botonesMenu">
      <b-img
        src="http://localhost:9001/images/sistema/pedidosFacturados.png"
        fluid
        class="iconosMenu"
      ></b-img>
      <span v-if="rol == 'delivery'"> Pedidos facturados</span>
      <span v-if="rol == 'cajero' || rol == 'admin'">Historial pedidos</span>
    </b-nav-item>
  </div>
</template>

<script>
export default {
  props: ["rol"],
};
</script>
