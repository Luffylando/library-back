const Borrow = require("../../models/borrows/Borrows");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class BorrowService {
  fields = ["id", "book_id", "user_id", "status", "created", "updated"];

  async getAllBorrows() {
    return await Borrow.query().select(...this.fields);
  }

  async getBorrowById(id) {
    const data = await Borrow.query()
      .select(...this.fields)
      .findById(id);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async borrowRequest(data) {
    const borrow = await Borrow.query().insert({
      book_id: data.book_id,
      user_id: data.user_id,
      status: data.status,
      created: data.created,
      updated: data.updated
    });
    return {
      borrow
    };
  }

  async updateBorrow(id, status) {
    const data = await Borrow.query()
      .findById(id)
      .patch({ status });
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  async checkIfUserAlreadyBorrowed(book_id, user_id) {
    const data = await Borrow.query()
      .count()
      .where({ book_id: book_id })
      .andWhere({ user_id: user_id });
    data === 0 ? modelNotFoundError() : null;
    return Object.values(data[0]);
  }
}

module.exports = BorrowService;
