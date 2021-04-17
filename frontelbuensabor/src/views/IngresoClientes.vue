<template>
  <div>
    <cabecera />
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <b-form id="formRegistro" class="login100-form validate-form">
            <span class="login100-form-title p-b-26">
              Bienvenido
            </span>
            <span class="login100-form-title p-b-48">
              <i class="zmdi zmdi-font"></i>
            </span>

            <div class="wrap-input100 validate-input">
              <label class="labelForm">Email</label>
              <b-form-input
                v-model.trim="mail"
                class="input100"
                type="text"
                name="email"
              >
              </b-form-input>

              <span class="error" v-if="submitted && !$v.mail.required">
                Debe ingresa su email.
              </span>
              <span class="error" v-if="submitted && !$v.mail.email">
                El formato del email no es correcto.
              </span>
            </div>
            <span class="focus-input100"></span>

            <div class="wrap-input100 validate-input">
              <span class="btn-show-pass">
                <i class="zmdi zmdi-eye"></i>
              </span>
              <label class="labelForm">Contraseña</label>
              <b-form-input
                class="input100"
                type="password"
                name="pass"
                v-model.trim="$v.contrasenia.$model"
              ></b-form-input>
              <span class="error" v-if="submitted && !$v.contrasenia.required">
                Debe ingresar su contraseña.
              </span>
              <span class="error" v-if="submitted && !$v.contrasenia.alphaNum">
                La contraseña debe ser alfanumérica y no poseer espacios.
              </span>
              <span class="error" v-if="submitted && !$v.contrasenia.minLength">
                La contraseña debe tener mínimo 8 caracteres.
              </span>
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input">
              <span class="btn-show-pass">
                <i class="zmdi zmdi-eye"></i>
              </span>
              <label class="labelForm">Confirmar Contraseña</label>
              <b-form-input
                class="input100"
                type="password"
                name="pass"
                v-model.trim="$v.confContrasenia.$model"
              ></b-form-input>
              <span
                class="error"
                v-if="submitted && !$v.confContrasenia.sameAsPassword"
              >
                Las contraseñas no coinciden.
              </span>
              <span class="focus-input100"></span>
            </div>
            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>
                <b-button @click="ingresar()" class="login100-form-btn">
                  Ingreso
                </b-button>
              </div>
            </div>

            <div class="text-center p-t-115">
              <span class="txt1">
                ¿No tienes cuenta?
              </span>

              <a class="txt2" href="#">
                ¡Regístrate!
              </a>
              <br />
            </div>
          </b-form>
          <br />
          <div class="text-center p-t-115">
            <p class="txt2" style="font-size:13pt">
              O ingresa con Google
            </p>
            <b-button class="social" @click="gLogin()">
              <img
                class="img-fluid"
                src="http://localhost:9001/images/sistema/googleIcon.png"
              />
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Vue.use(Vuelidate);
import Vuelidate from "vuelidate";
import {
  required,
  sameAs,
  email,
  alphaNum,
  minLength,
} from "vuelidate/lib/validators";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
import axios from "axios";
/* import firebase from "firebase"; */
export default {
  components: {
    cabecera: Header,
  },
  data() {
    return {
      submitted: false,

      mail: "",
      contrasenia: "",
      confContrasenia: "",

      service: new Service(),
    };
  },
  methods: {
    async ingresar() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$anyError) {
        setTimeout(() => {
          this.submitted = false;
        }, 5500);
        return;
      }
      var email = this.$v.mail.$model;
      var contrasenia = this.$v.contrasenia.$model;
      await axios
        .post("http://localhost:9001/buensabor/cliente/login", null, {
          params: {
            email,
            contrasenia,
          },
        })
        .then((data) => {
          if (data != null) this.redirect(data);
        });
    },
    redirect(user) {
      if (!user.baja) {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("userChange", 0);
        sessionStorage.setItem("active", true);
        // this.$router.push({ name: "Home" });
        console.log("OK");
      }
    },

    toast() {
      this.$bvToast.toast("Error al ingresar con Google", {
        title: `Error al ingresar con Google`,
        toaster: "b-toaster-top-center",
        solid: false,
        appendToast: true,
      });
    },

   /*  gLogin() {
      const proveedor = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(proveedor)
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          this.toast();
        });
    }, */
  },
  validations: {
    mail: {
      required,
      email,
    },
    contrasenia: {
      required,
      minLength: minLength(8),
      alphaNum,
    },
    confContrasenia: {
      sameAsPassword: sameAs("contrasenia"),
    },
  },
};
</script>

