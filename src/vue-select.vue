<template>
  <select class="form-control" v-model="model" options="options">
  </select>
</template>
<script>
/**
 * A bootstrap style selection (combobox) control using the select2 plugin.
 *
 * @param options
 *    the array of options of the selection control. It could be an array of
 *    strings, e.g., "['opt1', 'opt2']"; or an array of objects specifying
 *    the text and value of each option, e.g.,
 *    "[{text: 'name1', value: 'val1'}, {text: 'name2', value: 'val2'}]";
 *    or it could be an array of objects specifying the option group, e.g.
 *    "[label: 'group1', options: [{text: 'name1', value: 'val1'}, {text: 'name2', value: 'val2'}],
 *      label: 'group2', options: [{text: 'name3', value: 'val3'}, {text: 'name4', value: 'val4'}]]".
 * @param model
 *    the model bind to the control, which must be a two way binding variable.
 * @param searchable
 *    the optional flag indicates whether to show the search box.
 * @param theme
 *    the optional name of the theme of the select2. Default value is "bootstrap".
 * @author Haixing Hu
 */
module.exports = {
  replace: true,
  inherit: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    model: {
      type: String,
      required: true,
      twoWay: true
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false
    },
    theme: {
      type: String,
      required: false,
      default: "bootstrap"
    }
  },
  beforeCompile: function() {
    this.isChanging = false;
    this.control = null;
  },
  watch: {
    "options": function(val, oldVal) {
      this.control.trigger('change');
    },
    "model": function(val, oldVal) {
      if (! this.isChanging) {
        this.isChanging = true;
        this.control.val(val).trigger("change");
        this.isChanging = false;
      }
    }
  },
  ready: function() {
    var args = {
      theme: this.theme
    };
    if (! this.searchable) {
      args.minimumResultsForSearch = Infinity;  // hide the search box
    }
    this.control = $(this.$el);
    this.control.select2(args);
    var me = this;
    this.control.on("change", function(e) {
      if (! me.isChanging) {
        me.isChanging = true;
        me.model = me.control.val();
        me.$nextTick(function () {
          me.isChanging = false;
        });
      }
    });
  }
};
</script>