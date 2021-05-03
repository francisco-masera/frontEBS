<template>
  <div>
    <cabecera></cabecera>
    <div id="nav">
      <menuLateral></menuLateral>
    </div>
    <div class="costado"></div>
    <b-container class="informacion">
      <h1 id="titulo">Formulario nuevo empleado</h1>
      <div id="paso1">
        <h2>Información personal</h2>
        <b-form id="form1">
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Nombre</label>
            <b-form-input
              class="campoForm form-control"
              id="nombreEmpleado"
              required
              type="text"
              v-model.trim="form1.nombre"
              :state="
                !$v.form1.nombre.$dirty
                  ? !$v.form1.nombre.$anyError
                  : !$v.form1.nombre.$error
              "
              @input="$v.form1.nombre.$touch()"
            ></b-form-input>
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
              El nombre no puede contener números.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Apellido</label>
            <b-form-input
              class="campoForm form-control"
              id="apellidoEmpleado"
              v-model.trim="form1.apellido"
              :state="
                !$v.form1.apellido.$dirty
                  ? !$v.form1.apellido.$anyError
                  : !$v.form1.apellido.$error
              "
              @input="$v.form1.apellido.$touch()"
            ></b-form-input>

            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.apellido.$dirty && $v.form1.apellido.$model == ''"
            >
              El apellido es obligatorio.
            </b-form-invalid-feedback>

            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.apellido.$params.alpha && $v.form1.apellido.$model != ''"
            >
              El apellido no puede contener números.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Teléfono</label>
            <b-form-input
              class="campoForm form-control"
              id="telEmpleado"
              v-model.trim="form1.telefono"
              :state="
                !$v.form1.telefono.$dirty
                  ? !$v.form1.telefono.$anyError
                  : !$v.form1.telefono.$error
              "
              @input="$v.form1.telefono.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.telefono.$dirty && $v.form1.telefono.$model == ''"
            >
              El teléfono es obligatorio.
            </b-form-invalid-feedback>

            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.telefono.$params.integer && $v.form1.telefono.$model != ''"
            >
              El teléfono no puede contener letras.
            </b-form-invalid-feedback>
          </div>
          <br />
          <h1 class="tituloDom">Domicilio</h1>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Calle</label>
            <b-form-input
              class="campoForm form-control"
              id="calleDomicilio"
              v-model.trim="form1.calle"
              :state="
                !$v.form1.calle.$dirty
                  ? !$v.form1.calle.$anyError
                  : !$v.form1.calle.$error
              "
              @input="$v.form1.calle.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.calle.$dirty && $v.form1.calle.$model == ''"
            >
              La calle es obligatoria.
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.calle.$params.alpha && $v.form1.calle.$model != ''"
            >
              La calle no puede contener números.
            </b-form-invalid-feedback>
          </div>

          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Número</label>
            <b-form-input
              class="campoForm form-control"
              id="numDomicilio"
              v-model.trim="form1.numero"
              :state="
                !$v.form1.numero.$dirty
                  ? !$v.form1.numero.$anyError
                  : !$v.form1.numero.$error
              "
              @input="$v.form1.numero.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.numero.$dirty && $v.form1.numero.$model == ''"
            >
              El número de calle es obligatorio.
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.numero.$params.integer && $v.form1.numero.$model != ''"
            >
              El número de calle sólo debe contener números sin decimales.
            </b-form-invalid-feedback>
          </div>

          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Piso</label>
            <b-form-input
              class="campoForm form-control"
              id="piso"
              v-model="form1.piso"
              :state="
                !$v.form1.piso.$dirty ? !$v.form1.piso.$anyError : !$v.form1.piso.$error
              "
              @input="$v.form1.piso.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback class="error" v-if="$v.form1.piso.$params.integer">
              El piso sólo debe contener números sin decimales.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Departamento</label>
            <b-form-input
              class="campoForm form-control"
              id="deptoDomicilio"
              v-model.trim="form1.departamento"
              :state="
                !$v.form1.departamento.$dirty
                  ? !$v.form1.departamento.$anyError
                  : !$v.form1.departamento.$error
              "
              @input="$v.form1.departamento.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.departamento.$params.alpha"
            >
              El departamento no puede contener números
            </b-form-invalid-feedback>
          </div>

          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Localidad</label>
            <b-form-input
              class="campoForm form-control"
              id="localidadDomicilio"
              v-model.trim="form1.localidad"
              :state="
                !$v.form1.localidad.$dirty
                  ? !$v.form1.localidad.$anyError
                  : !$v.form1.localidad.$error
              "
              @input="$v.form1.localidad.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form1.localidad.$dirty && $v.form1.localidad.$model == ''"
            >
              La localidad es obligatoria.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaFormIzquierda" style="display: flex">
            <b-button pill class="boton2" size="md" @click="vuelveStock()"
              >Cancelar</b-button
            >
            <b-button pill class="boton" size="md" @click.prevent="siguiente1"
              >Siguiente</b-button
            >
          </div>
        </b-form>
      </div>
      <div id="paso2">
        <h2>Información de la cuenta</h2>
        <b-form id="form2">
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Usuario</label>
            <b-form-input
              class="campoForm form-control"
              id="usuarioEmpleado"
              v-model.trim="form2.usuario"
              :state="
                !$v.form2.usuario.$dirty
                  ? !$v.form2.usuario.$anyError
                  : !$v.form2.usuario.$error
              "
              @input="$v.form2.usuario.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form2.usuario.$dirty && $v.form2.usuario.$model == ''"
            >
              El usuario es obligatorio.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Contraseña</label>
            <b-form-input
              class="campoForm form-control"
              id="contraseniaEmpleado"
              type="password"
              v-model="form2.contrasenia"
              :state="
                !$v.form2.contrasenia.$dirty
                  ? !$v.form2.contrasenia.$anyError
                  : !$v.form2.contrasenia.$error
              "
              @input="$v.form2.contrasenia.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form2.contrasenia.$dirty && $v.form2.contrasenia.$model == ''"
            >
              La contraseña es obligatoria.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Confirmar contraseña</label>
            <b-form-input
              class="campoForm form-control"
              id="confirmaContraEmpleado"
              type="password"
              v-model.trim="form2.confContrasenia"
              :state="
                !$v.form2.confContrasenia.$dirty
                  ? !$v.form2.confContrasenia.$anyError
                  : !$v.form2.confContrasenia.$error
              "
              @input="$v.form2.confContrasenia.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="
                $v.form2.confContrasenia.$dirty && $v.form2.confContrasenia.$model == ''
              "
            >
              La verificación de contraseña es obligatoria.
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              class="error"
              v-if="
                $v.form2.confContrasenia.$params.sameAsPassword &&
                $v.form2.confContrasenia.$model != ''
              "
            >
              Las contraseñas deben coincidir.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Dirección de email</label>
            <b-form-input
              class="campoForm form-control"
              id="email"
              type="email"
              v-model.trim="form2.email"
              :state="
                !$v.form2.email.$dirty
                  ? !$v.form2.email.$anyError
                  : !$v.form2.email.$error
              "
              @input="$v.form2.email.$touch()"
            ></b-form-input>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form2.email.$dirty && $v.form2.email.$model == ''"
            >
              El email es obligatorio.
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              class="error"
              v-if="$v.form2.email.$params.email && $v.form2.email.$model != ''"
            >
              El formato de email es inválido
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Foto del empleado</label>
            <b-form-file
              class="campoForm form-control"
              id="imagen"
              v-model="form2.foto"
              :state="
                !$v.form2.foto.$dirty ? !$v.form2.foto.$anyError : !$v.form2.foto.$error
              "
              @input="$v.form2.foto.$touch()"
            ></b-form-file>
            <b-form-invalid-feedback class="error" v-if="$v.form2.foto.$dirty">
              La foto es obligatoria.
            </b-form-invalid-feedback>
          </div>
          <div>
            <p style="text-align: left; font-weight: 600; margin-top: 5%">
              Seleccione el rol del empleado
            </p>
            <b-form-select
              size="sm"
              id="rolSelect"
              :options="roles"
              v-model="persona.rol"
            >
            </b-form-select>
          </div>
          <div class="lineaFormIzquierda" style="display: flex">
            <b-button pill class="boton2" size="md">Cancelar</b-button>
            <b-button pill class="boton" size="md" @click.prevent="guardarEmpleado"
              >Guardar</b-button
            >
          </div>
        </b-form>
      </div>

      <b-modal ref="modal" hide-footer hide-header centered title>
        <p class="modalTitulo">¡Empleado agregado con éxito!</p>

        <p class="posicion">
          <b-button pill size="md" class="botonModal" @click="vuelveStock"
            >Aceptar</b-button
          >
        </p>
      </b-modal>
    </b-container>
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
Vue.use(Vuelidate);
import Vuelidate from "vuelidate";
import { required, integer, email, sameAs, helpers } from "vuelidate/lib/validators";
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
import axios from "axios";

