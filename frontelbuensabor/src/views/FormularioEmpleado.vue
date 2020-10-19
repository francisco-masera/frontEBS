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
              class="campoForm"
              id="nombreEmpleado"
              v-model.lazy="form1.nombre"
              :state="!$v.form1.nombre.$invalid"
            ></b-form-input>
            <br />
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio. <br />Recuerde ingresar sólo
              letras.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Apellido</label>
            <b-form-input
              class="campoForm"
              id="apellidoEmpleado"
              v-model.lazy="form1.apellido"
              :state="!$v.form1.apellido.$invalid"
            ></b-form-input>
            <br />
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio. <br />Recuerde ingresar sólo
              letras.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Teléfono</label>
            <b-form-input
              class="campoForm"
              id="telEmpleado"
              v-model.lazy="form1.telefono"
              :state="!$v.form1.telefono.$invalid"
            ></b-form-input>
            <br />
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio. <br />Recuerde ingresar sólo
              números.
            </b-form-invalid-feedback>
          </div>
          <h1 class="tituloDom">Domicilio</h1>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Calle</label>
            <b-form-input
              class="campoForm"
              id="calleDomicilio"
              v-model="form1.calle"
              :state="!$v.form1.calle.$invalid"
            ></b-form-input>
            <br />
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio.<br />
            </b-form-invalid-feedback>
            <label class="labelForm">Número</label>
            <b-form-input
              class="campoForm"
              id="numDomicilio"
              v-model="form1.numero"
              :state="!$v.form1.numero.$invalid"
            ></b-form-input>
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio. <br />Recuerde ingresar sólo
              números.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Piso</label>
            <b-form-input
              class="campoForm"
              id="pisoDomicilio"
              type="number"
              v-model="domicilio.piso"
            ></b-form-input>
            <label class="labelForm">Departamento</label>
            <b-form-input
              class="campoForm"
              id="deptoDomicilio"
              v-model="domicilio.departamento"
            ></b-form-input>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Localidad</label>
            <b-form-input
              class="campoForm"
              id="localidadDomicilio"
              v-model="form1.localidad"
              :state="!$v.form1.localidad.$invalid"
            ></b-form-input>
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio. <br />Recuerde ingresar sólo
              letras.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaFormIzquierda" style="display: flex">
            <b-button pill class="boton2" size="md">Cancelar</b-button>
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
              class="campoForm"
              id="usuarioEmpleado"
              v-model="form2.usuario"
              :state="!$v.form2.usuario.$invalid"
            ></b-form-input>
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Contraseña</label>
            <b-form-input
              class="campoForm"
              id="contraseniaEmpleado"
              type="password"
              v-model="form2.contrasenia"
              :state="!$v.form2.contrasenia.$invalid"
            ></b-form-input>
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Confirmar contraseña</label>
            <b-form-input
              class="campoForm"
              id="confirmaContraEmpleado"
              type="password"
              v-model="form2.confContrasenia"
              :state="!$v.form2.confContrasenia.$invalid"
            ></b-form-input>
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio. <br />Confirme que ambas
              contraseñas coinciden
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Dirección de email</label>
            <b-form-input
              class="campoForm"
              id="email"
              type="email"
              v-model="form2.email"
              :state="!$v.form2.email.$invalid"
            ></b-form-input>
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio.
            </b-form-invalid-feedback>
          </div>
          <div class="lineaForm" style="display: flex">
            <label class="labelForm">Foto del empleado</label>
            <b-form-file
              class="campoForm"
              id="imagen"
              v-model="form2.foto"
              :state="!$v.form2.foto.$invalid"
            ></b-form-file>
            <b-form-invalid-feedback>
              <br />Este campo es obligatorio.
            </b-form-invalid-feedback>
          </div>
          <div>
            <p style="text-align: left; font-weight: 600; margin-top: 5%">
              Seleccione el rol del empleado
            </p>
            <b-form-select size="sm" id="rolSelect" :options="roles" v-model="persona.rol">
             
            </b-form-select>
          </div>
          <div class="lineaFormIzquierda" style="display: flex">
            <b-button pill class="boton2" size="md">Cancelar</b-button>
            <b-button
              pill
              class="boton"
              size="md"
              @click.prevent="guardarEmpleado"
              >Guardar</b-button
            >
          </div>
        </b-form>
      </div>
      
        <b-modal ref="modal" hide-footer hide-header centered title>
          <p class="modalTitulo">¡Empleado agregado con éxito!</p>
          
          <p class="posicion">
            <b-button
              pill
              size="md"
              class="botonModal"
              @click="vuelveStock"
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
import { required, numeric, integer, sameAs } from "vuelidate/lib/validators";
import MenuLateral from "@/components/MenuLateral.vue";
import Header from "@/components/Header.vue";
import Service from "@/service/Service.js";
import axios from "axios";

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
        rol:""
      },
      domicilio: {
        baja: false,
        calle: "",
        departamento: "",
        localidad: "",
        numero: 0,
        piso: 0,
        persona:{
          type:"Empleado",
          id:0
        }
      },

      form1: {
        nombre: "",
        apellido: "",
        telefono: "",
        calle: "",
        numero: "",
        localidad: "",

      },

      form2: {
        usuario: "",
        contrasenia: "",
        confContrasenia: "",
        email: "",
        foto: "",
      },
      service: new Service(),
      


      roles:[
        { value: '', text: 'Rol del empleado' },
        { value: 'admin', text: 'Administrador' },
        { value: 'cocina', text: 'Cocinero' },
        { value: 'delivery', text: 'Delivery' },
        { value: 'cajero', text: 'Cajero' },
      ]
    };
  },

  methods: {
    siguiente1() {
      this.$v.$touch();
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
      if(this.persona.rol == ''){
        this.$bvToast.toast(`El rol del empleado no puede estar vacío`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }
      let img = document.getElementById("imagen").files[0];
      if (img != undefined && img.size / 1024 > 1024) {
        this.$bvToast.toast(`La imagen no debe superar los 1MB`, {
          title: `¡Atención!`,
          toaster: "b-toaster-top-center",
          solid: true,
        });
        return;
      }
      this.persona.foto = img.name;
      await this.service.save("persona",this.persona).then((data) =>{
       this.persona = data;
      });
      await this.guardarImagen(img);
      this.domicilio.persona.id = this.persona.id;
      console.log(this.domicilio.persona.id);
      await this.service.save("domicilio",this.domicilio).then((data)=>{
        this.domicilio = data;
      });
      this.$refs["modal"].show();
    },


    async guardarImagen(imagen) {
      const formData = new FormData();
      formData.append("file", imagen);
       await axios
          .post(
            "http://localhost:9001/buensabor/empleado/uploadImg",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origins": "*",
                "cache-control": "no-cache",
              },
            }
          )
        .catch((error) => {
          return error;
        });
      return true;
    },
    
    asignaCamposForm1(){
      this.persona.nombre = this.form1.nombre;
      this.persona.apellido = this.form1.apellido;
      this.persona.telefono = this.form1.telefono;
      this.domicilio.calle = this.form1.calle;
      this.domicilio.numero = this.form1.numero;
     
      if (this.domicilio.departamento == '') {
        this.domicilio.departamento = "0";
       
      } 

      this.domicilio.localidad = this.form1.localidad;

    },

    asignaCamposForm2(){
      
      this.persona.contrasenia = this.form2.contrasenia;
      this.persona.email = this.form2.email;
      this.persona.usuario = this.form2.usuario;
     
       
     

    },

    vuelveStock(){
      window.location.href = "/stockInsumos";
    }
  },

  validations: {
    form1: {
      nombre: {
        required,
      },
      apellido: {
        required,
      },
      telefono: {
        required,
        integer,
        numeric,
      },
      calle: {
        required,
      },
      numero: {
        required,
        integer,
        numeric,
      },
      localidad: {
        required,
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
#nombreEmpleado {
  margin-top: -5px;
  width: 50%;
}

#apellidoEmpleado {
  margin-top: -5px;
  width: 50%;
}

#telEmpleado {
  margin-top: -5px;
  width: 50%;
}

#calleDomicilio {
  margin-top: -5px;
  width: 35%;
  padding: 0%;
}

#numDomicilio {
  margin-top: -5px;
  width: 10%;
}

#deptoDomicilio {
  margin-top: -5px;
  width: 30%;
  padding: 0%;
}

#pisoDomicilio {
  margin-top: -5px;
  width: 10%;
}

#localidadDomicilio {
  margin-top: -5px;
  width: 50%;
}

.lineaFormIzquierda {
  margin-top: 50px;
  float: left;
  margin-right: 0px;
  margin-bottom: 50px;
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
</style>