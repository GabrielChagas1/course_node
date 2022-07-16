const fs = require('fs');

let content = 'São Paulo maior da América!'

try {
    fs.writeFileSync('./test.txt', content);
    // file written succesfully
} catch (error) {
    console.log(error)
}