const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class OrderController extends BaseController {
  constructor(orderService) {
    super();
    this.path = "/orders";
    this.router = express.Router();
    this.orderService = orderService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllOrders);
    this.router.get(`${this.path}/:id`, this.getOrderById);
    this.router.post(`${this.path}/add`, this.orderRequest);
    this.router.put(`${this.path}/update/:id`, this.updateOrder);
    this.router.get(
      `${this.path}/check/:book_id/:user_id`,
      this.checkIfUserAlreadyBought
    );
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllOrders = async (req, res) => {
    try {
      return this.ok(res, await this.orderService.getAllOrders());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getOrderById = async (req, res) => {
    try {
      const id = req.params.id;
      return this.ok(res, await this.orderService.getOrderById(id));
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  orderRequest = async (req, res) => {
    try {
      const { book_id, user_id, status, created, updated } = req.body;
      let dataFromBody = { book_id, user_id, status, created, updated };
      const data = await this.orderService.orderRequest(dataFromBody);
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };

  updateOrder = async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const data = await this.orderService.updateOrder(id, status);
      this.ok(res, { updated: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  checkIfUserAlreadyBought = async (req, res) => {
    try {
      let book_id = req.params.book_id;
      let user_id = req.params.user_id;
      const data = await this.orderService.checkIfUserAlreadyBought(
        book_id,
        user_id
      );
      this.ok(res, { CheckIfExists: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = OrderController;
