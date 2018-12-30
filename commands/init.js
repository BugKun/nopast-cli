const inquirer = require('inquirer'),
    download = require('download-git-repo'),
    chalk = require('chalk'),
    ora = require('ora'),
    fs = require('fs'),
    replace = require('replace-in-file'),
    questions = require('./questions'),
    filesList = require('./utils/filesList'),
    upperString = require('./utils/upperString'),
    {log} = console;


function downloadPromisify(repo, path) {
    return new Promise((resolve, reject) =>
        download(repo, path, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    );
}

function accessPromisify(path) {
    return new Promise((resolve, reject) =>
        fs.access(path, (err) => {
            (err)? resolve() : reject("The directory has been existed");
        })
    );
}

inquirer
    .prompt(questions)
    .then(async ({name, author, library, type}) => {
        const spinner = ora('Init template...'),
            projectName = (type === 'Project')? name : `${library}-${name}`,
            projectPath = `./${projectName}`;

        spinner.start();
        try {
            await accessPromisify(projectPath);
            await downloadPromisify(`BugKun/nopast-cli-tpl#${library}-${type}`, projectPath);
            const upperName = upperString(name);
            let replacePath = [
                `${projectPath}/package.json`,
                `${projectPath}/package-lock.json`
            ];
            replacePath.push(...await filesList(`${projectPath}/src/`));
            if(type !== 'Project') {
                replacePath.push(
                    `${projectPath}/index.js`,
                    ...await filesList(`${projectPath}/example/src/`)
                );
            }
            await replace({
                files: replacePath,
                from: [/nopast-cli-tpl/g, /NopastCliTpl/g, /nopast/g],
                to: [name, upperName, author],
                encoding: 'utf8'
            });
            spinner.stop();
            log(chalk.green('New project has been initialized successfully!'));
        }catch (err) {
            log(chalk.red(err));
            spinner.stop();
            process.exit();
        }

        /*download(`BugKun/nopast-cli-tpl#${library}-${type}`, projectPath, async (err) => {
            if (err) {
                log(chalk.red(err));
                process.exit();
            }
            const upperName = upperString(name);
            let replacePath = [
                `${projectPath}/package.json`,
                `${projectPath}/package-lock.json`
            ];
            try {
                replacePath.push(...await filesList(`${projectPath}/src/`));
                if(type !== 'Project') {
                    replacePath.push(
                        `${projectPath}/index.js`,
                        ...await filesList(`${projectPath}/example/src/`)
                    );
                }
            }catch (err) {
                log(chalk.red(err));
                process.exit();
            }

            replace({
                files: replacePath,
                from: [/nopast-cli-tpl/g, /NopastCliTpl/g, /nopast/g],
                to: [name, upperName, author],
                encoding: 'utf8'
            }).then(() => {
                spinner.stop();
                log(chalk.green('New project has been initialized successfully!'));
            }).catch(error => {
                log(chalk.red(error));
                spinner.stop();
                process.exit();
            });
        });*/
    });