const alpha = helpers.regex("alpha", /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/);

export default {
  components: {
    menuLateral: MenuLateral,
    cabecera: Header,
  },

  data() {
    return {
      persona: {
        type: "Empleado",
        apellido: "",
        baja: false,
        contrasenia: "",
        email: "",
        foto: "",
        nombre: "",
        telefono: "",
        usuario: "",
        rol: "",
      },
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

      form1: {
        nombre: "",
        apellido: "",
        telefono: "",
        calle: "",
        numero: "",
        localidad: "",
        departamento: "",
        piso: "",
      },

      form2: {
        usuario: "",
        contrasenia: "",
        confContrasenia: "",
        email: "",
        foto: "",
      },
      service: new Service(),

      roles: [
        { value: "", text: "Rol del empleado" },
        { value: "admin", text: "Administrador" },
        { value: "cocina", text: "Cocinero" },
        { value: "delivery", text: "Delivery" },
        { value: "cajero", text: "Cajero" },
      ],
    };
  },

  methods: {
    siguiente1() {
      this.$v.form1.$touch();
      if (this.$v.form1.$anyError) {
        return;
      }
      console.log(typeof this.domicilio.departamento);
      console.log(typeof this.domicilio.piso);
      console.log(this.domicilio.departamento);
      console.log(this.domicilio.piso);
      this.asignaCamposForm1();

      document.getElementById("paso1").style.display = "none";
      document.getElementById("paso2").style.display = "block";
    },

    async guardarEmpleado() {
      this.$v.$touch();
      if (this.$v.form2.$anyError) {
        return;
      }

      this.asignaCamposForm2();
      if (this.persona.rol == "") {
        this.$bvToast.toast(`El rol del empleado no puede estar vacío`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }
      let img = document.getElementById("imagen").files[0];

      if (img == undefined || img == null) {
        this.$bvToast.toast(`Debe elegir una foto .jpeg, .jpg o .png`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return false;
      }
      var splitted = img.name.split(".");
      var extension = splitted[splitted.length - 1];
      if (extension != "jpeg" && extension != "jpg" && extension != "png") {
        this.$bvToast.toast(`La foto debe ser .jpeg, .jpg o .png`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }

      if (img != undefined && img.size / 1024 > 512) {
        this.$bvToast.toast(`La imagen no debe superar los 512KB`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }

      this.persona.foto = img.name;
      await this.service.save("persona", this.persona).then((data) => {
        this.persona = data;
      });
      await this.guardarImagen(img);
      this.domicilio.persona.id = this.persona.id;
      console.log(this.domicilio.persona.id);
      await this.service.save("domicilio", this.domicilio).then((data) => {
        this.domicilio = data;
      });
      this.$refs["modal"].show();
    },

    async guardarImagen(imagen) {
      const formData = new FormData();
      formData.append("file", imagen);
      await axios
        .post("http://localhost:9001/buensabor/persona/uploadImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origins": "*",
            "cache-control": "no-cache",
          },
        })
        .catch((error) => {
          return error;
        });
      return true;
    },

    asignaCamposForm1() {
      this.persona.nombre = this.form1.nombre;
      this.persona.apellido = this.form1.apellido;
      this.persona.telefono = this.form1.telefono;
      this.domicilio.calle = this.form1.calle;
      this.domicilio.numero = this.form1.numero;

      if (this.form1.departamento == "") {
        this.domicilio.departamento = "0";
      } else {
        this.domicilio.departamento = this.form1.departamento;
      }

      if (this.form1.piso == "") {
        this.domicilio.departamento = "0";
      } else {
        this.domicilio.departamento = this.form1.piso;
      }

      this.domicilio.localidad = this.form1.localidad;
    },

    asignaCamposForm2() {
      this.persona.contrasenia = this.form2.contrasenia;
      this.persona.email = this.form2.email;
      this.persona.usuario = this.form2.usuario;
    },

    vuelveStock() {
      window.location.href = "/stockInsumos";
    },
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
        integer,
      },
      calle: {
        required,
        alpha,
      },
      numero: {
        required,
        integer,
      },
      localidad: {
        required,
      },
      piso: {
        integer,
      },
      departamento: {
        alpha,
      },
    },
    form2: {
      usuario: {
        required,
      },
      contrasenia: {
        required,
      },
      confContrasenia: {
        required,
        sameAsPassword: sameAs("contrasenia"),
      },
      email: {
        required,
        email,
      },
      foto: {
        required,
      },
    },
  },
};
</script>
<style>
.lineaForm {
  width: 100%;
  margin-top: 20px;
  min-height: 40px;
}

