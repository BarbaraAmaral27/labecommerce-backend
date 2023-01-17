import express, { Request, Response } from "express";

import cors from "cors";
import {
  getProductById,
  products,
  purchases,
  queryProductsByName,
  users,
} from "./database";
import { Category, TProduct, TPurchase, TUser } from "./types";
import { emit } from "process";
import { networkInterfaces } from "os";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//GET All users
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
    //res.send("cursos")
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//GET All products
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//GET All purchase
app.get("/purchases", (req: Request, res: Response) => {
  res.status(200).send(purchases);
});

//busca produtos por nome
app.get("/products/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    const result = queryProductsByName(q);

    if (q.length <= 1) {
      res.status(400); // definimos um status code apropriado antes do disparo
      throw new Error("query params deve possuir pelo menos um caractere");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//POST Create User
app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body as TUser;
    // const id = req.body.id
    // const name = req.body.name
    // const age = req.body.age

    const findId = users.find((user) => user.id === id);

    if (findId) {
      res.status(400);
      throw new Error("ID não disponível para cadastro.");
    }

    const findEmail = users.find((user) => user.email === email);

    if (findEmail) {
      res.status(400);
      throw new Error("Email não disponível para cadastro.");
    }

    const newUser = {
      id,
      email,
      password,
    };

    users.push(newUser);
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//POST Create Product
app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body as TProduct;

    const findId = products.find((product) => product.id === id);

    if (findId) {
      res.status(400);
      throw new Error(
        "Não é possível cadastrar mais de um produto com a mesma id."
      );
    }
    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
    };
    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//POST Create Product
app.post("/purchases", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase;

    const findIdUser = users.find((user) => user.id === userId);

    if (!findIdUser) {
      res.status(400);
      throw new Error("ID do usuário não existe!");
    }

    const findIdProduct = products.find((product) => product.id === productId);

    if (!findIdProduct) {
      res.status(400);
      throw new Error("ID do produto não existe!");
    }

    if (findIdProduct.price * quantity !== totalPrice) {
      res.status(400);
      throw new Error("Valor total incorreto");
    }

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };

    purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso!");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//busca produtos por id
app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = products.find((product) => product.id === id);

    if (!result) {
      res.status(400); // definimos um status code apropriado antes do disparo
      throw new Error("O produto não existe!");
    }

    res.status(200).send(result);

  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//busca compras de usuário por id
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = purchases.find((purchase) => purchase.userId === id);

    if (!result) {
      res.status(400);
      throw new Error("Usuário não encontrado");
    }

    res.status(200).send(result);
    console.log("Array de compras do usuário:");
    
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//excluir usuário por id
app.delete("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findUser = users.find((user) => user.id === id);
    if(!findUser) {
      res.status(400);
      throw new Error("Usuário não encontrado")
    }

    //encontrar o índice do item a ser removido
    const indexToRemove = users.findIndex((user) => user.id === id);

    //só deletar caso o índicce seja válido (ou seja, encontrou o item)
    if (indexToRemove >= 0) {
      //splice para editar diretamente o array accounts
      //primeiro argumento é o índice alvo
      //segundo argumento é quantos itens serão removidos a partir do alvo
      users.splice(indexToRemove, 1);
    }

    res.status(200).send("Usuário deletado com sucesso");

  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//excluir produto por id
app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

  const findProduct = products.find((product) => product.id === id)
  if(!findProduct){
    res.status(400);
    throw new Error("Produto não encontrado")
  }

  //encontrar o índice do item a ser removido
  const indexToRemove = products.findIndex((product) => product.id === id);

  //só deletar caso o índicce seja válido (ou seja, encontrou o item)
  if (indexToRemove >= 0) {
    //splice para editar diretamente o array accounts
    //primeiro argumento é o índice alvo
    //segundo argumento é quantos itens serão removidos a partir do alvo
    products.splice(indexToRemove, 1);
  }

  res.status(200).send("Produto deletado com sucesso");
    
  } catch (error:any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);   
  }
  
});

//Editar usuário por id
app.put("/user/:id", (req: Request, res: Response) => {
  try {

    const id = req.params.id;

    const findUser = users.find((user) => user.id === id);

    if (!findUser){
      res.status(400)
      throw new Error("Usuáio não encontrado.")
    }

    // const newId = req.body.id as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    const findEmail = users.find((user)=> user.email === newEmail)
    if (newEmail && findEmail){
      res.status(400);
      throw new Error("Este Email já existe. Tente novamente!")
    }

    // const findNewId = users.find((user) => user.id === newId) 
    // if (newId && findNewId){
    //   res.status(400);
    //   throw new Error("Este ID já existe. Tente novamente!")
    // }
    
    if (newPassword && newPassword.length < 6){
      res.status(400);
      throw new Error("A senha deve possuir no mínimo 6 caracteres. Tente novamente!")
    }
        
      // findUser.id = newId || findUser.id;
      findUser.email = newEmail || findUser.email;
      findUser.password = newPassword || findUser.password;      
    
    res.status(200).send("Atualização realizada com sucesso");
    
  } catch (error:any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
    
  } 
});

//Editar produto por id
app.put("/product/:id", (req: Request, res: Response) => {
 try {

  const id = req.params.id;

  const findProduct = products.find((product) => product.id === id);

  if(!findProduct){
    res.status(400)
    throw new Error("Produto não encontrado")
  }

  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as Category | undefined;

  if(newName && newName.length < 2){
    res.status(400);
    throw new Error("O name deve possuir pelo menos 2 caracteres.");    
  }

  if (typeof newPrice !== "number") {
    res.status(400);
    throw new Error("O preço deve ser um número. Tente novamente!");
  }

    findProduct.name = newName || findProduct.name;
    findProduct.price = newPrice || findProduct.price;
    findProduct.category = newCategory || findProduct.category;
  // }

  res.status(200).send("Atualização realizada com sucesso");
  
 } catch (error:any) {
  console.log(error);

  if (res.statusCode === 200) {
    res.status(500);
  }

  res.send(error.message);
  
} 
  
});
