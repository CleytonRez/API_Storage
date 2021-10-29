import express from "express"
import { readProducts, createProducts, updateProducts, deleteProducts } from "./services/productServices"
import { readClient, createClient, updateClient, deleteClient } from "./services/clientServices";
import productsController from "./controllers/products";

const app = express();
app.use(express.json());

//productsController(app);

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

deleteClient({
    "produtos": 1
})

app.listen(3000)

