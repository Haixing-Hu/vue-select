var Vue = require("vue");

var vm = new Vue({
  components: {
    "demo": require("./demo.vue")
  },
  data: {
    result1: null,
    result2: "value2",
    result3: "value6"
  }
});

vm.$mount("#app");
