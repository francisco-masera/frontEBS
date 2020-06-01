<template>
 <div>
  <b-card id="MenuLateral" border-variant="dark" >
        <img src="@/assets/images/sistema/userDefaultGrande.png" id="imagenusuario"/>
        <b-card-text> 
          <p id="nombre">{{nombre}}</p>
          
          <b-nav-item class="botonesMenu" v-for="boton in botones"
          :key="boton[0]" v-bind:href="boton[3]">
          
          <b-img v-bind:src="require('@/assets/images/sistema/'+boton[2])" fluid class="iconosMenu"></b-img>
               {{boton[1]}}
               
          </b-nav-item>
          
        </b-card-text>
      
      </b-card>
      
</div>

</template>

<script>
export default {

  mounted() {
    this.cargaBotones();
  },
  data() {
    return {
     botones: [],
      user:"cocina",
      nombre:"Pepito Gomez",
    };
  },
  methods: {
      cargaBotones(){
        var boton;

        if(this.user==="admin"){
          boton = [0,"Stock de insumos","stock.png",""];
          this.botones.push(boton);
          boton = [1,"Catálogo","manufacturados.png",""];
          this.botones.push(boton);    
          boton = [2,"Sugerencias del chef","sugerenciasChef.png",""];
          this.botones.push(boton);  
          boton = [3,"Mis datos","misDatos.png",""];
          this.botones.push(boton);  
          boton = [4,"Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);   
                
        }else if(this.user==="cocina"){
          boton = [0,"Manufacturados","manufacturados.png",""];
          this.botones.push(boton);
          boton = [1,"Mis datos","misDatos.png",""];
          this.botones.push(boton);  
          boton = [2,"Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);  
        }else if(this.user ==="cliente"){
          boton = [0,"Mis direcciones","misDirecciones.png",""];
          this.botones.push(boton);
          boton = [1,"Mis pedidos","Pedidos.png",""];
          this.botones.push(boton);  
          boton = [2,"Mis datos","misDatos.png",""];
          this.botones.push(boton);  
          boton = [3,"Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);  
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
  float: left;
  text-align: center;
  width: 20%;
  height: auto;
  margin-left: 100px;
  margin-top:-50px;
  position: absolute;
  font-family: 'Baloo Bhaina 2';
  font-weight: 700;
  font-size: 16pt;   
  z-index: 1;
}
#imagenusuario{
  width: 60%;
  z-index: 2;
  margin-top:20px;
  margin-bottom: 25px;
}

.botonesMenu{
  list-style: none;  
  color:#151515;
  font-weight: 400;
  font-size: 12pt; 
  text-align: left;
  margin-left: 10%;
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