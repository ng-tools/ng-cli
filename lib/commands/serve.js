'use strict';

var spawn = require('child_process').spawn;

module.exports = function build(argv) {
  argv = argv || [];
  var command = 'gulp serve ' + argv.join(' ');
  return spawn('sh', ['-c', command], { stdio: 'inherit' });

};
