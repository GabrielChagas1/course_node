const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {

    const q = url.parse(req.url, true);
    const file = q.pathname.substring(1);

    if(file.includes('html')){
        if(fs.existsSync(file)){
            fs.readFile(file, (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data)
                return res.end();
            });
        }else{
            // 404
            fs.readFile('404.html', (err, data) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data)
                return res.end();
            });
        }
    }

});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})