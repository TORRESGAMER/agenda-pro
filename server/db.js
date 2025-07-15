const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

// Criar conexão com o banco de dados
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Criar tabela de usuários
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Inserir um usuário de teste
    const createTestUser = async () => {
        const hashedPassword = await bcrypt.hash('123456', 10);
        db.get("SELECT * FROM users WHERE email = ?", ["admin@test.com"], (err, user) => {
            if (err) {
                console.error(err);
                return;
            }
            
            if (!user) {
                db.run(
                    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
                    ["admin@test.com", hashedPassword, "Admin User"],
                    (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Usuário de teste criado com sucesso");
                        }
                    }
                );
            }
        });
    };

    createTestUser();
});

module.exports = db;
