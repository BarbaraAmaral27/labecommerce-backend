-- Active: 1674078227459@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, email, password)
VALUES ("u001","evandro@labenu","123456"),
        ("u002", "aline@labenu","654321"),
        ("u003","paula@labenu","595569");

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);  

SELECT * FROM products;

INSERT INTO products (id, name, price, category)
VALUES ("p001", "Gargantinha Estrelas", 80, "Acessórios"),
        ("p002", "Corrente Dourada", 100, "Acessórios"),
        ("p003", "Brinco Pérola", 60, "Acessórios"),
        ("p004", "Calça Jeans", 50, "Roupas e calçados"),
        ("p005", "Camiseta Preta", 120, "Roupas e calçados");
        
     