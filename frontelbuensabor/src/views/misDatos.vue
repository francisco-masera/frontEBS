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
    <b-button class="buttonText" @click="abreModalEliminar">
      <img src="http://localhost:9001/images/sistema/eliminar.png" style="width:25px"/>
      Eliminar cuenta
    </b-button> 
    <br>
    <b-button class="buttonText" @click="cambiarContra" >
      <img src="http://localhost:9001/images/sistema/camera.png" style="width:25px"/>
      Cambiar foto de perfil
    </b-button>   
    
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
                    placeholder="Contraseña actual" 
                    type="password"             
                >
                </b-form-input>
                <b-form-input
                    v-model="nuevaContraseniaUsuario"
                    class="contraseñaForm"
                    placeholder="Nueva contraseña"   
                    type="password"              
                >
                </b-form-input>
                 <b-form-input
                    v-model="nuevaContraseniaUsuario2"
                    class="contraseñaForm"
                    placeholder="Repetir contraseña" 
                    type="password"             
                >
                </b-form-input>
            </form>
            <p class="posicion">
                <b-button
                    pill
                    class="boton botonEliminar"
                    size="sm"
                     @click="verificarContrasenia"
                >Cambiar contraseña
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
        ¡La contraseña actual no es correcta!
      </b-toast>

      <!-- Toast contraseña no coincide-->
      <b-toast id="toast-contra-dif" variant="warning" solid>
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
        ¡Las contraseñas no coinciden!
      </b-toast>

       <!-- Toast error servidor-->
      <b-toast id="toast-error-sistema" variant="danger" solid>
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
        Error al cambiar la contraseña
      </b-toast>
    </b-modal>

    <b-modal
            ref="modalEliminarCuenta"
            title="¿Esta seguro de eliminar su cuenta?"
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
                    type="password"             
                >
                </b-form-input>                
            </form>
            <p class="posicion">
                <b-button
                    pill
                    class="boton botonEliminar"
                    size="sm"
                     @click="verificarContraseniaEliminar"
                >Eliminar
                </b-button>
            </p>
   <!-- Toast que muestra el error en la eliminación de la cuenta por error en contraseña-->
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
import axios from "axios";
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
        contraseniaUsuario: "",
        nuevaContraseniaUsuario:"",
        nuevaContraseniaUsuario2:"",
        contraseniaVerificada: false,
    }
  },

  methods: {
      async traeUsuario() {
        var parametroId = parseInt(this.$route.params.id);
      await this.service.getOne("persona",parametroId).then((data) => {
        this.user = data;
      }); 
    },
    cambiarContra(){
        this.$refs.modalCambioPass.show();
    },

    abreModalEliminar(){
      this.$refs.modalEliminarCuenta.show();
    },

    async verificarContraseniaEliminar(){
      let contraseniaVerificada = await axios
        .get("http://localhost:9001/buensabor/persona/validarContrasenia", {
          params: {
            id: this.user.id,
            password: this.contraseniaUsuario,
          },
        })
        .then((res) => res.data);
      contraseniaVerificada
        ? this.eliminarCuenta()
        : (this.$bvToast.show("toast-eliminar-error"));
      }
    },
    eliminarCuenta(){
      console.log("eliminar")
    },
     async verificarContrasenia() {
      await this.verificaUsuario();
      if(this.nuevaContraseniaUsuario === this.nuevaContraseniaUsuario2){
        
        
        let contraseniaVerificada = await axios
        .get("http://localhost:9001/buensabor/persona/validarContrasenia", {
          params: {
            id: this.user.id,
            password: this.contraseniaUsuario,
          },
        })
        .then((res) => res.data);
      contraseniaVerificada
        ? this.cambiaContrasenia()
        : (this.$bvToast.show("toast-eliminar-error"));
      }else{
        this.$bvToast.show("toast-contra-dif")
      }
      
    },

    verificaUsuario(){
      if(this.user.rol){
        this.user.type="Empleado"
      }else{
        this.user.type="Cliente"
      }
    },

    async cambiaContrasenia(){
      var parametroId = parseInt(this.$route.params.id);
      this.user.contrasenia=this.nuevaContraseniaUsuario;
      if(this.user.type==="Empleado"){
        await this.service.update("empleado",this.user,parametroId).then((data)=>{
        this.user=data; 
        this.$refs.modalCambioPass.hide();       
        this.$bvToast.show("toast-eliminar-exito");
      }).catch(()=>{
        this.$bvToast.show("toast-error-sistema")
      })
      }else{
        await this.service.update("cliente",this.user,parametroId).then((data)=>{
        this.user=data; 
        this.$refs.modalCambioPass.hide();       
        this.$bvToast.show("toast-eliminar-exito");
      }).catch(()=>{
        this.$bvToast.show("toast-error-sistema")
      })
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
    font-size: 12px;
}

.boton{
    width: auto;
    margin-top: -20px;

}

.contraseñaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 60%;
  font-size: 11pt;
  margin-left: 20%;
  margin-bottom: 15px;
}

.estiloForm{
  margin-bottom: 50px;
}
</style>
