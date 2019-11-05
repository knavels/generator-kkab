"use strict";
const Generator = require("yeoman-generator");
const mkdirp = require("mkdirp");
const exec = require('child_process').exec;
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument("screen_class", { 
            type: String, 
            required: true,
            desc: 'Your screen class name',
            default: 'ScreenClassName' 
        });
        this.argument("screen_name", { 
            type: String, 
            required: true,
            desc: 'Your screen name for screen manager',
            default: 'screen1' 
        });
        
        this.props = {
            scr_cls: this.options.screen_class,
            scr_name: this.options.screen_name,
        }
    }

    writing() {
        this.log(
            yosay(`${chalk.green('Generating Screen...')}`)
        );

        this.fs.copyTpl(
            this.templatePath('screen.kv'),
            this.destinationPath(`screens/pages/${this.options.screen_name}.kv`),
            this.props
        );
    }

    end() {

        this.log(
            yosay(
                `${chalk.green('Screen created!')}`
            )
        );
        this.log(
            `Now you can add your screen in screen manager in the following path:
            ${chalk.red('screens/partials/screen_manager.kv')}`
        );

    }
};