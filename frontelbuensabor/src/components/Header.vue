<template>
  <b-navbar id="headerHome" toggleable="md" type="dark" v-if="esHome">
    <b-container>
      <div id="logoContainer">
        <a href="\"
          ><b-img
            id="brandImg"
            alt=""
            src="http://localhost:9001/images/sistema/logo.png"
          ></b-img>
        </a>
      </div>
      <div class="centrarHome">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="items">
            <b-nav-item :to="{ name: 'Menu' }">CARTA</b-nav-item>
            <b-nav-item :to="{ name: 'about' }">NOSOTROS</b-nav-item>
            <b-nav-item :to="{ name: 'contacto' }">CONTACTO</b-nav-item>
            <b-button @click="registro" pill class="boton">Registrarme</b-button>
            <b-button @click="$router.push({ name: 'Ingreso' })" pill class="boton2"
              >Ingresar</b-button
            >
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-container>
  </b-navbar>
  <b-navbar id="header" toggleable="md" type="dark" v-else>
    <b-container>
      <div id="logoContainer">
        <a href="\"
          ><b-img
            id="brandImg"
            alt=""
            src="http://localhost:9001/images/sistema/logo.png"
          ></b-img
        ></a>
      </div>
      <b-navbar-toggle id="navToggle" target="nav-collapse"></b-navbar-toggle>
      <div class="hamburguer">
        <div v-if="esCliente">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="items">
              <b-nav-item :to="{ name: 'Menu' }">CARTA</b-nav-item>
              <b-nav-item :to="{ name: 'about' }">NOSOTROS</b-nav-item>
              <b-nav-item :to="{ name: 'contacto' }">CONTACTO</b-nav-item>
              <b-nav-item :to="{ name: 'perfil' }">
                <b-img
                  src="http://localhost:9001/images/sistema/userDefaultChico.png"
                  alt=""
                  id="foto"
                  fluid
                  class="botonImagenHeader"
                >
                </b-img>
                <label id="usuario">Pepito</label>
              </b-nav-item>
              <b-nav-item :to="{ name: 'carrito' }">
                <b-img
                  id="carrito"
                  fluid
                  src="http://localhost:9001/images/sistema/carrito.png"
                  class="botonImagenHeader"
                >
                </b-img>
                <label id="usuario">Mi carrito</label>
              </b-nav-item>
              <b-nav-item
                class="menuLateral"
                v-for="boton in botones"
                :key="boton[0]"
                v-bind:href="boton[3]"
              >
                <b-img
                  v-bind:src="'http://localhost:9001/images/sistema/' + boton[2]"
                  fluid
                  class="iconosMenu"
                ></b-img>
                {{ boton[1] }}
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </div>

        <div v-else>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="itemsEmpleado">
              <b-nav-item :to="'/misdatos/' + this.user.id">
                <b-img
                  v-if="this.user.foto != undefined"
                  :src="'http://localhost:9001/images/personas/' + this.user.foto"
                  id="foto"
                  fluid
                  class="botonImagenHeader"
                >
                </b-img>
                <b-img
                  v-else
                  src="http://localhost:9001/images/sistema/userDefaultChico.png"
                  alt=""
                  id="foto"
                  fluid
                  class="botonImagenHeader"
                >
                </b-img>
                <label id="usuario">{{ this.user.nombre }} </label>
              </b-nav-item>
              <b-nav-item
                class="menuLateral"
                v-for="boton in botones"
                :key="boton[0]"
                v-bind:href="boton[3]"
              >
                <b-img
                  v-bind:src="'http://localhost:9001/images/sistema/' + boton[2]"
                  fluid
                  class="iconosMenu"
                ></b-img>
                {{ boton[1] }}
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </div>
    </b-container>
  </b-navbar>
</template>

