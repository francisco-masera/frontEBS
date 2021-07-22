<template>
	<b-navbar
		:id="esHome ? 'headerHome' : 'header'"
		toggleable="md"
		type="dark"
		v-if="esHome == true"
	>
		<b-container>
			<div id="logoContainer">
				<a href="\">
					<b-img
						id="brandImg"
						alt=""
						:src="require('../assets/images/logo.png')"
					></b-img>
				</a>
			</div>
			<div class="centrarHome">
				<b-navbar-toggle id="navToggle" target="nav-collapse"></b-navbar-toggle>
				<div class="hamburguer--home">
				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav class="items">
						<b-nav-item :to="{ name: 'Menu' }">CARTA</b-nav-item>
						<b-nav-item>
						<b-button
							v-show="!this.user.id"
							@click="$router.push({ name: 'Registro' })"
							pill
							class="btn boton"
							style="margin-bottom:0px;"
							>Registrarme</b-button
						>
						</b-nav-item>
						<b-nav-item>
						<b-button
							v-show="!this.user.id"
							@click="redirectoToLogin()"
							pill
							class="boton2"
							>Ingresar</b-button
						>
						</b-nav-item>
						<b-nav-item :to="'/misdatos/' + this.user.id">
							<b-img
								v-show="this.user.foto != '' && this.user.foto"
								rounded="circle"
								:src="this.user.foto"
								class="fotoUsuario botonImagenHeader"
							></b-img>
							<label v-show="user.nombre && user.apellido" id="usuario">{{
								user.nombre + " " + user.apellido
							}}</label>
						</b-nav-item>
						<b-button
							v-show="!!this.user.id"
							@click="logOut()"
							class="bg-transparent border-0"
						>
							<b-img
								:src="require('../assets/images/cerrarSesion.png')"
							></b-img>
						</b-button>
					</b-navbar-nav>
				</b-collapse>
				</div>
			</div>
		</b-container>
	</b-navbar>
	<b-navbar
		id="header"
		toggleable="md"
		type="dark"
		v-else-if="esHome == false || esHome == undefined"
	>
		<b-container>
			<div id="logoContainer">
				<a href="\">
					<b-img
						id="brandImg"
						alt=""
						:src="require('../assets/images/logo.png')"
					></b-img>
				</a>
			</div>
			<b-navbar-toggle id="navToggle" target="nav-collapse"></b-navbar-toggle>
			<div class="hamburguer">
				<div v-if="esCliente">
					<b-collapse id="nav-collapse" is-nav>
						<b-navbar-nav class="items">
							<b-nav-item :to="{ name: 'Menu' }">CARTA</b-nav-item>
							<b-nav-item :to="'/misdatos/' + this.user.id">
								<b-img
									v-if="user.id"
									:src="user.foto"
									alt=""
									id="foto"
									fluid
									class="botonImagenHeader fotoUsuario"
								>
								</b-img>
								<b-img
									v-else
									:src="require('../assets/images/userDefaultChico.png')"
									alt=""
									id="foto"
									fluid
									class="botonImagenHeader fotoUsuario"
								>
								</b-img>
								<label v-show="user.nombre && user.apellido" id="usuario">{{
									user.nombre + " " + user.apellido
								}}</label>
							</b-nav-item>
							<Carrito
								ref="carrito"
								v-show="user.id != undefined && user.id != null"
							/>
							<b-nav-item @click="logOut()">Cerrar sesión</b-nav-item>
						</b-navbar-nav>
					</b-collapse>
				</div>
				<div v-else-if="noRegistrado">
					<b-collapse id="nav-collapse" is-nav>
						<b-navbar-nav class="items">
							<b-nav-item :to="{ name: 'Menu' }">CARTA</b-nav-item>
							<b-nav-item :to="'/registro'">REGISTRO</b-nav-item>
							<b-nav-item :to="'/ingresoClientes/null/null'">INGRESO</b-nav-item>
						</b-navbar-nav>
					</b-collapse>
				</div>

				<div v-else>
					<b-collapse id="nav-collapse" is-nav>
						<b-navbar-nav class="itemsEmpleado">
							<b-nav-item :to="'/misdatos/' + this.user.id">
								<b-img
									v-if="this.user.foto != '' && this.user.foto"
									:src="this.user.foto"
									id="foto"
									fluid
									class="botonImagenHeader fotoUsuario"
								>
								</b-img>
								<b-img
									v-else
									:src="require('../assets/images/userDefaultChico.png')"
									alt=""
									id="foto"
									fluid
									class="botonImagenHeader fotoUsuario"
								>
								</b-img>
								<label
									v-show="this.user.nombre && this.user.apellido"
									id="usuario"
									>{{ this.user.nombre + " " + this.user.apellido }}
								</label>
							</b-nav-item>
							<!-- 	<b-nav-item
								class="menuLateral"
								v-for="boton in botones"
								:key="boton[0]"
								v-bind:href="boton[3]"
							>
								<b-img
									v-bind:src="'images/' + boton[2]"
									fluid
									class="iconosMenu"
								></b-img>
								{{ boton[1] }}
							</b-nav-item> -->
						</b-navbar-nav>
					</b-collapse>
				</div>
			</div>
		</b-container>
		<Toast ref="toast" />
	</b-navbar>
