import  express, { Request, Response} from 'express'

import cors from 'cors';
import { products, purchases, queryProductsByName, users } from './database';
import { TProduct, TPurchase, TUser } from './types';

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



