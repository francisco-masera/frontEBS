<template >
	<div></div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {};
		},

		mounted() {
			this.onLoad();
		},
		methods: {
			onLoad() {
				switch (this.$props.type) {
					case "a":
						break;
					case "b":
						break;
					case "c":
						break;
					case "d":
						this.reporteStock();
						break;
				}
			},
		},
		computed: {
			records() {
				return this.$props.data;
			},
			fields() {
				return this.dataFields;
			},
		},
	};
</script>

<style>
</style>