{{ factura.total | formatCurrency }}<template>
	<div
		v-if="pedidoParam.estado == 'PendienteEntrega' && this.userDelivery == true"
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
							v-if="pedidoParam.estado == 'Pendiente'"
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
						<div
							class="contenedorCajeroBtn"
							v-if="
								pedidoParam.estado == 'Listo' &&
								pedidoParam.tipoEntrega != 'Delivery'
							"
						>
							<b-button
								pill
								class="boton"
								id="botonAprueba"
								size="md"
								@click="facturar()"
								>Facturar</b-button
							>
						</div>
					</div>
					<b-modal ref="modalEntrega" hide-footer hide-header centered title>
						<p class="modalTitulo">¡Pedido entregado!</p>
					</b-modal>
				</div>
			</b-container>
		</b-card>
	</div>
	<div v-else>
		<b-card no-body border-variant="dark" style="max-width: 600px">
			<b-container style="padding: 0">
				<div class="filasPedido">
					<div id="fila1">
						<div id="orden">
							<strong>#Orden {{ pedidoParam.numero }} </strong>
						</div>
						<div id="tipoRetiro">
							<strong>{{
								pedidoParam.tipoEntrega == "Delivery"
									? "Envío"
									: pedidoParam.tipoEntrega
							}}</strong>
						</div>
						<div id="total">
							<strong>Total: </strong>{{ pedidoParam.total | formatCurrency }}
						</div>
					</div>
					<div style="" id="fila2">
						<div class="contenedorDetalleCaja ml-5">
							<strong class="">Detalle: </strong>
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
							<b-button
								class="hrefPedido"
								@click="verDetalle"
								style="margin-left: -10px"
							>
								Ver Detalle
							</b-button>
						</div>
						<br />
						<div>
							<b-badge
								style="margin-left: -85px"
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
							<div style="margin-left: 50px">
								<span
									class=""
									v-if="
										pedidoParam.estado != 'Facturado' &&
										pedidoParam.estado != 'Cancelado'
									"
									>Hora de llegada aproximada {{ hora }}</span
								>
								<b-button
									class="hrefPedido"
									v-if="pedidoParam.estado == 'Facturado'"
									@click="generarPDF()"
									>Recibo</b-button
								>
							</div>
						</div>
					</div>
				</div>
			</b-container>
		</b-card>
		<section id="pdf" ref="pdf" v-show="false">
			<main
				class="main-content"
				style="
					padding: 1rem;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<div
					id="invoice-app"
					style="background: linear-gradient(to right, #ff5f6d, #ffc371)"
				>
					<div class="header">
						<div>
							<h1 class="text-right">Factura #{{ factura.numero }}</h1>
							<p>Fecha: {{ fechaFactura }}</p>
						</div>
						<div>
							<div class="section-spacer">
								<p><strong>Cliente:</strong></p>
								<p>
									{{
										pedidoParam.cliente.nombre +
										" " +
										pedidoParam.cliente.apellido
									}}
								</p>
							</div>
						</div>
					</div>
					<table class="responsive-table">
						<thead>
							<tr>
								<th>N°</th>
								<th>Item</th>
								<th>Precio</th>
								<th>Cantidad</th>
								<th>Total Item</th>
							</tr>
						</thead>
						<tr v-for="(item, idx) in pedidoParam.detalles" :key="idx">
							<td data-label="N°">{{ idx + 1 }}</td>
							<td data-label="Item">
								<label for="">{{ item.articulo.denominacion }}</label>
							</td>
							<td data-label="Precio">
								<div class="cell-with-input">
									{{ item.articulo.precioVenta | formatCurrency }}
								</div>
							</td>
							<td data-label="Cantidad">
								<label for="">{{ item.cantidad }}</label>
							</td>
							<td data-label="Total Item">
								{{
									(item.articulo.precioVenta * item.cantidad) | formatCurrency
								}}
							</td>
						</tr>
					</table>
					<table>
						<tr>
							<td>Subtotal</td>
							<td>
								{{ factura.total | formatCurrency }}
							</td>
						</tr>
						<tr>
							<td>
								<div class="cell-with-input">Descuento</div>
							</td>
							<td>
								<label class="text-right">
									{{
										factura.formaPago ? factura.total * 0.1 : 0 | formatCurrency
									}}
								</label>
							</td>
						</tr>

						<tr class="text-bold">
							<td>Total</td>
							<td>
								{{ totalFactura | formatCurrency }}
							</td>
						</tr>
					</table>
				</div>
			</main>
		</section>
		<div>
			<b-modal ref="modalDetalle" :lazy="true" hide-footer hide-header centered>
				<div class="container-fluid">
					<div class="d-block">Detalle de pedido</div>
					<div
						class="row mt-3"
						v-for="(item, idx) in pedidoParam.detalles"
						:key="idx"
					>
						<div class="col-1">{{ item.cantidad }}</div>
						<div class="col-5">{{ item.articulo.denominacion }}</div>
						<div class="col-2 offset-3">
							{{ (item.articulo.precioVenta * item.cantidad) | formatCurrency }}
						</div>
					</div>
					<hr />
					<div class="row">
						<div class="col-3">Subtotal</div>
						<div class="col-2 offset-6">
							{{
								pedidoParam.detalles.reduce(
									(a, b) => a + b.articulo.precioVenta * b.cantidad,
									0
								) | formatCurrency
							}}
						</div>

						<div class="col-3" v-if="pedidoParam.tipoEntrega == 'Delivery'">
							Envío
						</div>
						<div
							class="col-2 offset-6"
							v-if="pedidoParam.tipoEntrega == 'Delivery'"
						>
							{{ 50 | formatCurrency }}
						</div>

						<div
							class="col-3"
							v-if="
								pedidoParam.tipoEntrega == 'Retiro en local' &&
								pedidoParam.formaPago
							"
						>
							Descuento
						</div>
						<div
							class="col-2 offset-6"
							v-if="
								pedidoParam.tipoEntrega == 'Retiro en local' &&
								pedidoParam.formaPago
							"
						>
							{{
								pedidoParam.formaPago
									? pedidoParam.detalles.reduce(
											(a, b) => a + b.articulo.precioVenta,
											0
									  ) * 0.1
									: 0 | formatCurrency
							}}
						</div>
					</div>
					<hr />
					<div class="row mb-5">
						<div class="col-3">Total</div>
						<div class="col-2 offset-6">
							{{ totalPedido | formatCurrency }}
						</div>
					</div>
					<div class="row mb-4">
						<div class="col-8">
							<h4>Detalle de entrega</h4>
						</div>
						<br />
						<div class="col-5">
							{{ pedidoParam.tipoEntrega }}
						</div>
					</div>
					<div class="row mb-3">
						<div class="col-8"><h4>Forma de pago</h4></div>
						<br />
						<div class="col-5">
							{{ pedidoParam.formaPago ? "Efectivo" : "Tarjeta" }}
						</div>
					</div>
				</div>
			</b-modal>
		</div>
		<Toast ref="toast" />
	</div>
