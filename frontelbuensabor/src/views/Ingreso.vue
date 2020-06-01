<template>
<b-container fluid class="ingreso">
 <b-row> 
 <b-col xs="6" sm="6" md="3" lg="3" xl="3"></b-col> 
 <b-col class="margenLogo" xs="12" sm="12" md="6" lg="6" xl="6"><b-img src="@/assets/images/sistema/logo-01.png" style="width:35%" ></b-img></b-col> 
 <b-col xs="6" sm="6" md="3" lg="3" xl="3"></b-col> 
</b-row>
<b-row>
  <b-col  xs="6" sm="6" md="3" lg="3" xl="3"></b-col> 
  <b-col  xs="12" sm="12" md="6" lg="6" xl="6">
     <div class="ingresoForm"><form>
        <div class="tituloIngreso"><b-label>Ingresar</b-label></div>  
          
             
           <b-form-input
            id="email-input"
            v-model="email"
            :state="emailState"
            required
            type="email"
            placeholder="Usuario" class="emailForm"
          ></b-form-input>
           
           
           <b-form-input
            id="contraseña-input"
            v-model="contraseña"
            :state="contraseñaState"
            required
            type="password"
            placeholder="Contraseña" class="contraseñaForm"
          ></b-form-input>
          
         
        <div class="olvido">Olvidé mi contraseña</div>
       <b-button pill class="botonIngreso" size="md">¡Ingresar!</b-button>
      </form>
     </div>
    </b-col> 
  <b-col  xs="6" sm="6" md="3" lg="3" xl="3"></b-col> 
</b-row> 
<b-row>
<b-col class="abajo"  xs="12" sm="12" md="12" lg="12" xl="12"></b-col>
</b-row>
</b-container>

</template>
<style>

@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap');
.prueba{
  border:1px solid gray;
}

.emailForm{
  border-right:0px;
  border-left:0px;
  border-top:0px;
  border-bottom:1;
  background-color:transparent;
  width: 300px;
  font-size: 11pt;
 margin-left: 10%;
}

.contraseñaForm{
  border-right:0px;
  border-left:0px;
  border-top:0px;
  border-bottom:1;
  background-color:transparent;
  width: 300px;
  font-size: 11pt;
  margin-left: 10%;
}
.abajo{

background-image: url("../assets/images/sistema/reticula.png");
background-repeat: repeat-x;
width: 100%;
background-color:  #F2E6D1;
min-height: 60px;
background-size: contain;
bottom: 0;
margin-top: 0px
;

 
}
   
.olvido{
  text-align: right;
  margin-top: 5%;
  font-size: 10pt;
  margin-right: 5%;
}
.tituloIngreso{
  margin-top: 7%;
  margin-bottom: 3%;
  font-weight: bold;
  font-size: 15pt;
}
.margenLogo{
margin-top: 3%;
}
.ingreso{
  background-color: #F2E6D1;
  font-family: 'Baloo Bhaina 2';
}

.botonIngreso{
  background-color: #E7511E;
  width: 105px;
  height: 30px;
  margin-top: 5%;
  


}
.ingresoForm{


  margin-top: 7%;
  margin-bottom: 20%;
  margin-left: 19%;
  height: 245px;
  width: 370px;
  background-color: white;
  border:1px solid gray;
  
 
 
  
}
</style>|