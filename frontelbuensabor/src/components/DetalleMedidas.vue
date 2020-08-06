<template>
  <b-form-select
    name="medidas"
    class="m-2"
    :id="'u ' + String($props.idInsumo)"
  >
    <b-form-select-option
      v-for="opcion in opciones"
      :key="opcion.clave"
      :value="opcion.valor"
      @click="capturarValor"
    >
      {{ opcion.texto }}
    </b-form-select-option>
  </b-form-select>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      mostrar: false,
      valorSeleccionado: "",
      opciones: [
        { clave: 1, valor: "Kg", texto: "Kilogramos" },
        { clave: 2, valor: "gr", texto: "Gramos" },
        { clave: 3, valor: "lt", texto: "Litros" },
        { clave: 4, valor: "ml", texto: "Mililitros" },
        { clave: 5, valor: "u", texto: "Unidades" },
      ],
    };
  },
  props: ["idInsumo"],
  methods: {
    capturarValor() {
      let selector = document.getElementById("u " + this.$props.idInsumo);
      this.valorSeleccionado = selector.options[selector.selectedIndex].value;
      this.$emit("selected", this.valorSeleccionado);
    },
  },
};
</script>
