<template>
	<div>
		<cabecera></cabecera>
		<div id="nav">
			<menuLateral></menuLateral>
		</div>
		<div class="costado"></div>
		<b-container class="informacion">
			<h1 id="titulo">Elija un reporte</h1>
			<b-form-select
				@change="setType"
				style="width: 30vw"
				v-model="selected"
				:options="options"
			></b-form-select>
			<export-excel
				v-show="isType"
				:fetch="generarReporte"
				class="btn"
				:fields="dataFields"
				:name="'Reporte_' + type + '_' + fecha"
				:title="title"
			>
				<button
					class="btn badge-pill"
					style="background-color: #1f91b6; color: #fff; font-size: 1.05em"
				>
					Descargar
				</button>
			</export-excel>
			<div class="container-fluid">
				<div class="row mt-5" v-show="showDate">
					<div class="col-4">
						<span>Fecha Mínima</span>
						<b-calendar
							selectedDate
							locale="es-Ar"
							@context="setFechaMin"
						></b-calendar>
					</div>
					<div class="col-4">
						<span>Fecha Máxima</span>
						<b-calendar
							selectedDate
							locale="es-Ar"
							@context="setFechaMax"
						></b-calendar>
					</div>
				</div>
			</div>
			<Toast ref="toast" />
		</b-container>
	</div>
</template>

