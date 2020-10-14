import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import firebase from "firebase";
Vue.use(axios);
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBV8DOOOZOrs-c4k3XUMqpJQNLEJMkzpYM",
  authDomain: "ebs-fgr.firebaseapp.com",
  databaseURL: "https://ebs-fgr.firebaseio.com",
  projectId: "ebs-fgr",
  storageBucket: "ebs-fgr.appspot.com",
  messagingSenderId: "50977179607",
  appId: "1:50977179607:web:e4bdc7ae25312c93e36d92",
  measurementId: "G-T4E29Y36WE",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!App) {
    App = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
