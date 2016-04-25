'use strict';
var solc = require('solc');

module.exports = function (source) {
  this.cacheable && this.cacheable();

  var compiled = solc.compile(source, 1);
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
