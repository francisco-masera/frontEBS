<template>
  <b-modal hide-footer title="Eliminar insumo" class="modalEliminar">
    <form>
      <b-form-input
        class="contraseñaForm"
        placeholder="Contraseña"
      >
      </b-form-input>
      <b-button pill class="boton" size="md"
        >Eliminar</b-button
      >
    </form>
    <b-toast id="toast-eliminar-exito" variant="success" solid>
      <template v-slot:toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
        </div>
      </template>
      ¡Insumo eliminado con éxito!
    </b-toast>
    <b-toast id="toast-eliminar-error" variant="warning" solid>
      <template v-slot:toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
        </div>
      </template>
      ¡La contraseña no es correcta!
    </b-toast>
  </b-modal>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
