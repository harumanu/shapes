module.exports = function ( grunt ) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            compile: {
                options: {
                    compress: true
                },
                files: {
                    "css/main.css": "less/main.less"
                }
            }
        },

        watch: {
            less: {
                files: ['less/*.less'],
                tasks: ['less:compile']
            }
        },

        jshint: {
            files: [
                'js/*.js',
                'js/**/*.js',
                '!js/libs/**/*.js',
                'Gruntfile.js'
            ],
            options: {
                expr: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    require: true,
                    define: true,
                    document: true,
                    window: true,
                    getDistanceAPI: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('default', ['less:compile', 'jshint']);
};