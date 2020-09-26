<template>
  <div>
    <cabecera></cabecera>
    <div id="nav"><menuLateral></menuLateral></div>

    <div class="costado"></div>
    <b-container class="informacion">
        <h1>Mis datos</h1>
        <div class="contenedorForm">
            <div class="lineaForm">
                <label class="tituloForm"> Nombre:                 
                </label>
                <b-form-input
                    class="inputForm"
                    v-model="user.nombre"
                ></b-form-input>
            </div>
            <div class="lineaForm">
                <label class="tituloForm"> Apellido:                 
                </label>
                <b-form-input
                    class="inputForm"
                    v-model="user.apellido"
                ></b-form-input>
            </div>
            <div class="lineaForm">
                <label class="tituloForm"> Email:                 
                </label>
                <b-form-input
                    class="inputForm"
                    v-model="user.email"
                ></b-form-input>
            </div>
             <div class="lineaForm">
                <label class="tituloForm">              
                </label>                
                <div class="botonCambiarContraseña">
                    <b-button class="buttonText" @click="cambiarContra">Cambiar contraseña</b-button>            
                </div>
            </div>
            <div class="lineaFormDerecha" style="float:right">
                <b-button pill class="boton" size="md" >Guardar cambios</b-button>
            </div>
            
        </div>
    <b-button class="buttonText">Eliminar cuenta</b-button> 
    
    </b-container>
    <router-view />
        <b-modal
            ref="modalCambioPass"
            title="Cambiar contraseña"
            class="modalEliminar"           
            no-close-on-esc
            hide-footer
            no-close-on-backdrop
            modal-header-close
        >
            <form class="estiloForm">
                <b-form-input
                    v-model="contraseniaUsuario"
                    class="contraseñaForm"
                    placeholder="Contraseña"
                >
                </b-form-input>
            </form>
            <p class="posicion">
                <b-button
                    pill
                    class="boton botonEliminar"
                    size="sm"
                     @click="verificarContrasenia"
                >Modificar estado
                </b-button>
            </p>

      <!-- Toast que muestra la confirmación de eliminado con éxito-->
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
        ¡Insumo modificado con éxito!
      </b-toast>

      <!-- Toast que muestra el error en la eliminación del insumo por error en contraseña-->
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
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
export default {
  mounted() {
    this.traeUsuario();
  },
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },
  data() {
    return {
        user:{},
        service: new Service(),
    }
  },

  methods: {
      async traeUsuario() {
        var parametroId = parseInt(this.$route.params.id);
      await this.service.getOne("persona",parametroId).then((data) => {
        this.user = data;
        console.log(this.user)
      }); 
    },
    cambiarContra(){
        this.$refs.modalCambioPass.show();
    }
  }
}

</script>
<style>
.contenedorForm{
    margin-top: 20px;
}
.lineaForm{
    min-height: 40px;
}
.tituloForm{
    width: 30%;
    padding-right: 10px;
    display: inline-block;
    text-align: right;
    font-weight: 500;
}
.inputForm{
    display: inline-block;
    width: 45%;    
    border-right: 0px;
    border-left: 0px;
    border-top: 0px;
    border-bottom: 1;   
    background-color: transparent;
    font-size: 11pt;
    height: 25px;
}
.lineaFormDerecha{
    width: 45%; 
}
.botonCambiarContraseña{
    display: inline-block;
    width: 45%;   
    text-align: right;
    
}
.buttonText{
    font-size: 10px;
}

.boton{
    width: auto;
    margin-top: -20px;

}
</style>
