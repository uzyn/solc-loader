'use strict';
var loaderUtils = require('loader-utils');
var solc = require('solc');

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

  var compiled = solc.compile(source, optimize);
  var results = {};

  if ('errors' in compiled) {
    throw new Error(compiled.errors.join('\n'));
  }

  for (var name in compiled.contracts) {
    var contract = compiled.contracts[name];
    if (compiled.contracts.hasOwnProperty(name)) {
      results[name] = {
        abi: JSON.parse(contract.interface),
        bytecode: contract.bytecode,
      };
    }
  }

  return 'module.exports = ' + JSON.stringify(results) + ';';
};
