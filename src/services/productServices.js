// Importa os pacotes usados.
import fs from "fs";
import util from "util";
const path = "./src/models/products.json";
const pathClient = "./src/models/client.json"

// Declarando as variaveis com as funcoes READ e WRITE.
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Funcao que le o objeto.
export const readProducts = async () => {
    try {

        // Variavel que contem o OBJ de products.json.
        const file = await readFile(path, "utf8");

        // Converte JSON -> JS .
        const parseJSON = JSON.parse(file);

        // Variavel data com o valor do parsed
        const dataRead = parseJSON;

        console.log(dataRead)
        // Retorna o conteudo data dentro do parseJSON
        return dataRead.data


    } catch (e) {
        console.log(e)
    }
}

// Funcao que Cria Products - Passa novas informacoes para serem salvas. 
export const createProducts = async (productCreate) => {
    try {

        // Carregar o documento product.json.
        const file = await readFile(path, "utf8");

        // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
        const parseJSON = JSON.parse(file);
        const dataJSON = parseJSON;

        // Adicionar product na lista -  Cria ID aleatorio .
        productCreate.id = Math.random();
        console.log(productCreate);

        // Adicionou as informaçoes no JSON
        dataJSON.data.push(productCreate);

        // Fazer o .Stringify do objeto.
        const jsonStringify = JSON.stringify(dataJSON)
        console.log(jsonStringify);

        // Subescrever o arquivo product.json.
        writeFile(path, jsonStringify)
    } catch (e) {
        console.log(e)
    }
}

// Recebe um OBJ com os novos dados, encontra-lo no JSON e atualizar as informacoes.
export const updateProducts = async (productUpdate) => {
    try {
        // Carregar o documento product.json.
        const file = await readFile(path, "utf8");

        // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
        const parseJSON = JSON.parse(file);
        const dataJSON = parseJSON;

        // Variavel que cria nova lista.
        const newListProducts = dataJSON.data.map((product) => {
            // buscar o product pelo ID .map quando achar, retorna aquele product com os valores substituidos.
            if (product.id === productUpdate.id) {

                // Se id for igual add a lista Object.assign
                return Object.assign({}, product, productUpdate)
            }
            return product;
        });

        console.log(newListProducts)
        // Fazer o .Stringfy do objeto.
        const jsonStringify = JSON.stringify(
            {
                data: newListProducts
            }
        )
        console.log(jsonStringify);

        writeFile(path, jsonStringify)

        //return id
        return productUpdate.id

    } catch (e) {
        console.log(e)
    }
}

// Funcao que Deleta um Product e suas INF pelo ID.
export const deleteProducts = async (productDelete) => {
    try {
        // Carregar o documento product.json.
        const file = await readFile(path, "utf8");

        const parseJSON = JSON.parse(file);
        const dataJSON = parseJSON;

        // Cria uma newList vazia.
        const newListProducts = []

        // buscar o product pelo ID .forEach quando achar, cria um if e se for diferente ele adiciona na lista .
        dataJSON.data.forEach((product) => {

            // Se id for diferente add na newList
            if (product.id !== productDelete)
                newListProducts.push(product)
        });
        console.log(newListProducts)

        // Fazer o .Stringfy do objeto.
        const jsonStringify = JSON.stringify(
            {
                data: newListProducts
            }
        )
        console.log(jsonStringify);

        // Subescreve o OBJ principal pela nova lista.
        writeFile(path, jsonStringify)

        // Retorna o ID.
        return productDelete.id;

    } catch (e) {
        console.log(e)
    }
}







