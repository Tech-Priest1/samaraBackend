# Projeto de Carrinho de Compras

Este é um projeto backend para um sistema de carrinho de compras desenvolvido para uma avaliação academica usando Node.js, MongoDB e Mongoose. O sistema permite que os usuários adicionem, removam e visualizem produtos em seus carrinhos, com o total atualizado automaticamente. Além disso, o projeto inclui uma API RESTful para gerenciar as operações de carrinho.

## Funcionalidades

- **Adicionar produtos ao carrinho**: Permite que os usuários adicionem produtos ao carrinho, com a quantidade especificada.
- **Visualizar carrinho**: Permite que os usuários vejam o conteúdo do carrinho com todos os produtos e o total calculado.
- **Remover produtos do carrinho**: Permite que os usuários removam produtos do carrinho, atualizando o total automaticamente.
- **Atualização automática do total**: Sempre que um produto é adicionado ou removido, o total do carrinho é recalculado.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework web para construir a API.
- **MongoDB**: Banco de dados NoSQL para armazenar dados de carrinho e produtos.
- **Mongoose**: Biblioteca ODM para interagir com o MongoDB.
- **Nanoid**: Gerador de IDs curtos e únicos.

## Endpoints da API

### 1. Adicionar produto ao carrinho

- **URL**: `/api/cart/add`
- **Método**: `POST`
- **Corpo da requisição**:
  ```json
  {
    "usuario": "ID do usuário",
    "produto": "ID do produto",
    "quantidade": número de unidades
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "_id": "ID do carrinho",
    "usuario": "ID do usuário",
    "produtos": [
      {
        "produto": "ID do produto",
        "quantidade": quantidade,
        "_id": "ID do produto no carrinho"
      }
    ],
    "total": valor total
  }
  ```
- **Resposta de Erro**:
  - `400`: Caso a quantidade não seja fornecida.
  - `500`: Erro interno no servidor.

### 2. Obter carrinho de um usuário

- **URL**: `/api/cart/:usuario`
- **Método**: `GET`
- **Parâmetros**: `usuario` (ID do usuário)
- **Resposta de Sucesso**:
  ```json
  {
    "_id": "ID do carrinho",
    "usuario": "ID do usuário",
    "produtos": [
      {
        "produto": "ID do produto",
        "quantidade": quantidade,
        "_id": "ID do produto no carrinho"
      }
    ],
    "total": valor total
  }
  ```
- **Resposta de Erro**:
  - `404`: Carrinho não encontrado.
  - `500`: Erro interno no servidor.

### 3. Remover produto do carrinho

- **URL**: `/api/cart/:usuario/:produto`
- **Método**: `DELETE`
- **Parâmetros**:
  - `usuario`: ID do usuário.
  - `produto`: ID do produto a ser removido.
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Produto removido do carrinho",
    "cart": {
      "_id": "ID do carrinho",
      "usuario": "ID do usuário",
      "produtos": [
        {
          "produto": "ID do produto",
          "quantidade": quantidade,
          "_id": "ID do produto no carrinho"
        }
      ],
      "total": valor total
    }
  }
  ```
- **Resposta de Erro**:
  - `404`: Produto não encontrado no carrinho.
  - `500`: Erro interno no servidor.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` na raiz do projeto com a variável de ambiente `MONGO_URI` para a URL do seu banco de dados MongoDB:
   ```env
   MONGO_URI=mongodb://localhost:27017/nome-do-banco
   ```

5. Execute o servidor:
   ```bash
   npm start
   ```

Agora, a API estará funcionando na URL `http://localhost:5000`.

## Contribuições

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b minha-branch`).
3. Faça as modificações necessárias e commite (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie para o seu fork (`git push origin minha-branch`).
5. Abra um pull request.

---

Esse README oferece uma visão geral clara sobre o funcionamento da aplicação e como utilizá-la, além de permitir que outros contribuam para o projeto.
