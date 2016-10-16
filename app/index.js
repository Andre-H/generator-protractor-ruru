var generators = require('yeoman-generator');
var readFile = require('html-wiring');
var makeDir = require('mkdirp');

module.exports = generators.Base.extend({

    prompting: function () {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, {
            type: 'input',
            name: 'baseUrl',
            message: 'Choose the base URL for the Application Under Test',
            default: 'http://localhost:3000'
        }]).then(function (answers) {
            this.appName = answers.name;
            this.baseUrl = answers.baseUrl;
            this.log('app name', answers.name);
            this.log('baseUrl', answers.baseUrl);
        }.bind(this));
    },

    writing: {
        app: function() {
            makeDir.mkdirp('tests/e2e/example/pageobjects');
            makeDir.mkdirp('tests/e2e/example/specs');
            makeDir.mkdirp('tests/e2e/helpers');
            makeDir.mkdirp('src/js');
        },

        projectfiles: function() {
            this.copy(
                'conf.js',
                'tests/e2e/conf.js'
            );
            this.copy(
                'example.spec.js',
                'tests/e2e/example/specs/example.spec.js'
            );
            this.copy(
                'example.page.js',
                'tests/e2e/example/pageobjects/example.page.js'
            );
            this.copy(
                'html-select.helper.js',
                'tests/e2e/helpers/html-select.helper.js'
            );
            this.copy(
                'wait-plugin.js',
                'src/js/wait-plugin.js'
            );
            this.template('package.json');
            this.copy('README.md');
            this.copy('Gruntfile.js');
            this.copy('.gitignore');
        }
    },

    install: function() {

        console.log('method install just ran');
        this.config.save();
        var self = this;
        this.installDependencies({
            bower: false,
            skipInstall: this.options['skip-install'],
            callback: function() {
                this.spawnCommand('grunt', ['install']);
                var readme = readFile.readFileAsString('README.md');
                self.log('Done! Now follow these steps:');
                self.log(readme);
                self.log('You can read these instructions in README.md');
            }.bind(this)
        });
    }
});

