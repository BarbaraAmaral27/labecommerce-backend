import { TUser, TProduct, TPurchase, Category } from "./types";

export const users: TUser[] = [
    {
        id: "1",
        email: "joao@gmail",
        password: "a1b2c3d43",
    },
    {
        id: "2",
        email: "maria@gmail",
        password: "z12z254",       
    }
];

export const products: TProduct[] = [
    {
        id: "1",
        name: "caderno",
        price: 20,
        category: Category.ACESSORIES,
    },
    {
        id: "2",
        name: "agenda",
        price: 30,
        category: Category.CLOTHES_AND_SHOES,
    }
];

export const purchases: TPurchase[] = [
    {
        userId: "1",
        productId: "1",
        quantity: 2,
        totalPrice: 40,
    },
    {
        userId: "2",
        productId: "2",
        quantity: 3,
        totalPrice: 90, 
    }
];

export function CreateUser(id: string, email: string, password: string) {
    const newUser: TUser = {id, email, password}
    users.push(newUser)
    console.log("Usuário cadastrado com sucesso!");
  }
  
  export function getAllUsers(users: TUser[]) : TUser[] {
    return users
  }
  
  export function createProduct(id: string, name:string, price: number, category: Category){
    const newProduct : TProduct = {id, name, price, category}
    products.push(newProduct)
    console.log("Produto cadastrado com sucesso!");
  }
  
  export function CreateProduct(id: string, name: string, price: number, category: Category) {
    const newProduct : TProduct = {id, name, price, category}
    products.push(newProduct)
    console.log("Produto cadastrado com sucesso!"); 
  }
  
  export function getAllProducts(products: TProduct[]) : TProduct[] {
    return products
  }
  
  export function getProductById(idToSearch: string) : TProduct[] | undefined {
    return products.filter((product: TProduct) => {
      return product.id === idToSearch
    })
  }
  
  export function queryProductsByName (q: string) : TProduct[] | undefined {
    return products.filter((product: TProduct) => {
        return product.name.toLowerCase() === q
    })
  }
  
  export function createPurchase (userId: string, productId: string, quantity: number, totalPrice: number) {
    const newPurchase : TPurchase = {userId, productId, quantity, totalPrice}
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso");
  }
  
  export function getAllPurchasesFromUserId (userIdToSearch: string) : TPurchase[] | undefined {
    return purchases.filter((purchase) => {
        return purchase.userId === userIdToSearch
    })

}