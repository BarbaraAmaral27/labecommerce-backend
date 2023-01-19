-- Active: 1674078227459@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

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

INSERT INTO products (id, name, price, category)
VALUES ("p001", "Gargantinha Estrelas", 80, "Acessórios"),
        ("p002", "Corrente Dourada", 100, "Acessórios"),
        ("p003", "Brinco Pérola", 60, "Acessórios"),
        ("p004", "Calça Jeans", 50, "Roupas e calçados"),
        ("p005", "Camiseta Preta", 120, "Roupas e calçados");

-- Get All Users
SELECT * FROM users;

-- Get All Products
SELECT * FROM products;

--Search product by name
SELECT * FROM  products WHERE name LIKE "%Gargantinha Estrelas%";

-- Create User
INSERT INTO users(id, email, password)
VALUES ("u004", "joao@labneu", "265658");

-- Create Product
INSERT INTO products(id, name, price, category)
VALUES ("p006", "Camisa Jeans", 120, "Roupas e calçados");    

-- Get Products by IDENTIFIED
SELECT * FROM products
WHERE id = "p001";

-- Delete User by id
DELETE FROM users
WHERE id = "u001";

-- Delete Product by id
DELETE FROM products
WHERE id = "p006";

-- Edit User by id
UPDATE users
SET password = "0606068"
WHERE id = "u001";

-- Edit Product by id
UPDATE products
SET price = 50
WHERE id = "p001";

-- Get All Users(refatorado)
SELECT * FROM users ORDER BY email ASC;

-- Get All Products(refatorado)
SELECT * FROM products ORDER BY price ASC
LIMIT 20 OFFSET 1;

-- Get All Products(refatorado)
SELECT * FROM products 
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;





