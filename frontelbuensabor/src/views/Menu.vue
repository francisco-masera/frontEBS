<template>
	<div id="principal">
		<cabecera :es-home="undefined" />
		<div id="nav">
			<menu-lateral v-if="esSesion" />
		</div>
		<div class="costado" v-if="esSesion"></div>
		<div class="menuDiv">
			<h3 style="margin-left: 20%">Nuestros Platos</h3>
			<div id="filtros">
				<div style="float: right">
					<b-button class="botonImagen" @click="filtrarCategoria(0, 1)">
						<b-img width="30px" :src="require('@/assets/images/pizza.svg')" />
					</b-button>
					<b-button class="botonImagen" @click="filtrarCategoria(0, 2)">
						<b-img width="30px" :src="require('@/assets/images/lomo.svg')" />
					</b-button>
					<b-button class="botonImagen" @click="filtrarCategoria(0, 3)">
						<b-img
							width="30px"
							:src="require('@/assets/images/hamburger.svg')"
						/>
					</b-button>
					<b-button class="botonImagen" @click="filtrarCategoria(0, 4)">
						<b-img
							width="30px"
							:src="require('@/assets/images/papasFritas.svg')"
						/>
					</b-button>

					<b-button class="botonImagen" @click="filtrarCategoria(0, 5)">
						<b-img
							width="30px"
							:src="require('@/assets/images/sandwich.svg')"
						/>
					</b-button>
					<b-button class="botonImagen" @click="filtrarCategoria(1, 1)">
						<b-img width="30px" :src="require('@/assets/images/botella.svg')"
					/></b-button>
					<b-button class="botonImagen" @click="filtrarCategoria(0, 6)">
						<b-img width="30px" :src="require('@/assets/images/cupcake.svg')" />
					</b-button>
				</div>
				<b-nav-form class="buscador">
					<b-form-input
						@keyup="filtrarPorTexto"
						style="width: 300px"
						size="sm"
						id="buscadorInput"
						class="mr-sm-2"
						placeholder="¿De qué tenés ganas hoy?"
					>
						></b-form-input
					>
				</b-nav-form>

				<div id="especiales" style="padding-top: 5px">
					<div id="celiaco" style="float: left; width: 130px">
						<b-button class="botonImagen" @click="filtrarCategoria(2, 1)">
							<img
								width="30px"
								:src="require('@/assets/images/sinTacc.png')"
								style="float: left; margin-right: 8px"
							/>
						</b-button>
						<span style="font-size: 14px; font-family: 'Baloo Bhaina 2'">
							SIN T.A.C.C.
						</span>
					</div>
					<div id="vegano" style="display: inline-block; width: 150px">
						<b-button class="botonImagen" @click="filtrarCategoria(2, 2)">
							<img
								width="30px"
								:src="require('@/assets/images/vegetariano.png')"
								style="float: left; margin-right: 8px"
							/>
						</b-button>
						<span style="font-size: 14px; font-family: 'Baloo Bhaina 2'"
							>VEGETARIANO</span
						>
					</div>
				</div>
			</div>
			<div class="platos">
				<b-card-group deck class="deckPlatos">
					<div
						class="contenedorTarjeta"
						v-for="producto in this.productos"
						:key="producto.id"
						@click="verDetalle"
						:id="producto.id"
					>
						<producto :manufacturadoParam="producto" class="tarjetaPlato" />
					</div>
				</b-card-group>
			</div>
			<Loader v-if="loading" :loading="loading" />
			<b-modal id="modalDetalle" hide-header hide-footer>
				<ManufacturadoDetalle :id="platoElegido" @close="closeModal" />
			</b-modal>
		</div>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	import Service from "@/service/Service.js";
	import Producto from "@/components/Manufacturado.vue";
	import axios from "axios";
	import Loader from "@/components/Loader.vue";
	import MenuLateral from "@/components/MenuLateral.vue";
	import ManufacturadoDetalle from "@/components/ManufacturadoDetalle.vue";
	import $ from "jquery";
	export default {
		mounted() {
			if (this.parametroBusqueda && this.parametroBusqueda != "") {
				this.filtrarPorTexto();
			} else {
				this.getAllProductos();
			}
		},
		updated() {
			this.loading = false;
		},
		components: {
			cabecera: Header,
			producto: Producto,
			"menu-lateral": MenuLateral,
			Loader: Loader,
			ManufacturadoDetalle: ManufacturadoDetalle,
		},
		data() {
			return {
				loading: false,
				esSesion:
					JSON.parse(sessionStorage.getItem("user")) !== undefined &&
					JSON.parse(sessionStorage.getItem("user")) !== null,
				service: new Service(),
				productos: [],
				timeout: null,
				platoElegido: 0,
				parametroBusqueda: "",
				estaFiltrado: false,
			};
		},

		methods: {
			verDetalle(e) {
				var usuario = JSON.parse(sessionStorage.getItem("user"));
				if (usuario != undefined && usuario != null) {
					if (usuario.type.toUpperCase() != "CLIENTE") {
						return false;
					}
				}
				var id = $(e.target).closest(".contenedorTarjeta").attr("id");
				this.platoElegido = id;
				this.$bvModal.show("modalDetalle");
			},
			getAllProductos() {
				this.loading = true;
				this.service
					.getAll("informacionArticulo/conStock")
					.then((r) => r.forEach((d) => this.productos.push(d)))
					.then(() => (this.loading = false));
			},
			filtrarCategoria(tipo, categoria) {
				this.productos = [];
				axios
					.post(
						"http://localhost:9001/buensabor/informacionArticulo/articulosByCategoria/",
						null,
						{ params: { tipo: tipo, categoria: categoria } }
					)
					.then((r) => (this.productos = r.data));
			},
			filtrarPorTexto() {
				var terminos;
				if (!this.parametroBusqueda) {
					terminos = document.getElementById("buscadorInput").value;
				} else {
					terminos = this.parametroBusqueda;
				}

				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.productos = [];
					if (terminos != "")
						axios
							.post(
								"http://localhost:9001/buensabor/informacionArticulo/filtrados/",
								null,
								{ params: { terminos: terminos } }
							)
							.then((r) => (this.productos = r.data));
					else this.getAllProductos();
				}, 800);
			},
			limpiarFiltro() {
				this.estaFiltrado = false;
				this.$router.push({ path: "/menu", query: {} });
			},
			closeModal() {
				this.$bvModal.hide("modalDetalle");
			},
		},
		watch: {
			"$route.query.search": {
				immediate: true,
				handler(search) {
					this.parametroBusqueda = search;
				},
			},
		},
	};
</script>

<style>
	.tarjetaPlato {
		width: 100%;
		float: left;
	}

	#filtros {
		padding-bottom: 80px;
		display: inline-block;
		margin-left: 20%;
	}

	.platos {
		margin-left: 15%;
	}

	.rounded-circle {
		margin-left: 30px;
	}

	.buscador {
		float: right;
	}

	#imagenBuscar {
		width: 25px;
	}
	.imagenProducto {
		width: 100%;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		object-fit: scale-down;
		margin-bottom: 30px;
	}
	.menuDiv {
		margin-top: 20px;
		margin-left: 15%;
	}
	.contenedorTarjeta:hover {
		cursor: pointer;
	}
	#modalDetalle .modal-body {
		padding: 0 !important;
	}
	#modalDetalle .card-body {
		padding: 1rem;
	}
</style>
