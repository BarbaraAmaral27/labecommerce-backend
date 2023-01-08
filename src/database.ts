import { TUser, TProduct, TPurchase } from "./types";

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
        category: "cadernos",
    },
    {
        id: "2",
        name: "agenda",
        price: 30,
        category: "agendas",
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