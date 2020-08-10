<template>
  <div>
    <div class="logo"><b-img src="@/assets/images/sistema/logo-01.png" class="imagen"></b-img></div>
    <b-alert v-model="alertDatosNull">Debe ingrersar usuario y contraseña</b-alert>
    <b-alert v-model="alertDatosErroneos">Usuario o contraseña incorrecta</b-alert>
    <b-alert v-model="esCliente">No tiene permisos para acceder a esta sección</b-alert>

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
    <div class="abajo"></div>
  </div>
</template>
<script>
import Service from "@/service/Service.js";
export default {
  mounted() {
    this.limpiaSesion();
  },

  data() {
    return {
      email: "",
      contrasenia: "",
      user: {},
      alertDatosNull: false,
      alertDatosErroneos: false,
      esCliente: false,
      service: new Service(),
    };
  },

  methods: {
    limpiaSesion() {
      sessionStorage.clear();
    },

    async ingresar() {
      if (this.email != "" && this.contrasenia != "") {
        await this.buscaEmpleados();

        if (
          this.user != undefined &&
          this.user.contrasenia == this.contrasenia
        ) {
          if (!this.user.baja) {
            sessionStorage.setItem("user", JSON.stringify(this.user));
            sessionStorage.setItem("active", true);
            if (this.user.rol == "admin") {
              //this.$router.push({ name: 'StockInsumos', params: {user: this.user }})
              this.$router.push({ name: "StockInsumos" });
            } else if (this.user.rol == "delivery") {
              window.location = "/";
            } else if (this.user.rol == "cocina") {
              this.$router.push({
                name: "CatalogoManu",
                params: { user: this.user },
              });
            } else if (this.user.rol == "cajero") {
              window.location = "/";
            } else {
              this.esCliente = true;
            }
          }
        } else {
          this.alertDatosErroneos = true;
          this.email = "";
          this.contraseña = "";
          this.user = null;
        }
      } else {
        this.alertDatosNull = true;
      }
    },

    async buscaEmpleados() {
      await this.service.getAll("empleado").then((data) => {
        this.user = data.find((empleado) => empleado.usuario === this.email);
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
    },
  },
};
</script>
<style>


@media screen and (min-width: 320px){

  .tituloIngreso {
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
  font-size: 15pt;
}
.logo {
  height: 50%;
  width: 50%;
  margin: 0px auto;
  text-align: center;
  margin-top: 5%;
}
.ingresoForm {
  height: 50%;
  width: 70%;
  margin: 0px auto;
  background-color: white;
  border: 1px solid gray;
  margin-top: 15%;
}
.imagen{
 width: 170px; 
 height: 65px;

}

.emailForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 150px;
  font-size: 8pt;
  margin-left: 35px;
  margin-right: 5px;
  margin-top: 5px;
}

.contraseñaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 150px;
  font-size: 8pt;
  margin-left: 35px;
  margin-right: 5px;
  margin-top: 5px;
}

.botonIngreso {
  background-color: #e7511e;
  width: 80px;
  height: 25px;
  margin-top: 5%;
  margin-left: 35%;
  margin-bottom: 5%;
  font-size: 11px;
  text-align: center;
 
}
.olvido {
  text-align: right;
  margin-top: 5%;
  font-size: 8pt;
  margin-right: 30px;
}
}


@media screen and (min-width: 640px){
  .ingresoForm {
  height: 15%;
  width: 35%;
  margin-bottom: 10%;
  background-color: white;
  border: 1px solid gray;
  margin-top: 15px;

}
.imagen{
 width: 110px; 
 height: 60px;

}

.logo {
  height: 50%;
  width: 50%;
  margin: 0px auto;
  text-align: center;
  margin-top: 2%;
}


  .tituloIngreso {
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
  font-size: 12pt;
}
}
@media screen and (min-width: 768px){

  .tituloIngreso {
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
  font-size: 18pt;
}

.logo {
  height: 50%;
  width: 50%;
  margin: 0px auto;
  text-align: center;
  margin-top: 5%;
  margin-left: 25%;
}
.ingresoForm {
  height: 50%;
  width: 60%;
  margin: 0px auto;
  background-color: white;
  border: 1px solid gray;
  margin-top: 20%;
}
.imagen{
 width: 300px; 
 height: 160px;

}

.emailForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 5%;
  border-bottom: 1;
  background-color: transparent;
  width: 350px;
  font-size: 12pt;
  margin-left: 35px;
  margin-right: 5px;
  margin-top: 5px;
}

.contraseñaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 350px;
  font-size: 12pt;
  margin-left: 35px;
  margin-right: 5px;
  margin-top: 5px;
}

.botonIngreso {
  background-color: #e7511e;
  width: 90px;
  height: 40px;
  margin-top: 5%;
  margin-left: 35%;
  margin-bottom: 5%;
  font-size: 15px;
 
}
.olvido {
  text-align: right;
  margin-top: 5%;
  font-size: 12pt;
  margin-right: 30px;
}
} 

@media screen and (min-width: 1280px){
  .tituloIngreso {
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
  font-size: 18pt;
}

.logo {
  height: 50%;
  width: 50%;
  margin: 0px auto;
  text-align: center;
  margin-top: 5%;
  margin-left: 25%;
}
.ingresoForm {
  height: 50%;
  width: 40%;
  margin: 0px auto;
  background-color: white;
  border: 1px solid gray;
  margin-top: 5%;
}
.imagen{
 width: 310px; 
 height: 160px;

}

.emailForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 5%;
  border-bottom: 1;
  background-color: transparent;
  width: 400px;
  font-size: 12pt;
  margin-left: 35px;
  margin-right: 5px;
  margin-top: 5px;
}

.contraseñaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 400px;
  font-size: 12pt;
  margin-left: 35px;
  margin-right: 5px;
  margin-top: 5px;
}

.botonIngreso {
  background-color: #e7511e;
  width: 90px;
  height: 40px;
  margin-top: 5%;
  margin-left: 40%;
  margin-bottom: 5%;
  font-size: 15px;
 
}
.olvido {
  text-align: right;
  margin-top: 5%;
  font-size: 12pt;
  margin-right: 30px;
}

}

@media screen and (min-width: 1440px){
.logo {
  height: 50%;
  width: 50%;
  margin: 0px auto;
  text-align: center;
  margin-top: 40px;
}


.imagen{
 width: 260px; 
 height: 120px;

}

.ingresoForm {
  height: 40%;
  width: 30%;
  margin: 0px auto;
  background-color: white;
  border: 1px solid gray;
  margin-top: 5%;
}

.emailForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 5%;
  border-bottom: 1;
  background-color: transparent;
  width: 400px;
  font-size: 14pt;
  margin-left: 35px;
  margin-right: 5px;
  margin-top: 5px;
}

.contraseñaForm {
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 1;
  background-color: transparent;
  width: 400px;
  font-size: 14pt;
  margin-left: 35px;
  margin-right: 5px;
  margin-top: 5px;
}

.botonIngreso {
  background-color: #e7511e;
  width: 105px;
  height: 40px;
  margin-top: 5%;
  margin-left: 35%;
  margin-bottom: 5%;
  font-size: 17px;
 
}

}



body {
  background-color: #f2e6d1;
  font-family: "Baloo Bhaina 2";
}







</style>