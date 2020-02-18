const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class BookLikeController extends BaseController {
  constructor(bookLikeService) {
    super();
    this.path = "/bookLikes";
    this.router = express.Router();
    this.bookLikeService = bookLikeService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/:book_id/:status`, this.getAllBookLikes);
    this.router.get(`${this.path}/:book_id`, this.getByBookId);

    this.router.get(
      `${this.path}/check/:book_id/:user_id`,
      this.getBookLikesByUserId
    );
    this.router.post(`${this.path}/insert`, this.addLike);
    this.router.put(`${this.path}/update/:id`, this.updateLike);
    this.router.delete(`${this.path}/delete/:book_id`, this.deleteByBookId);
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllBookLikes = async (req, res) => {
    try {
      const book_id = req.params.book_id;
      const status = req.params.status;
      return this.ok(
        res,
        await this.bookLikeService.getAllBookLikes(book_id, status)
      );
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getByBookId = async (req, res) => {
    try {
      const book_id = req.params.book_id;
      return this.ok(res, await this.bookLikeService.getByBookId(book_id));
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getBookLikesByUserId = async (req, res) => {
    try {
      const book_id = req.params.book_id;
      const user_id = req.params.user_id;

      return this.ok(
        res,
        await this.bookLikeService.getBookLikesByUserId(book_id, user_id)
      );
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  addLike = async (req, res) => {
    try {
      const { user_id, book_id, liked, created } = req.body;
      let dataFromBody = {
        user_id: parseInt(user_id),
        book_id: parseInt(book_id),
        liked,
        created
      };
      const data = await this.bookLikeService.addLike(dataFromBody);
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };

  updateLike = async (req, res) => {
    //Update
    try {
      const id = req.params.id;
      const { liked, created } = req.body;
      const data = await this.bookLikeService.updateLike(id, liked, created);
      this.ok(res, { updated: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
  deleteByBookId = async (req, res) => {
    try {
      const book_id = req.params.book_id;
      const data = await this.bookLikeService.deleteByBookId(book_id);
      this.ok(res, { delete: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = BookLikeController;
