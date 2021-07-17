<template>
	<div v-if="pedidoParam.estado == 'Pendiente' && this.userDelivery == true">
		<b-card no-body border-variant="dark" style="max-width: 600px">
			<b-container style="padding: 0">
				<div class="filasPedido">
					<div id="fila1">
						<div id="orden">
							<strong>#Orden {{ pedidoParam.numero }} </strong>
						</div>
						<div id="hora"><strong>Hora: </strong>{{ pedidoParam.hora }}</div>
						<div id="total">
							<strong>Total: </strong>{{ pedidoParam.total | formatCurrency }}
						</div>
					</div>
					<div id="fila2">
						<div id="cliente">
							<strong>Cliente: </strong>{{ pedidoParam.cliente.nombre }}
							{{ pedidoParam.cliente.apellido }}
						</div>
						<div id="telefono" v-if="pedidoParam.cliente.telefono != ''">
							<strong>Teléfono:</strong> {{ pedidoParam.cliente.telefono }}
						</div>
					</div>
					<div id="fila3" v-if="domicilioParam">
						<p
							v-if="
								domicilioParam.departamento == 0 && domicilioParam.piso == 0
							"
						>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} -
							{{ domicilioParam.localidad }}
						</p>
						<p
							v-else-if="
								domicilioParam.departamento > 0 && domicilioParam.piso == 0
							"
						>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} - Departamento:
							{{ domicilioParam.departamento }} Piso: PB -
							{{ domicilioParam.localidad }}
						</p>
						<p v-else>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} - Departamento:
							{{ domicilioParam.departamento }} Piso:
							{{ domicilioParam.piso }} -
							{{ domicilioParam.localidad }}
						</p>
					</div>
					<div style="" id="fila4">
						<div class="contenedorDetalle">
							<strong>Detalle:</strong>
							<div
								v-for="detalle in pedidoParam.detalles"
								v-bind:key="detalle.cantidad"
								class=""
							>
								<label
									>{{ detalle.cantidad }}
									{{ detalle.articulo.denominacion }}
								</label>
							</div>
						</div>
						<br />
						<div class="contenedorCard">
							<b-button
								pill
								class="boton"
								id="botonEntrega"
								size="md"
								@click="cambiaAEntregado()"
								>Entregar</b-button
							>
						</div>
						<b-modal ref="modalEntrega" hide-footer hide-header centered title>
							<p class="modalTitulo">¡Pedido entregado!</p>
						</b-modal>
					</div>
				</div>
				<b-card-footer v-if="domicilioParam">
					<iframe
						:src="
							'https://maps.google.com/maps?q=' +
							domicilioParam.latitud +
							',' +
							domicilioParam.longitud +
							'&z=15&output=embed'
						"
						width="100%"
						height="100%"
						frameborder="0"
						style="border: 0"
					></iframe>
				</b-card-footer>
			</b-container>
		</b-card>
	</div>
	<div
		v-else-if="
			this.userDelivery == true && this.pedidoParam.estado == 'Entregado'
		"
	>
		<b-card no-body border-variant="dark" style="max-width: 600px">
			<b-container style="padding: 0">
				<div class="filasPedido">
					<div id="fila1">
						<div id="orden">
							<strong>#Orden {{ pedidoParam.numero }} </strong>
						</div>
						<div id="hora"><strong>Hora: </strong>{{ pedidoParam.hora }}</div>
						<div id="total">
							<strong>Total: </strong>{{ pedidoParam.total | formatCurrency }}
						</div>
					</div>
					<div id="fila2">
						<div id="cliente">
							<strong>Cliente: </strong>{{ pedidoParam.cliente.nombre }}
							{{ pedidoParam.cliente.apellido }}
						</div>
						<div id="telefono" v-if="pedidoParam.cliente.telefono != ''">
							<strong>Teléfono:</strong> {{ pedidoParam.cliente.telefono }}
						</div>
					</div>
					<div id="fila3" v-if="domicilioParam">
						<p
							v-if="
								domicilioParam.departamento == 0 && domicilioParam.piso == 0
							"
						>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} -
							{{ domicilioParam.localidad }}
						</p>
						<p
							v-else-if="
								domicilioParam.departamento > 0 && domicilioParam.piso == 0
							"
						>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} - Departamento:
							{{ domicilioParam.departamento }} Piso: PB -
							{{ domicilioParam.localidad }}
						</p>
						<p v-else>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} - Departamento:
							{{ domicilioParam.departamento }} Piso:
							{{ domicilioParam.piso }} -
							{{ domicilioParam.localidad }}
						</p>
					</div>
					<div style="" id="fila4">
						<div class="contenedorDetalle">
							<strong>Detalle:</strong>
							<div
								v-for="detalle in pedidoParam.detalles"
								v-bind:key="detalle.cantidad"
								class=""
							>
								<label>
									{{ detalle.cantidad }}
									{{ detalle.articulo.denominacion }}
								</label>
							</div>
						</div>
						<br />
					</div>
				</div>
			</b-container>
		</b-card>
	</div>
	<div v-else-if="this.userCocina">
		<b-card no-body border-variant="grey" style="max-width: 600px">
			<b-container style="padding: 0">
				<div class="filasPedido">
					<div id="fila1">
						<div id="orden">
							<strong>#Orden {{ pedidoParam.numero }} </strong>
						</div>
						<div id="hora"><strong>Hora: </strong>{{ horaEntrega }}</div>
					</div>
					<div id="fila2">
						<div id="cliente">
							<strong>Cliente: </strong>{{ pedidoParam.cliente.nombre }}
							{{ pedidoParam.cliente.apellido }}
						</div>
						<div id="telefono" v-if="pedidoParam.cliente.telefono != ''">
							<strong>Teléfono:</strong> {{ pedidoParam.cliente.telefono }}
						</div>
					</div>
					<div style="" id="fila4">
						<div class="contenedorDetalle">
							<strong>Detalle:</strong>
							<div
								v-for="detalle in pedidoParam.detalles"
								v-bind:key="detalle.cantidad"
								class=""
							>
								<label>
									{{ detalle.cantidad }}
									{{ detalle.articulo.denominacion }}
								</label>
							</div>
						</div>
						<br />
						<div class="contenedorCard">
							<b-button
								pill
								class="boton"
								id="botonEntrega"
								size="md"
								@click="cambiaAListo()"
								>Listo</b-button
							>
						</div>
						<b-modal ref="modalEntrega" hide-footer hide-header centered title>
							<p class="modalTitulo">¡Pedido entregado!</p>
						</b-modal>
					</div>
				</div>
			</b-container>
		</b-card>
	</div>
	<div v-else-if="this.userCajero == true">
		<b-card no-body border-variant="dark" style="max-width: 600px">
			<b-container style="padding: 0">
				<div class="filasPedido">
					<div id="fila1">
						<div id="orden">
							<strong>#Orden {{ pedidoParam.numero }} </strong>
						</div>
						<div id="tipoRetiro">
							<strong>{{ pedidoParam.tipoEntrega }}</strong>
						</div>
						<div id="hora"><strong>Hora: </strong>{{ pedidoParam.hora }}</div>
						<div id="total">
							<strong>Total: </strong>{{ pedidoParam.total | formatCurrency }}
						</div>
					</div>
					<div id="fila2">
						<div id="cliente">
							<strong>Cliente: </strong>{{ pedidoParam.cliente.nombre }}
							{{ pedidoParam.cliente.apellido }}
						</div>
						<div id="telefono" v-if="pedidoParam.cliente.telefono != ''">
							<strong>Teléfono: </strong> {{ pedidoParam.cliente.telefono }}
						</div>
					</div>
					<div v-if="domicilioParam" id="fila3">
						<p
							v-if="
								domicilioParam.departamento == 0 && domicilioParam.piso == 0
							"
						>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} -
							{{ domicilioParam.localidad }}
						</p>
						<p
							v-else-if="
								domicilioParam.departamento > 0 && domicilioParam.piso == 0
							"
						>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} - Departamento:
							{{ domicilioParam.departamento }} Piso: PB -
							{{ domicilioParam.localidad }}
						</p>
						<p v-else>
							<strong>Dirección:</strong>
							{{ domicilioParam.calle }}
							{{ domicilioParam.numero }} - Departamento:
							{{ domicilioParam.departamento }} Piso:
							{{ domicilioParam.piso }} -
							{{ domicilioParam.localidad }}
						</p>
					</div>
					<div style="" id="fila4">
						<div class="contenedorDetalleCaja">
							<strong>Detalle: </strong>
							<div
								v-for="detalle in pedidoParam.detalles"
								v-bind:key="detalle.cantidad"
								class=""
							>
								<label>
									{{ detalle.cantidad }}
									{{ detalle.articulo.denominacion }}
								</label>
							</div>
							<br />
							<b-badge
								class="BadgeEstado"
								:variant="
									pedidoParam.estado == 'Pendiente'
										? 'danger'
										: pedidoParam.estado == 'Listo'
										? 'success'
										: pedidoParam.estado == 'En Delivery'
										? 'info'
										: pedidoParam.estado == 'Confirmado'
										? 'secondary'
										: pedidoParam.estado == 'En Cocina'
										? 'warning'
										: 'primary'
								"
							>
								{{ pedidoParam.estado }}
							</b-badge>
						</div>

						<br />

						<div
							class="contenedorCajeroBtn"
							v-if="
								pedidoParam.tipoEntrega == 'Retiro en local' &&
								pedidoParam.estado == 'Pendiente'
							"
						>
							<b-button
								pill
								class="boton"
								id="botonAprueba"
								size="md"
								@click="aprobar()"
								>Aprobar</b-button
							>
							<b-button
								pill
								class="boton"
								id="botonCancela"
								size="md"
								@click="cancelar"
								>Cancelar</b-button
							>
						</div>
					</div>
				</div>
			</b-container>
		</b-card>
	</div>
