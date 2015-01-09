/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru();

var ng;

//

function spawnCallFake(fn) {

  ng = [
    '../lib/commands/build',
    '../lib/commands/init',
    '../lib/commands/serve'
  ].reduce(function (memo, modulePath) {
      memo[path.basename(modulePath)] = proxyquire(modulePath, {
        'child_process': { spawn: fn }
      });
      return memo;
    }, {});

}

//

describe('ng commands', function () {

  describe('#build', function () {

    it('should pass the given args to the shell call', function () {

      spawnCallFake(function () {
        var actual = Array.prototype.slice.apply(arguments);
        expect(actual).to.eql(['sh', ['-c', 'gulp build foo --bar'], { 'stdio': 'inherit' }]);
      });

      ng.build(['foo', '--bar']);

    });

  });

  describe('#init', function () {

    it('should pass the given args to the shell call', function () {

      spawnCallFake(function () {
        var actual = Array.prototype.slice.apply(arguments);
        expect(actual).to.eql(['sh', ['-c', 'yo ng-factory foo --bar'], { 'stdio': 'inherit' }]);
      });

      ng.init(['foo', '--bar']);

    });

    it('should add the local node_modules to the process env', function () {

      spawnCallFake(function () {
        var actual = Array.prototype.slice.apply(arguments);
        expect(actual).to.eql(['sh', ['-c', 'yo ng-factory '], { 'stdio': 'inherit' }]);
      });

      ng.init();

      expect(process.env.NODE_PATH).to.match(
        new RegExp(path.join(__dirname, '..', 'node_modules') + '$')
      );

    });

  });


  describe('#serve', function () {

    it('should pass the given args to the shell call', function () {

      spawnCallFake(function () {
        var actual = Array.prototype.slice.apply(arguments);
        expect(actual).to.eql(['sh', ['-c', 'gulp serve foo --bar'], { 'stdio': 'inherit' }]);
      });

      ng.serve(['foo', '--bar']);

    });

  });

});

