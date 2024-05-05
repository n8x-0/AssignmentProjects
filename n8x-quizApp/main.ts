#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.red(`
                                  
@@@  @@@   @@@@@@   @@@  @@@  
@@@@ @@@  @@@@@@@@  @@@  @@@  
@@!@!@@@  @@!  @@@  @@!  !@@  
!@!!@!@!  !@!  @!@  !@!  @!!  
@!@ !!@!   !@!!@!    !@@!@!   
!@!  !!!   !!@!!!     @!!!    
!!:  !!!  !!:  !!!   !: :!!   
:!:  !:!  :!:  !:!  :!:  !:!  
 ::   ::  ::::: ::   ::  :::  
::    :    : :  :    :   ::   
                            
`))


let index: number = 0;
let score: number = 0;
let quizes = [
    {
        question: `What is square brackets knowns as in javascript "[]"`,
        opt1: "object",
        opt2: "Array",
        opt3: "boolean",
        trueAnswer: "Array"
    },
    {
        question: "What would be the output, console.log(typeof [])",
        opt1: "object",
        opt2: "array",
        opt3: "container",
        trueAnswer: "object"
    },
    {
        question: "If typeof [] is object in JS than how we should discriminate b/w obj and arrays in conditions.",
        opt1: "We can't",
        opt2: "Array.isArray([])",
        opt3: "[].isArray",
        trueAnswer: "Array.isArray([])"
    },
    {
        question: "In JS 18==18==18 is false while 18==18==18=0 is true, why is that",
        opt1: "Because its how it is",
        opt2: "Because 18==18==18 is false and false = 0 is true",
        opt3: "Because 18==18 is true, so true == 18 is false, than false = 0 is true as because 0 is false and 1 is true in JS",
        trueAnswer: "Because 18==18 is true, so true == 18 is false, than false = 0 is true as because 0 is false and 1 is true in JS"
    },
    {
        question: "What is recurssion in JS",
        opt1: "Calling a function which call itself again and again with some modification using params",
        opt2: "Calling a function which returns cursed value",
        opt3: "It does'nt even exist in JS",
        trueAnswer: "Calling a function which call itself again and again with some modification using params"
    },
    {
        question: "Why JS is among the most hated scripting language",
        opt1: "Alot of Libraries and Frameworks",
        opt2: "It's slow",
        opt3: "It's difficult",
        trueAnswer: "Alot of Libraries and Frameworks"
    },
];

const start = await inquirer.prompt({
    name: "quiz",
    type: "list",
    message: "Welcome, Let's Start Your Quiz",
    choices: ["Start", "Exit"]
});

async function main() {
    if (start.quiz === "Start") {
        let quizNo = quizes[index]
        
        if (index >= quizes.length) {
            index = 0;
            console.log(chalk.yellow(`\n\tYour Score is ${score}/${quizes.length}\n`));
            return;
        }else{
            let ques = await inquirer.prompt({
                name: "ans",
                type: "list",
                message: quizNo.question,
                choices: [quizNo.opt1, quizNo.opt2, quizNo.opt3]
            });
            index++;
            if (ques.ans === quizNo.trueAnswer) {
                console.log(true);
                score++;
                main();
            } else {
                console.log(false);
                main();
            }
        }
    } else {
        console.log(chalk.red("Have a good day !"));
    }
}
main()