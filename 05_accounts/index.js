// modules externs
const inquirer = require('inquirer');
const chalk = require('chalk');

const fs = require('fs');

operation();

// create an account 
function createAccount(){
    console.log(chalk.bgGreen.black(`Parabéns por escolher nosso banco - GM Bank`));
    console.log(chalk.green(`Defina as opções da sua conta a seguir`));
    buildAccount();
}

