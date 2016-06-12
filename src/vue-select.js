/**
 * The default language used by this component.
 */
var DEFAULT_LANGUAGE = "en-US";

/**
 * A bootstrap style selection (combobox) control using the select2 plugin.
 *
 * @param options
 *    the array of options of the selection control. It could be an array of
 *    strings, e.g., "['opt1', 'opt2']"; or an array of objects specifying
 *    the text and value of each option, e.g.,
 *    "[{text: 'name1', value: 'val1'}, {text: 'name2', value: 'val2'}]";
 *    or it could be an array of objects specifying the option group, e.g.
 *    "[{label: 'group1', options: [{text: 'name1', value: 'val1'}, {text: 'name2', value: 'val2'}]},
 *      {label: 'group2', options: [{text: 'name3', value: 'val3'}, {text: 'name4', value: 'val4'}]}]".
 * @param model
 *    the model bind to the control, which must be a two way binding variable.
 * @param searchable
 *    the optional flag indicates whether to show the search box. Default value
 *    is false.
 * @param matchValue
 *    the optional flag indicates whether the searching should match both the
 *    texts and values of options. Default value is true.
 * @param language
 *    the optional code of language used by the select2 plugin. If it is not set,
 *    and the [vue-i18n](https://github.com/Haixing-Hu/vue-i18n) plugin is used,
 *    the component will use the language code `$language` provided by the
 *    [vue-i18n](https://github.com/Haixing-Hu/vue-i18n) plugin; otherwise, the
 *    component will use the default value "en-US".
 * @param theme
 *    the optional name of the theme of the select2. Default value is "bootstrap".
 * @param name
 *    the optional name of the selection control.
 * @author Haixing Hu
 */
module.exports = {
  replace: true,
  inherit: false,
  template: "<select class='form-control' v-model='model' :name='name' style='width: 100%'>"
          +   "<option v-if='optionsType === \"values\"' v-for='val in options' :value='val'>{{val}}</option>"
          +   "<option v-if='optionsType === \"options\"' v-for='opt in options' :value='opt.value'>{{opt.text}}</option>"
          +   "<optgroup v-if='optionsType === \"groups\"' v-for='group in options' :label='group.label'>"
          +     "<option v-for='opt in group.options' :value='opt.value'>{{opt.text}}</option>"
          +   "</optgroup>"
          + "</select>",
  props: {
    options: {
      type: Array,
      required: true
    },
    model: {
      required: true,
      twoWay: true
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false
    },
    matchValue: {
      type: Boolean,
      required: false,
      default: true
    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    language: {
      type: String,
      required: false,
      default: ""
    },
    theme: {
      type: String,
      required: false,
      default: "bootstrap"
    }
  },
  data: function() {
    return {
      optionsType: "unknown"
    }
  },
  beforeCompile: function() {
    this.isChanging = false;
    this.control = null;
    this.optionsType = this.getOptionsType();
  },
  watch: {
    "options": function(val, oldVal) {
      //console.debug("options.change");
      this.optionsType = this.getOptionsType();
      var found = this.inOptions(this.model);
      var newValue = (found ? this.model : null);
      this.control.removeData("data");  // remove the cached options data
      // note that setting the model will automatically changed in the "change"
      // event of the select2 control
      this.control.val(newValue).trigger("change");
    },
    "model": function(val, oldVal) {
      //console.debug("model.change");
      if (! this.isChanging) {
        this.isChanging = true;
        this.control.val(val).trigger("change");
        this.isChanging = false;
      }
    }
  },
  ready: function() {
    var language = this.language;
    if (language === null || language === "") {
      if (this.$language) {
        language = this.$language;
      } else {
        language = DEFAULT_LANGUAGE;
      }
    }
    var args = {
      theme: this.theme,
      language: this.getLanguageCode(language)
    };
    if (! this.searchable) {
      args.minimumResultsForSearch = Infinity;  // hide the search box
    } else {
      if (this.matchValue) {
        args.matcher = require("./value-text-matcher.js");
      }
    }
    this.control = $(this.$el);
    this.control.select2(args);
    var me = this;
    this.control.on("change", function(e) {
      //console.debug("control.change");
      if (! me.isChanging) {
        me.isChanging = true;
        me.model = me.control.val();
        me.$nextTick(function () {
          me.isChanging = false;
        });
      }
    });
  },
  methods: {

    /**
     * Gets the type of the `options` property of this component.
     *
     * The `options` property of this component may have the following types:
     * - "values": the `options` is an array of strings, e.g., `[value1, value2, value3]`;
     * - "options": the `options` is an array of options, e.g., `[{text: 'name1', value: 'val1'}, {text: 'name2', value: 'val2'}]`;
     * - "groups": the `options` is an array of option groups, e.g.,
     *   `[{label: 'group1', options: [{text: 'name1', value: 'val1'}, {text: 'name2', value: 'val2'}]},
     *     {label: 'group2', options: [{text: 'name3', value: 'val3'}, {text: 'name4', value: 'val4'}]}]`;
     *
     * @param options
     *    the new options.
     * @return
     *    the string representing the type of the `options` property of this
     *    component.
     */
    getOptionsType: function() {
      if (this.options.length === 0) {
        return "values";
      }
      var el = this.options[0];
      if (typeof el == "string" || el instanceof String) {
        return "values";
      } else if (typeof el.text !== "undefined") {
        return "options";
      } else if (typeof el.label !== "undefined") {
        return "groups";
      } else {
        return "unknown";
      }
    },

    /**
     * Tests whether a specified value exists in the options.
     *
     * @param value
     *    the value to test.
     * @return
     *    true if the specified value exists in the options; false otherwise.
     */
    inOptions: function(value) {
      var type = this.getOptionsType();
      var list = this.options;
      var i, j;
      switch (type) {
      case "values":
        for (i = 0; i < list.length; ++i) {
          if (value === list[i]) {
            return true;
          }
        }
        break;
      case "options":
        for (i = 0; i < list.length; ++i) {
          if (value === list[i].value) {
            return true;
          }
        }
        break;
      case "groups":
        for (i = 0; i < list.length; ++i) {
          var options = list[i].options;
          for (j = 0; j < options.length; ++j) {
            if (value === options[j].value) {
              return true;
            }
          }
        }
        break;
      default:
        break;
      }
      return false;
    },

    /**
     * Gets the language code from the "language-country" locale code.
     *
     * The function will strip the language code before the first "-" of a
     * locale code. For example, pass "en-US" will returns "en". But for some
     * special locales, the function reserves the locale code. For example,
     * the "zh-CN" for the simplified Chinese and the "zh-TW" for the
     * traditional Chinese.
     *
     * @param locale
     *    A locale code.
     * @return
     *    the language code of the locale.
     */
    getLanguageCode: function(locale) {
      if (locale === null || locale.length === 0) {
        return "en";
      }
      if (locale.length <= 2) {
        return locale;
      } else {
        switch (locale) {
          case "pt-BR":
          case "zh-CN":
          case "zh-TW":
            return locale;
          default:
            // reserve only the first two letters language code
            return locale.substr(0, 2);
        }
      }
    }
  }
};
