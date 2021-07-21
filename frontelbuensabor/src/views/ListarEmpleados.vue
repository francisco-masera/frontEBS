<template>
	<div>
		<cabecera></cabecera>
		<div id="nav">
			<menuLateral></menuLateral>
		</div>
		<div class="costado"></div>
		<b-container class="informacion">
			<b-table
				hover
				responsive="sm"
				fixed
				:fields="camposTabla"
				:outlined="true"
				:borderless="true"
				:items="empleados"
			>
				<template v-slot:cell(foto)="row">
					<b-form-group>
						<img
							:src="'http://localhost:9001/images/personas/' + row.item.foto"
							alt=""
							width="70"
							class="img-thumbnail"
						/>
					</b-form-group>
				</template>
				<template v-slot:cell(empleado)="row">
					<b-form-group>
						<span>{{ row.item.nombre + " " + row.item.apellido }}</span>
					</b-form-group>
				</template>
				<template v-slot:cell(accionModificar)="row">
					<b-form-group>
						<button
							class="botonImagen"
							size="sm"
							@click="openModal(row.item.id)"
						>
							<img
								:src="require('@/assets/images/editar.png')"
								id="imagenAgregar"
							/>
						</button>
					</b-form-group>
				</template>
				<template v-slot:cell(accionEliminar)="row">
					<b-form-group>
						<button
							class="botonImagen"
							size="sm"
							@click="openModalEliminar(row.item.id)"
						>
							<img
								:src="require('@/assets/images/eliminar.png')"
								id="imagenAgregar"
							/>
						</button>
					</b-form-group>
				</template>
			</b-table>
		</b-container>
		<b-modal
			id="modal"
			ref="modal"
			:title="
				'Cambiar contraseña de ' + empleado.nombre + ' ' + empleado.apellido
			"
			@hidden="resetModalPass"
			@ok="handlePassOk"
			cancel-title="NO"
		>
			<form ref="formPass" @submit.stop.prevent="handlePass">
				<b-form-group
					label-for="pass1-input"
					invalid-feedback="Campo obligatorio"
					:state="contraseniaNuevaState"
				>
					<b-form-input
						id="token-input"
						type="password"
						v-model="contraseniaNueva"
						:state="contraseniaNuevaState"
						required
						placeholder="Ingrese la nueva contraseña"
					></b-form-input>
				</b-form-group>
				<b-form-group
					label-for="token-input"
					invalid-feedback="Campo obligatorio"
					:state="contraseniaNueva2State"
				>
					<b-form-input
						type="password"
						id="token-input"
						v-model="contraseniaNueva2"
						:state="contraseniaNueva2State"
						required
						placeholder="Repita la nueva contraseña"
					></b-form-input>
				</b-form-group>
			</form>
		</b-modal>
		<b-modal ref="modalEliminar" hide-footer centered title hide-header>
			<p class="modalTitulo">Empleado eliminado</p>
		</b-modal>
		<b-modal ref="modalDelError" hide-footer centered title hide-header>
			<p class="modalTitulo">Error al eliminar el empleado</p>
		</b-modal>
	</div>
</template>


<script>
	import MenuLateral from "@/components/MenuLateral.vue";
	import Header from "@/components/Header.vue";
	import Service from "@/service/Service.js";

	export default {
		components: {
			menuLateral: MenuLateral,
			cabecera: Header,
		},
		data() {
			return {
				empleados: [],
				service: new Service(),
				camposTabla: [
					{ key: "foto", label: "" },
					{ key: "empleado", label: "Empleado" },
					{ key: "rol", label: "Rol" },
					{ key: "accionModificar", label: "Contraseña" },
					{ key: "accionEliminar", label: "Eliminar" },
				],
				contraseniaNueva: "",
				contraseniaNueva2: "",
				contraseniaNuevaState: null,
				contraseniaNueva2State: null,
				empleado: {},
			};
		},
		mounted() {
			this.getEmpleados();
		},
		methods: {
			async getEmpleados() {
				this.service.getAll("empleado").then((d) => {
					this.empleados = d.filter(
						(empleado) => empleado.rol != "admin" && empleado.baja == false
					);
				});
			},

			openModal(id) {
				this.empleado = this.empleados.find((e) => e.id == id);
				this.$bvModal.show("modal");
			},
			async openModalEliminar(id) {
				var resultado;
				await this.service.delete("empleado", id).then((data) => {
					resultado = data;
					if (!resultado) {
						this.$refs.modalEliminar.show();
						setTimeout(() => this.refrescaPantalla(), 800);
					} else {
						this.$refs.modalDelError.show();
					}
				});
			},
			refrescaPantalla() {
				window.location.href = "/listarEmpleados/";
			},
			checkPassFormValidity() {
				if (this.contraseniaNueva != this.contraseniaNueva2) {
					this.toast("¡Atención!", "Las contraseñas deben ser iguales");
					return false;
				}
				const valid = this.$refs.formPass.checkValidity();
				this.emailState = valid;
				this.tokenState = valid;
				this.contraseniaNuevaState = valid;
				this.contraseniaNueva2State = valid;

				return valid;
			},
			resetModalPass() {
				this.contraseniaNueva = "";
				this.contraseniaNuevaState = null;
				this.contraseniaNueva2 = "";
				this.contraseniaNueva2State = null;
			},
			handlePassOk(bvModalEvt) {
				bvModalEvt.preventDefault();
				this.handlePass();
			},
			async handlePass() {
				if (!this.checkPassFormValidity()) {
					return false;
				}
				var empleado = this.empleado;
				empleado.contrasenia = this.contraseniaNueva;
				empleado.type = "Empleado";
				await this.service
					.update("empleado", empleado, empleado.id)
					.then((data) => {
						this.user = data;
						this.$refs.modalCambioPass.hide();
						this.$bvToast.show("toast-eliminar-exito");
					})
					.catch(() => {
						this.$bvToast.show("toast-error-sistema");
					});
				this.$nextTick(() => {
					this.$bvModal.hide("modal");
				});
			},
		},
	};
</script>

<style>
	footer .btn {
		padding: 0;
	}
	.modalTitulo {
		margin-top: 7%;
		text-align: center;
		font-size: 25px;
	}
</style>