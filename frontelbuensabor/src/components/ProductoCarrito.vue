<template>
	<b-table-lite
		:items="items"
		:fields="tbody"
		id="tablaCarrito"
		responsive="md"
		borderless
		fluid
	>
		<template v-slot:cell(precioVenta)="row">
			{{ row.item.precioVenta | formatCurrency }}
		</template>
		<template v-slot:cell(eliminar)="row">
			<b-btn
				@click="delItem(row.item)"
				:id="row.item.idPedido"
				style="background: transparent; border-color: transparent"
			>
				<b-img-lazy
					class=""
					width="25%"
					src="http://localhost:9001/images/sistema/eliminar.png"
				></b-img-lazy>
			</b-btn>
		</template>
	</b-table-lite>
</template>

<script>
	export default {
		data() {
			return {
				tbody: [
					{ key: "cantidad", label: "" },
					{ key: "denominacion", label: "", class: "denominacion" },
					{ key: "x", label: "" },
					{ key: "precioVenta", label: "" },
					{ key: "eliminar", label: "" },
				],
			};
		},
		methods: {
			delItem(item) {
				console.log("del");
				debugger;
				this.$store.dispatch("delItem", {
					idArticuloVenta: item.idArticuloVenta,
					idPedido: item.idPedido,
				});
				this.$store.dispatch("setSubtotal");
			},
		},
		props: ["items"],
	};
</script>

<style>
	.fila-detalle {
		line-height: 2.5em;
	}
	.fila-detalle .col {
		display: ruby;
	}
	.fila-detalle {
		display: inline-block;
	}
	#tablaCarrito thead {
		display: none;
	}
	.table td,
	.table th {
		padding: 0.3rem;
	}
</style>