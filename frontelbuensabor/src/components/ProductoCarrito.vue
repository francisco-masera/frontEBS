<template>
	<div class="row fila-detalle">
		<div class="col col-6">
			<span>{{ cantidad }} {{ denominacion }}</span>
		</div>
		x
		<div class="col col-3">
			<span>{{ formatter.formatMoney(precioVenta) }}</span>
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
</template>

<script>
	export default {
		props: ["cantidad", "denominacion", "precioVenta"],
	};
</script>

<style>
</style>