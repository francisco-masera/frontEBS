<template>
	<div class="container">
		<div class="row fila-detalle">
			<div class="col col-6">
				<span
					>{{ this.$props.item.cantidad }}
					{{ this.$props.item.denominacion }}</span
				>
			</div>
			x
			<div class="col col-3">
				<span>{{ this.$props.item.precioVenta }}</span>
			</div>
			<div class="col col-2">
				<span>
					<b-img
						style="width: 1.7em"
						src="http://localhost:9001/images/sistema/eliminar.png"
					></b-img>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	//import Formatter from "@/utilidades/Formatters.js";
	export default {
		/* data() {
				formatter: new Formatter();
			}, */
		props: ["item"],
	};
</script>

<style>
</style>