</template>
<script>
	import Service from "@/service/Service.js";
	import axios from "axios";
	import Toast from "@/components/Toast.vue";
	export default {
		props: ["pedidoParam", "domicilioParam", "idFactura", "idCliente"],

		mounted() {
			this.userVerifica();
			if (this.pedidoParam.estado == "Facturado") {
				this.getFactura();
			}
		},
		data() {
			return {
				service: new Service(),
				resultEstado: 0,
				userDelivery: true,
				userCajero: false,
				userCocina: false,
				cliente: false,
				hora: this.setHora(),
				verFactura: false,
				factura: {},
				save: false,
				total: 0,
				fechaFactura: new Date(),
			};
		},
		components: {
			Toast: Toast,
		},
		methods: {
			toastr(msg, title) {
				this.$refs.toast.emitToast(msg, title);
			},
			async generarPDF() {
				const source = JSON.stringify(this.$refs.pdf.outerHTML);
				await axios
					.post("http://localhost:9001/buensabor/factura/descargarFactura", {
						source: source,
					})
					.then((d) => {
						if (d) {
							this.toastr(
								"Revise su carpeta de descargas",
								"Factura descargada: "
							);
						}
					});
			},
			verDetalle() {
				this.$refs["modalDetalle"].show();
			},
			setHora() {
				var horaArr = this.pedidoParam.hora.split(":");
				return horaArr[0] + ":" + horaArr[1];
			},
			async facturar() {
				this.pedidoParam.hora = "00:00:00";
				this.pedidoParam.tipoEntrega =
					this.pedidoParam.tipoEntrega == "Delivery" ? false : true;
				this.pedidoParam.detalles.forEach(
					(d) => (d.articulo.type = "ArticuloManufacturado")
				);
				var pedido = this.pedidoParam;
				await axios
					.post("http://localhost:9001/buensabor/factura/generar", pedido)
					.catch((e) => console.log(e))
					.then(this.cambiaAFacturado());
			},
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
				} else if (this.user.rol == undefined && this.user.id) {
					this.userDelivery = false;
					this.cliente = true;
				} else {
					this.$router.push({ name: "Home" });
				}
			},
			async cambiaAFacturado() {
				var id = this.pedidoParam.id;
				console.log(this.domicilioParam);

				await axios
					.put(
						"http://localhost:9001/buensabor/pedido/pedidoEntregado/" +
							parseInt(id) +
							"/" +
							"Facturado"
					)
					.then(() => {
						this.$refs.modalEntrega.show();
						setTimeout(() => this.refrescaPantalla(), 1000);
					});
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
				window.location.href = "/pedidos";
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
			async getFactura() {
				await this.service.getOne("pedido", this.pedidoParam.id).then((d) => {
					this.factura = d.factura;
					this.verFactura = true;
					var fecha = this.factura.fechaHora.split("T")[0].split("-");
					this.fechaFactura = fecha[2] + "/" + fecha[1] + "/" + fecha[0];
				});
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
			totalFactura() {
				if (this.pedidoParam.tipoEntrega == "Retiro en local") {
					return (
						this.factura.total -
						(this.factura.formaPago ? this.factura.total * 0.1 : 0)
					);
				} else if (this.pedidoParam.tipoEntrega == "Retiro en local") {
					return this.factura.total;
				}
				return this.factura.total + 50;
			},
			totalPedido() {
				var subTotal = this.pedidoParam.detalles.reduce(
					(a, b) => a + b.articulo.precioVenta * b.cantidad,
					0
				);
				if (this.pedidoParam.tipoEntrega == "Retiro en local") {
					return subTotal - (this.pedidoParam.formaPago ? subTotal * 0.1 : 0);
				} else if (this.pedidoParam.tipoEntrega == "Retiro en local") {
					return subTotal;
				}
				return subTotal + 50;
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
<style scoped>
	#invoice-app {
		background: linear-gradient(to right, #ff5f6d, #ffc371);
	}
	.main-content {
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@media print {
		.main-content {
			align-items: flex-start;
		}
	}
	#invoice-app {
		background-color: #faebd7;
		padding: 2rem;
		border-radius: 0.5rem;
	}
	@media (min-width: 761px) {
		.header {
			display: flex;
		}
	}
	@media (min-width: 761px) {
		.header > div:nth-child(-n + 1) {
			order: 1;
			flex: 1;
			text-align: right;
			padding-left: 1rem;
		}
	}
	.section-spacer {
		margin: 1rem 0;
	}
	input,
	select,
	textarea {
		background-color: rgba(255, 255, 255, 0.3);
		border: none;
		display: inline-block;
		transition: background-color 0.3s ease-in-out;
		width: 100%;
	}
	input:focus,
	select:focus,
	textarea:focus {
		outline-color: #ffc371;
		background-color: rgba(255, 255, 255, 0.6);
	}
	input:hover,
	select:hover,
	textarea:hover {
		background-color: rgba(255, 255, 255, 0.5);
	}
	@media print {
		input,
		select,
		textarea {
			background-color: transparent;
		}
	}
	@media only screen and (min-width: 761px) {
		input,
		select,
		textarea {
			width: auto;
		}
	}
	textarea {
		width: 100%;
		min-height: 80px;
	}
	@media only screen and (max-width: 760px) {
		select {
			width: 100%;
		}
	}
	@media print {
		select {
			appearance: none;
		}
	}
	.company-name {
		font-size: 2rem;
	}
	table {
		width: auto;
		border-collapse: collapse;
		margin: 2rem 0;
	}
	table thead th {
		padding: 0.5rem 1rem;
	}
	table thead th:nth-child(-n + 1) {
		padding-left: 0;
	}
	table thead th:nth-last-child(-n + 1) {
		padding-right: 0;
	}
	table tr {
		border-bottom: 1px solid #f4d4aa;
	}
	table tr td {
		padding: 0.5rem 1rem;
	}
	table tr td:nth-child(-n + 1) {
		padding-left: 0;
	}
	table tr td:nth-last-child(-n + 1) {
		padding-right: 0;
	}
	table tr td input {
		width: 100%;
	}
	table tr td .cell-with-input {
		display: flex;
	}
	table tr td .cell-with-input input {
		margin: 0 0.2rem;
	}
	.responsive-table {
		width: 100%;
	}
	@media only screen and (max-width: 760px) {
		.responsive-table table,
		.responsive-table thead,
		.responsive-table tbody,
		.responsive-table th,
		.responsive-table td,
		.responsive-table tr {
			display: block;
		}
		.responsive-table thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}
		.responsive-table tr {
			padding: 2rem 0;
		}
		.responsive-table td[data-label] {
			position: relative;
			padding-left: 40%;
			display: flex;
			align-items: center;
		}
		.responsive-table td[data-label]:before {
			content: attr(data-label);
			position: absolute;
			top: 0.5rem;
			left: 0;
			width: 35%;
			padding-right: 10px;
			white-space: nowrap;
			font-weight: bold;
		}
	}

	@media print {
		button {
			display: none;
		}
	}

	.text-right {
		text-align: right;
	}
	.text-bold {
		font-weight: bold;
	}
</style>