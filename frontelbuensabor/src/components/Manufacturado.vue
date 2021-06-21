<template>
	<b-card class="tarjeta">
		<b-container>
			<b-card-img
				style="height: auto; max-height: 180px"
				class="imagen img-fluid"
				:src="
					'http://localhost:9001/images/productos/' + manufacturadoParam.imagen
				"
			/>
			<strong v-if="manufacturadoParam.type != 'InformacionInsumoVenta'">
				{{ manufacturadoParam.denominacion }}</strong
			>
			<strong v-else>{{ manufacturadoParam.insumo.denominacion }}</strong>
		</b-container>
		<b-container style="text-align: left">
			<b-card-text>
				{{ manufacturadoParam.descripcion }}
			</b-card-text>
			<b-card-text class="precio" style="float: right">
				{{ manufacturadoParam.precioVenta | formatCurrency }}
			</b-card-text>
		</b-container>
	</b-card>
</template>

<script>
	export default {
		props: ["manufacturadoParam"],
	};
</script>

<style>
	.tarjeta {
		background-color: transparent;
		border: none;
	}
	.tarjeta .imagen {
		margin-bottom: 15px;
	}
	.precio {
		font-size: 16pt;
		font-weight: 600;
		text-align: right;
	}
</style>
