<template>
	<div>
		<cabecera></cabecera>
		<div id="nav">
			<menuLateral></menuLateral>
		</div>
		<div class="costado"></div>
		<b-container class="informacion">
			<h1>Pedidos</h1>
			<div v-if="this.userDelivery">
				<b-button class="hrefPedido" @click="cambiarAPendientes"
					>PENDIENTES</b-button
				>
				<b-button class="hrefPedido" @click="cambiarAEntregados"
					>ENTREGADOS</b-button
				>
			</div>
			<div v-else-if="this.userCocina"></div>
			<div v-else-if="this.userCajero">
				<b-button class="hrefPedido" @click="filtrar(1)">TODOS</b-button>
				<b-button class="hrefPedido" @click="filtrar(2)">PENDIENTES</b-button>
				<b-button class="hrefPedido" @click="filtrar(3)">EN COCINA</b-button>
				<b-button class="hrefPedido" @click="filtrar(4)">LISTOS</b-button>
				<b-button class="hrefPedido" @click="filtrar(5)">EN DELIVERY</b-button>
			</div>
			<div v-if="!this.user.rol">
				<b-button
					v-if="!this.user.rol"
					class="hrefPedido"
					@click="filtrarCliente(1)"
					>TODOS</b-button
				>
				<b-button class="hrefPedido" @click="filtrarCliente(2)"
					>PENDIENTES</b-button
				>
				<b-button class="hrefPedido" @click="filtrarCliente(3)"
					>ENTREGADOS</b-button
				>
				<b-button
					v-if="!this.user.rol"
					class="hrefPedido"
					@click="filtrarCliente(4)"
					>CANCELADOS</b-button
				>
			</div>
			<b-nav-form
				class="buscador"
				id="busqueda"
				:style="
					this.userCocina || this.user.rol == undefined ? 'display:none' : ''
				"
			>
				<b-form-input
					size="sm"
					class="mr-sm-2"
					v-model="busquedaOrden"
					placeholder="Buscar orden o cliente"
					id="inputBusqueda"
					@input="verificaEstadoInput()"
				></b-form-input>
				<b-button
					size="sm"
					class="botonImagen"
					type="button"
					id="lupita"
					@click="busquedaPedidos()"
				>
					<img :src="require('@/assets/images/buscar.png')" id="imagenBuscar" />
				</b-button>
			</b-nav-form>
			<div v-if="this.userDelivery">
				<div v-if="pedidosPendientes" class="divCard">
					<b-card-group>
						<div
							v-for="pedido in filtroPendientes"
							:key="pedido.id"
							id="contenedorTarjeta"
						>
							<pedido
								:pedidoParam="pedido"
								:domicilioParam="
									domicilios.find((d) => d.persona.id == pedido.cliente.id)
								"
							></pedido>
						</div>
					</b-card-group>
				</div>
				<div v-if="pedidosEntregados" class="divCard">
					<b-card-group>
						<div
							v-for="pedido in filtroEntregados"
							:key="pedido.id"
							id="contenedorTarjeta"
						>
							<pedido
								:pedidoParam="pedido"
								:domicilioParam="
									domicilios.find((d) => d.persona.id == pedido.cliente.id)
								"
							></pedido>
						</div>
					</b-card-group>
				</div>
				<div v-if="!pedidosEntregados && !pedidosPendientes" class="divCard">
					<b-card-group>
						<div
							v-for="pedido in filtroBuscados"
							:key="pedido.id"
							id="contenedorTarjeta"
						>
							<pedido
								:pedidoParam="pedido"
								:domicilioParam="
									domicilios.find((d) => d.persona.id == pedido.cliente.id)
								"
							></pedido>
						</div>
					</b-card-group>
				</div>
			</div>
			<div v-else-if="this.userCajero">
				<b-card-group style="margin-top: 120px">
					<div
						v-for="pedido in pedidosFiltrados"
						:key="pedido.id"
						id="contenedorTarjeta"
					>
						<pedido
							:pedidoParam="pedido"
							:domicilioParam="
								domicilios.find((d) => d.persona.id == pedido.cliente.id)
							"
						></pedido>
					</div>
				</b-card-group>
			</div>
			<div v-else-if="this.userCocina">
				<b-card-group>
					<div
						v-for="pedido in filtroConfirmados"
						:key="pedido.id"
						id="contenedorTarjeta"
					>
						<pedido :pedidoParam="pedido"></pedido>
					</div>
				</b-card-group>
			</div>
			<div v-else>
				<b-card-group>
					<div
						v-for="pedido in pedidos"
						:key="pedido.id"
						id="contenedorTarjeta"
					>
						<pedido :pedidoParam="pedido"></pedido>
					</div>
				</b-card-group>
			</div>
		</b-container>
	</div>
