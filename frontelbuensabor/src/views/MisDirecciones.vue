<template>
	<div>
		<cabecera></cabecera>
		<div id="nav"><menuLateral></menuLateral></div>
		<div class="costado"></div>
		<b-container class="informacion">
			<h3 class="mb-4">Mis Direcciones</h3>
			<div v-if="direcciones.length" class="row">
				<div class="col-12 mb-5">
					<b-card class="tarjeta mb-2" v-for="d in direcciones" :key="d.id">
						{{ d.calle }} {{ d.numero }}, {{ d.localidad }}
						<b-button size="sm" class="botonImagen" @click="editarDir(d.id)">
							<img
								src="images/editar.png"
								alt=""
								id="btnEditar"
								width="20"
							/>
						</b-button>
						<b-button size="sm" class="botonImagen" @click="eliminarDir(d.id)">
							<img
								src="images/eliminar.png"
								alt=""
								id="btnEliminar"
								width="20"
							/>
						</b-button>

						<hr style="width: 40%; margin: 0; height: 10px;border" />
					</b-card>
					<button
						v-if="!agregar"
						@click="toggleAgregar"
						style="width: max-content; margin-left: 42%"
						class="btn boton btn-secondary btn-md rounded-pill"
					>
						Agregar
					</button>
				</div>
				<div class="col-12">
					<AgregarDireccion
						v-if="agregar"
						@visible="toggleAgregar"
						@agregado="getDireccionesById"
						:idEdicion="idEdicion"
					/>
				</div>
			</div>
			<div style="margin-top: 10%" v-else>
				<div v-if="!agregar">
					<h4 class="text-center">Aún no tienes direcciones agregadas</h4>
					<button
						@click="toggleAgregar(true)"
						style="width: max-content; margin-left: 42%"
						class="btn boton btn-secondary btn-md rounded-pill"
					>
						Agregar Domicilio
					</button>
				</div>

				<AgregarDireccion
					v-else
					@visible="toggleAgregar"
					@agregado="getDireccionesById"
				/>
			</div>
		</b-container>
	</div>
</template>

<script>
	import MenuLateral from "@/components/MenuLateral.vue";
	import Header from "@/components/Header.vue";
	import Service from "@/service/Service.js";
	import AgregarDireccion from "@/components/AgregarDireccion.vue";
	export default {
		components: {
			menuLateral: MenuLateral,
			cabecera: Header,
			AgregarDireccion: AgregarDireccion,
		},
		data() {
			return {
				service: new Service(),
				direcciones: [],
				agregar: false,
				idEdicion: null,
			};
		},
		mounted() {
			this.getDireccionesById();
		},
		methods: {
			async getDireccionesById() {
				var idUsuario = JSON.parse(sessionStorage.getItem("user")).id;
				if (idUsuario != null && idUsuario != undefined) {
					await this.service
						.getAll("domicilio/getByIDPersona/" + idUsuario)
						.then((data) => {
							data.length ? (this.direcciones = data) : "";
							this.toggleAgregar(false);
						})
						.catch(() => {
							this.direcciones = [];
						});
				}
			},
			toggleAgregar(val) {
				this.agregar = val;
			},
			eliminarDir(id) {
				this.$bvModal
					.msgBoxConfirm("Vas a eliminar un domiclio ¿Estás seguro?", {
						buttonSize: "lg",
						size: "md",
						cancelTitle: "NO",
						id: "mEliminar",
					})
					.then((value) => {
						if (value == true) {
							this.service.delete("domicilio", id).then(location.reload());
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			editarDir(id) {
				this.idEdicion = id;
				this.toggleAgregar(true);
			},
		},
	};
</script>

<style>
	#modalEditar footer .btn,
	#mEliminar footer .btn {
		padding: 0;
	}
</style>