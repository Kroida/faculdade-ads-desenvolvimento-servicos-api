const mysql = require('mysql');
const http = require('http');
const { error } = require('console');

const hostname = '127.0.0.1';
const port = 3000;

const conn = mysql.createConnection({
    host: hostname,
    user: 'root',
    password: '',
    database: 'loja_26_2'
});

function consultar(res) {
    const sql = 'SELECT * FROM produto ORDER BY nome';

    conn.query(sql, (err, result, fields) => {
        if (err) {
            res.end(JSON.stringify({
                resposta: 'erro na consulta',
                err: err
            }));
        } else {
            res.end(JSON.stringify(result));
        }
    });
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    try {
        if (conn.state != 'authenticated') {
            conn.connect(function (err) {
                res.end(JSON.stringify({
                    resposta: 'erro ao conectar no banco!',
                    err: err
                }));
            });
        } else {
            consultar(res);
        }
    } catch (error) {
        res.statusCode = 500;
        res.end('{"resposta" : "Erro no servidor"}');
    }
});

server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}`);
});