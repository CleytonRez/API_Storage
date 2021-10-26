import express from "express"
import { readProdutos } from "./services/jsonServices"
import { createProdutos } from "./services/jsonServices"
import { updateProdutos } from "./services/jsonServices"
import { deleteProdutos } from "./services/jsonServices"
import produtosController from "./controllers/produtos";

const app = express();
app.use(express.json());

produtosController(app);

// createProdutos(
//     {
//         "category": "Alimento",
//         "valor": 10,
//         "inventory": 20
//     }
// );


// updateProdutos(
//     {
//         "inventory": 12,
//         "id": 1
//     }
// );

// deleteProdutos({
//     "id": 1
// })

app.listen(3000)

