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

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

SELECT * FROM purchases;

INSERT INTO purchases(id, total_price, paid, buyer_id)
VALUES ("c001", 100, 0, "u002"),
        ("c002", 50, 0, "u002"),
        ("c003", 30, 0, "u003"),
        ("c004", 80, 0, "u003"),
        ("c005", 20, 0, "u004"),
        ("c006", 60, 0, "u004");

--Atualizar purchases com pagamento = 1 e data atualizada da entrega
UPDATE purchases
SET paid = 1, delivered_at = DATETIME('now')
WHERE id = "c003";

--Query de consulta com JOIN das tabelas (users e purchases)
SELECT 
users.id AS idUsers,
purchases.id,
purchases.total_price,
purchases.paid,
purchases.delivered_at
FROM purchases
JOIN users ON purchases.buyer_id = users.id
WHERE users.id = "u003";    


CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL, 
    quantity INTEGER NOT NULL 
    );

SELECT * FROM purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ("c001","p001", 2),
        ("c002","p001", 4),
        ("c003", "p002", 3);

--Consulta com INNER JOING de 3 tabelas
SELECT purchases_products.*, purchases.*, products.*
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;