<script>
	import Vue from "vue";
	import excel from "vue-excel-export";
	Vue.use(excel);
	import MenuLateral from "@/components/MenuLateral.vue";
	import Header from "@/components/Header.vue";
	import Toast from "@/components/Toast.vue";
	import Formatter from "@/utilidades/Formatters.js";
	import axios from "axios";

	export default {
		components: {
			cabecera: Header,
			menuLateral: MenuLateral,
			Toast: Toast,
		},
		data() {
			return {
				selected: null,
				dataFields: null,
				title: "",
				type: null,
				showDate: false,
				fechaMin: null,
				fechaMax: null,
				fecha: new Date().toLocaleString(),
				options: [
					{ value: null, text: "---- Opciones ----" },
					{ value: "a", text: "Platos más pedidos" },
					{ value: "b", text: "Ingresos" },
					{ value: "c", text: "Pedidos agrupados" },
					{ value: "d", text: "Artículos con bajo stock" },
				],
				formatter: new Formatter(),
			};
		},
		methods: {
			totalPedido(pedido) {
				var subTotal = pedido.detalles.reduce(
					(a, b) => a + b.articulo.precioVenta * b.cantidad,
					0
				);
				if (pedido.tipoEntrega) return subTotal - subTotal * 0.1;

				return subTotal + 50;
			},
			subtotal(pedido) {
				return pedido.detalles.reduce(
					(a, b) => a + b.articulo.precioVenta * b.cantidad,
					0
				);
			},
			toastr(msg, title) {
				this.$refs.toast.emitToast(msg, title);
			},
			setFechaMax(e) {
				this.fechaMax = e.activeYMD;
			},
			setFechaMin(e) {
				this.fechaMin = e.activeYMD;
			},
			setType(e) {
				switch (e) {
					case "a":
						this.type = "Ranking de pedidos por periodo";
						this.title = "Ranking de pedidos por periodo";
						this.showDate = true;
						break;
					case "b":
						this.type = "Ingresos por periodo";
						this.title = "Ingresos por periodo";
						this.showDate = true;
						break;
					case "c":
						this.type = "Pedidos por periodo";
						this.title = "Pedidos por periodo";
						this.showDate = true;
						break;
					case "d":
						this.type = "Stock";
						this.title = "Reporte de existencias";
						this.showDate = false;
						break;
					default:
						this.type = null;
						this.showDate = false;
						break;
				}
			},
			async generarReporte() {
				if (this.type == null) {
					return {};
				}
				var res = null;
				let url;
				switch (this.type) {
					case "Ranking de pedidos por periodo":
						url =
							"http://localhost:9001/buensabor/informacionArticulo/masVendidos";
						res = await axios
							.get(url, {
								params: {
									yMax: this.fechaMax.split("-")[0],
									mMax: this.fechaMax.split("-")[1],
									dMax: this.fechaMax.split("-")[2],
									yMin: this.fechaMin.split("-")[0],
									mMin: this.fechaMin.split("-")[1],
									dMin: this.fechaMin.split("-")[2],
								},
							})
							.catch((e) => this.toastr(e.response.data.message, "Error"));
						if (!res.data.length) {
							this.toastr(
								"No hay datos para el rango de fechas elegido",
								"Atención"
							);
							return false;
						}
						this.dataFields = {
							Artículo: "denominacion",
							"Precio de venta": "precioVenta",
							"Cantidad vendidos": {
								callback: (val) => {
									return val.cantidadVenta + " unidades";
								},
							},
						};
						break;
					case "Ingresos por periodo":
						url = "http://localhost:9001/buensabor/factura/ingresos";
						res = await axios
							.get(url, {
								params: {
									yMax: this.fechaMax.split("-")[0],
									mMax: this.fechaMax.split("-")[1],
									dMax: this.fechaMax.split("-")[2],
									yMin: this.fechaMin.split("-")[0],
									mMin: this.fechaMin.split("-")[1],
									dMin: this.fechaMin.split("-")[2],
								},
							})
							.catch((e) => this.toastr(e.response.data.message, "Error"));
						if (res.data.ingresos == 0) {
							this.toastr(
								"No hay datos para el rango de fechas elegido",
								"Atención"
							);
							return false;
						}
						this.dataFields = {
							Desde: {
								callback: (val) => {
									console.log(val);
									return new Date(val.fechaMin).toLocaleDateString();
								},
							},
							Hasta: {
								callback: (val) => {
									return new Date(val.fechaMax).toLocaleDateString();
								},
							},
							Ingresos: {
								callback: (val) => {
									return this.formatter.formatMoney(val.ingresos);
								},
							},
						};
						break;
					case "Pedidos por periodo":
						url = "http://localhost:9001/buensabor/pedido/pedidosPorCliente";
						res = await axios
							.get(url, {
								params: {
									yMax: this.fechaMax.split("-")[0],
									mMax: this.fechaMax.split("-")[1],
									dMax: this.fechaMax.split("-")[2],
									yMin: this.fechaMin.split("-")[0],
									mMin: this.fechaMin.split("-")[1],
									dMin: this.fechaMin.split("-")[2],
								},
							})
							.catch((e) => this.toastr(e.response.data.message, "Error"));
						if (!res.data.length) {
							this.toastr(
								"No hay datos para el rango de fechas elegido",
								"Atención"
							);
							return false;
						}
						this.dataFields = {
							Cliente: "cliente.nombre",
							Email: "cliente.email",
							"Fecha Facturación": {
								callback: (val) => {
									return new Date(val.factura.fechaHora).toLocaleDateString();
								},
							},
							"Forma de Pago": {
								callback: (val) => {
									return val.formaPago ? "Efectivo" : "Tarjeta";
								},
							},
							Entrega: {
								callback: (val) => {
									return val.tipoEntrega ? "Retiro en local" : "A Domicilio";
								},
							},
							Descuento: {
								callback: (val) => {
									console.log(val.tipoEntrega);
									return val.tipoEntrega
										? this.formatter.formatMoney(this.subtotal(val) * 0.1)
										: "N/A";
								},
							},
							Envío: {
								callback: (val) => {
									return !val.tipoEntrega
										? this.formatter.formatMoney(50)
										: "N/A";
								},
							},
							Total: {
								callback: (val) => {
									return this.formatter.formatMoney(this.totalPedido(val));
								},
							},
							"Total c/descuento": {
								callback: (val) => {
									var total = this.totalPedido(val);
									return !val.formaPago
										? this.formatter.formatMoney(total - total * 0.1)
										: "N/A";
								},
							},
						};
						break;
					case "Stock":
						url = "http://localhost:9001/buensabor/insumo/enStockBajo";
						this.dataFields = {
							Denominación: "denominacion",
							Existencias: {
								callback: (val) => {
									return val.stock.actual + val.unidadMedida;
								},
							},
							Mínimo: {
								callback: (val) => {
									return val.stock.minimo + val.unidadMedida;
								},
							},
						};
						res = await axios
							.get(url)
							.catch((e) => this.toastr(e.response.data.message, "Error"));
						if (!res.data.length) {
							this.toastr("No hay insumos con bajo stock", "Atención");
							return false;
						}
						break;
				}
				return res.data;
			},
		},
		computed: {
			isType() {
				return this.type != null;
			},
		},
	};
</script>

<style>
</style>