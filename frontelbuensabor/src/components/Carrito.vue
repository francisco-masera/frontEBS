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
					<b-button class="mt-3" v-show="mostrarBtnMenu" block
						>Ver todos los platos</b-button
					>
				</div>
			</b-popover>
		</div>
		<div v-else :key="$store.state.carritoKey">
			<b-popover
				target="carrito-img"
				triggers="click hover focus"
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
					<!-- <div
						v-for="item in $store.state.carrito.items"
						:key="item.idArticuloVenta"
						class="detalle"
					>
						<Producto :item="item" class="container" />
					</div> -->
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
										@click="toggleClassEntrega"
										id="delivery"
										class="btnActivo entrega"
										>Delivery
										<b-img></b-img>
									</b-button>
								</div>
								<div class="col-6">
									<b-button
										pill
										@click="toggleClassEntrega"
										id="tienda"
										class="btnNoActivo entrega"
										>Tienda
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
									<b-button
										pill
										@click="toggleClassPago"
										id="efectivo"
										class="btnActivo pago"
										>Efectivo
										<b-img></b-img>
									</b-button>
								</div>
								<div class="col-6">
									<b-button
										pill
										@click="toggleClassPago"
										id="tarjeta"
										class="btnNoActivo pago"
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
							<span>{{ 50 | formatCurrency }}</span>
						</div>
					</div>
					<div class="col-7" style="margin-bottom: 3vh">
						<div class="d-block">
							<span>Descuento</span>
						</div>
					</div>
					<div class="col-4" style="margin-bottom: 3vh">
						<div class="d-block">
							<span>{{ 0 | formatCurrency }}</span>
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
					<div class="hora col-12">
						<h4>Hora Estimada</h4>
						<div class="col-12 mb-4">
							<span style="margin-left: 30%">
								<b-img
									width="30"
									src="http://localhost:9001/images/sistema/reloj.png"
								></b-img>
								22.30
							</span>
						</div>
					</div>
					<div class="col-12 mb-4" style="text-align: center">
						<b-button pill class="m-auto btnActivo">Confirmar Pedido</b-button>
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
						>
							Cancelar Pedido
						</b-button>
					</div>
				</div>
			</b-popover>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import Producto from "@/components/ProductoCarrito.vue";
	export default {
		data() {
			return {};
		},
		components: {
			Producto: Producto,
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
			toggleClassEntrega() {
				var $parent = $("#entregas");
				var $children = $parent.find(".entrega");
				$.each($children, (i) => {
					$($children[i]).toggleClass("btnActivo btnNoActivo");
				});
				console.log($children);
			},
			toggleClassPago() {
				var $parent = $("#pagos");
				var $children = $parent.find(".pago");
				$.each($children, (i) => {
					$($children[i]).toggleClass("btnActivo btnNoActivo");
				});
				console.log($children);
			},
			updateCarrito() {
				var entregaID = $(".entrega").find(".btnActivo").attr("id");
				var tarjeta = $(".pago").find(".btnActivo").attr("id");
				this.carrito.forEach((i) => {
					i.envio = entregaID == "delivery";
					i.esTarjeta = tarjeta == "tarjeta";
				});

				this.$store.dispatch("updateCarrito", this.carrito);
			},
			toMenu() {
				if (location.pathname != "/menu") this.$router.push({ name: "Menu" });
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
		border: none;
		background-color: #e7511e;
		color: #ffffff;
		font-weight: 600;
		width: max-content;
		height: 35px;
		margin: -2vh 0;
		margin-bottom: 4vh;
	}

	.btnActivo:hover {
		border: #e7511e;
		background-color: #ffffff;
		border-style: solid;
		border-width: 1px;
		color: #e7511e;
	}

	.btnNoActivo {
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

	.btnNoActivo:hover {
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
