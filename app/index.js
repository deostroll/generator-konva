var generator = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

var KonvaGenerator = generator.Base.extend({
  init: function() {
    var params = {};
    var flags = {
      mkdir: false
    };
    var folder = arguments[0];
    if(folder) {
      params.projName = folder;
      flags.mkdir = true
    }
    else {
      var baseName = path.basename(this.destinationRoot());
      params.projName = baseName;
    }

    this.params = params;
    this.flags = flags;
  }, //end init
  makeFolders: function() {
    if(this.flags.mkdir)     {
      console.log('Creating folder structure...');
      fs.mkdirSync(this.params.projName);
      this.destinationRoot(this.destinationPath(this.params.projName));
    }
  }, //end makeFolders
  copyStuff: function() {
    console.log(this.sourceRoot());
    var self = this;
    var assets = [
      {
        file: 'index.html',
        target: 'src/index.html',
        tmpl: true
      },
      {
        file: '_package.json',
        target: 'package.json',
        tmpl: true
      },
      {
        file: '_bower.json',
        target: 'bower.json',
        tmpl: true
      },
      {
        file: 'main.js',
        target: 'src/main.js',
        tmpl: true
      },
      {
        file: 'yeoman.png',
        target: 'src/yeoman.png'
      },
      {
        file: 'style.css',
        target: 'src/style.css'
      }
    ];
    assets.forEach(function(asset){
      if(asset.tmpl) {
        self.fs.copyTpl(
          self.templatePath(asset.file),
          asset.target,
          self.params
        );
      }
      else {
        self.copy(asset.file, asset.target);
      }
    });
    var gruntFileContent = this.read(this.templatePath('_Gruntfile.js'));
    this.write(this.destinationPath('Gruntfile.js'), gruntFileContent);
  }, //end copyAssets
  installDep: function() {
    var self = this;
    this.installDependencies({
      callback: function() {
        console.log('All Done...');
      }
    });
  }

});
module.exports = KonvaGenerator;
