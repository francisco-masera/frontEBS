 <template>
	<div>
		<cabecera></cabecera>
		<b-container class="informacion">
			<div>
				<section id="pdf" ref="pdf">
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
									<h1 class="text-right">
										Factura #{{ pedido.factura.numero }}
									</h1>
									<p>Fecha: {{ fechaFactura }}</p>
								</div>
								<div>
									<div class="section-spacer">
										<p><strong>Cliente:</strong></p>
										<p>
											{{
												pedido.cliente.nombre + " " + pedido.cliente.apellido
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
								<tr v-for="(item, idx) in pedido.detalles" :key="idx">
									<td data-label="N°">{{ idx + 1 }}</td>
									<td data-label="Item">
										<label for="">{{
											item.articulo.insumo == undefined
												? item.articulo.denominacion
												: item.articulo.insumo.denominacion
										}}</label>
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
											(item.articulo.precioVenta * item.cantidad)
												| formatCurrency
										}}
									</td>
								</tr>
							</table>
							<table>
								<tr>
									<td>Subtotal</td>
									<td>
										{{ subtotal | formatCurrency }}
									</td>
								</tr>
								<tr>
									<td>
										<div class="cell-with-input">Descuento</div>
									</td>
									<td>
										<label class="text-right">
											{{
												pedido.tipoEntrega ? subtotal * 0.1 : 0 | formatCurrency
											}}
										</label>
									</td>
								</tr>
								<tr>
									<td>
										<div class="cell-with-input">Envío</div>
									</td>
									<td>
										<label class="text-right">
											{{ pedido.tipoEntrega ? 0 : 50 | formatCurrency }}
										</label>
									</td>
								</tr>
								<tr class="text-bold">
									<td>Total</td>
									<td>
										{{ totalPedido | formatCurrency }}
									</td>
								</tr>
							</table>
						</div>
					</main>
				</section>
				<div class="container-fluid">
					<div class="row">
						<div class="col-3 offset-5">
							<b-button class="hrefPedido" @click="generarPDF()">
								Descargar
							</b-button>
						</div>
					</div>
				</div>
			</div>
			<Toast ref="toast" />
		</b-container>
	</div>
</template>
 <script>
	import axios from "axios";
	import Toast from "@/components/Toast.vue";
	import Header from "@/components/Header.vue";
	import Service from "@/service/Service.js";
	export default {
		data() {
			return {
				pedido: {},
				service: new Service(),
				fechaFactura: new Date(),
			};
		},
		components: {
			Toast: Toast,
			cabecera: Header,
		},
		mounted() {
			this.getPedido();
		},
		computed: {
			totalPedido() {
				var subTotal = this.pedido.detalles.reduce(
					(a, b) => a + b.articulo.precioVenta * b.cantidad,
					0
				);
				if (this.pedido.tipoEntrega == "Retiro en local")
					return subTotal - subTotal * 0.1;

				return subTotal + 50;
			},
			subtotal() {
				return this.pedido.detalles.reduce(
					(a, b) => a + b.articulo.precioVenta * b.cantidad,
					0
				);
			},
		},
		methods: {
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
			toastr(msg, title) {
				this.$refs.toast.emitToast(msg, title);
			},
			async getPedido() {
				await this.service
					.getOne("pedido", this.$route.params.idPedido)
					.then((d) => {
						this.pedido = d;
						var fecha = d.factura.fechaHora.split("T")[0].split("-");
						this.fechaFactura = fecha[2] + "/" + fecha[1] + "/" + fecha[0];
					});
			},
		},
	};
</script>
<style>
	.hrefPedido {
		float: left;
		color: black;
		margin-bottom: 15px;
		background-color: transparent;
		border: none;
	}
	.hrefPedido:hover {
		text-decoration: underline;
		color: #e7541e;
		background-color: transparent;
	}
	.hrefPedido:active {
		background-color: transparent;
		color: #e7541e;
	}
	.hrefPedido:not(:disabled) {
		background-color: transparent;
		color: #e7541e;
	}

	.hrefPedido:focus {
		text-decoration: underline;
		color: #e7541e;
		font-weight: 700;
		background-color: transparent;
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