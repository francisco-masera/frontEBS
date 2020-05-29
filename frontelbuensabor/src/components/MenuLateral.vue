<template>
 <div>
  <b-card id="MenuLateral" border-variant="dark" >
        <img src="@/assets/images/sistema/userDefaultGrande.png" id="imagenusuario"/>
        <b-card-text> 
          <p id="nombre">{{nombre}}</p>
          
          <b-nav-item class="botonesMenu" v-for="boton in botones"
          :key="boton" v-bind:href="boton[2]">
          
          <b-img v-bind:src="require('@/assets/images/sistema/'+boton[1])" fluid class="iconosMenu"></b-img>
               {{boton[0]}}
               
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
      user:"cliente",
      nombre:"Pepito Gomez",
    };
  },
  methods: {
      cargaBotones(){
        var boton;

        if(this.user==="admin"){
          boton = ["Stock de insumos","stock.png",""];
          this.botones.push(boton);
          boton = ["Catálogo","manufacturados.png",""];
          this.botones.push(boton);    
          boton = ["Sugerencias del chef","sugerenciasChef.png",""];
          this.botones.push(boton);  
          boton = ["Mis datos","misDatos.png",""];
          this.botones.push(boton);  
          boton = ["Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);   
                
        }else if(this.user==="cocina"){
          boton = ["Manufacturados","manufacturados.png",""];
          this.botones.push(boton);
          boton = ["Mis datos","misDatos.png",""];
          this.botones.push(boton);  
          boton = ["Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);  
        }else if(this.user ==="cliente"){
          boton = ["Mis direcciones","misDirecciones.png",""];
          this.botones.push(boton);
          boton = ["Mis pedidos","Pedidos.png",""];
          this.botones.push(boton);  
          boton = ["Mis datos","misDatos.png",""];
          this.botones.push(boton);  
          boton = ["Cerrar sesión","cerrarSesion.png",""];
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
  margin-top:150px;
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
  margin-left: 10px;
  margin-top:5px;
}
.botonesMenu a:link{
  list-style: none;  
  
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




</style>