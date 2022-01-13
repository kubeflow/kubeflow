module.exports = function(grunt) {

    var compileType = function() {
            var type = this.data.type;
            var template = grunt.file.read('templates/types.js');
            var anon = grunt.file.read('templates/anon.js');
            var files =  grunt.file.expand([
                'src/' + type + '/*.js'
            ]);
            var regexp = /\}\(this, function \(numeral\) \{\s([\s\S]+)(?:\s\}\)\);)/;
            var content = '';
            var file;
            var i;

            for (i = 0; i < files.length; i++) {
                file = grunt.file.read(files[i]);

                content += '\n' + grunt.template.process(anon, {
                    data: {
                        content: file.match(regexp)[1]
                    }
                }) + '\n';
            }

            grunt.file.write('temp/' + type + '.js', content);

            if (type === 'locales') {
                grunt.file.write('locales.js', grunt.template.process(template, {
                    data: {
                        type: type,
                        content: content
                    }
                }));
            }
        },
        compileNumeral = function() {
            var regexp = /([\s])return numeral;(?:\s\}\)\);)/;
            var numeral = grunt.file.read('src/numeral.js');
            var formats = grunt.file.read('temp/formats.js');
            var index = numeral.indexOf('return numeral;');

            numeral = numeral.substr(0, index) + '\n' + formats + numeral.substr(index);

            grunt.file.write('numeral.js', numeral);
        };

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        mochaTest : {
            all: [
                'tests/numeral.js',
                'tests/formats/*.js',
                'tests/locales/*.js'
            ]
        },
        karma: {
            options: {
                files: [
                    'numeral.js',
                    'locales.js',
                    'tests/numeral.js',
                    'tests/formats/*.js',
                    'tests/locales/*.js'
                ],
                frameworks: [
                    'mocha',
                    'chai'
                ],
                singleRun: true,
                autoWatch: false
            },
            local: {
                browsers: [
                    'Chrome',
                    'Firefox'
                ]
            },
            ci: {
                configFile: 'karma-ci.conf.js'
            }
        },
        copy: {
            locales: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'locales/*.js'
                        ],
                        dest: './'
                    }
                ]
            }
        },
        compile: {
            locales: {
                type: 'locales'
            },
            formats: {
                type: 'formats'
            }
        },
        uglify: {
            min: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'locales/*.js'
                        ],
                        dest: 'min/',
                        ext: '.min.js'
                    },
                    {
                        expand: true,
                        src: [
                            'numeral.js',
                            'locales.js'
                        ],
                        dest: 'min/',
                        ext: '.min.js'
                    }
                ]
            },
            options: {
                preserveComments: 'some'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/**/*.js'
            ],
            options: {
                'node': true,
                'browser': true,
                'curly': true,
                'devel': false,
                'eqeqeq': true,
                'eqnull': true,
                'newcap': true,
                'noarg': true,
                'undef': true,
                'sub': true,
                'strict': false,
                'quotmark': 'single',
                'globals': {
                    'define': true
                }
            }
        }
    });

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerMultiTask('compile', compileType);

    grunt.registerTask('compile:numeral', compileNumeral);

    grunt.registerTask('build', [
        'jshint',
        'compile',
        'compile:numeral',
        'copy'
    ]);

    grunt.registerTask('test', [
        'build',
        'mochaTest',
        'karma:local'
    ]);

    grunt.registerTask('test:npm', [
        'build',
        'mochaTest'
    ]);

    grunt.registerTask('test:browser', [
        'build',
        'karma:local'
    ]);

    grunt.registerTask('dist', [
        'build',
        'uglify'
    ]);

    grunt.registerTask('version', function (version) {
        if (!version || version.split('.').length !== 3) {
            grunt.fail.fatal('malformed version. Use\n\n    grunt version:1.2.3');
        }

        grunt.config('string-replace.json', {
            files: {
                'package.json': 'package.json',
                'component.json': 'component.json',
                'bower.json': 'bower.json'
            },
            options: {
                replacements: [
                    {
                        pattern: /"version": .*/,
                        replacement: '"version": "' + version + '",'
                    }
                ]
            }
        });

        grunt.config('string-replace.numeral', {
            files: {
                'src/numeral.js': 'src/numeral.js'
            },
            options: {
                replacements: [
                    {
                        pattern: /version : .*/,
                        replacement: 'version : ' + version
                    },
                    {
                        pattern: /VERSION = .*/,
                        replacement: 'VERSION = \'' + version + '\','
                    }
                ]
            }
        });

        grunt.config('string-replace.templates', {
            files: {
                'templates/types.js': 'templates/types.js'
            },
            options: {
                replacements: [
                    {
                        pattern: /: .*/,
                        replacement: ': ' + version
                    }
                ]
            }
        });

        grunt.task.run([
            'string-replace:json',
            'string-replace:templates',
            'string-replace:numeral'
        ]);
    });

    // Travis CI task.
    grunt.registerTask('travis', [
        'build',
        'mochaTest',
        'karma:ci'
    ]);
};
