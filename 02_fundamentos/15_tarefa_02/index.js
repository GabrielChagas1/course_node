const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([{
    name: 'name',
    message: 'Qual é o seu nome: '
}, {
    name: 'years',
    message: 'Qual a idade: '
}]).then((answers) => {
    if(!answers.name || !answers.years) throw new Error('O nome e a idade são obrigatóris!');
    console.log(chalk.bgYellow.black(`Seu nome é ${answers.name} e sua idade ${answers.years}`))
} 
).catch(err => console.log(err));

