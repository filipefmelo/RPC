module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jade: {
            no_options: {
                files: {
                    'destination/': 'source/**/*.jade'
                },
                options: {
                    client: false
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'destination/css/main.css': 'source/css/*.scss'
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'destination/js/javascript.js': 'source/js/*.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['jade', 'sass', 'uglify']);

};

