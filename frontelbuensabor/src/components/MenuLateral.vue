<template>
  <div>
    <b-card id="MenuLateral" border-variant="dark">
      <div class="imagenContenedor">
        <img
          v-if="user.foto != undefined"
          :src="'http://localhost:9001/images/personas/' + user.foto"
          id="imagenusuario"
        />
        <img
          v-else
          src="http://localhost:9001/images/sistema/userDefaultGrande.png"
          id="imagenusuario"
        />
      </div>
      <b-card-text>
        <p id="nombre">{{ this.user.nombre }} {{ this.user.apellido }}</p>
        <p id="rol">{{ user.rol.toUpperCase() }}</p>
        <insumos v-if="user.rol == 'admin'" />
        <catalogo v-if="user.rol == 'admin' || user.rol === 'cocina'" />
        <sugerencia v-if="user.rol == 'admin'" />
        <direcciones v-if="user.rol == 'cliente'" />
        <pedidos
          :rol="user.rol"
          v-if="user.rol != 'cocina' || userl.rol != 'admin'"
        />
        <facturados
          :rol="user.rol"
          v-if="
            user.rol == 'cocina' ||
              user.rol == 'delivery' ||
              user.rol == 'admin'
          "
        />
        <datos />
        <out />
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import Service from "@/service/Service.js";
import btnLatInsumos from "./botonesLateral/btnLatInsumos";
import btnLatCatalogo from "./botonesLateral/btnLatCatalogo";
import btnLatSugerencias from "./botonesLateral/btnLatSugerencias";
import btnLatMisDatos from "./botonesLateral/btnLatMisDatos";
import btnLatLogOut from "./botonesLateral/btnLatLogOut";
import btnLatDirecciones from "./botonesLateral/btnLatDirecciones";
import btnLatPedidos from "./botonesLateral/btnLatPedidos";
import btnLatFacturados from "./botonesLateral/btnLatFacturados";

export default {
  components: {
    insumos: btnLatInsumos,
    catalogo: btnLatCatalogo,
    sugerencia: btnLatSugerencias,
    datos: btnLatMisDatos,
    out: btnLatLogOut,
    direcciones: btnLatDirecciones,
    pedidos: btnLatPedidos,
    facturados: btnLatFacturados,
  },

  mounted() {
    this.traeUser();
  },
  data() {
    return {
      botones: [],
      user: this.usuario,
      service: new Service(),
      userSession: {},
    };
  },

  methods: {
    async traeUser() {
      this.userSession = JSON.parse(sessionStorage.getItem("user"));
      await this.service.getOne("persona", this.userSession.id).then((data) => {
        this.user = data;
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap");

#MenuLateral {
  background-color: #ffffff;
  color: #151515;
  border: none;
  border-radius: 15px;
  -webkit-box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.2);
  float: left;
  text-align: center;
  width: 20%;
  height: auto;
  margin-left: 100px;
  margin-top: -50px;
  position: absolute;

  z-index: 1;
}
#imagenusuario {
  height: 100%;
  z-index: 2;
}
.imagenContenedor {
  width: 170px;
  height: 170px;
  border-radius: 170px;
  overflow: hidden;
  background-color: red;
  margin-top: 20px;
  margin-bottom: 25px;
  display: inline-block;
}
.botonesMenu {
  list-style: none;
  color: #151515;
  font-weight: 400;
  font-size: 12pt;
  text-align: left;
  margin-left: 5%;
  margin-top: 5px;
}
.botonesMenu a:link {
  list-style: none;
  color: #151515;
  font-weight: 500;
  font-size: 12pt;
  text-align: left;
  margin-left: 10px;
}

.botonesMenu a:hover {
  list-style: none;
  color: #e7511e;
}
.botonesMenu a:active {
  list-style: none;
  color: #e7511e;
  font-weight: 700;
}
.botonesMenu a:visited {
  list-style: none;
  color: #151515;
  font-weight: 700;
}
.iconosMenu {
  width: 20px;
  float: left;
  margin-right: 10px;
}
#rol {
  font-weight: 400;
  font-size: 12pt;
}
#nombre {
  margin-bottom: 0px;
  font-family: "Baloo Bhaina 2";
  font-weight: 700;

  font-size: 16pt;
}

@media screen and (max-width: 1210px) {
  .card-body {
    padding: 0px;
  }
  .botonesMenu {
    font-size: 12pt;
    margin-left: 5px;
  }
}

@media screen and (max-width: 774px) {
  #MenuLateral {
    display: none;
  }
}
</style>
