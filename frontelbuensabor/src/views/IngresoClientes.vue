<template>
	<div>
		<cabecera />
		<div class="limiter">
			<div class="container-login100">
				<div class="wrap-login100">
					<b-form id="formRegistro" class="login100-form validate-form">
						<span class="login100-form-title p-b-26 mb-3"> Bienvenido </span>

						<div class="wrap-input100 validate-input">
							<label class="labelForm">Email o Usuario</label>
							<b-form-input
								v-model.trim="cuenta"
								class="input100"
								type="text"
								name="email"
							>
							</b-form-input>

							<span class="error" v-if="submitted && !$v.cuenta.required">
								Debe ingresar su email o usuario.
							</span>
						</div>
						<span class="focus-input100"></span>

						<div class="wrap-input100 validate-input">
							<span class="btn-show-pass">
								<i class="zmdi zmdi-eye"></i>
							</span>
							<label class="labelForm">Contraseña</label>
							<b-form-input
								class="input100"
								type="password"
								name="pass"
								v-model.trim="$v.contrasenia.$model"
							></b-form-input>
							<span class="error" v-if="submitted && !$v.contrasenia.required">
								Debe ingresar su contraseña.
							</span>
						</div>
						<div class="container-login100-form-btn">
							<div class="wrap-login100-form-btn">
								<div class="login100-form-bgbtn"></div>
								<b-button @click="ingreso()" class="login100-form-btn">
									Ingreso
								</b-button>
							</div>
						</div>
						<div id="google">
							<google />
						</div>
						<div class="text-center p-t-115">
							<span class="txt1"> ¿No tienes cuenta? </span>
							<a class="txt2" href="./registro"> ¡Regístrate! </a>
						</div>
					</b-form>
					<div class="text-center p-t-115">
						<span class="txt1">¿Olvidaste tu contraseña?</span>
						<button v-b-modal.modalToken class="btn btn-sm">¡Haz click!</button>
					</div>
				</div>
			</div>
		</div>
		<b-row>
			<b-col class="abajo" xs="12" sm="12" md="12" lg="12" xl="12"></b-col>
		</b-row>
		<Loader v-if="loading" :loading="loading" />
		<b-modal
			id="modalToken"
			ref="modalToken"
			title="Ingrese su email"
			@show="resetModalToken"
			@hidden="resetModalToken"
			@ok="handleTokenOk"
			cancel-title="NO"
		>
			<form ref="formToken" @submit.stop.prevent="handleToken">
				<b-form-group
					label-for="email-input"
					invalid-feedback="Campo obligatorio"
					:state="emailState"
				>
					<b-form-input
						id="email-input"
						v-model="email"
						:state="emailState"
						required
					></b-form-input>
				</b-form-group>
			</form>
		</b-modal>
		<b-modal
			id="modalPassNueva"
			ref="modalPassNueva"
			title="Cambiar contraseña"
			@hidden="resetModalPass"
			@ok="handlePassOk"
			cancel-title="NO"
		>
			<form ref="formPass" @submit.stop.prevent="handlePass">
				<b-form-group
					label-for="email-input"
					invalid-feedback="Campo obligatorio"
					:state="emailState"
				>
					<b-form-input
						readonly
						id="email-input"
						v-model="email"
						:state="emailState"
						required
						placeholder="Ingrese su email"
					></b-form-input>
				</b-form-group>
				<b-form-group
					label-for="token-input"
					invalid-feedback="Campo obligatorio"
					:state="tokenState"
				>
					<b-form-input
						id="token-input"
						v-model="token"
						:state="tokenState"
						required
						placeholder="Ingrese el código enviado por correo"
					></b-form-input>
				</b-form-group>
				<b-form-group
					label-for="pass1-input"
					invalid-feedback="Campo obligatorio"
					:state="contraseniaNuevaState"
				>
					<b-form-input
						id="token-input"
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
						id="token-input"
						v-model="contraseniaNueva2"
						:state="contraseniaNueva2State"
						required
						placeholder="Repita la nueva contraseña"
					></b-form-input>
				</b-form-group>
			</form>
		</b-modal>
	</div>
</template>

