import inquirer from "inquirer";
import chalk from 'chalk';

const givin = await inquirer.prompt({
    name: 'para',
    type: 'input',
    message: chalk.green('Enter text content to count:\n ')
});

let para = givin.para.trim().split(' ').length;
let charecter = givin.para.replace(/\s/g, '').length;

console.log(chalk.hex('#beffca')(`\n\t Your text content contain total of ${para} words\n\t and ${charecter} characters\n\t`));
