<template>
  <div class="ingreso">
    <div class="logo">
      <b-img
        style="cursor: pointer"
        @click="$router.push({ name: 'Home' })"
        src="http://localhost:9001/images/sistema/logo-01.png"
        class="imagen"
      ></b-img>
    </div>
    <!-- <b-alert v-model="alertDatosNull">Debe ingresar usuario y contraseña</b-alert>
    <b-alert v-model="alertDatosErroneos">Usuario o contraseña incorrecta</b-alert>
    <b-alert v-model="esCliente">No tiene permisos para acceder a esta sección</b-alert> -->
    <div id="ingreso">
      <div class="ingresoForm">
        <form>
          <div class="tituloIngreso">Ingresar</div>

          <b-form-input
            id="email-input"
            v-model="email"
            required
            type="text"
            placeholder="Usuario o e-mail"
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
          <b-button pill class="botonIngreso" :user="user" @click="ingresar" size="md"
            >¡Ingresar!</b-button
          >
        </form>
      </div>
    </div>
    <div class="abajoIngreso"></div>
    <div class="modalMedida">
      <b-modal ref="modal" hide-footer hide-header centered title>
        <p class="modalTitulo">¡Ingreso exitoso! Redirección en proceso...</p>
        <p class="posicion"></p>
      </b-modal>
    </div>
    <Toast ref="toast" />
    <Loader v-if="loading" :loading="loading" />
  </div>
</template>
<script>
import Service from "@/service/Service.js";
import axios from "axios";
import Toast from "@/components/Toast.vue";
import Loader from "@/components/Loader.vue";
import Utils from "@/utilidades/Utils.js";
export default {
  components: {
    Toast: Toast,
    Loader: Loader,
  },
  data() {
    return {
      email: "",
      contrasenia: "",
      user: {},
      //alertDatosNull: false,
      //alertDatosErroneos: false,
      esCliente: false,
      service: new Service(),
      utils: new Utils(),
      loading: false,
    };
  },

  methods: {
    async ingresar() {
      if (this.email != "" && this.contrasenia != "") {
        await this.login(this.email, this.contrasenia);

        if (this.user != undefined && this.user.contrasenia == this.contrasenia) {
          this.redirect();
        } else {
          //this.alertDatosErroneos = true;
          this.email = "";
          this.contrasenia = "";
          this.user = null;
        }
        /* } else {
        this.alertDatosNull = true;
      } */
      }
    },

    redirect() {
      if (!this.user.baja) {
        sessionStorage.setItem("user", JSON.stringify(this.user));
        sessionStorage.setItem("userChange", 0);
        sessionStorage.setItem("active", true);
        if (this.user.rol == "admin") {
          this.$router.push({ name: "StockInsumos" });
        } else if (this.user.rol == "delivery") {
          window.location = "/pedidos";
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
      } else {
        this.toastr("Este usuario no tiene acceso.", "Error: ");
        return false;
      }
    },

    async login(cuenta, pass) {
      this.loading = !this.loading;
      await axios
        .post("http://localhost:9001/buensabor/empleado/login", null, {
          params: {
            email: cuenta,
            usuario: cuenta,
            pass: pass,
          },
        })
        .then((data) => {
          this.user = data.data;
          this.redirect();
          this.loading = !this.loading;
          this.utils.enableScroll();
        })
        .catch((e) => {
          console.log(e);
          this.toastr(e.response.data.message);
          this.utils.enableScroll();
          this.loading = !this.loading;
        });
    },
    toastr(msg, title) {
      this.$refs.toast.emitToast(msg, title);
    },
  },
};
</script>
<style>
/* .loginBtn {
  box-sizing: border-box;
  position: relative;
  padding: 0 15px 0 46px;
  text-align: left;
  line-height: 34px;
  width: 50%;
  white-space: nowrap;
  font-size: 15px;
  color: #fff;
  border-color: #6c757d;
  border: 1px solid transparent;
  background-color: #e7511e;
  margin-top: 5%;
  margin-left: 25%;
  margin-bottom: 5%;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}
.loginBtn--google {
  background: #e7511e;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background-color: #6c757d;
}

.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
} */

@media screen and (min-width: 320px) and (max-width: 630px) {
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

  .loginBtn {
    box-sizing: border-box;
    position: relative;
    padding: 0 15px 0 46px;
    text-align: left;
    width: 160px;
    line-height: 20px;
    white-space: nowrap;
    font-size: 7pt;
    color: #fff;
    border-color: #6c757d;
    border: 1px solid transparent;
    background-color: #e7511e;
    margin-top: 5%;
    margin-left: 15%;
    margin-bottom: 5%;
  }
  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }

  .loginBtn--google {
    background: #e7511e;
  }

  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background-color: #6c757d;
  }

  .loginBtn--google:before {
    border-right: #bb3f30 1px solid;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
      8px 4px no-repeat;
    background-size: 42%;
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
  .loginBtn {
    box-sizing: border-box;
    position: relative;
    padding: 0 15px 0 46px;
    text-align: left;
    width: 10%;
    line-height: 34px;
    white-space: nowrap;
    font-size: 9px;
    color: #fff;
    border-color: #6c757d;
    border: 1px solid transparent;
    background-color: #e7511e;
    margin-top: 5%;
    margin-left: 20%;
    margin-bottom: 5%;
  }
  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }

  .loginBtn--google {
    background: #e7511e;
  }

  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background-color: #6c757d;
  }

  .loginBtn--google:before {
    border-right: #bb3f30 1px solid;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
      9px 9px no-repeat;
    background-size: 50%;
  }
}
@media screen and (min-width: 768px) and (max-width: 1279px) {
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
  .loginBtn {
    box-sizing: border-box;
    position: relative;
    padding: 0 15px 0 46px;
    text-align: left;
    width: 40%;
    line-height: 30px;
    white-space: nowrap;
    font-size: 9pt;
    color: #fff;
    border-color: #6c757d;
    border: 1px solid transparent;
    background-color: #e7511e;
    margin-top: 0.5%;
    margin-left: 24%;
    margin-bottom: 5%;
  }
  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }

  .loginBtn--google {
    background: #e7511e;
  }

  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background-color: #6c757d;
  }

  .loginBtn--google:before {
    border-right: #bb3f30 1px solid;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
      9px 7px no-repeat;
    background-size: 50%;
  }
}

