<template></template>

<script>
	import Service from "@/service/Service.js";
	export default {
		data() {
			return {
				service: new Service(),
			};
		},
		updated() {
			console.log(this.$props.generar);
			if (this.$props.generar) {
				this.save();
			}
		},
		components: {},
		props: ["cliente", "detalles", "verFactura", "factura", "generar"],
		methods: {},
		computed: {},
	};
</script>

