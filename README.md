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

To use customer filters with wintersmith, put the filter in its own file stored in a filters directory. The filename has to be the name of the filter + '.js'.

so if your filter is in './filters/myfirstfilter.js' add a  nunjucks section like this to your config.json:

```javascript
"nunjucks": {  
    "filterdir": "filters",
    "filters": ["myfirstfilter"]
}
```

It will be available in your templates at 'myfirstfilter'