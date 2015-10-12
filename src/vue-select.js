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
 * @author Haixing Hu
 */
module.exports = {
  replace: true,
  inherit: false,
  template: "<select class='form-control' v-model='model' options='options' style='width: 100%'></select>",
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
