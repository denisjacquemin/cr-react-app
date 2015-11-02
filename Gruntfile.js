module.exports = function(grunt) {

  grunt.initConfig({
        env : {
          dev : {
            NODE_ENV : 'development'
          },
          prod : {
            NODE_ENV : 'production'
          }
      },
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify", {
                     loose: "all"
                  }]
               ]
            },
            files: {
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               "./dist/public/app.js": ["./src/app.js"]
            }
         }
      },
      watch: {
         scripts: {
            files: ["./src/**/*.js"],
            tasks: ["browserify"]
         }
      }
   });
   grunt.loadNpmTasks('grunt-env');
   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");

   grunt.registerTask("default", ["env:dev", "watch"]);
   grunt.registerTask("build", ["browserify"]);

};
