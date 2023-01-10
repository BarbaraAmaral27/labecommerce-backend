import  express, { Request, Response} from 'express'

import cors from 'cors';
import { getProductById, products, purchases, queryProductsByName, users } from './database';
import { Category, TProduct, TPurchase, TUser } from './types';

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//GET All users 
app.get("/users",(req: Request, res: Response)=>{
    res.status(200).send(users)
    //res.send("cursos")
})

//GET All products
app.get("/products",(req: Request, res: Response)=>{
    res.status(200).send(products)
    
})

//GET All purchase
app.get("/purchases",(req: Request, res: Response)=>{
    res.status(200).send(purchases)
    
})

//busca produtos por nome
app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProduct[] = queryProductsByName(q)

    res.status(200).send(result)
    
})


//POST Create User
app.post("/users",(req: Request, resp: Response)=>{
    const {id, email, password} = req.body as TUser
    // const id = req.body.id
    // const name = req.body.name
    // const age = req.body.age    

    const newUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    resp.status(201).send("Usuário cadastrado com sucesso!")
})

//POST Create Product
app.post("/products",(req: Request, resp: Response)=>{
    const {id, name, price, category} = req.body as TProduct
  
    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    resp.status(201).send("Produto cadastrado com sucesso!")
})

//POST Create Product
app.post("/purchases",(req: Request, resp: Response)=>{
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase
   
    const newPurchase: TPurchase = {
        userId, 
        productId, 
        quantity, 
        totalPrice
    }
    purchases.push(newPurchase)
    resp.status(201).send("Compra realizada com sucesso!")
})

//busca produtos por id
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id 
    const result = products.find((product) => product.id === id)
    
    res.status(200).send(result)
    
})

//busca produtos por id
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id
    const result = purchases.find((purchase) => purchase.userId  === id)
    
    res.status(200).send(result)
    
})

//excluir usuário por id
app.delete("/user/:id", (req: Request, resp: Response) => {
    const id = req.params.id

    //encontrar o índice do item a ser removido
    const indexToRemove = users.findIndex((user) => user.id === id)

    //só deletar caso o índicce seja válido (ou seja, encontrou o item)
    if (indexToRemove >= 0) {
        //splice para editar diretamente o array accounts
        //primeiro argumento é o índice alvo
        //segundo argumento é quantos itens serão removidos a partir do alvo        
        users.splice(indexToRemove, 1)
    }

    resp.status(200).send("Usuário deletado com sucesso")
})

//excluir produto por id
app.delete("/product/:id", (req: Request, resp: Response) => {
    const id = req.params.id

    //encontrar o índice do item a ser removido
    const indexToRemove = products.findIndex((product) => product.id === id)

    //só deletar caso o índicce seja válido (ou seja, encontrou o item)
    if (indexToRemove >= 0) {
        //splice para editar diretamente o array accounts
        //primeiro argumento é o índice alvo
        //segundo argumento é quantos itens serão removidos a partir do alvo        
        products.splice(indexToRemove, 1)
    }

    resp.status(200).send("Item deletado com sucesso")
})

//Editar usuário por id
app.put("/user/:id", (req: Request, resp: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string| undefined

    const user = users.find((user) => user.id === id)

    if (user){
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password        
    }

    resp.status(200).send("Atualização realizada com sucesso")
})

//Editar produto por id
app.put("/product/:id", (req: Request, resp: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Category | undefined

    const product = products.find((product) => product.id === id)

    if (product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category        
    }

    resp.status(200).send("Atualização realizada com sucesso")
})





