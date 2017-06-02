var generators = require('yeoman-generator');
var readFile = require('html-wiring');
var makeDir = require('mkdirp');

module.exports = generators.Base.extend({

    prompting: function () {
        return this.prompt([{
            type    : 'input',
            name    : 'appName',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, {
            type: 'input',
            name: 'baseUrl',
            message: 'Choose the base URL for the Application Under Test',
            default: 'http://localhost:3000'
        }]).then(function (answers) {
            this.appName = answers.appName;
            this.baseUrl = answers.baseUrl;
            this.log('app name', answers.appName);
            this.log('baseUrl', answers.baseUrl);
        }.bind(this));
    },

    writing: {
        app: function() {
            makeDir.mkdirp('e2e/example/pageobjects');
            makeDir.mkdirp('e2e/example/specs');
            makeDir.mkdirp('e2e/helpers');
            makeDir.mkdirp('src/js');
        },

        projectfiles: function() {
            this.copy(
                'conf.js',
                'e2e/conf.js'
            );
            this.copy(
                'example.spec.js',
                'e2e/example/specs/example.spec.js'
            );
            this.copy(
                'example.page.js',
                'e2e/example/pageobjects/example.page.js'
            );
            this.copy(
                'html-select.helper.js',
                'e2e/helpers/html-select.helper.js'
            );
            this.copy(
                'wait-plugin.js',
                'src/js/wait-plugin.js'
            );
            this.template('package.json');
            this.copy('README.md');
            this.copy('Gruntfile.js');
            //Avoid https://github.com/npm/npm/issues/1862 - npm renames .gitignore to .npmignore
            this.copy(
                '_gitignore',
                '.gitignore'
            );
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

