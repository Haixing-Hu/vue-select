# vue-titlecase

[![Build Status](https://circleci.com/gh/Haixing-Hu/vue-titlecase/tree/master.svg?style=shield)](https://circleci.com/gh/Haixing-Hu/vue-titlecase/tree/master)
[![Coverage Status](https://coveralls.io/repos/Haixing-Hu/vue-titlecase/badge.svg?branch=master&service=github)](https://coveralls.io/github/Haixing-Hu/vue-titlecase?branch=master)
[![bitHound Score](https://www.bithound.io/github/Haixing-Hu/vue-titlecase/badges/score.svg)](https://www.bithound.io/github/Haixing-Hu/vue-titlecase)
[![Dependency Status](https://david-dm.org/Haixing-Hu/vue-titlecase.svg)](https://david-dm.org/Haixing-Hu/vue-titlecase)
[![devDependency Status](https://david-dm.org/Haixing-Hu/vue-titlecase/dev-status.svg)](https://david-dm.org/Haixing-Hu/vue-titlecase#info=devDependencies)

A Vue.js plugin provides a filter and a function to titlecase a string.

# Requirements
- [Vue.js](https://github.com/yyx990803/vue) ^`0.12.0`

# Algorithm

The algorithm is based on the gamma rule described as follows:

[Glossary of Grammatical and Rhetorical Terms: title case (capitalization)](http://grammar.about.com/od/tz/g/Title-Case.htm)

# Instllation

## npm

```shell
$ npm install vue-titlecase
```

## bower

```shell
$ bower install vue-titlecase
```

# Usage

```javascript
var Vue = require('vue')
var Titlecase = require('vue-titlecase')

// set plugin
Vue.use(Titlecase)

// create instance
new Vue({
  el: '#test-titlecase',
  data: {
    msg: "hello world! my id is starfish. I LOVE WATCHing tv.",
  }
})
```

Template the following:

```html
<div id="test-titlecase" class="message">
  <p>{{ msg | titlecase }}</p>
  <p>{{ msg.toTitleCase() }}</p>
</div>
```

Output the following:

```html
<div id="test-titlecase" class="message">
  <p>Hello World! My ID is Starfish. I Love Watching TV.</p>
  <p>Hello World! My ID is Starfish. I Love Watching TV.</p>
</div>
```

# API

## `String.prototype.toTitleCase()`

Converts a string instance to the titlecase form. Returns a new string.

## `titlecase`

This is a customized Vue filter used to converts the string representation of
an object to the titlecase form.

# Contributing
- Fork it !
- Create your top branch from `dev`: `git branch my-new-topic origin/dev`
- Commit your changes: `git commit -am 'Add some topic'`
- Push to the branch: `git push origin my-new-topic`
- Submit a pull request to `dev` branch of `Haixing-Hu/vue-titlecase` repository !

# Building and Testing

First you should install all depended NPM packages. The NPM packages are used
for building and testing this package.

```shell
$ npm install
```

Then install all depended bower packages. The bower packages are depended by
this packages.

```shell
$ bower install
```

Now you can build the project.
```shell
$ gulp build
```

The following command will test the project.
```shell
$ gulp test
```

The following command will perform the test and generate a coverage report.
```shell
$ gulp test:coverage
```

The following command will perform the test, generate a coverage report, and
upload the coverage report to [coveralls.io](https://coveralls.io/).
```shell
$ gulp test:coveralls
```

You can also run `bower install` and `gulp build` together with the following
command:
```shell
npm build
```

Or run `bower install` and `gulp test:coveralls` together with the following
command:
```shell
npm test
```

# License

[The MIT License](http://opensource.org/licenses/MIT)