<script>
import Service from "@/service/Service.js";
export default {
  data() {
    return {
      botones: [],
      user: {},
      esCliente: false,
      es_Home: false,
      service: new Service(),
    };
  },

  mounted() {
    this.verificaUsuario();
  },
  props: ["imagen", "id", "screenLength", "esHome"],

  methods: {
    async verificaUsuario() {
      this.es_Home = this.$props.esHome;
      await this.traeUser();
      var boton;
      if (this.user != null) {
        if (this.user === "cliente") {
          this.esCliente = true;
          boton = [0, "Mis direcciones", "misDirecciones.png", ""];
          this.botones.push(boton);
          boton = [1, "Mis pedidos", "Pedidos.png", ""];
          this.botones.push(boton);
          boton = [2, "Cerrar sesión", "cerrarSesion.png", ""];
          this.botones.push(boton);
        } else {
          this.esCliente = false;
          if (this.user.rol === "admin") {
            boton = [0, "Stock de insumos", "stock.png", "/stockInsumos"];
            this.botones.push(boton);
            boton = [1, "Catálogo", "manufacturados.png", "/catalogoManu"];
            this.botones.push(boton);
            boton = [2, "Sugerencias del chef", "sugerenciasChef.png", "/sugerenciaChef"];
            this.botones.push(boton);
            boton = [3, "Agregar empleado", "misDatos.png", "/formEmpleado/"];
            this.botones.push(boton);
            boton = [4, "Cerrar sesión", "cerrarSesion.png", "/ingreso"];
            this.botones.push(boton);
          } else if (this.user.rol === "cocina") {
            boton = [0, "Manufacturados", "manufacturados.png", "/catalogoManu"];
            this.botones.push(boton);
            boton = [1, "Cerrar sesión", "cerrarSesion.png", "/ingreso"];
            this.botones.push(boton);
          } else if (this.user.rol === "delivery") {
            boton = [0, "Pedidos", "Pedidos.png", ""];
            this.botones.push(boton);
            boton = [1, "Pedidos facturados", "pedidosFacturados.png", ""];
            this.botones.push(boton);
            boton = [2, "Cerrar sesión", "cerrarSesion.png", "/ingreso"];
            this.botones.push(boton);
          } else if (this.user.rol === "cajero") {
            boton = [0, "Pedidos", "Pedidos.png", ""];
            this.botones.push(boton);
            boton = [1, "Pedidos anteriores", "pedidosFacturados.png", ""];
            this.botones.push(boton);
            boton = [2, "Cerrar sesión", "cerrarSesion.png", "/ingreso"];
            this.botones.push(boton);
          }
        }
      }
    },
    async traeUser() {
      this.userSession = JSON.parse(sessionStorage.getItem("user"));
      if (this.userSession != null)
        await this.service.getOne("persona", this.userSession.id).then((data) => {
          this.user = data;
        });
      else this.user == null;
    },

    registro() {
      this.$router.push({ name: "Registro" });
    },
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

#headerHome {
  background-color: transparent;
  min-height: 200px;
  max-height: 200px;
  z-index: 2;
}

#foto {
  border-radius: 50%;
}

.items {
  display: flex;
  align-items: center;
  color: #ffffff;
}

.items > * {
  margin: 15px;
  color: #ffffff;
}

.menuLateral {
  display: none;
}

.itemsEmpleado {
  margin-right: 150px;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 1);
  font-size: 12pt;
  font-weight: 700;
}

.botonImagenHeader {
  width: 30px;
  margin-right: 5px;
  height: 30px;
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

.centrarHome {
  text-align: center;
}

@media (max-width: 1025px) {
}

@media screen and (max-width: 769px) {
  #navToggle {
    float: right;
    margin-right: 10px;
  }

  .menuLateral {
    display: block;
  }

  #brandImg {
    margin-top: 0px;
  }

  .hamburguer {
    background-color: #ffffff;
    position: absolute;
    margin-top: 290px;
    width: 250px;
    margin-left: 290px;
    float: right;
    border-radius: 15px;
    -webkit-box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
    -moz-box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
    box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
    text-align: left;
    display: block;
  }

  .nav-item {
    width: 100%;
    position: relative;
    float: right;
    text-align: left;
    padding-left: 10px;
  }

  .navbar-nav {
    display: inline;
  }

  .navbar-dark .navbar-nav .nav-link {
    color: #151515;
    font-size: 12pt;
    font-weight: 400;
    width: 90%;
    padding-left: 20px;
  }

  .navbar-dark .navbar-nav .nav-link:focus,
  .navbar-dark .navbar-nav .nav-link:hover {
    color: #e7511e;
  }

  .navbar-dark .navbar-nav .active > .nav-link,
  .navbar-dark .navbar-nav .nav-link.active,
  .navbar-dark .navbar-nav .nav-link.show,
  .navbar-dark .navbar-nav .show > .nav-link {
    color: #e7511e;
  }

  .items > * {
    margin: 5px;
  }

  .col-sm-9 {
    flex: 0 0 50%;
    float: right;
    right: 0;
  }

  .itemsEmpleado {
    margin-right: 0px;
  }
}
@media (max-width: 560px) {
  .hamburguer {
    margin-left: 150px;
  }
}

@media (max-width: 426px) {
  .hamburguer {
    margin-left: 100px;
  }
}
@media (max-width: 375px) {
  .hamburguer {
    margin-left: 50px;
  }
}
@media (max-width: 320px) {
}
</style>
