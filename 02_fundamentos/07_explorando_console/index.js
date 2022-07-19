// mais de um valor no console
const x = 10;
const y = 'Algum texto';
const z = [10,10];

console.log(x, y, z)

// contagem de impressões
console.count(`O valor de x é ${x}, contagem`)
console.count(`O valor de x é ${x}, contagem`)
console.count(`O valor de x é ${x}, contagem`)
console.count(`O valor de x é ${x}, contagem`)

//variavel entre string
console.log('O nome dele é %s', y)

// limpar o console
setTimeout(() => {
    console.clear();
}, 2000)