</template>

<script>
	import Service from "@/service/Service.js";
	import $ from "jquery";
	import Toast from "@/components/Toast.vue";
	import Carrito from "@/components/Carrito.vue";
	export default {
		components: {
			Toast: Toast,
			Carrito: Carrito,
		},
		data() {
			return {
				botones: [],
				user: {},
				esCliente: false,
				noRegistrado:false,
				es_Home: false,
				service: new Service(),
				screenWidth: window.screen.width < 1024,
			};
		},
		mounted() {
			this.traeUser();
		},
		props: ["imagen", "id", "screenLength", "esHome"],
		methods: {
			async verificaUsuario() {
				this.es_Home = this.$props.esHome;
				var boton;				
				if (this.user) {					
					if (this.user.rol == undefined) {
						if(this.user.id===undefined) {
							this.noRegistrado =true;
						}else{
							this.esCliente = true;
						}
					} else {
						this.esCliente = false;
						if (this.user.rol === "admin") {
							boton = [0, "Stock de insumos", "stock.png", "/stockInsumos"];
							this.botones.push(boton);
							boton = [1, "Catálogo", "manufacturados.png", "/catalogo"];
							this.botones.push(boton);
							boton = [
								2,
								"Sugerencias del chef",
								"sugerenciasChef.png",
								"/sugerenciaChef",
							];
							this.botones.push(boton);
							boton = [3, "Agregar empleado", "misDatos.png", "/formEmpleado/"];
							this.botones.push(boton);
							boton = [4, "Cerrar sesión", "cerrarSesion.png", "/ingreso"];
							this.botones.push(boton);
						} else if (this.user.rol === "cocina") {
							boton = [0, "Manufacturados", "manufacturados.png", "/catalogo"];
							this.botones.push(boton);
							boton = [1, "Cerrar sesión", "cerrarSesion.png", "/ingreso"];
							this.botones.push(boton);
						} else if (this.user.rol === "delivery") {
							boton = [0, "Pedidos", "Pedidos.png", ""];
							this.botones.push(boton);
							boton = [1, "Pedidos facturados", "pedidosFacturados.png", ""];
							this.botones.push(boton);
							boton = [2, "Cerrar sesión", "cerrarSesion.png", "/ingreso"];
							this.botones.push(boton);
						} else if (this.user.rol === "cajero") {
							boton = [0, "Pedidos", "Pedidos.png", ""];
							this.botones.push(boton);
							boton = [1, "Pedidos anteriores", "pedidosFacturados.png", ""];
							this.botones.push(boton);
							boton = [2, "Cerrar sesión", "cerrarSesion.png", "/ingreso"];
							this.botones.push(boton);
						}
					}
				}
			},
			async traeUser() {
				this.user = JSON.parse(sessionStorage.getItem("user"));
				if (this.user == null) {
					this.user = {};
					this.verificaUsuario();
				}
				if (this.user.id) {
					await this.service.getOne("persona", this.user.id).then((data) => {
						this.user = data;
						this.verificaUsuario();
					});
					this.loadPh();
				}
			},
			redirectoToLogin() {
				const h = this.$createElement;
				const messageVNode = h(
					"div",
					{
						class: ["flex modal-container"],
					},
					[
						h(
							"b-img",

							{
								props: {
									src: require("../assets/images/hamburguesa-02.svg"),
									thumbnail: true,
									center: true,
									fluid: true,
									rounded: "circle",
									width: 130,
								},
							}
						),
						h(
							"div",
							{
								class: ["text-center"],
							},
							[["¿Es usted cliente?"]]
						),
						h(
							"p",
							{
								class: ["text-center"],
							},
							[
								"Presione ",
								h("strong", " Sí"),
								" para acceder al área de CLIENTES",
							]
						),
					]
				);
				this.$bvModal
					.msgBoxConfirm([messageVNode], {
						title: "",
						buttonSize: "sm",
						centered: true,
						size: "sm",
						okTitle: "Sí",
						cancelTitle: "No",
						noCloseOnBackdrop: false,
						noCloseOnEsc: false,
						hideHeaderClose: false,
						footerClass: "mx-auto",
					})
					.then((value) => {
						if (value)
							this.$router.push({
								path: `/ingresoClientes/${null}/${null}`,
							});
						else if (value == false)
							this.$router.push({
								name: "Ingreso",
							});
					})
					.catch((e) => {
						this.toastr(e.response.data.message, "Error");
					});
			},

			logOut() {
				sessionStorage.setItem("user", null);
				location.href = "/";
			},
			loadPh() {
				var fotoSession = JSON.parse(sessionStorage.getItem("user")).foto;
				if (fotoSession.includes("https")) {
					this.user.foto = fotoSession;
					return false;
				}
				if (!this.user.foto.includes("https"))
					this.user.foto =
						"http://localhost:9001/images/personas/" + this.user.foto;
				this.setImgFallBack();
			},
			setImgFallBack() {
				$(".fotoUsuario").each(function () {
					$(this)
						.on("load", function () {
							console.log("image loaded correctly");
						})
						.on("error", function () {
							console.log("error loading image");

							$(this).attr(
								"src",
								require("@/assets/images/userDefaultChico.png")
							);
						});
				});
			},
			toastr(msg, title) {
				this.$refs.toast.emitToast(msg, title);
			},
		},
		computed: {},
	};
