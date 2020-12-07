import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import HighchartsVue from "highcharts-vue";

Vue.config.productionTip = false;

Vue.filter("formatData", (timestamp) => {
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  let data = new Date(timestamp);
  return `${data.getDate()} ${months[data.getMonth()]} ${data.getFullYear()}, ${
    weekdays[data.getDay()]
  } `;
});

Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

function setCode(code){
  console.log(code);
}
