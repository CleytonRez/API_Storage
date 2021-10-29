// Importa os pacotes usados.
import fs from "fs";
import util from "util";
const pathClient = "./src/models/client.json"

// Declarando as variaveis com as funcoes READ e WRITE.
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Funcao que le o objeto.
export const readClient = async () => {
    try {
        // Variavel que contem o OBJ de produtos.json.
        const file = await readFile(pathClient, "utf8")

        // Converte JSON -> JS .
        const parseJSON = JSON.parse(file);

        // Variavel data com o valor do parsed
        const dataRead = parseJSON;

        console.log(dataRead.data)
        // Retorna o conteudo data dentro do parseJSON
        return dataRead.data


    } catch (e) {
        console.log(e)
    }
}

// Funcao que Cria Produtos - Passa novas informacoes para serem salvas. 
export const createClient = async (clientCreate) => {

    // Carregar o documento produto.json.
    const file = await readFile(pathClient, "utf8");

    // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
    const dataJSON = JSON.parse(file)

    // Adicionar produto na lista -  Cria ID aleatorio .
    clientCreate.id = Math.random()
    console.log(clientCreate)

    // Adicionou as informaçoes no JSON
    dataJSON.data.push(clientCreate);

    // Fazer o .Stringify do objeto.
    const jsonStringify = JSON.stringify(dataJSON)
    console.log(jsonStringify)


    // Subescrever o arquivo produto.json.
    writeFile(pathClient, jsonStringify)
}

export const updateClient = async (clientUpdate) => {
    try {

        // Carregar o documento produto.json.
        const file = await readFile(pathClient, "utf8");
        console.log(file)

        // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
        const dataJSON = JSON.parse(file)

        // Variavel que cria nova lista.
        const newClientList = dataJSON.data.map((client) => {

            // buscar o produto pelo ID .map quando achar, retorna aquele produto com os valores substituidos.
            if (client.id === clientUpdate.id) {

                // Se id for igual add a lista Object.assign
                return Object.assign({}, client, clientUpdate)
            }
            return client

        })
        // Fazer o .Stringfy do objeto.
        const jsonStringify = JSON.stringify(
            {
                data: newClientList
            }
        )
        console.log(jsonStringify);

        writeFile(pathClient, jsonStringify)

        //return id
        return clientUpdate.id

    } catch (e) {
        console.log(e)
    }
}

export const deleteClient = async (clientDelete) => {
    try {
        // Carregar o documento produto.json
        const file = await readFile(pathClient, "utf8");
        console.log(file)

        // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
        const dataJSON = JSON.parse(file);

        // Cria uma newList vazia.
        const newClientList = []

        // buscar o produto pelo ID .forEach quando achar, cria um if e se for diferente ele adiciona na lista .
        dataJSON.data.forEach((client) => {

            // Se id for diferente add na newList
            if (client.id !== clientDelete.id)
                newClientList.push(client)
        });
        console.log(newClientList)

        // Fazer o .Stringfy do objeto.
        const jsonStringify = JSON.stringify(
            {
                data: newClientList
            }
        )
        console.log(jsonStringify);

        // Subescreve o OBJ principal pela nova lista.
        writeFile(pathClient, jsonStringify)

        // Retorna o ID.
        return clientDelete.id

    } catch (e) {
        console.log(e)
    }
}