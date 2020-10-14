<template>
  <div @click="limpiaSesion">
    <b-nav-item :key="4" href="/ingreso" class="botonesMenu">
      <b-img
        src="http://localhost:9001/images/sistema/cerrarSesion.png"
        fluid
        class="iconosMenu"
      >
      </b-img>
      Cerrar sesión
    </b-nav-item>
  </div>
</template>

<script>
export default {
  methods: {
    limpiaSesion() {
      sessionStorage.clear();
    },
  },
};
</script>

<style></style>
