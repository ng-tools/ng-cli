'use strict';

var through2 = require('through2');
var bunyan = require('bunyan');
var chalk = require('chalk');
var path = require('path');

module.exports = bunyan.$log = bunyan.createLogger({
  name: 'ng',
  streams: [{
    level: 'trace',
    stream: through2(function(chunk, enc, next) {
      var obj = JSON.parse(chunk.toString('utf8'));
      var str = '[' + chalk.gray(new Date(obj.time).toLocaleTimeString()) + ']';
      str += ' - ';
      if(obj.level === bunyan.TRACE) str += chalk.gray('trace');
      else if(obj.level === bunyan.DEBUG) str += chalk.cyan('debug');
      else if(obj.level === bunyan.INFO) str += chalk.green(' info');
      else if(obj.level === bunyan.WARN) str += chalk.yellow(' warn');
      else if(obj.level === bunyan.ERROR) str += chalk.bold.red('error');
      else if(obj.level === bunyan.FATAL) str += chalk.white.bgRed.bold('fatal');
      str += ': ';
      str += chalk.underline(obj.name);
      str += ' - ';
      if(obj.level === bunyan.FATAL) str += chalk.white.bgRed.bold(obj.msg);
      else str += obj.msg;
      console.log(str);
      next();
    }),
  }]
});
