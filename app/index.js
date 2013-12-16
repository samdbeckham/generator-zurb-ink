'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ZurbInkGenerator = module.exports = function ZurbInkGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ZurbInkGenerator, yeoman.generators.Base);

ZurbInkGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'campaignName',
    message: 'What would you like to call your campaign?',
    default: "emailer"
  }];

  this.prompt(prompts, function (props) {
    this.campaignName = props.campaignName.replace(' ', '-');
    cb();
  }.bind(this));
};

ZurbInkGenerator.prototype.app = function app() {
  this.mkdir('dev');
  this.template('_boilerplate.html', 'dev/index.html');

  this.mkdir('dev/images')
  this.copy('images/inky.jpg', 'dev/images/inky.jpg');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
};

ZurbInkGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('travis.yml', '.travis.yml');
  this.copy('bowerrc', '.bowerrc');
};
