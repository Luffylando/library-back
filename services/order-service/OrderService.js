const Order = require("../../models/orders/Orders");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class OrderService {
  fields = ["id", "book_id", "user_id", "status", "created", "updated"];

  async getAllOrders() {
    return await Order.query().select(...this.fields);
  }

  async getOrderById(id) {
    const data = await Order.query()
      .select(...this.fields)
      .findById(id);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async orderRequest(data) {
    const order = await Order.query().insert({
      book_id: data.book_id,
      user_id: data.user_id,
      status: data.status,
      created: data.created,
      updated: data.updated
    });
    return {
      order
    };
  }

  async updateOrder(id, status) {
    const data = await Order.query()
      .findById(id)
      .patch({ status });
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  async checkIfUserAlreadyBought(book_id, user_id) {
    const data = await Order.query()
      .count()
      .where({ book_id: book_id })
      .andWhere({ user_id: user_id });
    data === 0 ? modelNotFoundError() : null;
    return Object.values(data[0]);
  }
}

module.exports = OrderService;
