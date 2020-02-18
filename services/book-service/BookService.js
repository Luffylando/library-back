const Books = require("../../models/books/Books");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class BookService {
  fields = [
    "id",
    "title",
    "author",
    "genre",
    "quote",
    "status",
    "archived",
    "borrowCount",
    "image"
  ];

  async getAllBooks() {
    return await Books.query().select(...this.fields);
  }

  async getAllUnarchivedBooks() {
    const data = await Books.query()
      .select(...this.fields)
      .where({ archived: false });
    data === undefined ? modelNotFoundError() : null;

    return data;
  }
  async getAllArchivedBooks() {
    const data = await Books.query()
      .select(...this.fields)
      .where({ archived: true });
    data === undefined ? modelNotFoundError() : null;

    return data;
  }

  async getBookById(id) {
    const data = await Books.query()
      .select(...this.fields)
      .findById(id);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async getAllHighlightedBooks() {
    const data = await Books.query()
      .select(...this.fields)
      .where({ highlighted: true })
      .limit(4);
    data === undefined ? modelNotFoundError() : null;

    return data;
  }

  async addBook(data) {
    const book = await Books.query().insert({
      author: data.author,
      title: data.title,
      genre: data.genre,
      quote: data.quote,
      image: data.image
    });
    return {
      book
    };
  }
  async editBook(id, author, title, genre, quote, image, archived) {
    const data = await Books.query()
      .findById(id)
      .patch({ author, title, genre, image, quote, archived });
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  async deleteBook(id) {
    const data = await Books.query()
      .findById(id)
      .del();
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  async searchBook(keyword, tag) {
    let data;
    if (tag === "tag" && keyword === "keyword") {
      data = await Books.query()
        .where(`title`, "like", `%%`)
        .orWhere("author", "like", `%%`)
        .orWhere("genre", "like", `%%`);
    } else if (keyword !== "keyword" && tag === "tag") {
      data = await Books.query()
        .where(`title`, "like", `%${keyword}%`)
        .orWhere("author", "like", `%${keyword}%`)
        .orWhere("genre", "like", `%${keyword}%`);
    } else if (tag !== "tag" && keyword === "keyword") {
      data = await Books.query().where(`${tag}`, "like", `%%`);
    } else {
      data = await Books.query().where(`${tag}`, "like", `%${keyword}%`);
    }
    data === 0 ? modelNotFoundError() : null;
    return data;
  }
}

module.exports = BookService;
