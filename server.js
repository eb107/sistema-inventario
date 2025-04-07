const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Olá Mundo!');
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});