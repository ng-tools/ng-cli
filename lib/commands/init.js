'use strict';

var path = require('path');
var Promise = require('bluebird');
var execAsync = Promise.promisify(require('child_process').exec);
var spawnAsync = Promise.promisify(require('child_process').spawn);
var log = require('bunyan').$log;
var generator = require('yeoman-generator');


function init(argv) {
  var command = 'yo';
  var args = ['ng-factory'].concat(process.argv.slice(3));
  log.debug('Executing "%s"', [command].concat(args).join(' '));
  return spawnAsync('yo', args, {stdio: 'inherit'}).then(dd);
}

module.exports = {
  name: 'init',
  usage: 'Generates an application/component structure for you in the current folder.',
  args: {
    '[options]': 'any flags for the command',
    '<PATH>': 'directory for the new project',
    '[template]': 'Template name, ex: tabs, sidemenu, blank\n' +
                  'Codepen url, ex: http://codepen.io/ionic/pen/odqCz\n' +
                  'Defaults to Ionic "tabs" starter template'
  },
  options: {
    'a': {
      alias: 'appname',
      demand: false,
      default : path.basename(process.cwd()),
      describe: 'Human readable name for the app (Use quotes around the name)'
    }
  },
  // examples: {
  //   'ng init': 'count the lines in the given file'
  // },
  /*{
    '--appname|-a': 'Human readable name for the app (Use quotes around the name)',
    '--id|-i': 'Package name for <widget id> config, ex: com.mycompany.myapp',
  },*/
  run: init
};
