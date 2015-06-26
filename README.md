wintersmith-nunjucka
====================

A new [nunjucks](https://mozilla.github.io/nunjucks/) plugin for 
[wintersmith](http://wintersmith.io/)

Forked from [wintersmith-nunjucks](https://github.com/jbuck/wintersmith-nunjucks/tree/880bfe7c83f6efcc192bdf570c391bc19ae283b3).

How to use
----------

1. Install globally using npm: `npm install -g wintersmith-nunjucka`
2. Add to your wintersmith config.json: `"plugins": ["wintersmith-nunjucka"]`
3. Create nunjucks templates ending in `.html`


How to add custom filters
---------------------------

From the nunjucks documentation at https://mozilla.github.io/nunjucks/templating.html#filters:

>Filters are essentially functions that can be applied to variables. They are called with a pipe operator (|) and can take arguments.

For more information on how to write customer Filters, take a look at the API documentation page at: http://mozilla.github.io/nunjucks/api#Registering-custom-filters

### To add a single file with multiple filter functions

Configure "nunjucks" like this in your wintersmith config file:

```javascript
"nunjucks": {  
    "filterfile": "nunjucks.filters.js"
}
```

Then create a file called "nunjucks.filters.js" and place it in the same directory as your wintersmith config file with the following contents:

```javascript
// Contents of nunjucks.filters.js

function or(str, defaultValue) {
  return str || defaultValue;
}
exports.or = or;

exports.other = function(str, defaultValue) { return "something else"; };

// ... This is basically just a normal Node.js module that exports functions,
// however the functions all follow the Nunjucks filter function declaration style.
// See https://mozilla.github.io/nunjucks/api.html#custom-filters
```

Now you can use the `or` and `other` filters in your Nunjucks template files like this: `{{ mydata|or('default data value') }}`

### To add a single directory with multiple single-function files

Create a filters directory and put each filter function in its own file, stored in a filters directory. The filename has to be the name of the filter + '.js'.

Configure "nunjucks" like this in your wintersmith config file:

```javascript
"nunjucks": {  
    "filterdir": "filters",
    "filters": ["myfirstfilter"]
}
```

Then create a file './filters/myfirstfilter.js' with something like the following contents:

```javascript
// Contents of myfirstfilter.js

module.exports = function(str, opt) {
  return "This filter adds something to your str: " + str;
}
```

and the `myfirstfilter` will be available in your Nunjucks templates for use like this: `{{ somedata|myfirstfilter }}`
