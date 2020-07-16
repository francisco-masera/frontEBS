<template>
  <b-container fluid class="ingreso">
    <b-row>
      <b-col xs="6" sm="6" md="3" lg="3" xl="3"></b-col>
      <b-col class="margenLogo" xs="12" sm="12" md="6" lg="6" xl="6"
        ><b-img
          src="@/assets/images/sistema/logo-01.png"
          style="width:35%"
        ></b-img
      ></b-col>
      <b-col xs="6" sm="6" md="3" lg="3" xl="3"></b-col>
    </b-row>
    <b-row>
      <b-col xs="6" sm="6" md="3" lg="3" xl="3"></b-col>
      <b-col xs="12" sm="12" md="6" lg="6" xl="6">
         <b-alert  v-model="alertDatosNull">Debe ingresar usuario y contraseña</b-alert>
          <b-alert  v-model="alertDatosErroneos">Usuario o contraseña incorrecta</b-alert>
          <b-alert  v-model="esCliente">No tiene permisos para acceder a esta sección</b-alert>
        <div class="ingresoForm">
         
          <form>
            <div class="tituloIngreso">Ingresar</div>

            <b-form-input
              id="email-input"
              v-model="email"              
              required
              type="email"
              placeholder="Usuario"
              class="emailForm"
            ></b-form-input>

            <b-form-input
              id="contraseña-input"
              v-model="contrasenia"              
              required
              type="password"
              placeholder="Contraseña"
              class="contraseñaForm"
            ></b-form-input>
            

            <div class="olvido">Olvidé mi contraseña</div>
            <b-button pill class="botonIngreso" :user="user" @click="ingresar" size="md">¡Ingresar!</b-button>
          </form>
        </div>
      </b-col>
      <b-col xs="6" sm="6" md="3" lg="3" xl="3"></b-col>
    </b-row>
    <b-row>
      <b-col class="abajo" xs="12" sm="12" md="12" lg="12" xl="12"></b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import Service from "@/service/Service.js";
export default {
  mounted() {
    this.limpiaSesion();
  },
 
  data() {
    return {
      email:"",
      contrasenia:"",
      user:{},
      alertDatosNull:false,
      alertDatosErroneos:false,
      esCliente:false,
     service : new Service()
    };
  },

  methods: {
   
   limpiaSesion(){
      sessionStorage.clear();
   },

   async ingresar(){
      if(this.email != "" && this.contrasenia != ""){        
        await this.buscaEmpleados();
        
        if(this.user != undefined && this.user.contrasenia == this.contrasenia){
          if(!this.user.baja){
            sessionStorage.setItem('user',JSON.stringify(this.user));
            sessionStorage.setItem('active',true)
              if(this.user.rol =="admin"){            
            
             //this.$router.push({ name: 'StockInsumos', params: {user: this.user }})
            this.$router.push({ name: 'StockInsumos'})
          }else if(this.user.rol =="delivery"){
              window.location="/";
          }else if(this.user.rol =="cocina"){
            this.$router.push({ name: 'CatalogoManu', params: {user: this.user }})

          }else if(this.user.rol =="cajero"){
            window.location="/";
          }else{
            this.esCliente=true;
          }
          }
          
          
        }else{
          this.alertDatosErroneos=true;          
          this.email="";
          this.contraseña="";
          this.user=null;
          
        }
        
      }else{
        this.alertDatosNull = true;     
        
      }
    },


    async buscaEmpleados(){
      
      await this.service.getAll("empleado").then(data=>{
        this.user = data.find((empleado) => empleado.usuario === this.email
            );
      }); 
           
          

      /*await this.axios.get('http://localhost:9001/buensabor/empleado/')
          .then(res =>{
            const resJson = res.data;
            this.user = resJson.find(
              (empleado) => empleado.usuario === this.email
            );
          
          })
          .catch(e =>{
            this.alertDatosErroneos=true;  
            console.log(e);
           
          })*/
      } 
  },

};

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap");
.prueba {
  border: 1px solid gray;
}

.emailForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 300px;
  font-size: 11pt;
  margin-left: 10%;
}

.contraseñaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 300px;
  font-size: 11pt;
  margin-left: 10%;
}

.olvido {
  text-align: right;
  margin-top: 5%;
  font-size: 10pt;
  margin-right: 5%;
}
.tituloIngreso {
  margin-top: 7%;
  margin-bottom: 3%;
  font-weight: bold;
  font-size: 15pt;
}
.margenLogo {
  margin-top: 3%;
}
.ingreso {
  background-color: #f2e6d1;
  font-family: "Baloo Bhaina 2";
}

.botonIngreso {
  background-color: #e7511e;
  width: 105px;
  height: 30px;
  margin-top: 5%;
}
.ingresoForm {
  margin-top: 7%;
  margin-bottom: 20%;
  margin-left: 19%;
  height: 245px;
  width: 370px;
  background-color: white;
  border: 1px solid gray;
}</style
>|
