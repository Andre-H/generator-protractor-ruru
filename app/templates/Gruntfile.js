var versionsChrome = '2.29';
var versionsSelenium = '2.53.1';

module.exports = function (grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		jshint : {
			files : ['Gruntfile.js'],
			options : {
				// options here to override JSHint defaults
				globals : {
					jQuery : true,
					console : true,
					module : true,
					document : true
				}
			}

		},
		protractor : {
			options : {
				keepAlive : true,
				configFile : "e2e/conf.js"
			},
			singlerun : {
				options : {
					args : {
						seleniumServerJar : './node_modules/protractor/selenium/selenium-server-standalone-' + versionsSelenium + '.jar',
						chromeDriver : './node_modules/protractor/selenium/chromedriver_' + versionsChrome + '.exe'
					}
				}
			},
			auto : {
				keepAlive : true,
				options : {
					args : {
						seleniumPort : 4444
					}
				}
			}
		},
		shell : {
			options : {
				stdout : true
			},
			protractor_install : {
				command : 'node ./node_modules/protractor/bin/webdriver-manager update --versions.chrome ' + versionsChrome +
				' --versions.standalone ' + versionsSelenium + ' --out_dir ../protractor/selenium'
			},
			npm_install : {
				command : 'npm install'
			}
		}

	});

	grunt.loadNpmTasks('grunt-shell-spawn');

	grunt.registerTask('install', ['shell:npm_install', 'shell:protractor_install']);

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-protractor-runner');

	grunt.registerTask('e2e', ['jshint', 'install', 'protractor:singlerun']);

	grunt.registerTask('default', ['e2e']);

};
