const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class BookController extends BaseController {
  constructor(bookService) {
    super();
    this.path = "/books";
    this.router = express.Router();
    this.bookService = bookService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllBooks);
    this.router.get(`${this.path}/:id`, this.getBookById);
    this.router.post(`${this.path}/add`, this.addBook);
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllBooks = async (req, res) => {
    try {
      return this.ok(res, await this.bookService.getAllBooks());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getBookById = async (req, res) => {
    try {
      const id = req.params.id;
      return this.ok(res, await this.bookService.getBookById(id));
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  addBook = async (req, res) => {
    try {
      const { author, title, genre, image } = req.body;
      let dataFromBody = { author, title, genre, image };
      const data = await this.bookService.addBook(dataFromBody);
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = BookController;
