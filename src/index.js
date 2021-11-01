// -------------------------------------- Imports ------------------------------------- //
import express from "express"
import { readProducts, createProducts, updateProducts, deleteProducts } from "./services/productServices"
import { readClient, createClient, updateClient, deleteClient } from "./services/clientServices";
import productsController from "./controllers/products";
import clientsController from "./controllers/clients";

// -------------------------------------- Activate Functions ------------------------------------- //

const app = express();
app.use(express.json());

productsController(app);
clientsController(app);

// -------------------------------------- Product ------------------------------------ //

//readProduct()

// createProducts(
//     {
//         "category": "Alimento",
//         "valor": 10,
//         "inventory": 20
//     }
// );


// updateProducts(
//     {
//         "inventory": 12,
//         "id": 1
//     }
// );

// deleteProducts({
//     "id": 1
// })

// -------------------------------------- Client ------------------------------------- //

//readClient()

//  createClient(
//     {
//         "pago": false
//     }
// )


// updateClient(
//     {
//         "products": 1,
//         "pagos": false
//     }
// )

// deleteClient({
//     "produtos": 1
// })


// -------------------------------------- Listen ------------------------------------- //
app.listen(3000)

