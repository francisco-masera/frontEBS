<template>
  <b-card no-body border-variant="dark" style="max-width: 600px">
    <b-container style="padding: 0">
      <div class="filasPedido">
        <div id="fila1">
          <div id="orden">
            <strong>#Orden {{ pedidoParam.numero }} </strong>
          </div>
          <div id="hora"><strong>Hora: </strong>{{ pedidoParam.hora }}</div>
          <div id="total"><strong>Total: </strong>${{ pedidoParam.total }}</div>
        </div>
        <div id="fila2">
          <div id="cliente">
            <strong>Cliente: </strong>{{ pedidoParam.persona.nombre }}
          </div>
          <div id="telefono">
            <strong>Teléfono:</strong> {{ pedidoParam.persona.telefono }}
          </div>
        </div>
        <div id="fila3">
          <strong>Dirección:</strong> {{ pedidoParam.persona.domicilio }}
        </div>
        <div style="" id="fila4">
          <div class="contenedorDetalle">
            <strong>Detalle:</strong>
            <div
              v-for="detalle in pedidoParam.detalle"
              v-bind:key="detalle.cantidad"
              class=""
            >
              <label>{{ detalle.cantidad }} {{ detalle.text }}</label>
            </div>
          </div>
          <div class="contenedorCard">
            <b-button
              pill
              class="boton"
              id="botonEntrega"
              size="md"
              @click="retornaAlStock"
              >Entregar</b-button
            >
            <b-button
              pill
              class="boton2"
              size="md"
              id="botonProblema"
              @click.prevent="siguiente1"
              >Reportar problema</b-button
            >
          </div>
        </div>
      </div>
      <div class="fila5">
        <b-card-img
          src="https://placekitten.com/480/210"
          alt="Image"
          bottom
        ></b-card-img>
      </div>
    </b-container>
  </b-card>
</template>
<script>
export default {
  props: ["pedidoParam"],
  data() {
    return {};
  },
};
</script>

<style>
#fila1 {
  text-align: center;
  border-bottom: 1px solid;
}

#fila2 {
  margin-top: 10px;
}
#fila3 {
  margin-top: 10px;
  padding-left: 10px;
}
#fila4 {
  padding-left: 10px;

  position: static;
  margin: 0;
  margin-top: 10px;
}

#orden {
  border-right: 1px solid;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  float: left;
}

#hora {
  padding-top: 10px;
  margin-left: 20px;
  float: left;
}
#total {
  padding-top: 10px;
  padding-left: 45%;
}

#cliente {
  margin-right: 20px;
  float: left;
  padding-left: 10px;
}
.contenedorDetalle {
  width: 200px;

  display: block;
}
.contenedorCard {
  right: 0px;
  bottom: 10px;
  position: absolute;
  display: block;
}

#botonProblema {
  width: auto;
  height: 28px;
  margin: 0;
  margin-right: 5px;
}
#botonEntrega {
  width: auto;
  height: 28px;
  margin: 0;
  margin-right: 5px;
}
.filasPedido {
  position: relative;
}

@media screen and (min-width: 320px) and (max-width: 450px) {
  #orden {
    width: 100%;
    text-align: left;
    border-bottom: 1px solid;
  }
  #hora {
    width: 100%;
    text-align: left;
    padding-left: 10px;
    margin-left: 0;
  }
  #total {
    width: 100%;
    text-align: left;
    padding-left: 10px;
  }
  #cliente {
    width: 100%;
    margin-bottom: 10px;
  }
  #telefono {
    width: 100%;
    padding-left: 10px;
  }
  #fila3 {
    width: 100%;
  }
  .contenedorCard {
    right: 0px;
    bottom: 10px;
    position: absolute;
    display: block;
    float: left;
  }
}
</style>