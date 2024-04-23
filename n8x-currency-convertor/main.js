#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import url from "./config/api.js";
console.log(chalk.cyan(`
  ____                                        
 / ___|   _ _ __ _ __ ___ _ __   ___ _   _    
| |  | | | | '__| '__/ _ \\ '_ \\ / __| | | |   
| |__| |_| | |  | | |  __/ | | | (__| |_| |   
 \\____\\__,_|_|  |_|  \\___|_| |_|\\___|\\__, |   
 / ___|___  _ ____   _____ _ __| |_ _|___/ __ 
| |   / _ \\| '_ \\ \\ / / _ \\ '__| __/ _ \\| '__|
| |__| (_) | | | \\ V /  __/ |  | || (_) | |   
 \\____\\___/|_| |_|\\_/ \\___|_|   \\__\\___/|_|   `, '\n\n\t Currency Convertor By n8x\n\t'));
// let myApi: any;
let startOptions;
let fromConvVal;
let toConvertVal;
let amountVal;
let amBg = chalk.yellow('amount');
let highlightedText = chalk.yellow(`enter existing code `);
async function logApi(currency, amount, toconvert) {
    fetch(url + currency)
        .then(resp => resp.json())
        .then((data) => {
        let rJson = Object.entries(data.data);
        let filteredItems = rJson.filter((item) => item[1].code === toconvert);
        // console.log(filteredItems);
        // myApi = Object.entries(data.data)[i][1];
        let convertedVal = filteredItems[0][1].value * amount;
        console.log(chalk.green(`\n\t${amount} ${currency} = ${convertedVal.toFixed(2)} ${filteredItems[0][1].code}\n\t`));
        loopConvertor();
    });
}
async function startConvertor(par) {
    const start = await par({
        name: "to",
        type: 'list',
        message: chalk.hex('#8d36ff')('welcome to currency convertor '),
        choices: ['Currency Convertor', 'Exit']
    });
    startOptions = start.to;
}
async function loopConvertor() {
    await startConvertor(inquirer.prompt);
    if (startOptions === 'Currency Convertor') {
        const currency = await inquirer.prompt({
            name: 'from',
            type: 'list',
            message: chalk.hex('#e7b4ff')('Enter the currency you would like to convert into... '),
            choices: ['PKR', 'USD', 'EUR', 'INR', 'RUB', 'Other codes (Add manually)']
        });
        fromConvVal = currency.from;
        if (currency.from === 'Other codes (Add manually)') {
            const manual = await inquirer.prompt([
                {
                    name: 'add',
                    type: 'input',
                    message: chalk.hex('#e7b4ff')(`Enter currency code to convert into:\n  And make sure to ${highlightedText}`),
                },
                {
                    name: 'cAmount',
                    type: 'number',
                    message: chalk.hex('#e7b4ff')(`Enter ${amBg} to convert: `),
                },
                {
                    name: 'conversion',
                    type: 'input',
                    message: chalk.hex('#e7b4ff')(`Convert into: `),
                }
            ]);
            fromConvVal = manual.add;
            amountVal = manual.cAmount;
            toConvertVal = manual.conversion;
        }
        else {
            const currency = await inquirer.prompt([
                {
                    name: 'cAmount',
                    type: 'number',
                    message: chalk.hex('#e7b4ff')(`Enter ${amBg} to convert: `),
                },
                {
                    name: 'toCon',
                    type: 'list',
                    message: chalk.hex('#e7b4ff')(`Convert into: `),
                    choices: ['PKR', 'USD', 'EUR', 'INR', 'RUB']
                }
            ]);
            amountVal = currency.cAmount;
            toConvertVal = currency.toCon;
        }
        await logApi(fromConvVal, amountVal, toConvertVal);
        // console.log(myApi);
    }
    else if (startOptions === 'Exit') {
        console.log(chalk.red('\n\tHave a good day : )'));
    }
}
loopConvertor();
