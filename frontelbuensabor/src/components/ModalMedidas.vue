<template>
  <div>
    <b-button size="sm" @click="mostrar = true">Elegir unidad</b-button>
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      :id="'modal ' + $props.idInsumo"
      name="modalUnidad"
    >
      <b-modal
        v-model="mostrar"
        class="modal-dialog"
        role="document"
        hide-footer
        :cancel-disabled="true"
        :ok-disabled="true"
      >
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        ></button>
        <h5>Elija una unidad de medida</h5>
        <div class="modal-body">
          <div class="container-fluid">
            <b-form-select
              name="ddl"
              class="m-2"
              :id="$props.idInsumo + ' select'"
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
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="cerrar"
          >
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="aceptar">
            Aceptar
          </button>
        </div>
      </b-modal>
    </div>
  </div>
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
  props: ["idInsumo", "habilitado"],

  methods: {
    capturarValor() {
      let selector = document.getElementById(this.$props.idInsumo + " select");
      this.valorSeleccionado = selector.options[selector.selectedIndex].value;
      console.log(this.valorSeleccionado);
    },

    aceptar() {
      this.cerrar();
      this.$emit("ok", this.valorSeleccionado);
    },

    cerrar() {
      this.mostrar = false;
    },
  },
  computed: {
    habilitar() {
      if (!this.$props.habilitado) return false;
      return true;
    },
  },
};
</script>

<style></style>
