<template>
  <div class="container-fluid" style="margin-top: 10vh">
    <div class="col-6" style="float: left; margin-left: 20vw">
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
              !$v.form1.nombre.$dirty
                ? !$v.form1.nombre.$anyError
                : !$v.form1.nombre.$error
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
            El nombre no puede contener números.
          </b-form-invalid-feedback>
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
            El apellido es obligatorio.
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            class="error"
            v-if="$v.form1.apellido.$params.alpha && $v.form1.apellido.$model != ''"
          >
            No debe ingresar números.
          </b-form-invalid-feedback>
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
            Recuerde ingresar sólo números.
          </b-form-invalid-feedback>
        </div>
        <div class="form-group col-md-6">
          <GmapAutocomplete
            class="border-white shadow form-control d-flex autocomplete"
            @place_changed="setAddress"
          ></GmapAutocomplete>
          <div class="form-check">
            <label class="form-check-label">
              <input
                class="form-check-input"
                ref="esDepto"
                type="checkbox"
                @change="setEsDepto"
              />
              Es Departamento
            </label>
          </div>
          <div v-show="this.esDepto">
            <input
              type="text"
              class="border-white shadow form-control d-flex autocomplete"
              name=""
              id="depto"
              ref="depto"
              placeholder="Departamento"
            />

            <input
              type="numer"
              class="border-white shadow form-control d-flex autocomplete"
              name=""
              id="piso"
              ref="piso"
              placeholder="Piso"
            />
          </div>
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
            El usuario es obligatorio.
          </b-form-invalid-feedback>
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
            La contraseña es obligatoria.
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            class="error"
            v-if="!$v.form1.pass.$dirty && !$v.form1.pass.alphaNum"
          >
            La contraseña debe ser alfanumérica y no poseer espacios.
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            class="error"
            v-if="!$v.form1.pass.$dirty && !$v.form1.pass.minLength"
          >
            La contraseña debe tener mínimo 8 caracteres.
          </b-form-invalid-feedback>
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
          >
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
    </div>
    <router-view />
  </div>
</template>

<script>
import Service from "@/service/Service.js";
import Vue from "vue";
Vue.use(Vuelidate);
import Vuelidate from "vuelidate";
import {
  required,
  email,
  sameAs,
  numeric,
  helpers,
  alphaNum,
  minLength,
} from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/);
import axios from "axios";

