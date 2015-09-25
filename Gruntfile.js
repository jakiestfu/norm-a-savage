module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json');

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Set config
  grunt.initConfig({
    pkg: pkg
  });


  // LESS Compiler
  grunt.config('less', {
    norm: {
      options: {
        /*paths: ["assets/css"]*/
      },
      files: {
        "build/ovo.norm.css": "src/less/ovo.norm.less"
      }
    }
  });

  // Copy files
  grunt.config('copy', {
    norm: {
      files: [
        {expand: true, cwd: 'src/img/', src: ['**'], dest: 'build/img/'},
        {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['**'], dest: 'build/fonts/'}
      ]
    }
  });

  grunt.config('htmlmin', {
    norm: {
      options: {
        removeComments: false,
        collapseWhitespace: true
      },
      files: {
        'index.html': 'index.html'
      }
    }
  });

  grunt.config('uglify', {
    norm: {
      options: {
        mangle: true,
        preserveComments: 'some',
        banner: '/*! ovo.norm.js v<%=pkg.version%> */'
      },
      files: {
        'build/js/ovo.norm.js': ['src/js/ovo.norm.js']
      }
    },
    deps: {
      options: {
        mangle: false,
      },
      files: {
        'build/js/deps.js': [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/knockout/dist/knockout.js'
        ]
      }
    }
  });

  // File watcher
  grunt.config('watch', {
    html: {
      files: ['src/**/*.html'],
      tasks: ['demo', 'htmlmin']
    },
    less: {
      files: ['src/**/*.less'],
      tasks: ['less']
    },
    js: {
      files: ['src/**/*.js'],
      tasks: ['uglify:norm']
    }
  });

  // Register Tasks
  grunt.registerTask('default', ['less', 'copy', 'uglify', 'htmlmin']);
  grunt.registerTask('develop', ['default', 'watch']);
};
