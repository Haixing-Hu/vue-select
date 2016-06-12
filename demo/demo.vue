<template>
  <div class="form-horizontal">
    <div class="form-group">
      <label for="select1" class="col-sm-3 control-label">
        A simple select:
      </label>
      <div class="col-sm-5">
        <vue-select class="vue-select1" name="select1"
                    :options="options1" :model.sync="result1"
                    language="">
        </vue-select>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static">
          Selected Result: <span class="vue-result1">{{result1}}</span>
        </p>
      </div>
    </div>
    <div class="form-group">
      <label for="select2" class="col-sm-3 control-label">
        A searchable select with names and localized in en-US:
      </label>
      <div class="col-sm-5">
        <vue-select class="vue-select2" name="select2"
                :options="options2" :model.sync="result2"
                :searchable="true" language="en-US">
        </vue-select>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static">
          Selected Result: <span class="vue-result2">{{result2}}</span>
        </p>
      </div>
    </div>
    <div class="form-group">
      <label for="select3" class="col-sm-3 control-label">
        A searchable select with groups and localized in zh-CN:
      </label>
      <div class="col-sm-5">
        <vue-select class="vue-select3" name="select3"
                    :options="options3" :model.sync="result3"
                    :searchable="true" language="zh-CN">
        </vue-select>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static">
          Selected Result: <span class="vue-result3">{{result3}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    "vue-select": require("../src/vue-select.js")
  },
  data: function() {
    return {
      options1: [
        "value1",
        "value2",
        "value3"
      ],
      options2: [{
        text: "name1",
        value: "value1"
      }, {
        text: "name2",
        value: "value2"
      }, {
        text: "name3",
        value: "value3"
      }],
      options3: [{
        label: "group1",
        options: [{
          text: "name1",
          value: "value1"
        }, {
          text: "name2",
          value: "value2"
        }, {
          text: "name3",
          value: "value3"
        }]
      }, {
        label: "group2",
        options: [{
          text: "name4",
          value: "value4"
        }, {
          text: "name5",
          value: "value5"
        }, {
          text: "name6",
          value: "value6"
        }]
      }]
    };
  },
  props: {
    result1: {
      required: true,
      twoWay: true
    },
    result2: {
      required: true,
      twoWay: true
    },
    result3: {
      required: true,
      twoWay: true
    }
  }
};
</script>