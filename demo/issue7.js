import Vue from "vue";
import VueSelect from "../src/vue-select.js";

var vm = new Vue({
  components: {
    "vue-select": VueSelect
  },
  data: {
    opt: ['foo','bar','baz', 'yep'],
    val: "foo"
  }
});

vm.$mount("#app");
