#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import gradient from 'gradient-string';

console.log(gradient.rainbow.multiline(`
███╗   ██╗ █████╗ ██╗  ██╗              ████████╗ ██████╗ ██████╗  ██████╗ 
████╗  ██║██╔══██╗╚██╗██╔╝              ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
██╔██╗ ██║╚█████╔╝ ╚███╔╝     █████╗       ██║   ██║   ██║██║  ██║██║   ██║
██║╚██╗██║██╔══██╗ ██╔██╗     ╚════╝       ██║   ██║   ██║██║  ██║██║   ██║
██║ ╚████║╚█████╔╝██╔╝ ██╗                 ██║   ╚██████╔╝██████╔╝╚██████╔╝
╚═╝  ╚═══╝ ╚════╝ ╚═╝  ╚═╝                 ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 
`));


let todosObj: [{ title: string, text: string }] = [{
    title: 'Sample Title',
    text: 'Smaple todo'
}];

let getPrompt: string;

async function prom(atr: any) {
    let initialPrompt = await atr({
        name: 'do',
        type: 'list',
        choices: ['Add todos', 'My todos', 'Exit']
    });
    getPrompt = initialPrompt.do;
};

async function todosFunc() {

    await prom(inquirer.prompt);

    if (getPrompt === 'Add todos') {

        const addTodo = await inquirer.prompt([
            {
                name: 'title',
                type: 'string',
                message: 'Title what to do'
            },
            {
                name: 'todo',
                type: 'string',
                message: 'Your text goes here'
            }
        ]);

        todosObj.push({ title: addTodo.title, text: addTodo.todo });

        await setTimeout(() => todosFunc(), 1000)

    } else if (getPrompt == 'My todos') {
        todosObj.map(objects => {
            console.log(
                chalk.red('\n\tTitle: '), chalk.yellow(objects.title),
                chalk.red('\n\tTodo: '), chalk.yellow(objects.text, '\n')
            );
        })
        await setTimeout(() => todosFunc(), 1000);
    } else if (getPrompt === 'Exit') {
        console.log(chalk.green('\n\tHave a good day : )'));
    }
}

todosFunc()