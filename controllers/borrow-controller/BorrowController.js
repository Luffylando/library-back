const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class BorrowController extends BaseController {
  constructor(borrowService) {
    super();
    this.path = "/borrows";
    this.router = express.Router();
    this.borrowService = borrowService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllBorrows);
    this.router.get(`${this.path}/:id`, this.getBorrowById);
    this.router.post(`${this.path}/add`, this.borrowRequest);
    this.router.put(`${this.path}/update/:id`, this.updateBorrow);
    this.router.get(
      `${this.path}/check/:book_id/:user_id`,
      this.checkIfUserAlreadyBorrowed
    );
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllBorrows = async (req, res) => {
    try {
      return this.ok(res, await this.borrowService.getAllBorrows());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getBorrowById = async (req, res) => {
    try {
      const id = req.params.id;
      return this.ok(res, await this.borrowService.getBorrowById(id));
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  borrowRequest = async (req, res) => {
    try {
      const { book_id, user_id, status, created, updated } = req.body;
      let dataFromBody = { book_id, user_id, status, created, updated };
      const data = await this.borrowService.borrowRequest(dataFromBody);
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };

  updateBorrow = async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const data = await this.borrowService.updateBorrow(id, status);
      this.ok(res, { updated: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
  checkIfUserAlreadyBorrowed = async (req, res) => {
    try {
      let book_id = req.params.book_id;
      let user_id = req.params.user_id;
      const data = await this.borrowService.checkIfUserAlreadyBorrowed(
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

module.exports = BorrowController;
