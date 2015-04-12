'use strict';

var spawn = require('child_process').spawn;

module.exports = function build(argv) {
  argv = argv || [];
  var command = 'gulp ng:build ' + argv.join(' ');
  return spawn('sh', ['-c', command], { stdio: 'inherit' });

};
