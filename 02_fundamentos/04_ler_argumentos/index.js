// console.log(process.argv);

const args = process.argv.slice(2);

// console.log(args);

const nameTerminal = args[0].split('=')[1];
const years = args[1].split('=')[1];

console.log(`O nome dele é ${nameTerminal} e a idade dele é ${years} anos`);