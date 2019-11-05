"use strict";
const Generator = require("yeoman-generator");
const mkdirp = require("mkdirp");
const exec = require('child_process').exec;
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        this.log(
            yosay(
                `KKAB ${chalk.green(
                    "Kontinuum Kivy-App Boilerplate"
                )} scaffolder!`
            )
        );

        const prompts = [
            {
                name: "title",
                message: "Your descriptive app title",
                default: "My Awesome app !!!"
            }, {
                name: "name",
                message: "Your kivy app name in kabob-case",
                default: "my-kkab-app"
            }, {
                type: 'list',
                name: 'python_command',
                message: 'How do you run your python commands?',
                choices: ['python3', 'python'],
                default: 'python',
            }
        ];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    default() {
        this.log(
            yosay(`creating ${chalk.green(this.props.name)} folder`)
        );
        mkdirp(this.props.name);
        this.destinationRoot(this.destinationPath(this.props.name));
    }

    writing() {
        this.log(
            yosay(`${chalk.green('Generating Template...')}`)
        );

        this.fs.copy(this.templatePath('*'), this.destinationPath());
        this.fs.copy(this.templatePath('.*'), this.destinationPath());
        this.fs.copy(this.templatePath('app'), this.destinationPath('app'));
        this.fs.copy(this.templatePath('assets'), this.destinationPath('assets'));
        this.fs.copy(this.templatePath('kontinuum'), this.destinationPath('kontinuum'));
        this.fs.copy(this.templatePath('migrations'), this.destinationPath('migrations'));
        this.fs.copy(this.templatePath('screens'), this.destinationPath('screens'));
        this.fs.copyTpl(
            this.templatePath('screens/main.kv'),
            this.destinationPath('screens/main.kv'),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            this.props
        );
    }

    install() {

        this.log(yosay(`${chalk.green('Installing python dependencies...')}`));

        var installation_packages = [
            '--upgrade pip wheel setuptools virtualenv',
            'docutils pygments pypiwin32 kivy_deps.sdl2==0.1.22 kivy_deps.glew==0.1.12',
            'kivy_deps.gstreamer==0.1.17',
            'kivy_deps.angle==0.1.9',
            'kivy==1.11.1',
            'orator',
            'git+https://github.com/HeaTTheatR/KivyMD.git'
        ];

        var i;
        for (i = 0; i < installation_packages.length; i++) {
            var command = `${this.props.python_command} pip install ${installation_packages[i]}`
            this.log(`running: ${chalk.red(command)}`);
            exec(command);
        }
    }
};