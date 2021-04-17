import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import firebase from "firebase";
import * as GmapVue from "gmap-vue";

Vue.use(axios);
Vue.config.productionTip = false;
const config = {
  apiKey: "AIzaSyCD0PAYckV8whOvFwNxPS1kJib9p2BG3EY",
  authDomain: "ebs-fgr.firebaseapp.com",
  databaseURL: "https://ebs-fgr.firebaseio.com",
  projectId: "ebs-fgr",
  storageBucket: "ebs-fgr.appspot.com",
  messagingSenderId: "50977179607",
  appId: "1:50977179607:web:b99a0bcafaa3279fe36d92",
  measurementId: "G-JR98SN1CXN",
};
Vue.use(GmapVue, {
  load: {
    key: "AIzaSyDrpiLhduxVbTHFGFqvHaPXTTnkwgIVA4A",
    libraries: "places",
    region: 'AR',
    language: 'es',
  },
  installComponents: true,
});
firebase.initializeApp(config);
firebase.analytics();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
