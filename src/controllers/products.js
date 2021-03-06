import { request, response } from "express";
import { createProducts, deleteProducts, readProducts, updateProducts } from "../services/productServices";

export default (app) => {
    if (app) {
        app.get("/products", async (request, response) => {
            const data = {
                // Resposta que inicia funcao "readProducts".

                response: await readProducts()
            }
            // Retorna as informacoes para o usuario.
            response.json(data);
        })

        // Funcao que cria novas informacoes para o Objeto.
        app.post("/products", async (request, response) => {

            // Obtem dados do body.
            const body = request.body

            // Variavel que inicia funcao de criacao de Products.
            const idCreateProduct = createProducts(body);

            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idCreateProduct
                }
            )
        })

        // Funcao que Altera/Update das informacoes no Objeto.
        app.put("/products/:id", async (request, response) => {
            // Obtem dados do body.
            const body = request.body

            // Obtem id do paramentro.
            const id = request.params.id;

            // Converte a String para Number.
            body.id = Number(id)

            // Chama funcao de Update "updateProduct"
            const idUpdateProduct = await updateProducts(body);
            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idUpdateProduct
                }
            )

        })
        // Funcao que Deleta algum (Product) conjunto de informacoes no Objeto.
        app.delete("/products/:id", async (request, response) => {

            // Variavel que pega e converte o ID do parametro para NUMBER.
            const id = Number(request.params.id)

            // Variavel que inicia a funcao "deleteProduct".
            const idDeleteProduct = await deleteProducts(id);
            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idDeleteProduct
                }
            )
        })
    };
};