</script>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600;700;800&display=swap");

	#header {
		background-color: #1f91b6;
		min-height: 200px;
		max-height: 200px;
	}

	#headerHome {
		background-color: transparent;
		min-height: 200px;
		max-height: 200px;
		z-index: 2;
	}

	#foto {
		border-radius: 50%;
	}

	#logout {
		display: none;
	}

	.items {
		display: flex;
		align-items: center;
		color: #ffffff;
	}

	.items > * {
		margin: 15px;
		color: #ffffff;
	}

	.menuLateral {
		display: none;
	}

	.itemsEmpleado {
		margin-right: 150px;
	}

	.navbar-dark .navbar-nav .nav-link {
		color: rgba(255, 255, 255, 1);
		font-size: 12pt;
		font-weight: 700;
	}

	.botonImagenHeader {
		width: 30px;
		margin-right: 5px;
		height: 30px;
	}

	#brandImg {
		margin-top: 10px;
		width: 150px;
	}

	#logoContainer {
		width: auto;
		margin-left: 0px;
		min-height: 100px;
		float: left;
	}

	.hamburguer > * {
		font-family: "Baloo Bhaina 2";
		font-weight: 700;
		font-size: 13pt;
	}

	.hamburguer #carrito #foto {
		width: 30%;
		padding-inline: 2px;
		height: 30px;
	}

	.centrarHome {
		text-align: center;
	}

	.modal-footer .btn {
		font-family: "Baloo Bhaina 2" !important;
		font-size: 1em;
		width: 2.2em;
		height: 2.2em;
		text-align: center;
		margin-right: 1em;
	}

	.modal-footer .btn-secondary {
		background-color: rgba(255, 255, 255, 0.75);
		color: #e7511e;
	}

	.modal-footer .btn-primary {
		background-color: #e7511e;
		color: rgba(255, 255, 255, 0.75);
	}

	@media (max-width: 1025px) {
	}

	@media screen and (max-width: 769px) {
		#navToggle {
			float: right;
			margin-right: 10px;
		}

		.menuLateral {
			display: block;
		}

		#brandImg {
			margin-top: 0px;
		}

		.hamburguer {
			background-color: #ffffff;
			position: absolute;
			margin-top: 290px;
			width: 250px;
			margin-left: 290px;
			float: right;
			border-radius: 15px;
			-webkit-box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
			-moz-box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
			box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
			text-align: left;
			display: block;
		}
		.hamburguer--home{
			background-color: #ffffff;
			position: absolute;
			margin-top: 50px;
			border-radius: 15px;
			-webkit-box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
			-moz-box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
			box-shadow: 9px 10px 19px -5px rgba(0, 0, 0, 0.33);
			right: 40px;
			margin-left: 20px;
			display: flex;
			flex-direction: column;
			z-index: 10;
			width: 80%;
		}

		.nav-item {
			width: 100%;
			position: relative;
			float: right;
			text-align: left;
			padding-left: 10px;
		}

		.navbar-nav {
			display: inline;
		}

		.navbar-dark .navbar-nav .nav-link {
			color: #151515;
			font-size: 12pt;
			font-weight: 400;
			width: 90%;
			padding-left: 20px;
		}

		.navbar-dark .navbar-nav .nav-link:focus,
		.navbar-dark .navbar-nav .nav-link:hover {
			color: #e7511e;
		}

		.navbar-dark .navbar-nav .active > .nav-link,
		.navbar-dark .navbar-nav .nav-link.active,
		.navbar-dark .navbar-nav .nav-link.show,
		.navbar-dark .navbar-nav .show > .nav-link {
			color: #e7511e;
		}

		.items > * {
			margin: 5px;
		}

		.col-sm-9 {
			flex: 0 0 50%;
			float: right;
			right: 0;
		}

		.itemsEmpleado {
			margin-right: 0px;
		}
	}

	@media (max-width: 560px) {
		#logout {
			display: block;
		}

		.hamburguer {
			margin-left: 150px;
		}
	}

	@media (max-width: 426px) {
		#logout {
			display: block;
		}

		.hamburguer {
			margin-left: 100px;
		}
	}

	@media (max-width: 375px) {
		#logout {
			display: block;
		}

		.hamburguer {
			margin-left: 50px;
		}
	}

	@media (max-width: 320px) {
	}
</style>
