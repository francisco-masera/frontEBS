<template>
	<!-- 	<b-table-lite :items="items" :fields="tbody" id="tablaCarrito" borderless>
		<template v-slot:cell(denominacion)="row">
			{{ row.item.denominacion }}
		</template>
		<template v-slot:cell(precioVenta)="row" class="col-sm-2">
			{{ row.item.precioVenta | formatCurrency }}
		</template>
		<template v-slot:cell(eliminar)="row">
			<b-btn
				@click="delItem(row.item.idArticuloVenta)"
				:id="row.item.idPedido"
				style="background: transparent; border-color: transparent"
			>
				<b-img-lazy
					class=""
					width="25%"
					:src="require('../assets/images/eliminar.png')"
				></b-img-lazy>
			</b-btn>
		</template>
	</b-table-lite> -->
	<div class="container-fluid">
		<div class="row filaItems" v-for="(item, key) in items" :key="key">
			<div class="col col-md-1 col-lg-1 cantidad">
				{{ item.cantidad }}
			</div>
			<div class="col col-md-6 col-lg-5 denominacion">
				{{ item.denominacion }}
			</div>
			<div class="col col-md-4 col-lg-2 offset-2 precioVenta">
				{{ item.precioVenta | formatCurrency }}
			</div>
			<div class="col col-md-1 col-lg-1 btn-del" style="margin-top: -10px">
				<b-btn
					@click="delItem(item.idArticuloVenta)"
					:id="item.idPedido"
					style="background: transparent; border-color: transparent"
				>
					<b-img-lazy
						class=""
						width="25%"
						:src="require('../assets/images/eliminar.png')"
					></b-img-lazy>
				</b-btn>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tbody: [
					{ key: "cantidad", label: "", class: "info" },
					{ key: "denominacion", label: "", class: "info denominacion" },
					{ key: "x", label: "" },
					{ key: "precioVenta", label: "", class: "info" },
					{ key: "eliminar", label: "", class: "btn-Act" },
				],
			};
		},
		methods: {
			delItem(idArticuloVenta) {
				this.$store.dispatch("delItem", idArticuloVenta);
				this.$store.dispatch("setSubtotal");
				this.$store.dispatch("setTotal");
				this.$store.dispatch("setCarritoKey");
			},
		},
		props: ["items"],
	};
</script>

<style >
	#tablaCarrito thead {
		display: none;
	}
	.table td,
	.table th {
		padding: 0.3rem;
		vertical-align: middle;
	}
	.info {
		font-size: 1.1em;
	}
	.btn-Act {
		padding: 0;
	}
	@media screen and (max-width: 1900px) {
	}
	@media screen and (max-width: 1024px) {
		.info {
			font-size: 0.9em;
		}
		.filaItems {
			flex-wrap: nowrap;
		}
	}
	@media screen and (max-width: 774px) {
		.info {
			font-size: 0.9em;
		}
		.filaItems {
			flex-wrap: nowrap;
		}
		.cantidad {
			margin-left: -10px;
			width: fit-content;
			margin-right: -42px;
			padding-right: 9px;
		}
		.denominacion {
			margin-right: 13px;
			margin-left: -24px;
			width: 35vw;
			width: max-content;
			padding-right: 0;
		}
		.precioVenta {
			margin-right: -10px;
			width: 25vw;
			padding-left: 0;
		}
	}
</style>