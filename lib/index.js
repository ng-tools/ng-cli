'use strict';
// require('debug-utils');

var path = require('path');
var program = require('commander');
var resolveRequire = require('resolve-require');

// Load local package
var pkg = require('load-pkg');
var ng = require('export-files')(__dirname + '/commands');

program
  .version(pkg.version)
  .usage('<command> [options]');

program.name = 'ng';

// init command

program
  .command('init')
  .description('Alias for "yo ng-factory"')
  // .description('Generates an application/component structure for you in the current folder')
  .action(function () {
    ng.init(process.argv.slice(4));
  })
;

// build command

program
  .command('build')
  .description('Alias for "gulp ng:build"')
  .action(function () {
    resolveRequire('ng-factory')().series('ng:build')(function(err) {
      if(err) throw err;
    });
  })
;

// serve command

program
  .command('serve')
  .description('Alias for "gulp ng:serve"')
  .option('-o, --open', 'Open browser')
  .option('-no-o, --no-open', 'Do not open browser')
  .action(function () {
    resolveRequire('ng-factory')().series('ng:serve')(function(err) {
      if(err) throw err;
    });
  })
;

program.parse(process.argv);

// infinite stack traces
Error.stackTraceLimit = Infinity;

if (!program.args.length) {
  program.help();
}
