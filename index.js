'use strict';
var parseQuery = require('loader-utils').parseQuery;
var solc = require('solc');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var query = parseQuery(this.query);
  var optimize = 1;
  if (query.hasOwnProperty('optimize')) {
    optimize = (query.optimize) ? '1' : '0';
  }

  var compiled = solc.compile(source, optimize);
  var results = {};

  for (var name in compiled.contracts) {
    if (compiled.contracts.hasOwnProperty(name)) {
      results[name] = {
        interface: JSON.parse(contract.interface),
        bytecode: contract.bytecode,
      };
    }
  }

  return 'module.exports = ' + JSON.stringify(results) + ';';
};
