#!/usr/bin/env node

// imports dependencies
const inquirer = require('inquirer');
const fs = require('fs');

// prepares choices
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

// prepares questions
const QUESTIONS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'Which project template would you like to generate?',
        choices: CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Name of project directory:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Directory name may only include letters, numbers, underscores and hashes.';
        }
    }
];

// get current directory
const CURR_DIR = process.cwd();

// display questions
inquirer.prompt(QUESTIONS)
    .then(answers => {
        // assign answers
        const projectChoice = answers['project-choice'];
        const projectName = answers['project-name'];
        const templatePath = `${__dirname}/templates/${projectChoice}`;

        // create directory for project
        fs.mkdirSync(`${CURR_DIR}/${projectName}`);

        // copy over the template
        createDirectoryContents(templatePath, projectName);
});

let createDirectoryContents = (templatePath, newProjectPath) => {
    // define all files to create
    const filesToCreate = fs.readdirSync(templatePath);

    // cycle through each file
    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            // get contents
            const contents = fs.readFileSync(origFilePath, 'utf8');

            // Fix for .gitignore being converted to .npmignore
            if (file === '.npmignore') file = '.gitignore';

            // path of file
            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            // create file
            fs.writeFileSync(writePath, contents, 'utf8');

        } else if (stats.isDirectory()) {
            // creates directory
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

            // recursive call for files inside
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
};