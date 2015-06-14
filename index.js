'use strict';

var nunjucks = require("nunjucks");
var path = require("path");

module.exports = function(env, callback) {

  // Load the new nunjucks environment.
  var nenv = new nunjucks.Environment(new nunjucks.FileSystemLoader(env.templatesPath));
  var filterName, filters;
  
  // Load the filters
  if(env.config.nunjucks) {
    if(env.config.nunjucks.filterdir) {
      env.config.nunjucks.filters.map( function (name) {
        var file = path.join(env.config.nunjucks.filterdir, name + ".js");
        var filter = env.loadModule(env.resolvePath(file), true);
        nenv.addFilter(name, filter);
      });
    }
    if(env.config.nunjucks.filterfile) {
      filters = env.loadModule(env.resolvePath(env.config.nunjucks.filterfile), true);
      for (filterName in filters)
        nenv.addFilter(filterName, filters[filterName]);
    }
  }

  var NunjucksTemplate = function(template) {
    this.template = template;
  };

  NunjucksTemplate.prototype.render = function render(locals, callback) {
    try {
      callback(null, new Buffer(this.template.render(locals)));
    } catch (error) {
      callback(error);
    }
  };

  NunjucksTemplate.fromFile = function fromFile(filepath, callback) {
    callback(null, new NunjucksTemplate(nenv.getTemplate(filepath.relative)));
  };

  env.registerTemplatePlugin("**/*.*(htm|html|nunjucks)", NunjucksTemplate);
  callback();
};