<script>
	import Vue from "vue";
	Vue.use(Vuelidate);
	import Vuelidate from "vuelidate";
	import { required } from "vuelidate/lib/validators";
	import Header from "@/components/Header.vue";
	import GoogleSigIn from "@/components/GoogleSignIn";
	import Service from "@/service/Service.js";
	import axios from "axios";
	import Loader from "@/components/Loader";
	import Utils from "@/utilidades/Utils.js";

	export default {
		components: {
			cabecera: Header,
			google: GoogleSigIn,
			Loader: Loader,
		},
		mounted() {
			var esToken =
				this.$route.params.token != "null" && this.$route.params.email != "null";
			if (esToken) {
				var email = this.$route.params.email;
				this.email = email.substring(email.indexOf("=") + 1, email.length);
				this.$refs["modalPassNueva"].show();
			}
			console.log(this.$route.params);
		},
		data() {
			return {
				submitted: false,
				cuenta: "",
				contrasenia: "",
				service: new Service(),
				loading: false,
				utils: new Utils(),
				email: "",
				emailState: null,
				contraseniaNueva: "",
				contraseniaNueva2: "",
				token: "",
				tokenState: null,
				contraseniaNuevaState: null,
				contraseniaNueva2State: null,
			};
		},
		methods: {
			ingreso() {
				this.submitted = true;
				this.$v.$touch();

				if (this.$v.$anyError) {
					setTimeout(() => {
						this.submitted = false;
					}, 5500);
					return;
				}
				var cuenta = this.$v.cuenta.$model;
				var pass = this.$v.contrasenia.$model;

				this.login(cuenta, pass);
			},
			redirect(user) {
				if (!user.baja) {
					sessionStorage.setItem("user", JSON.stringify(user));
					this.$router.push({ name: "Home" });
				} else {
					this.toast("Lo sentimos: ", "Su usuario no está habilitado.");
				}
			},

			toast(title, error) {
				this.$bvToast.toast(error, {
					title: title,
					toaster: "b-toaster-top-center",
					solid: true,
					appendToast: true,
					variant: "info",
				});
			},

			async login(cuenta, pass) {
				this.utils.preventScroll();
				this.loading = !this.loading;
				pass = pass.toString();

				await axios
					.post("http://localhost:9001/buensabor/cliente/login", null, {
						params: {
							cuenta,
							pass,
						},
					})
					.then((data) => {
						console.log(data);

						this.redirect(data.data);
						this.loading = !this.loading;
						this.utils.enableScroll();
					})
					.catch((e) => {
						this.toast("Error", e.response.data.message);
						this.loading = !this.loading;
						this.utils.enableScroll();
					});
			},
			async generarToken() {
				var email = this.email;
				await axios
					.put("http://localhost:9001/buensabor/cliente/generarToken", null, {
						params: { email },
					})
					.then((d) => this.toast("", d.data.msg))
					.catch((e) => this.toast("Error: ", e.response.data.message));
			},
			async recuperarPass() {
				var email = this.email;
				var pass = this.contraseniaNueva;
				var token = this.token;
				await axios
					.put("http://localhost:9001/buensabor/cliente/recuperarPass", null, {
						params: { email, pass, token },
					})
					.then((d) =>
						d.data
							? this.toast(
									"Perfecto",
									"Su contraseña se ha regenerado." +
										" Ingrese nuevamente con los datos suministrados."
							  ) && this.$router.replace({ token: null, email: null })
							: ""
					)
					.catch((e) => this.toast("Error: ", e.response.data.message));
			},
			checkTokenFormValidity() {
				const valid = this.$refs.formToken.checkValidity();
				this.emailState = valid;
				return valid;
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
			resetModalToken() {
				this.email = "";
				this.emailState = null;
			},
			resetModalPass() {
				this.resetModalToken();
				this.token = "";
				this.tokenState = null;
				this.contraseniaNueva = "";
				this.contraseniaNuevaState = null;
				this.contraseniaNueva2 = "";
				this.contraseniaNueva2State = null;
			},
			handleTokenOk(bvModalEvt) {
				bvModalEvt.preventDefault();
				this.handleToken();
			},
			handlePassOk(bvModalEvt) {
				bvModalEvt.preventDefault();
				this.handlePass();
			},
			handlePass() {
				if (!this.checkPassFormValidity()) {
					return false;
				}
				this.recuperarPass();
				this.$nextTick(() => {
					this.$bvModal.hide("modalPassNueva");
				});
			},
			handleToken() {
				if (!this.checkTokenFormValidity()) {
					return false;
				}
				this.generarToken();
				this.$nextTick(() => {
					this.$bvModal.hide("modalToken");
				});
			},
		},
		validations: {
			cuenta: {
				required,
			},
			contrasenia: {
				required,
			},
		},
	};
</script>

<style>
	#modalToken footer .btn,
	#modalPassNueva footer .btn {
		padding: 0;
	}
	.error {
		color: #dc3545;
	}
	.labelForm {
		font-size: 12pt;
	}
	.social {
		width: 75px;
		background: white;
		padding: 10px;
		border-radius: 100%;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	* {
		margin: 0px;
		padding: 0px;
		box-sizing: border-box;
	}

	a {
		font-size: 14px;
		line-height: 1.7;
		color: #666666;
		margin: 0px;
		transition: all 0.4s;
		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
	}

	a:focus {
		outline: none !important;
	}

	a:hover {
		text-decoration: none;
		color: #6a7dfe;
		color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
		color: -o-linear-gradient(left, #21d4fd, #b721ff);
		color: -moz-linear-gradient(left, #21d4fd, #b721ff);
		color: linear-gradient(left, #21d4fd, #b721ff);
	}

	p {
		font-size: 14px;
		line-height: 1.7;
		color: #666666;
		margin: 0px;
	}

	#google {
		margin-top: 5vh;
		margin-bottom: 3vh;
	}

	ul,
	li {
		margin: 0px;
		list-style-type: none;
	}
	.p-t-115 {
		margin-bottom: 0vh;
	}

	input {
		outline: none;
		border: none;
	}

	textarea {
		outline: none;
		border: none;
	}

	textarea:focus,
	input:focus {
		border-color: transparent !important;
	}

	input:focus::-webkit-input-placeholder {
		color: transparent;
	}
	input:focus:-moz-placeholder {
		color: transparent;
	}
	input:focus::-moz-placeholder {
		color: transparent;
	}
	input:focus:-ms-input-placeholder {
		color: transparent;
	}

	textarea:focus::-webkit-input-placeholder {
		color: transparent;
	}
	textarea:focus:-moz-placeholder {
		color: transparent;
	}
	textarea:focus::-moz-placeholder {
		color: transparent;
	}
	textarea:focus:-ms-input-placeholder {
		color: transparent;
	}

	input::-webkit-input-placeholder {
		color: #adadad;
	}
	input:-moz-placeholder {
		color: #adadad;
	}
	input::-moz-placeholder {
		color: #adadad;
	}
	input:-ms-input-placeholder {
		color: #adadad;
	}

	textarea::-webkit-input-placeholder {
		color: #adadad;
	}
	textarea:-moz-placeholder {
		color: #adadad;
	}
	textarea::-moz-placeholder {
		color: #adadad;
	}
	textarea:-ms-input-placeholder {
		color: #adadad;
	}

	iframe {
		border: none !important;
	}

	.txt1 {
		font-size: 13px;
		color: #666666;
		line-height: 1.5;
	}

	.txt2 {
		font-size: 13px;
		color: #333333;
		line-height: 1.5;
	}

	.limiter {
		width: 100%;
		margin: 0 auto;
	}

	.container-login100 {
		width: 100%;
		min-height: 100vh;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		padding: 15px;
		background: #f2f2f2;
	}

	.wrap-login100 {
		width: 390px;
		background: #fff;
		border-radius: 10px;
		overflow: hidden;
		padding: 77px 55px 33px 55px;

		box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
		-moz-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
		-o-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
		-ms-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
	}

	.login100-form {
		width: 100%;
	}

	.login100-form-title {
		display: block;
		font-size: 30px;
		color: #333333;
		line-height: 1.2;
		text-align: center;
		margin-top: -7vh;
	}
	.login100-form-title i {
		font-size: 60px;
	}

	.wrap-input100 {
		width: 100%;
		position: relative;
		border-bottom: 2px solid #adadad;
		margin-bottom: 37px;
	}

	.input100 {
		font-size: 15px;
		color: #555555;
		line-height: 1.2;

		display: block;
		width: 100%;
		height: 45px;
		background: transparent;
		padding: 0 5px;
	}

	.focus-input100 {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	.focus-input100::before {
		content: "";
		display: block;
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 2px;

		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		transition: all 0.4s;

		background: #6a7dfe;
		background: -webkit-linear-gradient(left, #21d4fd, #b721ff);
		background: -o-linear-gradient(left, #21d4fd, #b721ff);
		background: -moz-linear-gradient(left, #21d4fd, #b721ff);
		background: linear-gradient(left, #21d4fd, #b721ff);
	}

	.focus-input100::after {
		font-size: 15px;
		color: #999999;
		line-height: 1.2;

		content: attr(data-placeholder);
		display: block;
		width: 100%;
		position: absolute;
		top: 16px;
		left: 0px;
		padding-left: 5px;

		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		transition: all 0.4s;
	}

	.input100:focus + .focus-input100::after {
		top: -15px;
	}

	.input100:focus + .focus-input100::before {
		width: 100%;
	}

	.has-val.input100 + .focus-input100::after {
		top: -15px;
	}

	.has-val.input100 + .focus-input100::before {
		width: 100%;
	}

	.btn-show-pass {
		font-size: 15px;
		color: #999999;

		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		position: absolute;
		height: 100%;
		top: 0;
		right: 0;
		padding-right: 5px;
		cursor: pointer;
		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		transition: all 0.4s;
	}

	.btn-show-pass:hover {
		color: #6a7dfe;
		color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
		color: -o-linear-gradient(left, #21d4fd, #b721ff);
		color: -moz-linear-gradient(left, #21d4fd, #b721ff);
		color: linear-gradient(left, #21d4fd, #b721ff);
	}

	.btn-show-pass.active {
		color: #6a7dfe;
		color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
		color: -o-linear-gradient(left, #21d4fd, #b721ff);
		color: -moz-linear-gradient(left, #21d4fd, #b721ff);
		color: linear-gradient(left, #21d4fd, #b721ff);
	}

	.container-login100-form-btn {
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding-top: 13px;
	}

	.wrap-login100-form-btn {
		width: 100%;
		display: block;
		position: relative;
		z-index: 1;
		border-radius: 25px;
		overflow: hidden;
		margin: 0 auto;
	}

	.login100-form-bgbtn {
		position: absolute;
		z-index: -1;
		width: 300%;
		height: 100%;
		background: #a64bf4;
		background: -webkit-linear-gradient(
			right,
			#21d4fd,
			#b721ff,
			#21d4fd,
			#b721ff
		);
		background: -o-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
		background: -moz-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
		background: linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
		top: 0;
		left: -100%;

		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		transition: all 0.4s;
	}
	.login100-form-btn:hover {
		color: #1f91b6 !important;
		border: none;
		background-color: #fff !important;
	}
	.login100-form-btn {
		font-size: 15px;
		color: #fff;
		line-height: 1.2;
		text-transform: uppercase;
		background-color: #1f91b6 !important;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		width: 100%;
		height: 50px;
	}

	.wrap-login100-form-btn:hover .login100-form-bgbtn {
		left: 0;
	}

	@media (max-width: 576px) {
		.wrap-login100 {
			padding: 77px 15px 33px 15px;
		}
	}

	.validate-input {
		position: relative;
	}

	.alert-validate::before {
		content: attr(data-validate);
		position: absolute;
		max-width: 70%;
		background-color: #fff;
		border: 1px solid #c80000;
		border-radius: 2px;
		padding: 4px 25px 4px 10px;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
		right: 0px;
		pointer-events: none;

		font-family: Poppins-Regular;
		color: #c80000;
		font-size: 13px;
		line-height: 1.4;
		text-align: left;

		visibility: hidden;
		opacity: 0;

		-webkit-transition: opacity 0.4s;
		-o-transition: opacity 0.4s;
		-moz-transition: opacity 0.4s;
		transition: opacity 0.4s;
	}

	.alert-validate::after {
		content: "\f06a";
		font-family: FontAwesome;
		font-size: 16px;
		color: #c80000;

		display: block;
		position: absolute;
		background-color: #fff;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
		right: 5px;
	}

	.alert-validate:hover:before {
		visibility: visible;
		opacity: 1;
	}

	@media (max-width: 992px) {
		.alert-validate::before {
			visibility: visible;
			opacity: 1;
		}
	}
</style>
