<template>
	<div>
		<b-button id="carrito-nav">
			<b-img
				id="carrito-img"
				fluid
				:src="require('../assets/images/carrito.png')"
				class="botonImagenHeader"
			>
			</b-img>
			<label id="usuario">Mi carrito</label>
		</b-button>
		<div v-if="$store.state.carrito.items.length == 0" :key="0">
			<b-popover
				target="carrito-img"
				triggers="hover focus"
				container="carrito-nav"
				ref="popover"
				id=""
			>
				<div class="container-fluid">
					<div class="row">
						<div class="col">
							<div class="d-block" id="carrito-vacio">
								<h5>¡Aún no has agregado ningún plato al carrito!</h5>
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
				triggers="hover focus"
				placement="bottomleft"
				container="carrito-nav"
				ref="popover"
				id="popoverCarrito"
			>
				<div class="container-fluid">
					<div class="row fila-titulo">
						<div class="col col-12">
							<div class="d-block">
								<h3>Mi Pedido</h3>
							</div>
						</div>
					</div>
					<Producto :items="$store.state.carrito.items" />
					<hr style="width: 100%; border-top: 2px solid rgba(0, 0, 0, 0.1)" />
					<div class="row fila-titulo" id="subtotal">
						<div
							class="col col-sm-8 col-md-7 col-lg-4"
							style="margin-bottom: 3vh"
						>
							<div class="d-block">
								<strong>Subtotal</strong>
							</div>
						</div>

						<div
							class="col col-sm-3 col-md-4 col-lg-3 offset-lg-2"
							style="margin-bottom: 3vh"
						>
							<div class="d-block monto">
								<span>{{ $store.state.subtotal | formatCurrency }}</span>
							</div>
						</div>
					</div>
					<div class="container-fluid">
						<div class="row fila-titulo">
							<div class="col-12">
								<div class="d-block">
									<h4>Entrega</h4>
								</div>
							</div>
							<div class="row ml-0 mt-3" id="entregas">
								<div class="col col-sm-3 col-lg-6">
									<b-button
										pill
										@click="toggleClassEntrega(1)"
										id="delivery"
										class="entrega"
										:class="
											$store.state.tipoEntrega == false
												? 'btnActivo'
												: 'btnNoActivo'
										"
										>Delivery
									</b-button>
								</div>
								<div class="col col-sm-3 col-lg-6">
									<b-button
										pill
										@click="toggleClassEntrega(2)"
										id="tienda"
										class="entrega"
										:class="
											$store.state.tipoEntrega == true
												? 'btnActivo'
												: 'btnNoActivo'
										"
										>Tienda
									</b-button>
								</div>
							</div>
						</div>
					</div>
					<div class="container">
						<div class="row fila-titulo">
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
											$store.state.formaPago == true
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
										:disabled="esDelivery"
										:class="
											!$store.state.formaPago == false
												? 'btnActivo'
												: 'btnNoActivo'
										"
										>Tarjeta
										<b-img></b-img>
									</b-button>
								</div>
							</div>
						</div>
					</div>
					<div class="container">
						<div class="row fila-titulo">
							<div class="col-sm-6 col-md-4 col-lg-6">
								<div class="d-block">
									<span>Envío</span>
								</div>
							</div>
							<div class="col-sm-6 col-md-4 col-lg-6">
								<div class="d-block monto2">
									<span>{{ $store.state.envio | formatCurrency }}</span>
								</div>
							</div>
						</div>
						<div class="row fila-titulo">
							<div class="col-sm-6 col-md-4 col-lg-5">
								<div class="d-block">
									<span>Descuento</span>
								</div>
							</div>
							<div class="col-sm-6 col-md-4 col-lg-6 offset-lg-1">
								<div class="d-block monto2">
									<span>{{ $store.state.descuento | formatCurrency }}</span>
								</div>
							</div>
						</div>
						<div class="row fila-titulo">
							<div class="col-sm-6 col-md-4 col-lg-5">
								<div class="d-block">
									<strong>
										<h3 class="">Total</h3>
									</strong>
								</div>
							</div>
							<div class="col-sm-6 col-md-4 col-lg-6 offset-lg-1">
								<div class="d-block monto2">
									<span>{{ $store.state.total | formatCurrency }}</span>
								</div>
							</div>
						</div>

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
									font-size: 1.1em;
								"
								pill
								class="cancelar"
								@click="showConfirmation"
							>
								Cancelar Pedido
							</b-button>
						</div>
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
							class="text-center"
						>
							<p>
								<strong id="form-confirm-label" class="text-danger"
									>¿Desea vaciar el carrito?</strong
								>
							</p>
							<div>
								<b-button variant="outline-success" class="" @click="onCancel">
									No
								</b-button>
								<b-button variant="outline-danger" class="ml-2" @click="onOK"
									>Vaciar</b-button
								>
							</div>
						</div>
					</template>
				</b-overlay>
				<b-overlay
					style="height: 100%"
					:show="confirmado"
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
							class="text-center p-3 container"
							style="display: ruby"
						>
							<div class="row">
								<div class="col-12 mb-4">
									<b-img
										style="margin-right: 20px"
										width="30"
										:src="require('../assets/images/reloj.svg')"
									></b-img>
								</div>
							</div>
							<div class="row">
								<div class="col-12">
									<h4 class="text-info">Tiempo Estimado</h4>
									<span style="">
										<p class="text-danger">{{ tiempoEstimado }}</p>
									</span>
								</div>
							</div>
							<div class="col-5">
								<b-button
									variant="outline-success"
									class="mr-3"
									@click="resetCarrito"
								>
									Ok
								</b-button>
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
	import Service from "@/service/Service.js";

	export default {
		data() {
			return {
				showOverlay: false,
				tiempoEstimado: null,
				tipoEntrega: "",
				formaPago: "",
				confirmado: false,
				service: new Service(),
				esDelivery: undefined,
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
					if (this.formaPago == false) {
						this.toastr(
							"No puede pagar con tarjeta si elije la entrega a domicilio",
							"¡Atención!"
						);
					}
					this.$store.state.descuento = 0;
					this.$store.state.envio = 50;
					this.$store.dispatch("setFormaPago", true);
					this.$store.dispatch("setTipoEntrega", false);
					this.esDelivery = true;
					this.formaPago = true;
				} else {
					this.$store.state.descuento = this.$store.state.subtotal * 0.1;
					this.$store.state.envio = 0;
					this.$store.dispatch("setTipoEntrega", true);
					this.esDelivery = false;
				}
				this.tipoEntrega = btn;
				this.$store.dispatch("setTotal");
			},
			toggleClassPago(val) {
				this.formaPago = val == 1;
				if (this.esDelivery) {
					this.toastr(
						"No puede pagar con tarjeta si elije la entrega a domicilio",
						"¡Atención!"
					);
				} else if (this.tipoEntrega == 1) {
					this.$store.dispatch("setFormaPago", true);
					return false;
				}

				this.$store.dispatch("setFormaPago", val == 1);
			},
			resetCarrito() {
				this.$store.dispatch("resetCarrito");
				this.confirmado = false;
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
				if (this.$store.state.formaPago == undefined) {
					this.toastr("Debe elegir una forma de pago", "¡Atención!");
					return false;
				}
				var manufacturadosID = this.$store.state.carrito.items.map((i) => {
					return i.idArticuloVenta;
				});

				var esDelivery = $("#delivery").hasClass("btnActivo");
				var idUsuario = JSON.parse(sessionStorage.getItem("user")).id;
				if (esDelivery) {
					this.service
						.getAll("domicilio/getByIDPersona/" + idUsuario)
						.then((data) => {
							if (data.length == 0) {
								this.toastr(
									"No puede pedir a domicilio si no ha agregado direcciones.",
									"¡Atención!"
								);
								return false;
							} else {
								this.confirmarPedido(manufacturadosID, esDelivery);
							}
						})
						.catch((e) => {
							this.toastr(e.response.data.message, "Error!");
						});
				} else {
					this.confirmarPedido(manufacturadosID, esDelivery);
				}
			},
			confirmarPedido(manufacturadosID, esDelivery) {
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
								"http://localhost:9001/buensabor/pedido/confirmarPedidoCliente",
								this.$store.state.carrito
							)
							.then((data) => {
								if (data.data) {
									this.confirmado = true;
								} else {
									this.toastr(
										"Su pedido no ha podido ser confirmado",
										"Ocurrió un error: "
									);
								}
							})
							.catch(() =>
								this.toastr(
									"Su pedido no ha podido ser confirmado",
									"Ocurrió un error: "
								)
							)
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
	.fila-titulo {
		width: 35vw;
	}
	.fila-titulo h3 {
		font-size: 1.3em;
	}
	.fila-titulo h4,
	.fila-titulo strong {
		font-size: 1.6em;
	}
	.fila-titulo h4 {
		margin-top: 1vh;
		margin-left: -14px !important;
	}
	@media screen and (max-width: 1024px) {
		#popoverCarrito {
			max-width: 40vw !important;
		}
		#subtotal {
			height: 32px;
		}
		.fila-titulo {
			width: 35vw;
		}
		.btnActivo,
		.btnNoActivo {
			margin-bottom: 1vh !important;
			margin-top: 0.1vh !important;
		}

		.fila-titulo h3 {
			font-size: 1.3em;
		}
		.fila-titulo h4,
		.fila-titulo strong {
			font-size: 1.6em;
		}
		.fila-titulo h4 {
			margin-top: 1vh;
			margin-left: -14px !important;
		}
		.fila-titulo .col-lg-3 {
			padding-left: 0;
		}
		.monto {
			margin-top: 0.7vh;
			margin-left: 28px;
		}
	}

	@media screen and (max-width: 774px) {
		#popoverCarrito {
			max-width: 80vw !important;
			margin-left: 29.5vw;
		}

		.fila-titulo strong {
			font-size: 1.1em;
		}
		.fila-titulo h3 {
			font-size: 1.3em;
		}
		.fila-titulo h4 {
			font-size: 1.2em;
		}
		.monto2 {
			margin-left: 13px;
		}
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
<style scoped>
	.d-block {
		display: inline-block !important;
	}
</style>
