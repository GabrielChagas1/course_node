const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([{
    name: 'p1',
    message: 'Qual a primeira nota: '
}, {
    name: 'p2',
    message: 'Qual a primeira nota: '
}]).then((answers) => {
    let avarage = ((parseInt(answers.p1) + parseInt(answers.p2)) / 2);
    avarage >= 7 ? console.log(chalk.green('Parabéns, você foi aprovado!')) : console.log(chalk.red('Você foi reprovado!'));

}).catch(err => console.log(err));