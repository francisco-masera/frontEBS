<template>
  <div class="text-center p-t-115">
    <p class="txt2" style="font-size: 13pt">O ingresa con Google</p>
    <b-button class="social" @click="gLogin()">
      <img class="img-fluid" src="http://localhost:9001/images/sistema/google.png" />
    </b-button>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  data() {
    return {
      mail: "",
      contrasenia: "",
    };
  },
  methods: {
    toast(title, error) {
      this.$bvToast.toast(error, {
        title: title,
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: true,
      });
    },
    async gLogin() {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(googleAuthProvider)
        .then((res) => {
          this.gRegister(res.user, res.additionalUserInfo.profile);
          console.log(res);
        })
        .catch((e) => {
          this.toast(
            "Lo sentimos",
            "Algo ha fallado al ingresar con Google." + e.response.data.message
          );
        });
    },
    async login(email, pass) {
      pass = pass.toString();

      await axios
        .post("http://localhost:9001/buensabor/cliente/login", null, {
          params: {
            email,
            pass,
          },
        })
        .then((data) => {
          if (data != null) this.redirect(data.data);
          else {
            this.toast("Lo sentimos", "Ocurrió un error al intentar el ingreso.");
          }
        })
        .catch((e) => this.toast("Error", e.response.data.message));
    },

    async gRegister(user, profile) {
      var cliente = {
        type: "Cliente",
        nombre: profile.given_name,
        apellido: profile.family_name,
        telefono: "",
        email: user.email,
        contrasenia: "",
        usuario: user.email,
        foto: "",
        domicilios: [],
      };
      await axios
        .post("http://localhost:9001/buensabor/cliente/gLogin", cliente, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origins": "http://localhost:9001/buensabor/cliente",
            "cache-control": "no-cache",
          },
        })
        .then((data) => {
          if (data != null) this.redirect(data.data);
          else this.toast("Lo sentimos", "Ocurrió un error al intentar el ingreso.");
        })
        .catch((e) => this.toast("Error", e.response.data.message));
    },

    asyncForEach(array, callback, done) {
      const runAndWait = (i) => {
        if (i === array.length) return done();
        return callback(array[i], () => runAndWait(i + 1));
      };
      return runAndWait(0);
    },

    redirect(user) {
      if (!user.baja) {
        const dump = {};
        const dbRequest = indexedDB.open("firebaseLocalStorageDb", 1);
        dbRequest.onsuccess = () => {
          const db = dbRequest.result;
          const stores = ["firebaseLocalStorage"];
          const tx = db.transaction(stores);

          this.asyncForEach(
            stores,
            (store, next) => {
              const req = tx.objectStore(store).getAll();
              req.onsuccess = () => {
                dump[store] = req.result;
                next();
              };
            },
            () => {
              user.foto = dump.firebaseLocalStorage[0].value.photoURL;
              sessionStorage.setItem("user", JSON.stringify(user));
              this.$router.push({ name: "Home" });
            }
          );
        };
      } else {
        this.toast("Lo sentimos:", "Su usario no está habilitado.");
      }
    },
  },
};
</script>

<style>
.social {
  margin-top: 3vh;
}
</style>
