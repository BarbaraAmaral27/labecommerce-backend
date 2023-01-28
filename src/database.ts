import { TUser, TProduct, TPurchase, Category } from "./types";

export const users: TUser[] = [
    {
        id: "1",
        name: "João",
        email: "joao@gmail",
        password: "a1b2c3d43",
        created_at: ""
    },  
    {
        id: "2",
        name: "Maria",
        email: "maria@gmail",
        password: "z12z254",
        created_at: ""       
    }
];

export const products: TProduct[] = [
    {
        id: "1",
        name: "Colar",
        price: 20,
        description: "Colar Feminino",
        category: Category.ACESSORIES,
        image_url: "https://img.ltwebstatic.com/images3_pi/2022/06/01/16540559774c7aa5825eac776f438ada2745fe3e62_thumbnail_600x.webp"
    },
    {
        id: "2",
        name: "Sapatilha",
        price: 30,
        description: "Sapatilha em couro azul",
        category: Category.CLOTHES_AND_SHOES,
        image_url: "https://secure-static.zzmall.com.br/medias/sys_master/marketplacezz/marketplacezz/h6c/h92/h00/h00/9411824058398/C3026200010031U-01-BASEIMAGE-Midres.png"
    }
];

export const purchases: TPurchase[] = [
    {
        id: "1",
        buyer: "1",
        total_price: 100,
        created_at: "",
        paid: 0 
    },
    {
      id: "2",
      buyer: "2",
      total_price: 90,
      created_at: "",
      paid: 0 
    }
];

// export function CreateUser(id: string, email: string, password: string) {
//     const newUser: TUser = {id, email, password}
//     users.push(newUser)
//     console.log("Usuário cadastrado com sucesso!");
//   }
  
  export function getAllUsers(users: TUser[]) : TUser[] {
    return users
  }
  
  // export function createProduct(id: string, name:string, price: number, category: Category){
  //   const newProduct : TProduct = {id, name, price, category}
  //   products.push(newProduct)
  //   console.log("Produto cadastrado com sucesso!");
  // }
  
  // export function CreateProduct(id: string, name: string, price: number, category: Category) {
  //   const newProduct : TProduct = {id, name, price, category}
  //   products.push(newProduct)
  //   console.log("Produto cadastrado com sucesso!"); 
  // }

  export function getUserById(id: string) {
    const user = users.find((user) => user.id === id)
    return user
}

  export function getAllProducts(products: TProduct[]) : TProduct[] {
    return products
  }
  
  export function getProductById(idToSearch: string) : TProduct[] | undefined {
    return products.filter((product: TProduct) => {
      return product.id === idToSearch
    })
  }
  
  export function queryProductsByName (q: string) : TProduct[] {
    return products.filter((product: TProduct) => {
        return product.name.toLowerCase() === q
    })
  }
  
  // export function createPurchase (userId: string, productId: string, quantity: number, totalPrice: number) {
  //   const newPurchase : TPurchase = {userId, productId, quantity, totalPrice}
  //   purchases.push(newPurchase)
  //   console.log("Compra realizada com sucesso");
  // }
  
  export function getAllPurchasesFromUserId (id: string) : TPurchase[] | undefined {
    return purchases.filter((purchase) => {
        return purchase.id === id
    })

}