</template>
<script>
	import Service from "@/service/Service.js";
	import axios from "axios";
	export default {
		props: ["pedidoParam", "domicilioParam"],
		mounted() {
			this.userVerifica();
		},
		data() {
			return {
				service: new Service(),
				resultEstado: 0,
				userDelivery: true,
				userCajero: false,
				userCocina: false,
			};
		},
		methods: {
			userVerifica() {
				this.user = JSON.parse(sessionStorage.getItem("user"));

				if (this.user.rol == "delivery") {
					this.userDelivery = true;
				} else if (this.user.rol == "admin") {
					this.userDelivery = false;
				} else if (this.user.rol == "cajero") {
					this.userCajero = true;
					this.userDelivery = false;
				} else if (this.user.rol == "cocina") {
					this.userCocina = true;
					this.userDelivery = false;
				} else {
					this.$router.push({ name: "Home" });
				}
			},

			async cambiaAEntregado() {
				var id = this.pedidoParam.id;
				console.log(this.domicilioParam);

				await axios
					.put(
						"http://localhost:9001/buensabor/pedido/pedidoEntregado/" +
							parseInt(id) +
							"/" +
							"Entregado"
					)
					.then(() => {
						this.$refs.modalEntrega.show();
						setTimeout(() => this.refrescaPantalla(), 1000);
					});
			},

			async cambiaAListo() {
				var id = this.pedidoParam.id;
				await axios
					.put(
						"http://localhost:9001/buensabor/pedido/pedidoEntregado/" +
							parseInt(id) +
							"/" +
							"Listo"
					)
					.then(() => {
						this.$refs.modalEntrega.show();
						setTimeout(() => this.refrescaPantalla(), 1000);
					});
			},

			refrescaPantalla() {
				window.location.href = "/pedidos/";
			},
			async cancelar() {
				this.pedidoParam.estado = "Cancelado";
				this.pedidoParam.hora = "00:00:00";
				this.pedidoParam.tipoEntrega = false;
				this.pedidoParam.detalles = null;
				await this.service.update(
					"pedido",
					this.pedidoParam,
					this.pedidoParam.id
				);
			},
			async aprobar() {
				var id = this.pedidoParam.id;
				await axios
					.put(
						"http://localhost:9001/buensabor/pedido/pedidoEntregado/" +
							parseInt(id) +
							"/" +
							"Confirmado"
					)
					.then(() => (this.pedidoParam.estado = "Confirmado"));
			},
		},
		computed: {
			horaEntrega() {
				var tiempoEstimado = this.pedidoParam.hora.split(":");
				var date = new Date();
				date.setHours(tiempoEstimado[0] - 3);
				date.setMinutes(tiempoEstimado[1]);
				date.setSeconds(tiempoEstimado[2]);

				return date.toLocaleTimeString("es-Ar");
			},
		},
	};
