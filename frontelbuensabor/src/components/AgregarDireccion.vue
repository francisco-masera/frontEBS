<template>
	<div>
		<h5>Agregar Dirección</h5>
		<div class="container-fluid">
			<div class="row mb-4">
				<div class="col-lg-12 mb-4 mt-2">
					<label>Ubicación</label>
					<GmapAutocomplete
						class="form-control d-flex autocomplete w-50 mb-3"
						@place_changed="setAddress"
						ref="gMap"
					></GmapAutocomplete>
					<b-check @change="toggleDepto" class="mb-3"
						>¿Es Departamento?</b-check
					>
					<div v-show="this.esDepto">
						<input
							type="text"
							class="form-control d-flex autocomplete w-50 mb-3"
							id="depto"
							ref="depto"
							placeholder="Departamento"
						/>

						<input
							type="numer"
							class="form-control d-flex autocomplete w-50 mb-3"
							id="piso"
							ref="piso"
							placeholder="Piso"
						/>
					</div>
				</div>
			</div>
			<button
				class="btn boton btn-secondary btn-md rounded-pill"
				@click="setDomicilio()"
			>
				Guardar
			</button>
			<button
				class="btn boton2 btn-secondary btn-md rounded-pill"
				@click="ocultar"
			>
				Cancelar
			</button>
		</div>
		<Toast ref="toast" />
	</div>
</template>

<script>
	import Toast from "@/components/Toast.vue";
	import Service from "@/service/Service.js";
	export default {
		components: {
			Toast: Toast,
		},
		data() {
			return {
				service: new Service(),
				locationSelected: null,
				coordenadas: null,
				esDepto: false,
			};
		},
		props: ["idEdicion"],
		methods: {
			toggleDepto(e) {
				this.esDepto = e;
			},
			toastr(msg, title) {
				this.$refs.toast.emitToast(msg, title);
			},
			ocultar() {
				this.$emit("visible", false);
			},
			setAddress(coord) {
				var latLng = coord.geometry.location;
				this.coordenadas = { lat: latLng.lat(), lng: latLng.lng() };
				this.locationSelected = coord;
			},
			setDomicilio() {
				var domicilio = {};

				if (this.locationSelected == null || this.locationSelected == undefined) {
					this.toastr("Debe elegir una ubicación", "Error: ");
					return false;
				}

				var contador = 0;
				var calle = "";
				var localidad = "";

				for (const key in this.locationSelected.address_components) {
					if (contador == 2) break;
					if (
						Object.hasOwnProperty.call(
							this.locationSelected.address_components,
							key
						)
					) {
						const element = this.locationSelected.address_components[key];
						console.log(key);
						console.log(element);
						if (element.types[0] == "administrative_area_level_1") {
							if (element.types[0].toUpperCase() != "MENDOZA") {
								this.toastr(
									"Su ubicación es inválida. Debe estar ubicada en la proincia de Mendoza.",
									"Error: "
								);
								return false;
							}
						}
						if (element.types[0] == "route") {
							contador++;
							calle = element.long_name;
						}
						if (element.types[0] == "neighborhood") {
							contador++;
							localidad = element.long_name;
						}
					}
				}
				if (contador < 2) {
					this.toastr(
						"Su ubicación es inválida. Debe contener al menos calle y ciudad.",
						"Error: "
					);
					contador = 0;
					return false;
				}
				if (
					this.esDepto &&
					(this.$refs.piso.value == undefined || this.$refs.piso.value == "")
				) {
					this.toastr("Debe ingresar un piso", "Error: ");
					return false;
				}
				if (
					this.esDepto &&
					(this.$refs.depto.value == undefined || this.$refs.depto.value == "")
				) {
					this.toastr("Debe ingresar un departamento", "Error: ");
					return false;
				}
				var numero;
				var tieneNumero = false;
				for (const key in this.locationSelected.address_components) {
					if (
						Object.hasOwnProperty.call(
							this.locationSelected.address_components,
							key
						)
					) {
						const element = this.locationSelected.address_components[key];
						console.log(key);
						console.log(element);
						if (element.types[0] == "street_number") {
							tieneNumero = true;
							numero = element.long_name;
							break;
						}
					}
				}
				if (!tieneNumero) {
					this.toastr(
						"Su ubicación es inválida. La calle debe contener el número.",
						"Error: "
					);
					return false;
				}
				domicilio.baja = false;
				domicilio.localidad = localidad;
				domicilio.calle = calle;
				domicilio.latitud = this.coordenadas.lat;
				domicilio.longitud = this.coordenadas.lng;
				domicilio.numero = numero;
				domicilio.departamento =
					!this.esDepto || this.$refs.depto.value == undefined
						? ""
						: this.$refs.depto.value;
				domicilio.piso =
					!this.esDepto || this.$refs.piso.value == undefined
						? 0
						: this.$refs.piso.value;
				domicilio.idPersona = 0;
				domicilio.persona = {
					type: "Cliente",
					id: 0,
				};
				if (this.idEdicion != undefined && this.idEdicion != null)
					domicilio.id = this.idEdicion;
				this.guardarDomicilio(domicilio);
			},

			async guardarDomicilio(domicilio) {
				var idUsuario = JSON.parse(sessionStorage.getItem("user")).id;
				if (idUsuario != null && idUsuario != undefined) {
					domicilio.persona.id = idUsuario;
					domicilio.idPersona = idUsuario;
					await this.service
						.save("domicilio", domicilio)
						.then((d) => {
							if (d == undefined) {
								this.toastr("No se pudo insertar el domicilio", "Error: ");
								return false;
							}
							console.log(d);
							this.toastr("Domicilio agregado con éxito.");
							this.$emit("agregado", true);
							this.locationSelected = null;
							this.coordenadas = null;
						})
						.catch((e) => {
							this.toastr(e.response.data.message, "Error: ");
						});
				}
			},
		},
	};
</script>

<style>
</style>