// Importa os pacotes usados.
import fs from "fs";
import util from "util";
const pathClient = "./src/models/client.json"
const pathProduct = "./src/models/products.json"

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

// Funcao que Cria Cliente - Passa novas informacoes para serem salvas. 
export const createClient = async (clientCreate) => {
    try {
        // Carregar o documento clients.json.
        const file = await readFile(pathClient, "utf8");
        const fileProduct = await readFile(pathProduct, "utf-8");

        // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
        const dataJSON = JSON.parse(file)
        const dataProductsJSON = JSON.parse(fileProduct);

        const newDate = new Date(clientCreate.birthDate);

        clientCreate.products.forEach((productClient) => {
            const idProduct = dataProductsJSON.data.find((product) => {
                console.log(product)
                console.log(productClient)
                return product.id === productClient.id;
            })

            if (!idProduct) {
                throw new Error("ID do Produto não existente.")
            }
        })

        // Adicionar cliente na lista -  Cria ID aleatorio .
        clientCreate.id = Math.random()
        console.log(clientCreate)

        clientCreate.birthDate = newDate


        // Adicionou as informaçoes no JSON
        dataJSON.data.push(clientCreate);

        // Fazer o .Stringify do objeto.
        const jsonStringify = JSON.stringify(dataJSON)
        console.log(jsonStringify)


        // Subescrever o arquivo clients.json.
        writeFile(pathClient, jsonStringify)

    } catch (e) {
        console.log(e)
        throw e
    }

}

export const updateClient = async (clientUpdate) => {
    try {

        // Carregar o documento produto.json.
        const file = await readFile(pathClient, "utf8");
        const fileProduct = await readFile(pathProduct, "utf-8");
        console.log(file)

        // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
        const dataJSON = JSON.parse(file)
        const dataProductsJSON = JSON.parse(fileProduct);

        clientUpdate.products.forEach((productClient) => {
            const idProduct = dataProductsJSON.data.find((product) => {
                console.log(product)
                console.log(productClient)
                return product.id === productClient.id;
            })

            if (!idProduct) {
                throw new Error("ID do Produto não existente.")
            }
        })


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
        throw e
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
            if (client.id !== clientDelete)
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