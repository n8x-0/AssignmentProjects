#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import gradient from 'gradient-string';
console.log(gradient.rainbow.multiline(`
    ███╗   ██╗ █████╗ ██╗  ██╗               █████╗ ████████╗███╗   ███╗
    ████╗  ██║██╔══██╗╚██╗██╔╝              ██╔══██╗╚══██╔══╝████╗ ████║
    ██╔██╗ ██║╚█████╔╝ ╚███╔╝     █████╗    ███████║   ██║   ██╔████╔██║
    ██║╚██╗██║██╔══██╗ ██╔██╗     ╚════╝    ██╔══██║   ██║   ██║╚██╔╝██║
    ██║ ╚████║╚█████╔╝██╔╝ ██╗              ██║  ██║   ██║   ██║ ╚═╝ ██║
    ╚═╝  ╚═══╝ ╚════╝ ╚═╝  ╚═╝              ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝`));
const obj = {
    name: 'Shayan',
    PIN: 1234,
    amount: 10000
};
const start = await inquirer.prompt([
    {
        name: 'acc',
        type: 'input',
        message: 'Enter account name',
        default: 'Shayan'
    },
    {
        name: 'PIN',
        type: 'number',
        message: 'Enter PIN',
        default: 1234
    }
]);
if (start.acc === obj.name && start.PIN === obj.PIN) {
    const operation = await inquirer.prompt([
        {
            name: 'name',
            type: 'list',
            message: 'Welcome to the n8x-ATM, How can I assist you today:',
            choices: ['Check Balance', 'Quick Cash', 'Withdraw'],
        }
    ]);
    if (operation.name === 'Check Balance') {
        console.log(chalk.cyan('\n\tYour balance is: ', obj.amount));
    }
    else if (operation.name === 'Quick Cash') {
        const quickcash = await inquirer.prompt([
            {
                name: 'cash',
                type: 'list',
                message: 'Qucik Cash Amount,',
                choices: ['1000', '3000', '5000'],
            }
        ]);
        if (quickcash.cash === '1000') {
            console.log(chalk.yellow(`\n\tThe amount of ${quickcash.cash} has been withdrawn,\n\tYour remaining balance is ${obj.amount - 1000}`));
        }
        else if (quickcash.cash === '3000') {
            console.log(chalk.yellow(`\n\tThe amount of ${quickcash.cash} has been withdrawn,\n\tYour remaining balance is ${obj.amount - 3000}`));
        }
        else if (quickcash.cash === '5000') {
            console.log(chalk.yellow(`\n\tThe amount of ${quickcash.cash} has been withdrawn,\n\tYour remaining balance is ${obj.amount - 5000}`));
        }
    }
    else if (operation.name === 'Withdraw') {
        const drawAmount = await inquirer.prompt({
            name: 'draw',
            type: 'number',
            message: 'Enter amount to procedd'
        });
        if (drawAmount.draw > obj.amount) {
            console.log(chalk.red('\n\tInsufficient amount'));
        }
        else {
            console.log(chalk.green(`\n\tThe amount of ${drawAmount.draw} has been withdrawn,\n\tYour remaining balance is ${obj.amount - drawAmount.draw}`));
        }
    }
}
else {
    console.log(`\n\tIncorrect ${chalk.red('identity..! ⚠')}`);
}
;