@media screen and (min-width: 1280px) and (max-width: 1439px) {
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
  .loginBtn {
    box-sizing: content-box;
    position: relative;
    padding: 0 15px 0 46px;
    text-align: left;
    width: 120px;
    line-height: 30px;
    white-space: nowrap;
    font-size: 9pt;
    color: #fff;
    border-color: #6c757d;
    border: 1px solid transparent;
    background-color: #e7511e;
    margin-top: 0.5%;
    margin-left: 28%;
    margin-bottom: 5%;
  }
  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }

  .loginBtn--google {
    background: #e7511e;
  }

  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background-color: #6c757d;
  }

  .loginBtn--google:before {
    border-right: #bb3f30 1px solid;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
      9px 9px no-repeat;
    background-size: 50%;
  }
}

@media screen and (min-width: 1440px) and (max-width: 2048px) {
  .ingreso {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
  }
  .olvido {
    text-align: right;
    margin-top: 5%;
    font-size: 13pt;
    margin-right: 30px;
  }
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

  .loginBtn {
    box-sizing: content-box;
    position: relative;
    text-align: left;
    width: 170px;
    line-height: 34px;
    white-space: nowrap;
    font-size: 17px;
    color: #fff;
    border-color: #6c757d;
    border: 1px solid transparent;
    background-color: #e7511e;
    margin-top: 0.5%;
    margin-left: 23%;
    margin-bottom: 5%;
  }
  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }

  .loginBtn--google {
    background: #e7511e;
  }

  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background-color: #6c757d;
  }

  .loginBtn--google:before {
    border-right: #bb3f30 1px solid;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
      9px 9px no-repeat;
    background-size: 50%;
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
  position: absolute;
  bottom: 0;
}
/* 
.loginBtn {
  width: 120px;
  box-sizing: content-box;
} */
/* 
.loginBtn {
  box-sizing: border-box;
  position: relative;
  padding: 0 15px 0 46px;
  text-align: left;
  line-height: 34px;
  width: 55%;
  white-space: nowrap;
  font-size: 15px;
  color: #fff;
  border-color: #6c757d;
  border: 1px solid transparent;
  background-color: #e7511e;
  margin-top: 0.5%;
  margin-left: 24%;
  margin-bottom: 5%;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}
.loginBtn--google {
  background: #e7511e;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background-color: #6c757d;
}

.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
} */
</style>
