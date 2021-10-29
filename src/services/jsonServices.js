// Importa os pacotes usados.
import fs from "fs";
import util from "util";
const path = "./src/models/produtos.json";

// Declarando as variaveis com as funcoes READ e WRITE.
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Funcao que le o objeto.
export const readProdutos = async () => {
    try {

        // Variavel que contem o OBJ de produtos.json.
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

// Funcao que Cria Produtos - Passa novas informacoes para serem salvas. 
export const createProdutos = async (produtoCreate) => {
    try {

        // Carregar o documento produto.json.
        const file = await readFile(path, "utf8");

        // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
        const parseJSON = JSON.parse(file);
        const dataJSON = parseJSON;

        // Adicionar produto na lista -  Cria ID aleatorio .
        produtoCreate.id = Math.random();
        console.log(produtoCreate);

        // Adicionou as informaçoes no JSON
        dataJSON.data.push(produtoCreate);

        // Fazer o .Stringify do objeto.
        const jsonStringify = JSON.stringify(dataJSON)
        console.log(jsonStringify);

        // Subescrever o arquivo produto.json.
        writeFile(path, jsonStringify)
    } catch (e) {
        console.log(e)
    }
}

// Recebe um OBJ com os novos dados, encontra-lo no JSON e atualizar as informacoes.
export const updateProdutos = async (produtoUpdate) => {
    try {
        // Carregar o documento produto.json.
        const file = await readFile(path, "utf8");

        // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
        const parseJSON = JSON.parse(file);
        const dataJSON = parseJSON;

        // Variavel que cria nova lista.
        const newListProdutos = dataJSON.data.map((produto) => {
            // buscar o produto pelo ID .map quando achar, retorna aquele produto com os valores substituidos.
            if (produto.id === produtoUpdate.id) {

                // Se id for igual add a lista Object.assign
                return Object.assign({}, produto, produtoUpdate)
            }
            return produto;
        });

        console.log(newListProdutos)
        // Fazer o .Stringfy do objeto.
        const jsonStringify = JSON.stringify(
            {
                data: newListProdutos
            }
        )
        console.log(jsonStringify);

        writeFile(path, jsonStringify)

        //return id
        return produtoUpdate.id

    } catch (e) {
        console.log(e)
    }
}

// Funcao que Deleta um Produto e suas INF pelo ID.
export const deleteProdutos = async (produtoDelete) => {
    try {
        // Carregar o documento produto.json.
        const file = await readFile(path, "utf8");

        const parseJSON = JSON.parse(file);
        const dataJSON = parseJSON;

        // Cria uma newList vazia.
        const newListProdutos = []

        // buscar o produto pelo ID .forEach quando achar, cria um if e se for diferente ele adiciona na lista .
        dataJSON.data.forEach((produto) => {

            // Se id for diferente add na newList
            if (produto.id !== produtoDelete)
                newListProdutos.push(produto)
        });
        console.log(newListProdutos)

        // Fazer o .Stringfy do objeto.
        const jsonStringify = JSON.stringify(
            {
                data: newListProdutos
            }
        )
        console.log(jsonStringify);

        // Subescreve o OBJ principal pela nova lista.
        writeFile(path, jsonStringify)

        // Retorna o ID.
        return produtoDelete.id;

    } catch (e) {
        console.log(e)
    }
}






