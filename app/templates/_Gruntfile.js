/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    watch: {
      www: {
        files: ['src/*.*'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      }
    },
    connect: {
      options:{
        livereload: true,
        port: 5000
      },
      server: {
        options:{
          open: true,
          middleware: function(connect) {
            var app = connect();
            var serveStatic = require('./node_modules/grunt-contrib-connect/node_modules/serve-static');
            app.use('/bower_components', serveStatic('./bower_components'));
            app.use(serveStatic('src'));
            return [app];
          }
        }

      }
    },
    wiredep: {
      www: {
        src: ['src/index.html']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');

  // Default task.
  grunt.registerTask('default', ['wiredep', 'connect', 'watch']);

};
