module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Grunt-sass
        sass: {
          app: {
            files: [{
              expand: true,
              cwd: 'public/scss',
              src: ['*.scss'],
              dest: 'public/css',
              ext: '.css'
            }]
          },
          options: {
            sourceMap: true,
            outputStyle: 'nested',
            imagePath: "public/images",
          }
        },

        watch: {
            scss: {
                files: ['public/scss/**/*.scss'],
                tasks: ['sass']
            },
            css: {
                files: ['public/css/**/*.css']
            },
            js: {
                files: ['public/js/**/*.js','!public/js/dist/**/*.js'],
                tasks: ['concat']
            },
            livereload: {
                files: ['**/*.html', '**/*.js', '**/*.css', '!**/node_modules/**'],
                options: { livereload: true }
            }
        },

        browserSync: {
            files: {
                src : 'public/css/style.css'
            },
            options: {
                watchTask: true // < VERY important
            }
            // ,
            // options: {
            //     proxy: "vcuartsbones.dev"
            // }
        },

        autoprefixer: {
            dist: {
                files: {
                    'public/css/style.css' : 'public/css/style.css'
                }
            }
        },

        cmq: {
            your_target: {
                files: {
                    'public/css' : 'public/css/style.css'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'public/css/style.min.css': ['public/css/style.css']
                }
            }
        },

        jshint: {
            all: [
                'public/js/*.js',
            ],
            options: {
                jshintrc: 'public/js/.jshintrc'
            }
        },

        concat: {
            footer: {
                src: [
                    'public/js/libs/*.js', // All JS in the libs folder
                    'public/js/scripts.js',  // This specific file
                    '!public/js/libs/modernizr.custom.min.js'
                ],
                dest: 'public/js/dist/main.js',
            }
        },

        uglify: {
            footer: {
                src: 'public/js/dist/main.js',
                dest: 'public/js/dist/main.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/images/',
                    src: ['**/*.{png,jpg,gif,svg,ico}'],
                    dest: 'public/images/'
                }]
            }
        },

        concurrent: {
            watch: {
                tasks: ['watch', 'sass', 'browserSync'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        copy: {
          main: {
            files: [
              // includes files within path
              // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

              // includes files within path and its sub-directories
              {expand: true, src: ['**','!build/**','!bower_components/**','!node_modules/**','!.git/**'], dest: 'build/'},

              // makes all src relative to cwd
              // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

              // flattens results to a single level
              // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
            ],
          },
        },
    });

    // 3. Where we tell Grunt what plugins to use

    // Sass
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // JS
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Images
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Browser Reload + File Watch
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Build Related
    grunt.loadNpmTasks('grunt-contrib-copy');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('init', ['build']);
    grunt.registerTask('dev', ['browserSync','watch']);
    grunt.registerTask('build', ['sass', 'autoprefixer', 'cmq', 'cssmin', 'concat', 'uglify', 'copy']);
};
