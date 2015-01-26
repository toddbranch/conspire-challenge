module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            src: 'scripts/**/*.js',
            options: {
                specs: 'tests/**/*.spec.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'main.js'
                },
                summary: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jasmine']);
};
