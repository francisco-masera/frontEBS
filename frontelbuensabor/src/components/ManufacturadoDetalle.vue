<template>
	<b-card
		:title="this.producto.denominacion"
		img-src="https://picsum.photos/600/300/?image=25"
		img-alt="plato"
		img-fluid
		tag="article"
		class="mb-2"
		style="width: 40vw"
	>
		<div class="row">
			<div class="col-8">
				<b-card-text>
					{{ this.producto.descripcion }}
				</b-card-text>
			</div>
			<div class="col-4">
				<div class="row">
					<img
						v-if="producto.aptoCeliaco"
						src="http://localhost:9001/images/sistema/sinTacc.png"
					/>
					<img
						v-if="producto.vegetariano || producto.vegano"
						src="http://localhost:9001/images/sistema/vegetariano.png"
						style="margin-left: 30px"
					/>
				</div>
			</div>
		</div>
		<b-select
			:options="adicionales"
			v-if="hayAdicionales"
			multiple
			:select-size="3"
			style="width: 23vw"
		>
		</b-select>
		<p></p>
		<b-input
			placeholder="Aclaraciones del pedido"
			style="width: 23vw; border: none; border-bottom: 1px solid black"
		/>
		<p></p>
		<div class="row">
			<div class="col-8">
				<b-form-select
					v-model="cantidad"
					:options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
					style="width: 65px"
					@change="actualizarPrecio"
				></b-form-select>
			</div>
			<div class="col-4">
				<h3>${{ producto.precioVenta }}</h3>
			</div>
		</div>

		<p></p>
		<b-button variant="primary" @click="agregarAlCarrito"
			>¡Agregar a mi pedido! ({{ precioVenta }})</b-button
		>
	</b-card>
</template>

<script>
	import Service from "@/service/Service.js";
	export default {
		data() {
			return {
				cantidad: 1,
				service: new Service(),
				producto: {},
				adicionalesId: [],
				hayAdicionales: false,
				precioVenta: 0,
			};
		},
		computed: {
			adicionales() {
				return ["Adicionales"];
			},
		},
		props: ["id"],
		mounted() {
			this.getProducto().then(this.getAdicionales());
		},
		updated() {
			if (this.producto.esInsumo == false)
				if (this.adicionales.length) this.hayAdicionales = true;
		},
		methods: {
			async getProducto() {
				await this.service
					.getOne("informacionArticulo/getDetalle", this.$props.id)
					.then((data) => {
						this.producto = data;
						this.precioVenta = "$" + data.precioVenta;
					})
					.catch((e) => console.log(e.response.data.message));
			},
			async getAdicionales() {
				await this.service
					.getAll("insumo/getAdicionales")
					.then((data) => {
						data.forEach((d) => this.adicionales.push(d.denominacion));
					})
					.then(() => {})
					.catch((e) => {
						console.log(e.response.data.message);
						this.adicionales = null;
					});
			},
			actualizarPrecio(e) {
				this.cantidad = e;
				this.precioVenta = "$" + e * this.producto.precioVenta;
				console.log(this.cantidad);
			},
			agregarAlCarrito() {
				let producto = {
					cantidad: this.cantidad,
					idArticuloVenta: this.producto.idArticuloVenta,
					denominacion: this.producto.denominacion,
					precioVenta: this.producto.precioVenta,
				};
				this.$store.dispatch("addItemCarrito", producto);
				this.$emit("close");
			},
		},
	};
</script>

<style>
</style>