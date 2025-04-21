const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuração do middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Criar e configurar conexão com o banco de dados
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'inventario' 
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// Rota para cadastrar os ítens em uso
app.post('/api/uso', (req, res) => {
    const { item, quantidade } = req.body;

    const sql = 'INSERT INTO uso (item, quantidade) VALUES (?, ?)';
    db.query(sql, [item, quantidade], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar ítem:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar ítem' });
        }
        res.status(200).json({ message: 'Ítem cadastrado com sucesso!' });
    });
});

// Rota para obter lista dos ítens em uso
app.get('/api/listauso', (req, res) => {
    const sql = 'SELECT * FROM uso';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao listar ítens:', err);
            return res.status(500).json({ message: 'Erro ao listar ítens' });
        }
        res.status(200).json(result);
    });
});

// Rota para cadastrar os ítens em desuso
app.post('/api/desuso', (req, res) => {
    const { item, quantidade } = req.body;

    const sql = 'INSERT INTO desuso (item, quantidade) VALUES (?, ?)';
    db.query(sql, [item, quantidade], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar ítem:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar ítem' });
        }
        res.status(200).json({ message: 'Ítem cadastrado com sucesso!' });
    });
});

// Rota para obter lista dos ítens em desuso
app.get('/api/listadesuso', (req, res) => {
    const sql = 'SELECT * FROM desuso';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao listar ítens:', err);
            return res.status(500).json({ message: 'Erro ao listar ítens' });
        }
        res.status(200).json(result);
    });
});

// Rota para deletar da lista itens em uso
app.delete('/api/deletaruso/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM uso WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao deletar ítem' });
        }
        return res.status(200).json({ message: 'Ítem deletado com sucesso!' });
    });
});

// Rota para deletar da lista itens em desuso
app.delete('/api/deletardesuso/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM desuso WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao deletar ítem' });
        }
        return res.status(200).json({ message: 'Ítem deletado com sucesso!' });
    });
});

// Rota para somar quantidade dos ítens em uso
app.get('/api/somauso', (req, res) => {
    const sql = 'SELECT id, item, sum(quantidade) AS total_quantidade FROM uso GROUP BY item';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao somar ítens:', err);
            res.status(500).json({ message: 'Erro ao somar ítens' });
        }
        res.status(200).json(result);
    });
});

// Rota para somar quantidade dos ítens em desuso
app.get('/api/somadesuso', (req, res) => {
    const sql = 'SELECT id, item, sum(quantidade) AS total_quantidade FROM desuso GROUP BY item';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao somar ítens:', err);
            res.status(500).json({ message: 'Erro ao somar ítens' });
        }
        res.status(200).json(result);
    })
})

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});