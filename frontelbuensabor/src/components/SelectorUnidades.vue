<template>
  <b-form-select name="ddl" class="m-2">
    <b-form-select-option
      v-for="opcion in opciones"
      :key="opcion.clave"
      :value="opcion.valor"
      @click="$emit('itemClick', capturarValor(), $props.idInsumo)"
    >
      {{ opcion.texto }}
    </b-form-select-option>
  </b-form-select>
</template>

<script>
export default {
  data() {
    return {
      opciones: [
        { clave: 1, valor: "Kg", texto: "Kilogramos" },
        { clave: 2, valor: "g", texto: "Gramos" },
        { clave: 3, valor: "l", texto: "Litros" },
        { clave: 4, valor: "ml", texto: "Mililitros" },
        { clave: 5, valor: "u", texto: "Unidades" },
      ],
    };
  },

  props: ["idInsumo"],

  mounted() {
    this.log();
  },

  methods: {
    log() {
      console.log(this.$props.idInsumo);
    },
    capturarValor() {
      let selector = document.getElementById(this.$props.idInsumo + " select");
      console.log(selector);
      let valorSeleccionado = selector.options[selector.selectedIndex].value;
      return valorSeleccionado;
    },
  },
};
</script>