</script>

<style>
	.BadgeEstado {
		width: auto;
		font-size: 11pt;
		color: #fff;
	}
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
		bottom: 15px;
		position: absolute;
		display: block;
	}

	#botonEntrega {
		width: auto;
		height: 30px;
		margin: 0;
		margin-right: 10px;
	}
	.filasPedido {
		position: relative;
	}
	.modalTitulo {
		margin-top: 7%;
		text-align: center;
		font-size: 25px;
	}
	#tipoRetiro {
		float: left;
		padding-top: 10px;
		margin-left: 20px;
	}
	#botonAprueba {
		width: auto;
		height: 30px;
		margin: 0;
		margin-right: 20px;
		margin-left: 150px;
	}
	#botonCancela {
		width: auto;
		height: 30px;
		margin: 0;
		margin-right: 80px;
	}
	.contenedorCajeroBtn {
		position: absolute;
		display: block;
		bottom: 15px;
	}
	.contenedorDetalleCaja {
		width: 200px;

		display: block;
		margin-bottom: 20px;
	}

	@media screen and (max-width: 550px) {
		.contenedorDetalle {
			width: 100%;
		}

		.contenedorCard {
			float: right;
			margin-top: 10px;
			position: relative;
		}

		.modalTitulo {
			margin-top: 7%;
			text-align: center;
			font-size: 25px;
		}
	}
	@media screen and (min-width: 320px) and (max-width: 450px) {
		#orden {
			width: 100%;
			text-align: left;
			border-bottom: 1px solid;
			border-right: 0;
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

		#botonEntrega {
			width: 100%;
			height: 28px;
		}

		.contenedorCard {
			margin-right: 5px;
			margin-top: 10px;
			margin-left: 5px;
			position: relative;
			width: 100%;
		}

		.modalTitulo {
			margin-top: 7%;
			text-align: center;
			font-size: 25px;
		}
	}
</style>