<template>
  <div id="div-registro" class="container">
    <label class="title">Ingrese sus datos para registrarse</label>
    <b-form id="formRegistro">
      <div class="form-group col-md-6">
        <b-form-input
          class="border-white shadow form-control d-flex"
          type="text"
          id="nombre"
          required
          placeholder="Nombres"
          @input="$v.form1.nombre.$touch()"
          :state="
            !$v.form1.nombre.$dirty ? !$v.form1.nombre.$anyError : !$v.form1.nombre.$error
          "
          v-model.trim="form1.nombre"
        />
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.nombre.$dirty && $v.form1.nombre.$model == ''"
        >
          El nombre es obligatorio.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.nombre.$params.alpha && $v.form1.nombre.$model != ''"
        >
          El nombre no puede contener números. </b-form-invalid-feedback
        ><br />
      </div>
      <div class="form-group col-md-6">
        <b-form-input
          class="border-white shadow form-control d-flex"
          type="text"
          id="apellido"
          placeholder="Apellidos"
          required
          @input="$v.form1.apellido.$touch()"
          :state="
            !$v.form1.apellido.$dirty
              ? !$v.form1.apellido.$anyError
              : !$v.form1.apellido.$error
          "
          v-model.trim="form1.apellido"
        />
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.apellido.$dirty && $v.form1.apellido.$model == ''"
        >
          <br />El apellido es obligatorio.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.apellido.$params.alpha && $v.form1.apellido.$model != ''"
        >
          No debe ingresar números. </b-form-invalid-feedback
        ><br />
      </div>
      <div
        class="form-group col-md-6"
        :class="{ 'form-group--error': $v.form1.email.$error }"
      >
        <b-form-input
          class="border-white shadow form-control d-flex"
          type="email"
          id="email"
          placeholder="Email"
          required
          @input="$v.form1.email.$touch()"
          :state="
            !$v.form1.email.$dirty ? !$v.form1.email.$anyError : !$v.form1.email.$error
          "
          v-model.trim="$v.form1.email.$model"
        />
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.email.$dirty && $v.form1.email.$model == ''"
        >
          El email es obligatorio.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.email.$params.email && $v.form1.email.$model != ''"
        >
          El formato de email es inválido
        </b-form-invalid-feedback>
      </div>
      <div class="form-group col-md-6">
        <b-form-input
          class="border-white shadow form-control d-flex"
          type="numeric"
          id="telefono"
          placeholder="Teléfono"
          @input="$v.form1.telefono.$touch()"
          :state="
            !$v.form1.telefono.$dirty
              ? !$v.form1.telefono.$anyError
              : !$v.form1.telefono.$error
          "
          v-model.trim="form1.telefono"
        />
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.telefono.$dirty && $v.form1.telefono.$model == ''"
        >
          El teléfono es obligatorio.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback class="error" v-if="$v.form1.telefono.$params.numeric">
          Recuerde ingresar sólo números. </b-form-invalid-feedback
        ><br />
      </div>
      <div class="form-group col-md-6">
        <b-form-input
          class="border-white shadow form-control d-flex"
          type="text"
          id="usuario"
          placeholder="Usuario"
          required
          @input="$v.form1.usuario.$touch()"
          :state="
            !$v.form1.usuario.$dirty
              ? !$v.form1.usuario.$anyError
              : !$v.form1.usuario.$error
          "
          v-model.trim="form1.usuario"
        />
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.usuario.$dirty && $v.form1.usuario.$model == ''"
        >
          El usuario es obligatorio. </b-form-invalid-feedback
        ><br />
      </div>
      <div class="form-group col-md-6">
        <b-form-input
          class="border-white shadow form-control d-flex"
          type="password"
          id="pass"
          placeholder="Contraseña"
          required
          @input="$v.form1.pass.$touch()"
          :state="
            !$v.form1.pass.$dirty ? !$v.form1.pass.$anyError : !$v.form1.pass.$error
          "
          v-model.trim="form1.pass"
        />
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.pass.$dirty && $v.form1.pass.$model == ''"
        >
          La contraseña es obligatoria. </b-form-invalid-feedback
        ><br />
      </div>
      <div class="form-group col-md-6">
        <b-form-input
          class="border-white shadow form-control d-flex"
          type="password"
          id="pass2"
          placeholder="Confirmar contraseña"
          required
          @input="$v.form1.pass2.$touch()"
          :state="
            !$v.form1.pass2.$dirty ? !$v.form1.pass2.$anyError : !$v.form1.pass2.$error
          "
          v-model.trim="form1.pass2"
        />
        <b-form-invalid-feedback
          class="error"
          v-if="$v.form1.pass2.$dirty && $v.form1.pass2.$model == ''"
        >
          La validación de contraseña es obligatoria.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback class="error" v-if="!$v.form1.pass2.sameAsPassword"
          >Las contraseñas deben ser iguales</b-form-invalid-feedback
        ><br />
      </div>
      <div class="form-group col-md-6">
        <label>Foto</label>
        <b-form-file
          class="border-white shadow form-control d-flex"
          id="ph"
          accept="jpeg,jpg,png"
        />
      </div>
      <b-button class="btn boton" @click="register()">Registrarse</b-button>
    </b-form>
    <b-alert
      variant="success"
      :show="alertaExito"
      @dismissed="!alertaExito"
      dismissible
      fade
      >¡Registro Exitoso!</b-alert
    >
    <b-alert
      variant="danger"
      :show="alertaError"
      @dismissed="!alertaError"
      dismissible
      fade
      >¡Registro Fallido!</b-alert
    >
    <router-view />
  </div>