.lineaFormIzquierda {
  margin-top: 50px;
  float: left;
  margin-right: 0px;
  margin-bottom: 50px;
}

.boton {
  margin-top: 0.6vh;
}

#paso1 {
  display: block;
}
#paso2 {
  display: none;
}
#usuarioEmpleado {
  margin-top: -5px;
  width: 50%;
}
#contraseniaEmpleado {
  margin-top: -5px;
  width: 47%;
}
#confirmaContraEmpleado {
  margin-top: -5px;
  width: 36%;
}
#email {
  margin-top: -5px;
  width: 40%;
}
#imagen {
  margin-top: -5px;
  width: 20%;
}

.botonModal {
  border: none;
  background-color: #e7511e;
  color: #ffffff;
  font-weight: 600;
  width: 105px;
  height: 30px;
}

.modal-dialog {
  margin-top: 200px;
  text-align: center;
  font-family: "Baloo Bhaina 2";
  font-weight: 400;
  font-size: 11pt;
  justify-content: center;
}
.modal-dialog .boton {
  margin-top: 20px;
  margin-left: auto;
  margin-right: 40%;
  float: right;
}
.error {
  color: #e43561;
  font-size: 1em;
  margin-left: 2em;
}
.campoForm {
  width: 30vw;
  margin-top: -5px;
}
</style>
