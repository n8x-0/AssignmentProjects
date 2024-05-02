#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.hex("#00fffa")(`
███╗   ██╗ █████╗ ██╗  ██╗
████╗  ██║██╔══██╗╚██╗██╔╝
██╔██╗ ██║╚█████╔╝ ╚███╔╝ 
██║╚██╗██║██╔══██╗ ██╔██╗ 
██║ ╚████║╚█████╔╝██╔╝ ██╗
`));

class Student {

    name: string;
    age: number;
    guardian: string;
    id: string;
    balance: number;

    constructor(name: string, age: number, guardian: string, id?: string, balance?: number) {
        this.name = name;
        this.age = age;
        this.guardian = guardian;
        this.id = Date.now().toString()
        this.balance = Math.round(Math.random() * 10000) + 4000;
    }
}
let isStudent: boolean = false;
let student: any;
let isActive: boolean = false;
let courseNameToPayFee: string;

function getFee(course: string, balance: number) {
    if (course === "Web3, Blockchain and GenAI, 7,500$/-" && balance > 7500) {
        isActive = true;
        isActive == true
        balance -= 7500;
        console.log(chalk.cyan(`\n7,500$ has been transfered, your remaining balance is ${balance}\n`));
    } else if (course === "Metaverse, 3D and GenAI, 6,000$/-" && balance > 6500) {
        isActive = true;
        balance -= 6500;
        console.log(chalk.cyan(`\n6,500$ has been transfered, your remaining balance is ${balance}\n`));
    } else if (course === "GenAI for engineers specialization, 4,500$/-" && balance > 4500) {
        isActive = true;
        balance -= 4500;
        console.log(chalk.cyan(`\n4,500$ has been transfered, your remaining balance is ${balance}\n`));
    } else if (course === "GenAI for Automation and IoT, 8,000$/-" && balance > 8000) {
        isActive = true;
        balance -= 8000;
        console.log(chalk.cyan(`\n8,000$ has been transfered, your remaining balance is ${balance}\n`));
    } else if (course === "GenAI for Cyber Security, 10,000$/-" && balance > 10000) {
        isActive = true;
        balance -= 8000;
        console.log(chalk.cyan(`\n8,000$ has been transfered, your remaining balance is ${balance}\n`));
    } else {
        console.log(chalk.red("\ninsufficient balance\n"))
    }
}

async function main(x: any) {
    const start = await inquirer.prompt({
        name: "management",
        type: "list",
        message: "welcome to the school management office",
        choices: ["Student Portal", "Get Admission", "Exit"]
    });

    if (start.management === "Get Admission") {
        if (isStudent) {
            console.log(chalk.green("\nAlready exist\n"));
            return main(x)
        }
        const std = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter your name"
            },
            {
                name: "age",
                type: "number",
                message: "Enter your age"
            },
            {
                name: "guardian",
                type: "input",
                message: "Enter guardian name"
            },
            {
                name: "consent",
                type: "list",
                message: "Allow us to access your account and balance info to proceed...",
                choices: ["Allow", "Dont Allow"]
            }
        ])
        if (std.consent === "Dont Allow") {
            console.log("Can\'t proceed");
        } else if (std.name === "" || Number.isNaN(std.age) || std.guardian === "") {
            console.log(chalk.red("\nPleas fill all the fields correctly\n"));
        } else {
            x = new Student(std.name, std.age, std.guardian)
            console.log(chalk.cyan("\n\tStudent Created\n"));
            isStudent = true;
            main(x)
        }
    } else if (start.management === "Student Portal") {
        if (!x) {
            console.log(chalk.red("\nPlease get admission first\n"));
            return main(x)
        }

        let ans: any;

        async function portal() {
            const portal = await inquirer.prompt({
                name: "ans",
                type: "list",
                message: "Student Portal",
                choices: ["Get Enrolled", "View Balance", "Pay Tution Fee", "Show Status", "Back"]
            });
            ans = portal.ans
        }
        await portal()

        if (ans === "View Balance") {
            let balance = chalk.yellow(x.balance + '$')
            console.log(chalk.cyan(`\nYour Current balance is ${balance}\n`));
            main(x)
        } else if (ans === "Get Enrolled") {
            if (isActive) {
                console.log(chalk.green("\nYou already paid and enrolled, See you next year :)\n"));
                return main(x)
            }
            const enrollment = await inquirer.prompt({
                name: "ans",
                type: "list",
                message: "Select the faculty of your intrest from the offered subjects",
                choices: [
                    "Web3, Blockchain and GenAI, 7,500$/-",
                    "Metaverse, 3D and GenAI, 6,000$/-",
                    "GenAI for engineers specialization, 4,500$/-",
                    "GenAI for Automation and IoT, 8,000$/-",
                    "GenAI for Cyber Security, 10,000$/-"
                ]
            });


            if (x.balance < 4500) {
                console.log(chalk.red("\nYour Balance is insufficient to get Enrolled\n"));
                return main(x)
            }

            console.log(chalk.green("\nYOU ARE ENROLLED: Pay fees to activate the journey\n"));

            const pay = await inquirer.prompt({
                name: "ans",
                type: "list",
                message: "Would you like to pay the course fee",
                choices: ["Pay now", "Later"]
            });
            courseNameToPayFee = enrollment.ans;
            if (pay.ans === "Later") {
                main(x)
            } else if (pay.ans === "Pay now") {
                getFee(courseNameToPayFee, x.balance)
                main(x)
            }
        } else if (ans === "Show Status") {

            const status = isActive ? chalk.cyan("\nYour course is activated\n") : chalk.red("\nYour course isn't activated, Pay fees to activate\n");
            console.log(status);
            console.log(x);

            main(x)

        } else if (ans === "Pay Tution Fee") {

            if (isActive) {
                console.log(chalk.green("\nYou already paid\n"));
                return main(x)
            } else if (courseNameToPayFee) {
                getFee(courseNameToPayFee, x.balance)
                main(x)
            } else {
                console.log(chalk.red("\nPlease get enrolled first\n"));
                return main(x)
            }

        } else {
            main(x)
        }

    } else {
        console.log(chalk.yellow("\nHave a good day !\n"))
    }
}
main(student)