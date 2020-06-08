<template>
  <b-navbar id="header" toggleable="md" type="dark">
    
    <b-container>
      
    <div id="logoContainer">
      <b-img id="brandImg" alt="" src="@/assets/images/sistema/logo.png" ></b-img>
    </div>
    <b-navbar-toggle id="navToggle" target="nav-collapse"></b-navbar-toggle>
    <div class="hamburguer">
      <div v-if="esCliente">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="items">          
            <b-nav-item :to="{ name: 'carta' }" >CARTA</b-nav-item>
            <b-nav-item :to="{ name: 'about' }">NOSOTROS</b-nav-item>
            <b-nav-item :to="{ name: 'contacto' }">CONTACTO</b-nav-item>
            <b-nav-item :to="{ name: 'perfil' }">
              <b-img :src="require(`@/assets/images/sistema/userDefaultChico.png`)" alt="" id="foto" fluid class="botonImagenHeader">
              </b-img>
              <label id="usuario">Pepito</label>
            </b-nav-item>
            <b-nav-item :to="{ name: 'carrito' }">
              <b-img id="carrito" fluid src="@/assets/images/sistema/carrito.png" class="botonImagenHeader">
              </b-img>
              <label id="usuario">Mi carrito
              </label>
            </b-nav-item>
             <b-nav-item class="menuLateral" v-for="boton in botones" :key="boton[0]" v-bind:href="boton[3]">
              <b-img v-bind:src="require('@/assets/images/sistema/'+boton[2])" fluid class="iconosMenu"></b-img>
                {{boton[1]}}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
      <div v-else>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="itemsEmpleado">
            <b-nav-item :to="{ name: 'perfil' }">
              <b-img :src="require(`@/assets/images/sistema/userDefaultChico.png`)" alt="" id="foto" fluid class="botonImagenHeader">
              </b-img>
              <label id="usuario">Pepito
              </label>
            </b-nav-item>
            <b-nav-item class="menuLateral" v-for="boton in botones" :key="boton[0]" v-bind:href="boton[3]">
              <b-img v-bind:src="require('@/assets/images/sistema/'+boton[2])" fluid class="iconosMenu"></b-img>
                {{boton[1]}}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>

    </div>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {    
      botones: [],
      user:"cajero",
      nombre:"Pepito Gomez",
      esCliente:false,
    };
  },
  mounted() {
    this.verificaUsuario();
    
  },
  props: ["imagen", "id",  "screenLength"],

  methods: {
    verificaUsuario(){
      var boton;
    
    if(this.user === "cliente"){      
      this.esCliente=true;
      boton = [0,"Mis direcciones","misDirecciones.png",""];
          this.botones.push(boton);
          boton = [1,"Mis pedidos","Pedidos.png",""];
          this.botones.push(boton); 
          boton = [2,"Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);  
    }else{
      
      this.esCliente=false;
      if(this.user==="admin"){
          boton = [0,"Stock de insumos","stock.png",""];
          this.botones.push(boton);
          boton = [1,"Catálogo","manufacturados.png",""];
          this.botones.push(boton);    
          boton = [2,"Sugerencias del chef","sugerenciasChef.png",""];
          this.botones.push(boton);
          boton = [3,"Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);   
                
        }else if(this.user==="cocina"){
          boton = [0,"Manufacturados","manufacturados.png",""];
          this.botones.push(boton);
          boton = [1,"Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);  

        }else if(this.user==="delivery"){
          boton = [0,"Pedidos","Pedidos.png",""];
          this.botones.push(boton);
          boton = [1,"Pedidos facturados","pedidosFacturados.png",""];
          this.botones.push(boton);  
          boton = [2,"Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);  

        }else if(this.user==="cajero"){
          boton = [0,"Pedidos","Pedidos.png",""];
          this.botones.push(boton);
          boton = [1,"Pedidos anteriores","pedidosFacturados.png",""];
          this.botones.push(boton);  
          boton = [2,"Cerrar sesión","cerrarSesion.png",""];
          this.botones.push(boton);  
        }
    }
  },
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

  },
  
  

  
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap");
#header {
  background-color: #1f91b6;
  min-height: 200px;
  max-height: 200px;
 
}

#foto {
  border-radius: 50%;
}

.items {
  display: flex;
  align-items: center;
  color: #ffffff;
  
}  

.items>*{
  margin:15px;  
  color: #ffffff;
  
}

.menuLateral{
  display: none;
}

.itemsEmpleado{
  margin-right: 150px;
}

.navbar-dark .navbar-nav .nav-link{
  color:rgba(255,255, 255, 1);
  font-size: 12pt;
  font-weight: 700;
}

.botonImagenHeader{
  width: 30px;
  margin-right: 5px;
}

#brandImg {
  margin-top: 10px;
  width: 150px;
}

#logoContainer {
  width: auto;
  margin-left: 0px;
  min-height: 100px;
  float: left;
}


.hamburguer > * {
  
  font-family: "Baloo Bhaina 2";
  font-weight: 700;
  font-size: 13pt;
}

.hamburguer #carrito #foto {
  width: 30%;
  padding-inline: 2px;
  height: 30px;
  
}




@media screen and (max-width: 767px){

  #navToggle {
  float: right;
  margin-right: 10px;
  
}

.menuLateral{
  display: block;
}

#brandImg {
  margin-top: 0px;
}


  .hamburguer {    
    background-color: #ffffff;
    position: absolute;
    margin-top:450px;
    width: 250px;     
    margin-left: 80px;
    float:right; 
    border-radius: 15px;
    -webkit-box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.33);
    -moz-box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.33);
    box-shadow: 9px 10px 19px -5px rgba(0,0,0,0.33);
    text-align: left;    
    
    }

    .nav-item{
      width: 100%;           
      position: relative;
      float: right;
      text-align: left;
      padding-left: 10px;
       
    }

.navbar-nav{
display: inline;
} 

  .navbar-dark .navbar-nav .nav-link{
    color: #151515;
    font-size: 12pt;
    font-weight: 400;
    width: 90%;
    padding-left: 20px;
  }

.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color:#E7511E;
  
}


.navbar-dark .navbar-nav .active>.nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show>.nav-link {
  color:#E7511E;
}

  .items>*{
    margin:5px;   
    
  
  }

  .col-sm-9{
    flex: 0 0 50%;
    float:right;
    right: 0;
  }

  .itemsEmpleado{
  margin-right: 0px;
}



}
</style>
