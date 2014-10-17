module.exports = function(grunt) {
    // Project Configuration
	grunt.initConfig({
		jade: {
		  compile: {
			    options: {
			      data: {},
			      pretty: true
			    },
			    files: [{
			      expand: true,
			      cwd: 'src/templates',
			      src: [ '**/*.jade' ],
			      dest: 'build/',
			      ext: '.html'
			    }]
			}
		},
		uglify: {
			my_target: {
				options: {
      				mangle: true,
					compress: {
						drop_console: true
					}      				
    			},
				files: [
					{
						expand: true,
						cwd: 'build/script',
						src: '**/*.js',
						dest: 'deploy/script'
					},
					{
						expand: true,
						cwd: 'build/lib',
						src: '**/*.js',
						dest: 'deploy/lib'
					}
				]
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'build/assets/styles',
				src: ['*.css'],
				dest: 'deploy/assets/styles',
				ext: '.css'
			},
			minify2: {
				expand: true,
				cwd: 'build/lib',
				src: ['**/*.css'],
				dest: 'deploy/lib',
				ext: '.css'
			}
		},
		copy: {
			remoteProduction: {
			    files: [
			      // includes files within path
			      {
			      	expand: true,
			      	cwd: 'build/',
			      	src: [
						'**/*',
						'**/*.css',
						'**/*.js',
			      	],
			      	dest: 'deploy/',
			      },

			      // includes files within path and its sub-directories
			      {expand: true, src: ['path/**'], dest: 'dest/'},

			      // makes all src relative to cwd
			      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

			      // flattens results to a single level
			      {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
			    ]
			}
		}
	});

  	// Load task-providing plugins.
  	grunt.loadNpmTasks('grunt-contrib-jade');
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask(
		'prod',
		'Compiles all of the assets and copies the files to the build directory.', 
		[ 'copy','uglify', 'cssmin']
	);
	// grunt.registerTask(
	// 	'prod',
	// 	'Compiles all of the assets and copies the files to the build directory.',
	// 	[ 'jade']
	// );
};