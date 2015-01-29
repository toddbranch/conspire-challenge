module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            src: 'scripts/**/*.js',
            options: {
                specs: 'tests/**/*.spec.js',
                vendor: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                ],
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'main.js'
                },
                summary: true
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: 'main.js',
                    out: 'scripts/optimized.js',
                    name: 'main',
                    paths: {
                        jquery: 'empty:',
                        backbone: 'empty:',
                        underscore: 'empty:',
                        bootstrap: 'empty:',
                        handlebars: 'empty:',
                        text: 'bower_components/requirejs-text/text'
                    },
                    optimize: 'uglify2'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('build', ['jasmine', 'requirejs']);
};
