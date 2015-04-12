'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function init(argv) {
  argv = argv || [];
  var command = 'yo ng-factory ' + argv.join(' ');

  // Add the cli local node_modules to the NODE_PATH will allow yeoman to find
  // the cli local generators like 'generator-ng-factory' ;)
  process.env.NODE_PATH += ':' + path.join(__dirname, '..', '..', 'node_modules');

  return spawn('sh', ['-c', command], { stdio: 'inherit' });
};
