const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class CommentController extends BaseController {
  constructor(commentService) {
    super();
    this.path = "/comments";
    this.router = express.Router();
    this.commentService = commentService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllComments);
    this.router.get(`${this.path}/:id`, this.getCommentsById);
    this.router.get(`${this.path}/bookId/:bookId`, this.getCommentsByBookId);
    this.router.post(`${this.path}/add`, this.addComment);
    this.router.put(`${this.path}/edit/:id`, this.editComment);

    this.router.delete(`${this.path}/delete/:id`, this.deleteComment);
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllComments = async (req, res) => {
    try {
      return this.ok(res, await this.commentService.getAllComments());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getCommentsById = async (req, res) => {
    try {
      const id = req.params.id;
      return this.ok(res, await this.commentService.getCommentsById(id));
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  getCommentsByBookId = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      return this.ok(
        res,
        await this.commentService.getCommentsByBookId(bookId)
      );
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  addComment = async (req, res) => {
    try {
      const { book_id, user_id, comment, created } = req.body;
      let dataFromBody = { book_id, user_id, comment, created };
      const data = await this.commentService.addComment(dataFromBody);
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };

  deleteComment = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await this.commentService.deleteComment(id);
      this.ok(res, { delete: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  editComment = async (req, res) => {
    try {
      const id = req.params.id;
      const { comment, created } = req.body;
      const data = await this.commentService.editComment(id, comment, created);
      this.ok(res, { updated: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = CommentController;
