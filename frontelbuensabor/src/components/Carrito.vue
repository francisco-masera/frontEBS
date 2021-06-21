<template>
	<div>
		<b-button id="carrito-nav">
			<b-img
				id="carrito-img"
				fluid
				src="http://localhost:9001/images/sistema/carrito.png"
				class="botonImagenHeader"
			>
			</b-img>
			<label id="usuario">Mi carrito</label>
		</b-button>
		<div v-if="$store.state.carrito.items.length == 0" :key="0">
			<b-popover
				target="carrito-img"
				triggers="hover focus"
				placement="bottomleft"
				container="carrito-nav"
				ref="popover"
				id="popoverCarrito"
			>
				<div class="container">
					<div class="row fila-titulo">
						<div class="col-12">
							<div class="d-block">
								<h5 class="col col-10">
									¡Aún no has agregado ningún plato al carrito!
								</h5>
							</div>
						</div>
					</div>
					<b-button
						class="mt-3"
						@click="$router.push({ name: 'Menu' })"
						v-show="mostrarBtnMenu"
						block
						>Ver todos los platos</b-button
					>
				</div>
			</b-popover>
		</div>
		<div v-else :key="$store.state.carritoKey">
			<b-popover
				target="carrito-img"
				triggers="click"
				placement="bottomleft"
				container="carrito-nav"
				ref="popover"
				id="popoverCarrito"
			>
				<div class="container-fluid">
					<div class="row fila-titulo">
						<div class="col-12">
							<div class="d-block">
								<h3>Mi Pedido</h3>
							</div>
						</div>
					</div>
					<Producto :items="$store.state.carrito.items" />
					<hr style="width: 100%; border-top: 2px solid rgba(0, 0, 0, 0.1)" />
					<div class="col-7" style="margin-bottom: 3vh">
						<div class="d-block">
							<strong>Subtotal</strong>
						</div>
					</div>
					<div class="col-4" style="margin-bottom: 3vh">
						<div class="d-block">
							<span>{{ $store.state.subtotal | formatCurrency }}</span>
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
									<b-button
										pill
										@click="toggleClassEntrega(1)"
										id="delivery"
										class="entrega"
										:class="
											tipoEntrega == 1 && $store.state.carrito.formaPago
												? 'btnActivo'
												: 'btnNoActivo'
										"
										>Delivery
									</b-button>
								</div>
								<div class="col-6">
									<b-button
										pill
										@click="toggleClassEntrega(2)"
										id="tienda"
										class="entrega"
										:class="
											tipoEntrega == 2 &&
											$store.state.carrito.formaPago == false
												? 'btnActivo'
												: 'btnNoActivo'
										"
										:disabled="tipoEntrega == 2"
										>Tienda
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
									<b-button
										pill
										@click="toggleClassPago(1)"
										id="efectivo"
										class="pago"
										:class="
											$store.state.carrito.formaPago
												? 'btnActivo'
												: 'btnNoActivo'
										"
										>Efectivo
										<b-img></b-img>
									</b-button>
								</div>
								<div class="col-6">
									<b-button
										pill
										@click="toggleClassPago(2)"
										id="tarjeta"
										class="pago"
										:class="
											!$store.state.carrito.formaPago && tipoEntrega != 1
												? 'btnActivo'
												: 'btnNoActivo'
										"
										:disabled="$store.state.envio != 0"
										>Tarjeta
										<b-img></b-img>
									</b-button>
								</div>
							</div>
						</div>
					</div>
					<div class="col-7" style="margin-bottom: 3vh">
						<div class="d-block">
							<span>Envío</span>
						</div>
					</div>
					<div class="col-4" style="margin-bottom: 3vh">
						<div class="d-block">
							<span>{{ $store.state.envio | formatCurrency }}</span>
						</div>
					</div>
					<div class="col-7" style="margin-bottom: 3vh">
						<div class="d-block">
							<span>Descuento</span>
						</div>
					</div>
					<div class="col-4" style="margin-bottom: 3vh">
						<div class="d-block">
							<span>{{ $store.state.descuento | formatCurrency }}</span>
						</div>
					</div>
					<div class="col-7" style="margin-bottom: 2vh">
						<div class="d-block">
							<strong>
								<h4 class="text-uppercase">Total</h4>
							</strong>
						</div>
					</div>
					<div class="col-4" style="margin-bottom: 3vh">
						<div class="d-block">
							<span>{{ $store.state.total | formatCurrency }}</span>
						</div>
					</div>
					<b-collapse
						id="tiempo"
						:visible="tiempoEstimado != null && confirmado"
						style="width: 90%"
					>
						<h4>Tiempo Estimado</h4>
						<div class="col-12 mb-4">
							<span style="margin-left: 40%">
								<b-img
									width="30"
									src="http://localhost:9001/images/sistema/reloj.png"
								></b-img>
								<span class="">{{ tiempoEstimado }}</span>
							</span>
						</div>
					</b-collapse>
					<div class="col-12 mb-4" style="text-align: center">
						<b-button pill class="m-auto btnActivo" @click="confirmar"
							>Confirmar Pedido</b-button
						>
					</div>

					<div class="col-12" style="text-align: center">
						<b-button
							style="
								background: none;
								border: none;
								color: black;
								font-size: 10pt;
							"
							pill
							class="cancelar"
							@click="showConfirmation"
						>
							Cancelar Pedido
						</b-button>
					</div>
				</div>
				<b-overlay
					style="height: 100%"
					:show="showOverlay"
					no-wrap
					variant="dark"
					opacity="1"
					blur="2px"
				>
					<template #overlay>
						<div
							ref="dialog"
							tabindex="-1"
							role="dialog"
							aria-modal="false"
							aria-labelledby="form-confirm-label"
							class="text-center p-3"
						>
							<p>
								<strong id="form-confirm-label" class="text-danger"
									>¿Desea vaciar el carrito?</strong
								>
							</p>
							<div>
								<b-button
									variant="outline-success"
									class="mr-3"
									@click="onCancel"
								>
									No
								</b-button>
								<b-button variant="outline-danger" @click="onOK"
									>Vaciar</b-button
								>
							</div>
						</div>
					</template>
				</b-overlay>
			</b-popover>
		</div>
		<Toast ref="toast" />
	</div>
