# API de E-Commerce - Backend Completo

## Índice
- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Endpoints da API](#endpoints-da-api)
  - [Gerenciamento de Usuários](#gerenciamento-de-usuários)
  - [Gerenciamento de Categorias](#gerenciamento-de-categorias)
  - [Gerenciamento de Produtos](#gerenciamento-de-produtos)
  - [Gerenciamento de Carrinho](#gerenciamento-de-carrinho)
  - [Gerenciamento de Pedidos](#gerenciamento-de-pedidos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Contribuição](#contribuição)

## Descrição do Projeto

Sistema completo de backend para e-commerce desenvolvido com Node.js, Express e MongoDB. Esta API oferece autenticação de usuários, catálogo de produtos, funcionalidades de carrinho de compras e processamento de pedidos com autenticação segura via JWT.

## Funcionalidades

- **Autenticação de Usuários**: Cadastro e login seguro com JWT
- **Gestão de Produtos**: Operações CRUD completas para produtos
- **Sistema de Categorias**: Organização de produtos em categorias
- **Carrinho de Compras**: Carrinho persistente com cálculo automático de total
- **Processamento de Pedidos**: Conversão de carrinhos em pedidos com rastreamento
- **API RESTful**: Endpoints padronizados com verbos HTTP adequados
- **Tratamento de Erros**: Respostas de erro detalhadas e registro em log

## Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Banco de Dados**: MongoDB, Mongoose ODM
- **Autenticação**: JWT, bcryptjs
- **Outras**: dotenv, jsonwebtoken

## Endpoints da API

### Gerenciamento de Usuários

#### Registrar Usuário
`POST /api/users/register`
```json
{
  "nome": "string",
  "email": "string",
  "senha": "string"
}
```
- Sucesso: 201 Created
- Erros: 400 (Usuário existe), 500 (Erro no servidor)

#### Login do Usuário
`POST /api/users/login`
```json
{
  "email": "string",
  "senha": "string"
}
```
- Retorna token JWT
- Erros: 401 (Credenciais inválidas), 500 (Erro no servidor)

#### Listar Todos Usuários
`GET /api/users`
- Retorna: Array de usuários (sem senhas)
- Requer privilégios de admin

#### Obter Usuário Atual
`GET /api/users/me`
- Retorna dados do usuário autenticado
- Requer token JWT válido

#### Atualizar Usuário
`PUT /api/users/:id`
```json
{
  "nome": "string",
  "email": "string",
  "senha": "string" (opcional)
}
```
- Requer token JWT válido (apenas próprio perfil)
- Sucesso: 200 com usuário atualizado

#### Deletar Usuário
`DELETE /api/users/:id`
- Requer token JWT válido (apenas próprio perfil)
- Sucesso: 200 com confirmação

### Gerenciamento de Categorias

#### Criar Categoria
`POST /api/category`
```json
{
  "nome": "string"
}
```
- Sucesso: 201 com nova categoria
- Erros: 400 (Nome faltando), 500

#### Listar Todas Categorias
`GET /api/category`
- Retorna: Array de todas categorias

#### Atualizar Categoria
`PUT /api/category/:id`
```json
{
  "nome": "string"
}
```
- Sucesso: 200 com categoria atualizada
- Erros: 404 (Não encontrada), 500

#### Deletar Categoria
`DELETE /api/category/:id`
- Sucesso: 200 com confirmação
- Erros: 404 (Não encontrada), 500

### Gerenciamento de Produtos

#### Criar Produto
`POST /api/products`
```json
{
  "nome": "string",
  "descricao": "string",
  "preco": number,
  "categoria": "string (ID)",
  "estoque": number
}
```
- Sucesso: 201 com novo produto
- Erros: 500

#### Listar Todos Produtos
`GET /api/products`
- Retorna: Array de todos produtos com categoria populada

#### Deletar Produto
`DELETE /api/products/:id`
- Sucesso: 200 com produto deletado
- Erros: 404 (Não encontrado), 500

### Gerenciamento de Carrinho

#### Adicionar ao Carrinho
`POST /api/cart/add`
```json
{
  "usuario": "string (ID)",
  "produto": "string (ID)",
  "quantidade": number
}
```
- Cria novo carrinho ou atualiza existente
- Calcula total automaticamente
- Retorna: Objeto completo do carrinho

#### Obter Carrinho do Usuário
`GET /api/cart/:usuario`
- Retorna: Carrinho completo com produtos
- 404 se carrinho estiver vazio

#### Remover do Carrinho
`DELETE /api/cart/:usuario/:produto`
- Reduz quantidade ou remove item
- Recalcula total
- Retorna: Carrinho atualizado

### Gerenciamento de Pedidos

#### Criar Pedido
`POST /api/orders`
```json
{
  "usuario": "string (ID)"
}
```
- Converte carrinho em pedido
- Limpa carrinho do usuário
- Retorna: Detalhes do novo pedido

#### Obter Pedidos do Usuário
`GET /api/orders/:userId`
- Retorna: Array de pedidos com detalhes de produtos
- Ordenado por data (mais recente primeiro)

## Instalação

1. Clonar repositório:
```bash
git clone https://github.com/seu-repo/ecommerce-api.git
cd ecommerce-api
```

2. Instalar dependências:
```bash
npm install
```

3. Configurar variáveis de ambiente (ver abaixo)

4. Iniciar servidor:
```bash
npm start
```

## Variáveis de Ambiente

Criar arquivo `.env` com:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=sua_chave_secreta_jwt
PORT=5000
```

## Contribuição

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request
