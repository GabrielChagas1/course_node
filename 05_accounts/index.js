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

function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta: '
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accounts')) fs.mkdirSync('accounts');

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black(`Está conta já existe, escolha outro nome!`))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": 0}`, (err) => {
            console.log(err)
        })

        console.log(chalk.green(`Parabéns, a sua conta foi criado com sucesso`))
        operation()

    }).catch((err) => console.log(err))
}

// add an amount to user account
function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];
        // verify if account exists
        if(!checkAccount(accountName)) return deposit()

        inquirer.prompt([
            {
                name: 'amount',
                message: `Quanto você deseja depositar?`
            }
        ]).then((answer) => {
            const amount = answer['amount']
            // add an amount
            addAmount(accountName, amount)
            operation()
        }).catch((err) => console.log(err))

    }).catch(err => console.log(err))
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black(`Está conta não existe, escolha outro nome!`))
        return false
    }

    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'));
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        (err) => console.log(err),
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na conta ${accountName}`))
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r',
    })

    return JSON.parse(accountJSON)
}
