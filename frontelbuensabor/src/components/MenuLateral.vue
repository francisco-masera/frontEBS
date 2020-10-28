<template>
 <div>
  <b-card id="MenuLateral" border-variant="dark" >
        <div class="imagenContenedor">
        <img v-if="this.user.foto!=undefined"  :src=" 'http://localhost:9001/images/personas/' + this.user.foto" id="imagenusuario"/>
        <img v-else src="http://localhost:9001/images/sistema/userDefaultGrande.png" id="imagenusuario"/>
        </div>
        <b-card-text> 
          <p id="nombre">{{this.user.nombre}} {{this.user.apellido}}</p>
          <p id="rol">{{rol}}</p>
          
          <b-nav-item class="botonesMenu" v-for="boton in botones"
          :key="boton[0]" v-bind:href="boton[3]">
          
          <b-img v-bind:src="'http://localhost:9001/images/sistema/'  + boton[2]" fluid class="iconosMenu"></b-img>
               {{boton[1]}}
               
          </b-nav-item>
          
        </b-card-text>
      
      </b-card>
      
</div>

</template>

<script>
import Service from "@/service/Service.js";
export default {
  mounted() {        
    this.cargaBotones();
    
  },
  data() {
    return {
     botones: [],
      rol:"",
     user: this.usuario,
      service: new Service(),
      userSession:{},
    };
  },
 
  methods: {
      async traeUser() {
         this.userSession=JSON.parse(sessionStorage.getItem('user'));   
           await this.service.getOne("persona",this.userSession.id).then((data) => {
            this.user = data;
          }); 
      },
      
    
     async cargaBotones(){
       await this.traeUser();
        var boton;
        if(this.user.rol==="admin"){
          boton = [0,"Stock de insumos","stock.png","/stockInsumos"];
          this.botones.push(boton);
          boton = [1,"Catálogo","manufacturados.png","/catalogoManu"];
          this.botones.push(boton);    
          boton = [2,"Sugerencias del chef","sugerenciasChef.png","/sugerenciaChef"];
          this.botones.push(boton);  
          boton = [3,"Pedidos","Pedidos.png","/pedidos"];
          this.botones.push(boton);  
          boton = [4,"Mis datos","misDatos.png","/misdatos/"+this.user.id];
          this.botones.push(boton);  
          boton = [5,"Agregar empleado","misDatos.png","/formEmpleado/"];
          this.botones.push(boton);  
          boton = [6,"Cerrar sesión","cerrarSesion.png","/ingreso"];
          this.botones.push(boton);  
          this.rol="Administrador";
                
        }else if(this.user.rol==="cocina"){
          boton = [0,"Manufacturados","manufacturados.png","/catalogoManu"];
          this.botones.push(boton);
          boton = [1,"Mis datos","misDatos.png","/misdatos/"+this.user.id];
          this.botones.push(boton);  
          boton = [2,"Cerrar sesión","cerrarSesion.png","/ingreso"];
          this.botones.push(boton);  
          this.rol="Cocinero";

        }else if(this.user.rol ==="cliente"){
          boton = [0,"Mis direcciones","misDirecciones.png",""];
          this.botones.push(boton);
          boton = [1,"Mis pedidos","Pedidos.png",""];
          this.botones.push(boton);  
          boton = [2,"Mis datos","misDatos.png","/misdatos/"+this.user.id];
          this.botones.push(boton);  
          boton = [3,"Cerrar sesión","cerrarSesion.png","/ingreso"];
          this.botones.push(boton); 


        }else if(this.user.rol==="delivery"){
          boton = [0,"Pedidos","Pedidos.png","/pedidos"];
          this.botones.push(boton);
          boton = [1,"Mis datos","misDatos.png","/misdatos/"+this.user.id];
          this.botones.push(boton);   
          boton = [2,"Cerrar sesión","cerrarSesion.png","/ingreso"];
          this.botones.push(boton); 
          this.rol="Delivery"; 

        }else if(this.user.rol==="cajero"){
          boton = [0,"Pedidos","Pedidos.png",""];
          this.botones.push(boton);
          boton = [1,"Pedidos anteriores","pedidosFacturados.png",""];
          this.botones.push(boton); 
           boton = [3,"Mis datos","misDatos.png","/misdatos/"+this.user.id];
          this.botones.push(boton);   
          boton = [2,"Cerrar sesión","cerrarSesion.png","/ingreso"];
          this.botones.push(boton);  
          this.rol="Cajero";
        }

     
      }
   }
  
  }
  
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap');


#MenuLateral{
  background-color: #FFFFFF;
  color: #151515;
  border: none;
  border-radius: 15px;
    -webkit-box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.2);
    -moz-box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.2);
    box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.2);
  float: left;
  text-align: center;
  width: 20%;
  height: auto;
  margin-left: 100px;
  margin-top:-50px;
  position: absolute;

  z-index: 1;
}
#imagenusuario{
  height: 100%;
  z-index: 2;
}
.imagenContenedor{
  width: 170px;
  height: 170px;
  border-radius: 170px;
  overflow: hidden;
  background-color: red;  
  margin-top:20px;
  margin-bottom: 25px;
  display: inline-block;
}
.botonesMenu{
  list-style: none;  
  color:#151515;
  font-weight: 400;
  font-size: 12pt; 
  text-align: left;
  margin-left: 5%;
  margin-top:5px;
}
.botonesMenu a:link{
  list-style: none;  
  color:#151515;
  font-weight: 500;
  font-size: 12pt; 
  text-align: left;
  margin-left: 10px;
}

.botonesMenu a:hover{
  list-style: none;  
  color:#E7511E;
}
.botonesMenu a:active{
  list-style: none;  
  color:#E7511E;
  font-weight: 700;
}
.botonesMenu a:visited{
  list-style: none;  
  color: #151515;
  font-weight: 700;
}
.iconosMenu{
  width: 20px;
  float: left;
  margin-right: 10px;
 }
 #rol{   
   font-weight: 400;
   font-size:12pt;
 }
 #nombre{   
  margin-bottom: 0px;
    font-family: 'Baloo Bhaina 2';
  font-weight: 700;
  
  font-size: 16pt;   
 }


@media screen and (max-width: 1210px){
    .card-body{
      padding: 0px;
    }
    .botonesMenu{ 
      font-size: 12pt; 
      margin-left: 5px; 
    }

    
}

@media screen and (max-width: 774px){
    #MenuLateral{
        display: none;
    }
    
    
}



</style>