</template>

<script>
	import $ from "jquery";
	import Producto from "@/components/ProductoCarrito.vue";
	import axios from "axios";
	import Toast from "@/components/Toast.vue";
	export default {
		data() {
			return {
				showOverlay: false,
				tiempoEstimado: null,
				tipoEntrega: "",
				formaPago: "",
				confirmado: false,
			};
		},
		components: {
			Producto: Producto,
			Toast: Toast,
		},
		computed: {
			mostrarBtnMenu() {
				return location.pathname != "/menu";
			},
		},
		created() {
			this.$store.commit("getCarrito");
			this.$store.dispatch("setCarritoKey");
		},
		methods: {
			toggleClassEntrega(btn) {
				if (btn == 1) {
					this.$store.state.descuento = 0;
					this.$store.state.envio = 50;
					this.$store.dispatch("setFormaPago", true);
					this.formaPago = true;
					console.log(this.$store.state.envio);
				} else {
					this.$store.state.descuento = this.$store.state.subtotal * 0.1;
					this.$store.state.envio = 0;
					console.log(this.$store.state.envio);
				}
				this.tipoEntrega = btn;
				this.$store.dispatch("setTotal");
			},
			toggleClassPago(val) {
				this.tipoEntrega = val;
				this.formaPago = val == 1;
				if (this.tipoEntrega == 1) {
					this.$store.dispatch("setFormaPago", true);
					return false;
				}
				this.$store.dispatch("setFormaPago", val == 1);
			},

			toggleClass($children) {
				$.each($children, (i) => {
					if ($($children[i]).hasClass("btnActivo")) {
						$($children[i]).removeClass("btnActivo").addClass("btnNoActivo");
						$($children[i + 1])
							.removeClass("btnNoActivo")
							.addClass("btnActivo");

						return false;
					} else {
						$($children[i]).removeClass("btnNoActivo").addClass("btnActivo");
						$($children[i + 1])
							.removeClass("btnActivo")
							.addClass("btnNoActivo");

						return false;
					}
				});
			},
			toMenu() {
				if (location.pathname != "/menu") this.$router.push({ name: "Menu" });
			},
			showConfirmation() {
				this.showOverlay = true;
			},
			onOK() {
				this.$store.dispatch("delCarrito");
				location.reload();
				this.onCancel();
			},
			onCancel() {
				this.showOverlay = false;
			},
			confirmar() {
				if (this.$store.state.descuento == 0 && this.$store.state.envio == 0) {
					this.toastr("Debe elegir una forma de entrega", "¡Atención!");
					return false;
				}
				if (this.formaPago == "") {
					this.toastr("Debe elegir una forma de pago", "¡Atención!");
					return false;
				}
				var manufacturadosID = this.$store.state.carrito.items.map((i) => {
					return i.idArticuloVenta;
				});

				var esDelivery = $("#delivery").hasClass("btnActivo");
				axios
					.post("http://localhost:9001/buensabor/manufacturado/calcularTiempo", {
						manufacturadosID,
						esDelivery,
					})
					.then((data) => {
						this.tiempoEstimado = data.data + " min";
						this.$store.state.carrito.tiempoEstimado = data.data;
					})
					.then(() =>
						axios
							.put(
								"http://localhost:9001/buensabor/pedido/confirmarPedido/",
								this.$store.state.carrito
							)
							.then((data) => {
								if (data.data) {
									setTimeout(() => {
										this.$store.dispatch("resetCarrito");
										location.reload(), 2300;
									});
								} else {
									this.toastr(
										"Su pedido no ha podido ser confirmado",
										"Ocurrió un error: "
									);
								}
							})
							.catch((e) => console.log(e))
					)
					.catch(() => {
						this.toastr(
							"Su pedido no ha podido ser confirmado",
							"Ocurrió un error: "
						);
					});
			},
			toastr(msg, title) {
				this.$refs.toast.emitToast(msg, title);
			},
		},
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
		margin-bottom: 0.5vh;
	}

	#popoverCarrito {
		max-width: 20vw !important;
	}

	.btnActivo {
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

	.btnActivo:hover {
		border: none;
		background-color: #e7511e;
		color: #ffffff !important;
	}

	.btnNoActivo {
		border: none;
		background-color: #e7511e;
		color: #ffffff;
		font-weight: 600;
		width: max-content;
		height: 35px;
		margin: -2vh 0;
		margin-bottom: 4vh;
	}

	.btnNoActivo:hover {
		border: #e7511e;
		background-color: #ffffff;
		border-style: solid;
		border-width: 1px;
		color: #e7511e !important;
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
		box-shadow: none !important;
		border-color: transparent !important;
		outline: none !important;
	}
</style>
