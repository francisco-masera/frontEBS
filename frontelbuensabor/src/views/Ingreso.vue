<template>
  <div>
      
   <b-modal ref="miModal" hide-footer hide-header size="sm" id="modal-center">
   <div>    
   <b-label>Ingresar</b-label>    
   </div>
   <div>
   <b-button id="loginGoogle">Ingresar con google</b-button>
   </div>
   <div>O ingresá con tu email</div>
      <form>
           <div>
           <b-form-input
            id="email-input"
            v-model="email"
            :state="emailState"
            required
            type="email"
            placeholder="email"
          ></b-form-input>
           </div>
            <div>
           <b-form-input
            id="contraseña-input"
            v-model="contraseña"
            :state="contraseñaState"
            required
            type="password"
            placeholder="contraseña"
          ></b-form-input>
          </div>
        <div>Olvidé mi contraseña</div>
       <b-button class="mr-1" >Ingresar</b-button>
      </form>
      <div>¿No tenes cuenta? Registrate</div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "Ingreso",
  components: {},
  mounted() {
    this.openModal();
  },
   data() {
    return {
     name: '',
     nameState: null  
    
   }
   },
  methods: {
    openModal() {
     
      this.$refs["miModal"].show();
    }
  }
  
};
</script>
<style>
.styleModal{
   color: blue; 
}
</style>