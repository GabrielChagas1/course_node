const fs = require('fs');

console.log('início')

fs.writeFile('arquivo.txt', 'oi', (err) => {
    setTimeout(() => {
        console.log('Arquivo Criado')
    }, 1000);
});

console.log('fim');