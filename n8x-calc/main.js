#! /usr/bin/env node
import inquirer from "inquirer";
import x from "./wMark/watermark.js";
import chalk from "chalk";
import gradient from 'gradient-string';
console.log(gradient.rainbow.multiline(x));
let task;
const noOfValues = await inquirer.prompt({
    name: 'howManValues',
    type: "list",
    choices: ["1", "2"],
    message: chalk.green("You can work with one or two vlaues")
});
if (noOfValues.howManValues == "1") {
    const askfor1Val = await inquirer.prompt({
        name: "val1",
        type: "input",
        message: "please enter your value"
    });
    const calc = await inquirer.prompt({
        name: 'val',
        type: 'list',
        message: 'enter first number',
        choices: ['square root', "square", "cube", "roundOff(floats e:g 1.8 => 2)", "sin", "cos", "tan"]
    });
    if (calc.val == 'square root') {
        console.log(Math.floor(Math.sqrt(askfor1Val.val1)));
    }
    else if (calc.val == 'power') {
        console.log(askfor1Val.val1 * askfor1Val.val1);
    }
    else if (calc.val == 'roundOff(floats e:g 1.8 => 2)') {
        console.log(Math.round(askfor1Val.val1));
    }
    else if (calc.val == 'sin') {
        console.log(Math.sin(askfor1Val.val1));
    }
    else if (calc.val == 'cos') {
        console.log(Math.cos(askfor1Val.val1));
    }
    else if (calc.val == 'tan') {
        console.log(Math.tan(askfor1Val.val1));
    }
    else if (calc.val == 'cube') {
        console.log(askfor1Val.val1 * askfor1Val.val1 * askfor1Val.val1);
    }
}
else if (noOfValues.howManValues == "2") {
    const askfor1stVal = await inquirer.prompt({
        name: "val1",
        type: "input",
        message: "please enter your first value"
    });
    const askfor2ndVal = await inquirer.prompt({
        name: "val2",
        type: "input",
        message: "please enter your second value"
    });
    const calc = await inquirer.prompt({
        name: 'val',
        type: 'list',
        message: 'select operation',
        choices: ['addition', "subtraction", "multiplication", "division", "back"]
    });
    switch (calc.val) {
        case "addition":
            task = '+';
            break;
        case 'subtraction':
            task = '-';
            break;
        case 'multiplication':
            task = '*';
            break;
        case 'division':
            task = '/';
            break;
        case 'back':
    }
    console.log(eval(askfor1stVal.val1 + task + askfor2ndVal.val2));
}
