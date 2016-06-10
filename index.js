'use strict';
var loaderUtils = require('loader-utils');
var solc = require('solc');
var path = require("path");
var fs = require("fs");

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var config = loaderUtils.getLoaderConfig(this, 'solcLoader');
  var optimize = 1;
  if (config.hasOwnProperty('optimize')) {
    switch (config.optimize) {
      case '0':
        optimize = '0';
        break;
      case 'false':
        optimize = '0';
        break;
      default:
        optimize = (config.optimize) ? '1': '0';
    }
  }

  var loaderContex = this;
  var sourceParsedPath = path.parse(loaderContex.resource);
  var sources = {};
  sources[sourceParsedPath.base] = source;
  var input = { sources: sources };
  var compiled = solc.compile(input, optimize, function (importPath) {
    var fullPath = path.resolve(sourceParsedPath.dir, importPath);
    try {
      var contractSource = fs.readFileSync(fullPath).toString("utf-8");
      loaderContex.addDependency(fullPath);
      return { contents: contractSource };
    } catch (e) {
      return { error: e };
    }
  });

  if ('errors' in compiled) {
    throw new Error(compiled.errors.join('\n'));
  }

  var results = {};
  for (var name in compiled.contracts) {
    var contract = compiled.contracts[name];
    if (compiled.contracts.hasOwnProperty(name)) {
      results[name] = {
        name: name,
        abi: JSON.parse(contract.interface),
        bytecode: contract.bytecode,
      };
    }
  }

  return 'module.exports = ' + JSON.stringify(results) + ';';
};
