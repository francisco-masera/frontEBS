<template>
	<div>
		<b-card
			:title="producto.denominacion"
			:img-src="img"
			img-fluid
			tag="article"
			class="mb-2"
			style="width: 38.5vw"
			img-height="400"
			id="cardP"
		>
			<div class="row">
				<div class="col-8">
					<b-card-text>
						{{ producto.descripcion }}
					</b-card-text>
				</div>
				<div class="col-4">
					<div class="row mb-3">
						<b-img
							v-if="producto.aptoCeliaco"
							:src="require('../assets/images/sinTacc.png')"
						/>
						<b-img
							v-if="producto.vegetariano || producto.vegano"
							:src="require('../assets/images/vegetariano.png')"
							style="margin-left: 30px"
						/>
					</div>
				</div>
			</div>
			<div class="row mb-3">
				<div class="col-8">
					<b-form-select
						v-model="cantidad"
						:options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
						style="width: 65px"
						@change="actualizarPrecio"
					></b-form-select>
				</div>
				<div class="col-4 mt-2">
					<h3>${{ producto.precioVenta }}</h3>
				</div>
			</div>
			<b-button variant="primary" @click="agregarAlCarrito"
				>¡Agregar a mi pedido! ({{ precioVenta }})</b-button
			>
		</b-card>
		<Toast ref="toast" />
	</div>
</template>

<script>
	import Service from "@/service/Service.js";
	import $ from "jquery";
	import Toast from "@/components/Toast.vue";
	export default {
		data() {
			return {
				cantidad: 1,
				service: new Service(),
				producto: {},

				precioVenta: 0,
				img: "",
			};
		},
		props: ["id"],
		mounted() {
			this.getProducto();
		},
		updated() {
			this.setImgFallBack();
		},
		components: {
			Toast: Toast,
		},
		methods: {
			async getProducto() {
				await this.service
					.getOne("informacionArticulo/getDetalle", this.$props.id)
					.then((data) => {
						this.producto = data;
						this.precioVenta = "$" + data.precioVenta;
						this.img = "http://localhost:9001/images/productos/" + data.imagen;
					})
					.catch((e) => console.log(e.response.data.message));
			},
			actualizarPrecio(e) {
				this.cantidad = e;
				this.precioVenta = "$" + e * this.producto.precioVenta;
				console.log(this.cantidad);
			},
			agregarAlCarrito() {
				var usuario = JSON.parse(sessionStorage.getItem("user"));
				if (usuario == null || usuario == undefined) {
					this.toastr(
						"Debe estar registrado para realizar esta acción",
						"¡Atención!"
					);
					return false;
				}
				let producto = {
					cantidad: this.cantidad,
					idArticuloVenta: this.producto.idArticuloVenta,
					denominacion: this.producto.denominacion,
					precioVenta: this.producto.precioVenta,
					idPedido: 0,
				};
				this.$store.dispatch("addItemCarrito", producto);
				this.$store.dispatch("setSubtotal");
				this.$store.dispatch("setTotal");
				this.$store.dispatch("setCarritoKey");
				this.$emit("close");
			},
			setImgFallBack() {
				$("#cardP")
					.find("img:first")
					.on("load", () => {
						console.log("image loaded correctly");
					})
					.on("error", () => {
						console.log("error loading image");

						this.img = "";
					});
			},
			toastr(msg, title) {
				this.$refs.toast.emitToast(msg, title);
			},
		},
	};
</script>

<style scoped>
	.form-control {
		margin-bottom: 20px;
	}
</style>