import { request, response } from "express";
import { createClient, deleteClient, readClient, updateClient } from "../services/clientServices";

export default (app) => {
    if (app) {
        app.get("/client", async (request, response) => {
            const data = {
                // Resposta que inicia funcao "readclient".

                response: await readClient()
            }
            // Retorna as informacoes para o usuario.
            response.json(data);
        })

        // Funcao que cria novas informacoes para o Objeto.
        app.post("/client", async (request, response) => {

            // Obtem dados do body.
            const body = request.body

            // Variavel que inicia funcao de criacao de client.
            const idCreateClient = createClient(body);

            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idCreateClient
                }
            )
        })

        // Funcao que Altera/Update das informacoes no Objeto.
        app.put("/client/:id", async (request, response) => {
            // Obtem dados do body.
            const body = request.body

            // Obtem id do paramentro.
            const id = request.params.id;

            // Converte a String para Number.
            body.id = Number(id)

            // Chama funcao de Update "updateclient"
            const idUpdateClient = await updateClient(body);
            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idUpdateClient
                }
            )

        })
        // Funcao que Deleta algum (client) conjunto de informacoes no Objeto.
        app.delete("/client/:id", async (request, response) => {

            // Variavel que pega e converte o ID do parametro para NUMBER.
            const id = Number(request.params.id)

            // Variavel que inicia a funcao "deleteclient".
            const idDeleteClient = await deleteClient(id);
            // Retornar 201 como status e ...
            response.status(201).json(
                {
                    // ... Seta as informacoes da funcao.
                    response: idDeleteClient
                }
            )
        })
    };
};

