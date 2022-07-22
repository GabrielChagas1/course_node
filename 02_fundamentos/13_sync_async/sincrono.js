const fs = require('fs');

console.log('início')

fs.writeFileSync('arquivo.txt', 'oi');

console.log('fim');