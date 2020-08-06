<template>
  <b-form-input
    :id="String($props.idInsumo)"
    name="cantidad"
    type="number"
    class="detalleCantidad"
    step="0.01"
    min="0.00"
    style="width:100%"
    @keyup="capturarValor"
  />
</template>

<script>
export default {
  props: ["idInsumo"],
  methods: {
    capturarValor(e) {
      console.log(e.which);
      if(e.which != 8){
        let valorSeleccionado = document.getElementById(this.$props.idInsumo).value;
        this.$emit("kpress", valorSeleccionado);
      }else
        this.$emit("kpress", null)
    }, 
  },
};
</script>
<style>
.detalleCantidad {
  margin-top: 7px;
}
</style>
