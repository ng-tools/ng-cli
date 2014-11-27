#!/usr/bin/env node
'use strict';

// nodemon -w lib -w bin -x 'ng init --with-cordova --use-es6 --with-less'

var _ = require('lodash');
var path = require('path');
var chalk = require('chalk');
var Promise = require('bluebird');
var bunyan = require('bunyan');
var pkg = require('./../package.json');
var debug = require('./utils/debug');
var log = require('./utils/log');
var yargs = require('yargs');

// yargs.usage('foo').demand('f');
// normalize-package-data

var yargs = require('yargs')
  .usage('\n' + chalk.red.bold('# ' + pkg.name) + '\n' + '> ' + chalk.blue.underline(pkg.description))
  .require(1);

module.exports = function(options) {

  var action = process.argv[2];
  var command = require('./commands/' + action);
  if(command.usage) yargs.usage(parseUsage(action, command.usage));
  if(command.options) yargs.options(command.options);
  if(command.examples) _.each(_.invert(command.examples), yargs.example);
  var argv = yargs.argv;

  return _.isFunction(command.run) ? command.run(argv) : require(command.run)(argv);

};

function parseUsage(action, usage) {
  return '\n' + chalk.red.bold('# ng ' + action) + '\n' + '> ' + chalk.blue.underline(usage);
}



// stat('.gitconfig', {
//   basedir: process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
// }, function(error, file) {
//   console.log(error);
// });
// return;
