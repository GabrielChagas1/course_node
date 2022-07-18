const minimalist = require('minimist');

const args = minimalist(process.argv.slice(2));

console.log(args);

const nameTerminal = args["nome"]
const years = args["idade"];

console.log(`Nome: ${nameTerminal} Idade: ${years}`);

