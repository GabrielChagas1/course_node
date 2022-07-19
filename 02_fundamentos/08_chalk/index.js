const chalk = require('chalk');
 
let nota = 6;


nota >= 7 ? console.log(chalk.green.bold('Parabéns! Você está aprovado')) : console.log(chalk.red.bold('Você foi reprovado!'));