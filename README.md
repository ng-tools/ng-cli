# ng-cli

> The ng tools gateway


## Installation

```
$ npm install -g ng-cli
```

## Usage

```bach
$ ng --help

  Usage: ng <command> [options]


  Commands:

    init    Generates an application/component structure for you in the current folder
    build   Alias for "gulp build"
    serve   Alias for "gulp serve"

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

### `ng init`

Bootstrap an angular app using [Yeoman](http://yeoman.io) and our
[generator-ng-factory](https://github.com/ng-tools/generator-ng-factory).  
You can pass extra flags to the generator using double-dashes.

```
ng init -- --app --username=toto 
```

**Note**: don't forget to ``npm i && bower i`` afterward.


### `ng build`

An alias for `gulp build`

### `ng serve`

An alias for `gulp serve`


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
