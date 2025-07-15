const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const app = express();

// Log de todas as requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL do cliente Vite
    credentials: true
}));

app.use(express.json());

// Rota de login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }

            if (!user) {
                return res.status(401).json({ error: "Usuário não encontrado" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Senha inválida" });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        }
    );
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        }
        req.user = user;
        next();
    });
};

// Rota protegida de exemplo
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: "Rota protegida", user: req.user });
});

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.json({ message: 'Servidor está funcionando!' });
});

const PORT = process.env.PORT || 3000;

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciar o servidor
try {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Acesse http://localhost:${PORT} para verificar`);
    });
} catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
}
