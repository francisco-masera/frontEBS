<template>
  <div class="ingreso">
    <div class="logo">
      <b-img
        src="http://localhost:9001/images/sistema/logo-01.png"
        class="imagen"
      ></b-img>
    </div>
    <b-alert v-model="alertDatosNull"
      >Debe ingresar usuario y contraseña</b-alert
    >
    <b-alert v-model="alertDatosErroneos"
      >Usuario o contraseña incorrecta</b-alert
    >
    <b-alert v-model="esCliente"
      >No tiene permisos para acceder a esta sección</b-alert
    >
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
        <b-button
          pill
          class="botonIngreso"
          :user="user"
          @click="ingresar"
          size="md"
          >¡Ingresar!</b-button
        >
      </form>
    </div>
    <div class="abajoIngreso"></div>
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
            sessionStorage.setItem("userChange",0 );
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
    },
  },
};
</script>
<style>
@media screen and (min-width: 320px) {
  .tituloIngreso {
    text-align: center;
    margin-top: 30px;
    font-weight: bold;

    font-size: 13pt;
  }
  .logo {
    height: 25%;
    width: 50%;
    margin: 0px auto;
    text-align: center;
    margin-top: 5%;
  }
  .ingresoForm {
    height: 40%;

    width: 70%;
    margin: 0px auto;
    background-color: white;
    border: 1px solid gray;
  }
  .imagen {
    width: 160px;
    height: 60px;
  }

  .emailForm {
    border-right: 0px;
    border-left: 0px;
    border-top: 0px;
    border-bottom: 1;
    background-color: transparent;

    width: 70%;
    font-size: 7pt;

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

    width: 70%;
    font-size: 7pt;

    margin-left: 35px;
    margin-right: 5px;
    margin-top: 5px;
  }

  .botonIngreso {
    background-color: #e7511e;

    width: 60px;
    height: 17px;
    margin-top: 5%;
    margin-left: 35%;
    margin-bottom: 5%;
    font-size: 9px;
    text-align: center;
    padding: 0%;
  }
  .olvido {
    text-align: right;
    margin-top: 5%;

    font-size: 7pt;

    margin-right: 30px;
  }
}

@media screen and (min-width: 640px) {
  .ingresoForm {
    height: 45%;

    width: 35%;
    margin-bottom: 10%;
    background-color: white;
    border: 1px solid gray;
    margin-top: 15px;
  }
  .imagen {
    width: 150px;
    height: 70px;
  }

  .logo {
    height: 20%;
    width: 25%;

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
@media screen and (min-width: 768px) {
  .tituloIngreso {
    text-align: center;
    margin-top: 30px;
    font-weight: bold;
    font-size: 18pt;
  }

  .logo {
    height: 15%;
    width: 25%;

    margin: 0px auto;
    text-align: center;
    margin-top: 5%;
    margin-left: 25%;
  }
  .ingresoForm {
    height: 30%;

    width: 60%;
    margin: 0px auto;
    background-color: white;
    border: 1px solid gray;
    margin-top: 20%;
  }
  .imagen {
    width: 300px;
    height: 160px;
  }

  .emailForm {
    border-right: 0px;
    border-left: 0px;
    border-top: 5%;
    border-bottom: 1;
    background-color: transparent;

    width: 70%;

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

    width: 70%;

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

@media screen and (min-width: 1280px) {
  .tituloIngreso {
    text-align: center;
    margin-top: 25px;
    font-weight: bold;
    font-size: 16pt;
  }

  .logo {
    height: 25%;
    width: 25%;
    margin: 0px auto;
    text-align: center;
    margin-top: 5%;
  }
  .ingresoForm {
    height: 40%;
    width: 30%;
    margin: 0px auto;
    background-color: white;
    border: 1px solid gray;
  }
  .imagen {
    width: 240px;
    height: 100px;
  }

  .emailForm {
    border-right: 0px;
    border-left: 0px;
    border-top: 5%;
    border-bottom: 1;
    background-color: transparent;

    width: 70%;

    font-size: 9pt;
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

    width: 70%;

    font-size: 9pt;
    margin-left: 35px;
    margin-right: 5px;
    margin-top: 5px;
  }

  .botonIngreso {
    background-color: #e7511e;
    width: 80px;
    height: 30px;
    margin-top: 5%;
    margin-left: 40%;
    margin-bottom: 5%;
    font-size: 13px;
  }

  .olvido {
    text-align: right;
    margin-top: 5%;
    font-size: 9pt;
    margin-right: 30px;
  }
}

@media screen and (min-width: 1440px) {
  .logo {
    height: 25%;
    width: 25%;

    margin: 0px auto;
    text-align: center;
    margin-top: 40px;
  }

  .imagen {
    width: 260px;
    height: 120px;
  }

  .ingresoForm {
    height: 40%;
    width: 30%;
    margin: 0px auto;
    background-color: white;
    border: 1px solid gray;
  }

  .emailForm {
    border-right: 0px;
    border-left: 0px;
    border-top: 5%;
    border-bottom: 1;
    background-color: transparent;

    width: 70%;

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

    width: 70%;

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

.ingreso {
  background-color: #ededed;
  font-family: "Baloo Bhaina 2";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
}

.abajoIngreso {
  background-image: url("http://localhost:9001/images/sistema/reticula.png");
  background-repeat: repeat-x;
  width: 100%;
  background-color: #ededed;
  min-height: 60px;
  background-size: contain;
  bottom: 0;
  position: absolute;
}
</style>
