<template>
<div>
    <b-button id="carrito-nav">
        <b-img id="carrito" fluid src="http://localhost:9001/images/sistema/carrito.png" class="botonImagenHeader">
        </b-img>
        <label id="usuario">Mi carrito</label>
    </b-button>
    <div v-if="!$props.productos">
        <b-modal id="bv-modal-example" hide-footer>
            <div class="d-block text-center">
                <h3>
                    ¡Aún no has agregado <br />
                    ningún plato al carrito!
                </h3>
            </div>
            <b-button class="mt-3" block @click="location.href = '/menu'">Ver todos los platos</b-button>
        </b-modal>
    </div>
    <div v-else>
        <b-popover target="carrito" triggers="click" placement="auto" container="carrito-nav" ref="popover" id="popoverCarrito">
            <div class="container-fluid">
                <div class="row fila-titulo">
                    <div class="col-12">
                        <div class="d-block">
                            <h3>Mi Pedido</h3>
                        </div>
                    </div>
                </div>
                <div class="productos">
                    <div v-for="producto in $props.productos" :key="producto.id" class="detalle">
                        <div class="row fila-detalle">
                            <div class="col col-7">
                                <span>{{ producto.cantidad }} {{producto.descripcion}}</span>
                            </div>
                            <div class="col col-3">
                                <span>{{ formatter.formatMoney(producto.precio) }}</span>
                            </div>
                            <div class="col col-2">
                                <span>
                                    <b-img style="width:1.7em" src="http://localhost:9001/images/sistema/eliminar.png"></b-img>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style="width:100%;border-top:2px solid rgba(0,0,0,.1)">
                <div class="col-7" style="margin-bottom:3vh">
                    <div class="d-block">
                        <strong>Subtotal</strong>
                    </div>
                </div>
                <div class="col-4" style="margin-bottom:3vh">
                    <div class="d-block">
                        <span>{{ formatter.formatMoney($props.productos.reduce((a,b)=>a.precio+b.precio))}}</span>
                    </div>
                </div>

                <div class="row">
                    <div class="container">
                        <div class="col-12">
                            <div class="d-block">
                                <h4>Entrega</h4>
                            </div>
                        </div>
                        <div class="row ml-0 mt-3" id="entregas">
                            <div class="col-6">
                                <b-button pill @click="toggleClassEntrega" id="entrega1" class="botonU entrega">Delivery
                                    <b-img></b-img>
                                </b-button>
                            </div>
                            <div class="col-6">
                                <b-button pill @click="toggleClassEntrega" id="entrega2" class="botonD entrega">Tienda
                                    <b-img></b-img>
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="container">
                        <div class="col-12">
                            <div class="d-block">
                                <h4>Forma de Pago</h4>
                            </div>
                        </div>
                        <div class="row ml-0 mt-3" id="pagos">
                            <div class="col-6">
                                <b-button pill @click="toggleClassPago" id="pago1" class="botonU pago">Efectivo
                                    <b-img></b-img>
                                </b-button>
                            </div>
                            <div class="col-6">
                                <b-button pill @click="toggleClassPago" id="pago2" class="botonD pago">Tarjeta
                                    <b-img></b-img>
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-7" style="margin-bottom:3vh">
                    <div class="d-block">
                        <span>Envío</span>
                    </div>
                </div>
                <div class="col-4" style="margin-bottom:3vh">
                    <div class="d-block">
                        <span>{{ formatter.formatMoney(50)}}</span>
                    </div>
                </div>
                <div class="col-7" style="margin-bottom:3vh">
                    <div class="d-block">
                        <span>Descuento</span>
                    </div>
                </div>
                <div class="col-4" style="margin-bottom:3vh">
                    <div class="d-block">
                        <span>{{ formatter.formatMoney(0)}}</span>
                    </div>
                </div>
                <div class="col-7" style="margin-bottom:2vh">
                    <div class="d-block">
                        <strong>
                            <h4 class="text-uppercase">Total</h4>
                        </strong>
                    </div>
                </div>
                <div class="col-4" style="margin-bottom:3vh">
                    <div class="d-block">
                        <span>{{ formatter.formatMoney($props.productos.reduce((a,b)=>a.precio+b.precio)+50)}}</span>
                    </div>
                </div>
                <div class="hora col-12">
                    <h4>Hora Estimada</h4>
                    <div class="col-12 mb-4">
                        <span style="margin-left:30%">
                            <b-img width="30" src="http://localhost:9001/images/sistema/reloj.png"></b-img>
                            22.30
                        </span>
                    </div>
                </div>
                <div class="col-12 mb-4" style="text-align:center">
                    <b-button pill class="m-auto botonU">Confirmar Pedido</b-button>
                </div>

                <div class="col-12" style="text-align:center">
                    <b-button style="background:none;border:none;color:black;font-size:10pt" pill class="cancelar">Cancelar Pedido</b-button>
                </div>
            </div>
        </b-popover>
    </div>
</div>
</template>

<script>
import Formatter from "@/utilidades/Formatters.js";
import $ from "jquery";
export default {
    props: ["productos"],
    data() {
        return {
            formatter: new Formatter(),
        }
    },
    methods: {
        toggleClassEntrega() {
            var $parent = $("#entregas");
            var $children = $parent.find(".entrega");
            $.each($children, (i) => {
                $($children[i]).toggleClass("botonU botonD");
            });
            console.log($children);
        },
        toggleClassPago() {
            var $parent = $("#pagos");
            var $children = $parent.find(".pago");
            $.each($children, (i) => {
                $($children[i]).toggleClass("botonU botonD");
            });
            console.log($children);
        }
    }
};
</script>

<style>
#carrito-nav {
    background: none;
    border: none;
}

#carrito-nav:focus {
    box-shadow: none;
}

.fila-titulo {
    margin-bottom: .5vh;
}

#popoverCarrito {
    max-width: 20vw !important;
}

.fila-detalle {
    line-height: 1.5em;
}

.fila-detalle .col {
    width: max-content;
    display: ruby;
}

.botonU {
    border: none;
    background-color: #e7511e;
    color: #ffffff;
    font-weight: 600;
    width: max-content;
    height: 35px;
    margin: -2vh 0;
    margin-bottom: 4vh;
}

.botonU:hover {
    border: #e7511e;
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px;
    color: #e7511e;
}

.botonD {
    color: #e7511e !important;
    border: #e7511e;
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px;
    font-weight: 600;
    width: max-content;
    height: 35px;
    margin: -2vh 0;
    margin-bottom: 4vh;

}

.botonD:hover {
    border: none;
    background-color: #e7511e;
    color: #ffffff !important;
}

h4 {
    font-family: "Baloo Bhaina 2";
    font-weight: 600;
    font-size: 17pt;
    color: #151515;
    text-align: left;
}

.cancelar {
    background: none;
    border: none;
}

.cancelar:focus {
    box-shadow: none;
}
</style>
