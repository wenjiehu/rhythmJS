module.exports = function(grunt) {
    grunt.initConfig({
        paths: {
            src: 'src',
            test: 'test',
            dist: 'dist'
        },
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                src: ['<%= paths.dist %>/*', ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['<%= paths.src %>/rhythmJS.js']
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.src %>',
                    src: ['js/*', 'css/*', 'bower_components/**'],
                    dest: '<%= paths.dist %>',
                }, {
                    expand: true,
                    cwd: '<%= paths.src %>',
                    src: ['index.html'],
                    dest: '<%= paths.dist %>',
                }]
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            jshint: {
                files: ['<%= paths.src %>/rhythmJS.js'],
                tasks: ['jshint'],
            },
            qunit: {
                files: ['<%= paths.src %>/rhythmJS.js', '<%= paths.test %>/**/*.js'],
                tasks: ['qunit'],
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('dev', ['watch']);
};
