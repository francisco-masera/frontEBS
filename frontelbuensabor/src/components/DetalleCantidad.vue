<template>
  <b-form-input
    :id="String($props.idInsumo)"
    name="cantidad"
    type="number"
    class="detalleCantidad"
    step="0.01"
    min="0.00"
    style="width:100%"
    @update="capturarValor"
  />
</template>

<script>
export default {
  props: ["idInsumo", "mostrar"],
  methods: {
      capturarValor() {
      let valorSeleccionado = document.getElementById(this.$props.idInsumo).value;
      this.$emit("kpress", valorSeleccionado);
    }, 
  },
};
</script>
<style>
.detalleCantidad {
  margin-top: 7px;
}
</style>