<style>
.error {
  color: #dc3545;
}
.labelForm {
  font-size: 12pt;
}
.social {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

a {
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #6a7dfe;
  color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
  color: -o-linear-gradient(left, #21d4fd, #b721ff);
  color: -moz-linear-gradient(left, #21d4fd, #b721ff);
  color: linear-gradient(left, #21d4fd, #b721ff);
}

p {
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

input {
  outline: none;
  border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}
input:focus:-moz-placeholder {
  color: transparent;
}
input:focus::-moz-placeholder {
  color: transparent;
}
input:focus:-ms-input-placeholder {
  color: transparent;
}

textarea:focus::-webkit-input-placeholder {
  color: transparent;
}
textarea:focus:-moz-placeholder {
  color: transparent;
}
textarea:focus::-moz-placeholder {
  color: transparent;
}
textarea:focus:-ms-input-placeholder {
  color: transparent;
}

input::-webkit-input-placeholder {
  color: #adadad;
}
input:-moz-placeholder {
  color: #adadad;
}
input::-moz-placeholder {
  color: #adadad;
}
input:-ms-input-placeholder {
  color: #adadad;
}

textarea::-webkit-input-placeholder {
  color: #adadad;
}
textarea:-moz-placeholder {
  color: #adadad;
}
textarea::-moz-placeholder {
  color: #adadad;
}
textarea:-ms-input-placeholder {
  color: #adadad;
}

iframe {
  border: none !important;
}

.txt1 {
  font-size: 13px;
  color: #666666;
  line-height: 1.5;
}

.txt2 {
  font-size: 13px;
  color: #333333;
  line-height: 1.5;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f2f2f2;
}

.wrap-login100 {
  width: 390px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 77px 55px 33px 55px;

  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
}

.login100-form {
  width: 100%;
}

.login100-form-title {
  display: block;
  font-size: 30px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
}
.login100-form-title i {
  font-size: 60px;
}

.wrap-input100 {
  width: 100%;
  position: relative;
  border-bottom: 2px solid #adadad;
  margin-bottom: 37px;
}

.input100 {
  font-size: 15px;
  color: #555555;
  line-height: 1.2;

  display: block;
  width: 100%;
  height: 45px;
  background: transparent;
  padding: 0 5px;
}

.focus-input100 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input100::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  background: #6a7dfe;
  background: -webkit-linear-gradient(left, #21d4fd, #b721ff);
  background: -o-linear-gradient(left, #21d4fd, #b721ff);
  background: -moz-linear-gradient(left, #21d4fd, #b721ff);
  background: linear-gradient(left, #21d4fd, #b721ff);
}

.focus-input100::after {
  font-size: 15px;
  color: #999999;
  line-height: 1.2;

  content: attr(data-placeholder);
  display: block;
  width: 100%;
  position: absolute;
  top: 16px;
  left: 0px;
  padding-left: 5px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100::after {
  top: -15px;
}

.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::after {
  top: -15px;
}

.has-val.input100 + .focus-input100::before {
  width: 100%;
}

.btn-show-pass {
  font-size: 15px;
  color: #999999;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  padding-right: 5px;
  cursor: pointer;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.btn-show-pass:hover {
  color: #6a7dfe;
  color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
  color: -o-linear-gradient(left, #21d4fd, #b721ff);
  color: -moz-linear-gradient(left, #21d4fd, #b721ff);
  color: linear-gradient(left, #21d4fd, #b721ff);
}

.btn-show-pass.active {
  color: #6a7dfe;
  color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
  color: -o-linear-gradient(left, #21d4fd, #b721ff);
  color: -moz-linear-gradient(left, #21d4fd, #b721ff);
  color: linear-gradient(left, #21d4fd, #b721ff);
}

.container-login100-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 13px;
}

.wrap-login100-form-btn {
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
  border-radius: 25px;
  overflow: hidden;
  margin: 0 auto;
}

.login100-form-bgbtn {
  position: absolute;
  z-index: -1;
  width: 300%;
  height: 100%;
  background: #a64bf4;
  background: -webkit-linear-gradient(
    right,
    #21d4fd,
    #b721ff,
    #21d4fd,
    #b721ff
  );
  background: -o-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
  background: -moz-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
  background: linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
  top: 0;
  left: -100%;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.login100-form-btn:hover {
  color: #1f91b6 !important;
  border: none;
  background-color: #fff !important;
}
.login100-form-btn {
  font-size: 15px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  background-color: #1f91b6 !important;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
}

.wrap-login100-form-btn:hover .login100-form-bgbtn {
  left: 0;
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding: 77px 15px 33px 15px;
  }
}

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: #fff;
  border: 1px solid #c80000;
  border-radius: 2px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 0px;
  pointer-events: none;

  font-family: Poppins-Regular;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  font-size: 16px;
  color: #c80000;

  display: block;
  position: absolute;
  background-color: #fff;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 5px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}
</style>
