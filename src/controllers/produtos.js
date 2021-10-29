import { request, response } from "express";
import { createProdutos, deleteProdutos, readProdutos, updateProdutos } from "../services/jsonServices";

export default (app) => {
    if (app) {
        app.get("/produtos", async (request, response) => {
            const data = {
                // Resposta que inicia funcao "readProdutos".

                response: await readProdutos()
            }
            // Retorna as informacoes para o usuario.
            response.json(data);
        })

        // Funcao que cria novas informacoes para o Objeto.
        app.post("/produtos", async (request, response) => {

            // Obtem dados do body.
            const body = request.body

            // Variavel que inicia funcao de criacao de Produtos.
            const idCreateProduto = createProdutos(body);

            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idCreateProduto
                }
            )
        })

        // Funcao que Altera/Update das informacoes no Objeto.
        app.put("/produtos/:id", async (request, response) => {
            // Obtem dados do body.
            const body = request.body

            // Obtem id do paramentro.
            const id = request.params.id;

            // Converte a String para Number.
            body.id = Number(id)

            // Chama funcao de Update "updateProduto"
            const idUpdateProduto = await updateProdutos(body);
            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idUpdateProduto
                }
            )

        })
        // Funcao que Deleta algum (Produto) conjunto de informacoes no Objeto.
        app.delete("/produtos/:id", async (request, response) => {

            // Variavel que pega e converte o ID do parametro para NUMBER.
            const id = Number(request.params.id)

            // Variavel que inicia a funcao "deleteProduto".
            const idDeleteProduto = await deleteProdutos(id);
            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idDeleteProduto
                }
            )
        })
    };
};