</template>
<script>
	import MenuLateral from "@/components/MenuLateral.vue";
	import Header from "@/components/Header.vue";
	import Pedido from "@/components/Pedido.vue";
	import Service from "@/service/Service.js";
	import Formatters from "@/utilidades/Formatters.js";

	export default {
		mounted() {
			this.userVerifica();
			this.getDomicilios();
			this.getPedidos();
		},
		components: {
			menuLateral: MenuLateral,
			cabecera: Header,
			pedido: Pedido,
		},

		data() {
			return {
				user: {},
				cliente: false,
				userDelivery: true,
				pedidosDelivery: {},
				service: new Service(),
				domicilios: {},
				pedidosPendientes: true,
				pedidosEntregados: false,
				filtroPendientes: {},
				filtroEntregados: {},
				filtroBuscados: {},
				filtroConfirmados: {},
				busquedaOrden: "",
				formatter: new Formatters(),
				timeout: null,
				userCajero: false,
				userCocina: false,
				pedidosFiltrados: [],
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
				} else if (this.user.rol == undefined && this.user.id) {
					this.userDelivery = false;
					this.cliente = true;
				} else {
					this.$router.push({ name: "Home" });
				}
			},

			async getDomicilios() {
				await this.service.getAll("domicilio").then((data) => {
					this.domicilios = data;
				});
			},

			async getPedidos() {
				await this.service.getAll("pedido/pedidos").then((data) => {
					this.pedidosDelivery = data;
					//	this.agregaDomicilioPedido();
					this.pedidosFiltrados = data;
					this.adjustmentHour();
					this.ajusteTipoRetiro();
					if (this.userDelivery == true) {
						this.cargaPendientes();
					}
					if (this.userCocina == true) {
						this.cargaConfirmados();
					}
					if (this.user.rol == undefined) {
						this.cargaPedidosCliente();
					}
					console.log(this.pedidosDelivery);
				});
			},
			adjustmentHour() {
				this.pedidosDelivery.forEach((pedido) => {
					pedido.hora = this.formatter.formatHour(pedido.hora);
				});
			},
			ajusteTipoRetiro() {
				this.pedidosDelivery.forEach((pedido) => {
					if (pedido.tipoEntrega == false) {
						pedido.tipoEntrega = "Delivery";
					} else {
						pedido.tipoEntrega = "Retiro en local";
					}
				});
			},
			cambiarAPendientes() {
				this.pedidosPendientes = true;
				this.pedidosEntregados = false;
				this.cargaPendientes();
			},

			cargaPendientes() {
				if (this.pedidosPendientes) {
					this.filtroPendientes = this.pedidosDelivery.filter(
						(pedido) => pedido.estado == "Pendiente"
					);
				}
				console.log(this.filtroPendientes);
			},

			cargaEntregados() {
				if (!this.pedidosPendientes) {
					this.filtroEntregados = this.pedidosDelivery.filter(
						(pedido) => pedido.estado == "Entregado"
					);
				}
				console.log(this.filtroEntregados);
			},
			cargaConfirmados() {
				this.filtroConfirmados = this.pedidosDelivery.filter(
					(pedido) => pedido.estado == "Confirmado"
				);
				console.log(this.filtroConfirmados);
			},
			cargaPedidosCliente() {
				this.pedidosFiltrados = this.pedidosDelivery
					.filter((pedido) => pedido.cliente.id == this.user.id)
					.sort((a, b) => a.estado < b.estado);
				console.log(this.pedidosFiltrados);
			},
			cambiarAEntregados() {
				this.pedidosEntregados = true;
				this.pedidosPendientes = false;
				this.cargaEntregados();
			},

			busquedaPedidos() {
				if (this.busquedaOrden != "") {
					this.filtroBuscados = this.pedidosFiltrados.filter((pedido) => {
						return (
							pedido.numero == this.busquedaOrden ||
							pedido.cliente.nombre.includes(this.busquedaOrden) ||
							pedido.cliente.apellido.includes(this.busquedaOrden) ||
							(pedido.cliente.nombre + " " + pedido.cliente.apellido).includes(
								this.busquedaOrden
							)
						);
					});

					if (this.filtroBuscados != undefined && this.filtroBuscados != null) {
						this.pedidosPendientes = false;
						this.pedidosEntregados = false;
						this.pedidosFiltrados = this.filtroBuscados;
					}
				} else {
					this.pedidosFiltrados = this.pedidosDelivery;
				}
			},
			filtrar(val) {
				switch (val) {
					case 1:
						this.pedidosFiltrados = this.pedidosDelivery;
						break;
					case 2:
						this.pedidosFiltrados = this.pedidosDelivery.filter(
							(d) => d.estado == "Pendiente"
						);
						break;
					case 3:
						this.pedidosFiltrados = this.pedidosDelivery.filter(
							(d) => d.estado == "En Cocina"
						);
						break;
					case 4:
						this.pedidosFiltrados = this.pedidosDelivery.filter(
							(d) => d.estado == "Listo"
						);
						break;
					case 5:
						this.pedidosFiltrados = this.pedidosDelivery.filter(
							(d) => d.estado == "En Delivery"
						);
						break;
				}
			},
			filtrarCliente(val) {
				switch (val) {
					case 1:
						this.pedidosFiltrados = this.pedidosDelivery
							.filter((d) => d.cliente.id == this.user.id)
							.sort((a, b) => a.estado < b.estado);
						break;
					case 2:
						this.pedidosFiltrados = this.pedidosDelivery
							.filter(
								(d) =>
									(d.estado == "Pendiente" ||
										d.estado == "Listo" ||
										d.estado == "En Cocina" ||
										d.estado == "En Delivery") &&
									d.cliente.id == this.user.id
							)
							.sort((a, b) => a.estado < b.estado);
						break;
					case 3:
						this.pedidosFiltrados = this.pedidosDelivery
							.filter(
								(d) => d.estado == "Facturado" && d.cliente.id == this.user.id
							)
							.sort((a, b) => a.estado < b.estado);
						break;
					case 4:
						this.pedidosFiltrados = this.pedidosDelivery
							.filter(
								(d) => d.estado == "Cancelado" && d.cliente.id == this.user.id
							)
							.sort((a, b) => a.estado < b.estado);
						break;
				}
			},

			verificaEstadoInput() {
				var inputBusqueda = document.getElementById("inputBusqueda").value;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.productos = [];
					if (inputBusqueda == "") {
						if (this.pedidosPendientes == false) {
							this.getPedidos();
							this.cambiarAPendientes();
						} else {
							this.getPedidos();
							this.cambiarAEntregados();
						}
					}
				}, 800);
			},
		},
		computed: {
			pedidos() {
				return this.pedidosFiltrados;
			},
		},
	};
</script>
<style>
	#imagenBuscar {
		width: 25px;
	}
	.form-inline {
		flex-wrap: nowrap;
	}
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
	.divCard {
		min-height: 50px;
		display: inline-block;
	}
	#contenedorTarjeta {
		margin-top: 10px;
		width: 800px;
	}

	@media screen and (max-width: 550px) {
		.divCard {
			width: 95%;
		}
		#contenedorTarjeta {
			width: 100%;
		}
	}

	@media screen and (min-width: 320px) and (max-width: 450px) {
		#busqueda {
			width: 100%;
			margin-top: 20px;
			min-height: 40px;
		}
		#inputBusqueda {
			float: left;
		}

		#lupita {
			border-right: 0px;
			border-left: 0px;
			border-top: 0px;
			border-bottom: 1;

			margin-left: 10px;
			float: left;
		}
	}
</style>