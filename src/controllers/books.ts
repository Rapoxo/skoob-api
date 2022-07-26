import fetch from "../lib/fetch";
import { WithId } from "mongodb";
import connect from "../utils/connect";

import { Book, SearchResult, SkoobResponse, SkoobBook } from "../@types";
import { getBookISBN } from "../utils/amazon";

/** Retorna lista de livros que contém o termo passado como parâmetro  */
async function getBooksByTitle(title: string, limit: number | undefined): Promise<Array<Book>> {
  const { results } = await fetch<SearchResult>(`/search/v1?q=${title}&limit=${limit || 3}`);
  return results;
}

/** Retorna detalhes do livro com id passado como parâmetro */
async function getBookById(bookId: string): Promise<Book | WithId<Book>> {
  const db = await connect();
  const book = await db.collection<Book>("books").findOne({ id: parseInt(bookId) });
  if (book) return book;
  console.log("Book not found in database. Fetching from Skoob...");
  const { response } = await fetch<SkoobResponse<SkoobBook>>(`/v1/book/${bookId}`);
  const newBook = await formatBook(response);
  await db.collection<Book>("books").insertOne(newBook);
  return newBook;
}

/** Transforma o livro retornado pelo Skoob em um livro com melhor formatação */
async function formatBook(book: any): Promise<Book> {
  const { id, livro_id, titulo, subtitulo, ano, paginas, autor, sinopse, editora, capa_grande, url } = book;
  const isbn = await getBookISBN(url);

  const formattedBook: Book = {
    id,
    book_id: livro_id,
    title: titulo,
    subtitle: subtitulo,
    year: ano,
    pages: paginas,
    author: autor,
    synopsis: sinopse.trim(),
    publisher: editora,
    skoob_url: url,
    cover: capa_grande,
    isbn_10: isbn ? isbn[0] : null,
    isbn_13: isbn ? isbn[1] : null,
    // amazon_url,
    // preco: amazon_url ? await getBookPrice(amazon_url) : null,
  };

  return formattedBook;
}

export { getBooksByTitle, getBookById };
