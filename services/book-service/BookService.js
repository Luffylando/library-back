const Books = require("../../models/books/Books");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class BookService {
  fields = ["id", "title", "author", "genre", "image"];

  async getAllBooks() {
    return await Books.query().select(...this.fields);
  }

  async getBookById(id) {
    const data = await Books.query()
      .select(...this.fields)
      .findById(id);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async addBook(data) {
    const book = await Books.query().insert({
      author: data.author,
      title: data.title,
      genre: data.genre,
      image: data.image
    });
    return {
      book
    };
  }
}

module.exports = BookService;