export default {
  methods: {
    setAddress(coord) {
      var latLng = coord.geometry.location;
      this.coord = { lat: latLng.lat(), lng: latLng.lng() };
      this.locationSelected = coord;
      console.log(this.coord, coord);
    },
    /*  async getDireccion(lat, long) {
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDrpiLhduxVbTHFGFqvHaPXTTnkwgIVA4A"
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    }, */
    /* obtenerLocalizacion() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.address = this.getDireccion(
            position.coords.latitude,
            position.coords.longitude
          );
          return true;
        },
        () => {
          this.$bvToast.toast(`Debe proveer su localización para registrarse`, {
            title: `¡Atención!`,
            toaster: "b-toaster-top-center",
            solid: true,
          });
          this.address = null;
          return false;
        }
      );
    }, */
    async register() {
      this.$v.$touch();
      if (this.$v.form1.$anyError) {
        return;
      }
      if (this.coord == null) {
        this.$bvToast.toast(`Debe ingresar su ubicación para registrarse`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }
      let ph = document.getElementById("ph").files[0];
      var nombreFoto =
        ph.name == undefined || ph.name == null || ph.name == "" ? "" : ph.name;

      try {
        this.domicilios = this.setDomicilio();
      } catch (e) {
        this.$bvToast.toast(e.response.data.message, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }
      var cliente = {
        id: 0,
        type: "Cliente",
        nombre: this.form1.nombre,
        apellido: this.form1.apellido,
        telefono: this.form1.telefono,
        email: this.form1.email,
        contrasenia: this.form1.pass,
        usuario: this.form1.usuario,
        foto: nombreFoto.toString().replaceAll(" ", ","),
        //domicilios: [this.domicilios],
      };
      if (ph != null && ph != undefined) {
        var splitted = ph.name.split(".");
        var extension = splitted[splitted.length - 1];
        if (extension != "jpeg" && extension != "jpg" && extension != "png") {
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
        var id;
        await this.service
          .save("persona", cliente)
          .then((res) => {
            id = res.id;
            if (id != undefined && id != null) {
              try {
                this.guardarDomicilio(id);
                this.mostrarResultado(true);
              } catch (e) {
                this.$bvToast.toast(e.response.data.message, {
                  title: `¡Atención!`,
                  toaster: "b-toaster-top-center",
                  solid: true,
                });
              }
            } else {
              this.mostrarResultado(false);
            }
          })
          .catch((e) =>
            this.$bvToast.toast(e.response.data.message, {
              title: `¡Atención!`,
              toaster: "b-toaster-top-center",
              solid: true,
            })
          );

        this.guardarImagen(ph).catch((e) =>
          this.$bvToast.toast(e.response.data.message, {
            title: `¡Atención!`,
            toaster: "b-toaster-top-center",
            solid: true,
          })
        );
      }
    },

    async guardarImagen(ph) {
      var name = ph.name.toString().replaceAll(" ", "_");
      const formData = new FormData();
      formData.append("file", ph);
      formData.append("name", name);

      await axios
        .post("http://localhost:9001/buensabor/cliente/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origins": "*",
            "cache-control": "no-cache",
          },
        })
        .catch((e) => {
          throw e;
        });
    },

    async guardarDomicilio(idPersona) {
      this.domicilios.persona.id = idPersona;
      this.domicilios.idPersona = idPersona;
      await this.service.save("domicilio", this.domicilios).catch((e) => {
        throw e;
      });
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
    setDomicilio() {
      var domicilio = {};

      if (this.locationSelected == null || this.locationSelected == undefined)
        throw "Debe elegir una ubicación";
      var locationSelected = this.locationSelected;
      if (locationSelected.vicinity == undefined || locationSelected.vicinity == null)
        throw "Su ubicación es inválida. Debe contener al menos calle y ciudad.";
      if (locationSelected.name == undefined || locationSelected.name == null)
        throw "Su ubicación es inválida. Debe contener al menos calle y ciudad.";
      if (this.esDepto && this.$refs.piso.value == "") throw "Debe ingresar un piso";
      if (this.esDepto && this.$refs.piso.value == "")
        throw "Debe ingresar un departamento";
      var numero;
      var tieneNumero = false;
      for (const key in this.locationSelected.address_components) {
        if (Object.hasOwnProperty.call(this.locationSelected.address_components, key)) {
          const element = this.locationSelected.address_components[key];
          console.log(key);
          console.log(element);
          if (element.types[0] == "street_number") {
            tieneNumero = true;
            numero = element.long_name;
            break;
          }
        }
      }
      if (!tieneNumero)
        throw "Su ubicación es inválida. La calle debe contener el número.";

      domicilio.baja = false;
      domicilio.localidad = locationSelected.vicinity;
      domicilio.calle = locationSelected.name;
      domicilio.latitud = this.coord.lat;
      domicilio.longitud = this.coord.lng;
      domicilio.numero = numero;
      domicilio.departamento = "";
      domicilio.piso = 0;
      if (this.esDepto) {
        domicilio.departamento = this.$refs.piso.value;
        domicilio.piso = this.$refs.piso.value;
      }
      domicilio.idPersona = 0;
      domicilio.persona = {
        type: "Cliente",
        id: 0,
      };
      return domicilio;
    },
    setEsDepto() {
      if (this.$refs.esDepto.checked) this.esDepto = true;
      else this.esDepto = false;
    },
  },
  data() {
    return {
      domicilios: [],
      esDepto: false,
      service: new Service(),
      alertaExito: false,
      alertaError: false,
      locationSelected: null,
      form1: {
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        pass: "",
        pass2: "",
        usuario: "",
        piso: "",
      },
      address: null,
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
        minLength: minLength(8),
        alphaNum,
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

b-form-input,
.autocomplete {
  margin-bottom: 5px;
  height: 38px;
  font-size: 1em;
}
.title {
  margin-left: 1em;
  margin-bottom: 4vh;
}
.btn {
  margin-left: 1.5%;
}
.error {
  color: #e43561;
  font-size: 1em;
}
#imagenBuscar {
  width: 50%;
}
</style>
