#! /usr/bin/env node

import inquirer from "inquirer";
import x from "./watermark/watermark.js";
import chalk from "chalk";
import gradient from 'gradient-string';

console.log(
    gradient.rainbow.multiline(x)
)

let randomIndex: number = Math.round(Math.random() * 2);

let randomNess: any = [
    Math.round(Math.random() * 10),
    Math.round(Math.random() * 10),
    Math.round(Math.random() * 10),
    'hint'
];

let prm: any;

async function prmptFunc(x: any) {
    const answer = await x({
        name: 'answer',
        type: 'list',
        message: 'guess the number !',
        choices: randomNess
    });
    prm = answer.answer;
}

async function gameLoop() {
    await prmptFunc(inquirer.prompt)

    if (prm === randomNess[randomIndex]) {
        console.log(chalk.green(`\n\t\t WINNER gg \n\t\t I also guess ${randomNess[randomIndex]} : )`));
    } else if (prm == 'hint') {
        let even = randomNess[randomIndex] % 2 == 0;
        if (even == true) {
            console.log(chalk.cyan(`\n\t It's an even number,\n\twait for 3sec to return`));
        } else if (!even) {
            console.log(chalk.cyan(`\n\t Its an odd number,\n\twait for 3sec to return`));
        }
        await setTimeout(() => {
            gameLoop();
        }, 3000);

    } else {
        console.log(chalk.red('\n\t\tNah nah, Try again biggie\n\t\tIt was ' + randomNess[randomIndex]));
    }
}

gameLoop()