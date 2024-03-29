const BooksLikes = require("../../models/books_likes/BooksLikes");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class BookLikeService {
  fields = ["id", "book_id", "user_id", "liked", "created"];

  async getAllBookLikes(book_id, state) {
    const data = await BooksLikes.query()
      .count("liked", 1)
      .where({ book_id: book_id })
      .andWhere("liked", "=", state);
    data === undefined ? modelNotFoundError() : null;

    return Object.values(data[0]);
  }

  async getByBookId(book_id) {
    const data = await BooksLikes.query()
      .select(...this.fields)
      .where({ book_id: book_id });
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async getBookLikesByUserId(book_id, user_id) {
    const data = await BooksLikes.query()
      .select(...this.fields)
      .where({ book_id: book_id })
      .andWhere({ user_id: user_id });
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async addLike(data) {
    const like = await BooksLikes.query().insert({
      user_id: data.user_id,
      book_id: data.book_id,
      liked: data.liked,
      created: data.created
    });
    return {
      like
    };
  }

  async updateLike(id, liked, created) {
    const like = await BooksLikes.query()
      .findById(id)
      .patch({ liked, created });
    like === 0 ? modelNotFoundError() : null;
    return like;
  }

  async deleteByBookId(book_id) {
    const like = await BooksLikes.query()
      .where("book_id", book_id)
      .del();
    like === 0 ? modelNotFoundError() : null;
    return like;
  }
}

module.exports = BookLikeService;
