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

Aqui está uma descrição detalhada de como cada parte do seu backend é utilizada, com base no código fornecido. Você pode usar essa descrição para criar o README do seu projeto.

---

## Endpoints da API

### 1. **Adicionar produto ao carrinho**

- **URL**: `/api/cart/add`
- **Método**: `POST`
- **Descrição**: Adiciona um produto ao carrinho de um usuário. Se o carrinho já existir, o produto será adicionado ou a quantidade será atualizada. Se o carrinho não existir, um novo carrinho será criado.
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

### 2. **Obter carrinho de um usuário**

- **URL**: `/api/cart/:usuario`
- **Método**: `GET`
- **Descrição**: Retorna o carrinho de compras de um usuário específico, incluindo os produtos adicionados e o valor total.
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

### 3. **Remover produto do carrinho**

- **URL**: `/api/cart/:usuario/:produto`
- **Método**: `DELETE`
- **Descrição**: Remove um produto específico do carrinho de um usuário. O valor total do carrinho é recalculado após a remoção.
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

### 4. **Criar uma categoria**

- **URL**: `/api/category`
- **Método**: `POST`
- **Descrição**: Cria uma nova categoria de produtos.
- **Corpo da requisição**:
  ```json
  {
    "nome": "Nome da categoria"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Categoria criada",
    "category": {
      "_id": "ID da categoria",
      "nome": "Nome da categoria"
    }
  }
  ```
- **Resposta de Erro**:
  - `400`: Caso o nome não seja fornecido.
  - `500`: Erro interno no servidor.

### 5. **Listar todas as categorias**

- **URL**: `/api/category`
- **Método**: `GET`
- **Descrição**: Retorna uma lista de todas as categorias cadastradas.
- **Resposta de Sucesso**:
  ```json
  {
    "categories": [
      {
        "_id": "ID da categoria",
        "nome": "Nome da categoria"
      }
    ]
  }
  ```
- **Resposta de Erro**:
  - `500`: Erro interno no servidor.

### 6. **Atualizar uma categoria**

- **URL**: `/api/category/:id`
- **Método**: `PUT`
- **Descrição**: Atualiza o nome de uma categoria existente.
- **Parâmetros**: `id` (ID da categoria)
- **Corpo da requisição**:
  ```json
  {
    "nome": "Novo nome da categoria"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Categoria atualizada",
    "category": {
      "_id": "ID da categoria",
      "nome": "Novo nome da categoria"
    }
  }
  ```
- **Resposta de Erro**:
  - `400`: Caso o nome não seja fornecido.
  - `404`: Categoria não encontrada.
  - `500`: Erro interno no servidor.

### 7. **Deletar uma categoria**

- **URL**: `/api/category/:id`
- **Método**: `DELETE`
- **Descrição**: Remove uma categoria do sistema.
- **Parâmetros**: `id` (ID da categoria)
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Categoria deletada"
  }
  ```
- **Resposta de Erro**:
  - `404`: Categoria não encontrada.
  - `500`: Erro interno no servidor.

### 8. **Criar um pedido**

- **URL**: `/api/orders`
- **Método**: `POST`
- **Descrição**: Cria um novo pedido com base nos produtos no carrinho do usuário. Após a criação do pedido, o carrinho é esvaziado.
- **Corpo da requisição**:
  ```json
  {
    "usuario": "ID do usuário"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Pedido criado com sucesso",
    "order": {
      "_id": "ID do pedido",
      "usuario": "ID do usuário",
      "produtos": [
        {
          "produto": "ID do produto",
          "quantidade": quantidade,
          "precoUnitario": preço unitário
        }
      ],
      "total": valor total
    }
  }
  ```
- **Resposta de Erro**:
  - `404`: Carrinho não encontrado.
  - `500`: Erro interno no servidor.

### 9. **Criar um produto**

- **URL**: `/api/products`
- **Método**: `POST`
- **Descrição**: Cria um novo produto no sistema.
- **Corpo da requisição**:
  ```json
  {
    "nome": "Nome do produto",
    "descricao": "Descrição do produto",
    "preco": preço,
    "categoria": "ID da categoria",
    "estoque": quantidade em estoque
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Produto criado com sucesso",
    "product": {
      "_id": "ID do produto",
      "nome": "Nome do produto",
      "descricao": "Descrição do produto",
      "preco": preço,
      "categoria": "ID da categoria",
      "estoque": quantidade em estoque
    }
  }
  ```
- **Resposta de Erro**:
  - `500`: Erro interno no servidor.

### 10. **Listar todos os produtos**

- **URL**: `/api/products`
- **Método**: `GET`
- **Descrição**: Retorna uma lista de todos os produtos cadastrados.
- **Resposta de Sucesso**:
  ```json
  [
    {
      "_id": "ID do produto",
      "nome": "Nome do produto",
      "descricao": "Descrição do produto",
      "preco": preço,
      "categoria": "ID da categoria",
      "estoque": quantidade em estoque
    }
  ]
  ```
- **Resposta de Erro**:
  - `500`: Erro interno no servidor.

### 11. **Deletar um produto**

- **URL**: `/api/products/:id`
- **Método**: `DELETE`
- **Descrição**: Remove um produto do sistema.
- **Parâmetros**: `id` (ID do produto)
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Produto deletado com sucesso",
    "product": {
      "_id": "ID do produto",
      "nome": "Nome do produto",
      "descricao": "Descrição do produto",
      "preco": preço,
      "categoria": "ID da categoria",
      "estoque": quantidade em estoque
    }
  }
  ```
- **Resposta de Erro**:
  - `404`: Produto não encontrado.
  - `500`: Erro interno no servidor.

### 12. **Registrar um usuário**

- **URL**: `/api/users/register`
- **Método**: `POST`
- **Descrição**: Registra um novo usuário no sistema.
- **Corpo da requisição**:
  ```json
  {
    "nome": "Nome do usuário",
    "email": "Email do usuário",
    "senha": "Senha do usuário"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Usuário registrado com sucesso"
  }
  ```
- **Resposta de Erro**:
  - `400`: Usuário já existe.
  - `500`: Erro interno no servidor.

### 13. **Login do usuário**

- **URL**: `/api/users/login`
- **Método**: `POST`
- **Descrição**: Autentica um usuário e retorna um token JWT para acesso às rotas protegidas.
- **Corpo da requisição**:
  ```json
  {
    "email": "Email do usuário",
    "senha": "Senha do usuário"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "token": "Token JWT"
  }
  ```
- **Resposta de Erro**:
  - `401`: Credenciais inválidas.
  - `500`: Erro interno no servidor.

### 14. **Listar todos os usuários**

- **URL**: `/api/users`
- **Método**: `GET`
- **Descrição**: Retorna uma lista de todos os usuários cadastrados.
- **Resposta de Sucesso**:
  ```json
  [
    {
      "_id": "ID do usuário",
      "nome": "Nome do usuário",
      "email": "Email do usuário"
    }
  ]
  ```
- **Resposta de Erro**:
  - `500`: Erro interno no servidor.

---

## GraphQL Endpoint

- **URL**: `/graphql`
- **Método**: `POST`
- **Descrição**: Permite consultas GraphQL para acessar e manipular dados de categorias.
- **Exemplo de Consulta**:
  ```graphql
  query {
    categories {
      _id
      nome
    }
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "data": {
      "categories": [
        {
          "_id": "ID da categoria",
          "nome": "Nome da categoria"
        }
      ]
    }
  }
  ```

---


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
