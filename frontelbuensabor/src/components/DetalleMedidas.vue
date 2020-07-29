<template>
  <b-button size="sm" @click="$props.row.toggleDetails" class="mr-2">
    {{ row.detailsShowing ? "Mostrar" : "Ocultar" }} Detalles
  </b-button>
</template>

<script>
export default {
  data() {},
  props: ["row"],
};
</script>

<style></style>