</template>

<script>
import Service from "@/service/Service.js";
import Vue from "vue";
Vue.use(Vuelidate);
import Vuelidate from "vuelidate";
import { required, email, sameAs, numeric, helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/);
import axios from "axios";
export default {
  methods: {
    async register() {
      this.$v.$touch();
      if (this.$v.form1.$anyError) {
        return;
      }
      let ph = document.getElementById("ph").files[0];
      var nombreFoto =
        ph.name == undefined || ph.name == null || ph.name == "" ? "" : ph.name;
      var cliente = {
        id: 0,
        type: "Cliente",
        nombre: this.form1.nombre,
        apellido: this.form1.apellido,
        telefono: this.form1.telefono,
        email: this.form1.email,
        contrasenia: this.form1.pass,
        usuario: this.form1.usuario,
        foto: nombreFoto,
        domicilio: {
          baja: false,
          calle: "",
          departamento: "",
          localidad: "",
          numero: 0,
          piso: 0,
          persona: {
            type: "Empleado",
            id: 0,
          },
        },
      };
      if (ph != null && ph != undefined) {
        var splitted = ph.name.split(".");
        var extension = splitted[splitted.length - 1];
        if (
          !extension.match("jpeg") ||
          !extension.match("jpg") ||
          !extension.match("png")
        ) {
          this.$bvToast.toast(`La foto debe ser .jpeg, .jpg o .png`, {
            title: `¡Atención!`,
            toaster: "b-toaster-top-center",
            solid: true,
          });
          return;
        }

        if (ph.size / 1024 > 512) {
          this.$bvToast.toast(`La imagen no debe superar los 512KB`, {
            title: `¡Atención!`,
            toaster: "b-toaster-top-center",
            solid: true,
          });
          return;
        }
      } else {
        await this.service
          .save("persona", cliente)
          .then((res) => {
            var id = res.id;
            if (id != undefined && id != null) {
              this.mostrarResultado(true);
            } else {
              this.mostrarResultado(false);
            }
          })
          .catch((e) => console.log(e))
          .then(this.guardarImagen(ph))
          .catch((e) => console.log(e));
      }
    },

    async guardarImagen(ph) {
      const formData = new FormData();
      formData.append("file", ph);
      await axios
        .post("http://localhost:9001/buensabor/persona/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origins": "*",
            "cache-control": "no-cache",
          },
        })
        .then((data) => this.mostrarResultado(data))
        .catch((error) => {
          return error;
        });
      return true;
    },

    mostrarResultado(data) {
      if (data) {
        this.alertaExito = true;
        setTimeout(() => {
          this.alertaExito = false;
        }, 2000);
      } else {
        this.alertaError = true;
        setTimeout(() => {
          this.alertaError = false;
        }, 2000);
      }
    },
  },
  data() {
    return {
      service: new Service(),
      alertaExito: false,
      alertaError: false,
      form1: {
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        pass: "",
        pass2: "",
        usuario: "",
      },
    };
  },
  validations: {
    form1: {
      nombre: {
        required,
        alpha,
      },
      apellido: {
        required,
        alpha,
      },
      telefono: {
        required,
        numeric,
      },
      email: {
        required,
        email,
      },
      pass: {
        required,
      },
      pass2: {
        required,
        sameAsPassword: sameAs("pass"),
      },
      usuario: {
        required,
      },
    },
  },
};
</script>

<style>
@media (max-width: 575.98px) {
}

@media (max-width: 767.98px) {
}

@media (max-width: 991.98px) {
}

@media (max-width: 1199.98px) {
}

@media (max-width: 1399.98px) {
}
#div-registro {
  margin-top: 5em;
  align-content: center;
}

b-form-input {
  margin-bottom: 5px;
  height: 38px;
  font-size: 1em;
}

.title {
  margin-left: 9em;
  margin-bottom: 4vh;
}
.btn {
  margin-left: 1.5%;
}
.error {
  color: #e43561;
  font-size: 1em;
}
</style>
