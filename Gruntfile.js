// Gruntfile.js
module.exports = function(grunt) {

    grunt.initConfig({

        // configure nodemon
        nodemon: {
            dev: {
                script: 'app/app.js'
            },
            options: {
                nodeArgs: [],
                env: {
                    PORT: '8000'
                },
            }
        }

    });

    // load nodemon
    grunt.loadNpmTasks('grunt-nodemon');

    // register the nodemon task when we run grunt
    grunt.registerTask('default', ['nodemon']);

};