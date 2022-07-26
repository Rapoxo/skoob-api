# Skoob API (WIP 🛠️)

Esta API foi criada para ajudar a desenvolver aplicações que utilizam informações do [Skoob](https://skoob.com.br).

A API utiliza uma mistura de informações da API do Skoob e web scraping no site da Amazon para obter mais detalhes sobre o livro.

## Tecnologias

[Node.js](https://nodejs.org/) [Express.js](https://expressjs.com/) [Typescript](https://www.typescriptlang.org/) [MongoDB](https://www.mongodb.com/)

## Rotas da API

| Rota                                      | Descrição                                                                                                            | Tipo de retorno  |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :--------------- |
| `/reviews/user/${userId}`                 | Retorna todas as resenhas de um usuário                                                                              | `Array<Review>`  |
| `/reviews/book/${bookId}`                 | Retorna todas as resenhas de um livro                                                                                | `Array<Reviews>` |
| `/book/${bookId}`                         | Retorna os dados de um livro,                                                                                        | `Book`           |
| `/book/${bookId}/price?tag=${amazon_tag}` | Retorna preço e link da Amazon de um livro. `${amazon_tag}` Pode ser usada para adicionar link de afiliado da amazon | `Price`          |
| `/user/${userId}`                         | Retorna os dados de um usuário                                                                                       | `User`           |
| `/user/${userId}/bookshelf`               | Retorna estante de livros de um usuário                                                                              | `Bookshelf`      |
| `/search/book/${query}?limit=${limit}`    | Retorna `${limit}` livros que contenham o termo `${query}`. O limite padrão é de 3 livros                            | `Array<Book>`    |

## Variáveis de ambiente

- `SKOOB_AUTH` - Cookies de autenticação de uma conta Skoob
  - Para conseguir os cookies, acesse o [Skoob](https://skoob.com.br), faça login, ou crie uma conta, e depois use `document.cookie` no console para copiar os cookies.
- `MONGO_URI` - URI do banco de dados MongoDB
  - Exemplo: `mongodb://localhost:27017/skoob`

## Todo list

- [x] Rota de livros
- [x] Rota de busca
- [x] Web scraping Amazon
- [x] Rota de usuários
- [x] Implementar MongoDB
- [ ] Rota de resenhas
  - [x] Listar todas as resenhas de um usuário
  - [ ] Listar todas as resenhas de um livro

## Bugs conhecidos

- Por enquanto nenhum bug foi encontrado. Mas se você encontrar um, por favor, envie um [issue](https://github.com/Rapoxo/skoob-api/issues/new)
