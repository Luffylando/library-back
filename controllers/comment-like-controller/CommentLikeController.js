const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class CommentLikeController extends BaseController {
  constructor(commentLikeService) {
    super();
    this.path = "/commentLikes";
    this.router = express.Router();
    this.commentLikeService = commentLikeService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/:comment_id/:book_id/:user_id/:status`,
      this.getAllCommentLikes
    );
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllCommentLikes = async (req, res) => {
    try {
      const book_id = req.params.book_id;
      const comment_id = req.params.comment_id;
      const user_id = req.params.user_id;
      const status = req.params.status;

      return this.ok(
        res,
        await this.commentLikeService.getAllCommentLikes(
          book_id,
          comment_id,
          user_id,
          status
        )
      );
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  //   getBookLikesByUserId = async (req, res) => {
  //     try {
  //       const book_id = req.params.book_id;
  //       const user_id = req.params.user_id;

  //       return this.ok(
  //         res,
  //         await this.bookLikeService.getBookLikesByUserId(book_id, user_id)
  //       );
  //     } catch (err) {
  //       err.name === "ModelNotFound"
  //         ? this.notFound(res)
  //         : this.internalServerError(res, err);
  //     }
  //   };

  //   addLike = async (req, res) => {
  //     try {
  //       const { user_id, book_id, liked, created } = req.body;
  //       let dataFromBody = { user_id, book_id, liked, created };

  //       console.log("controlelr ", dataFromBody);
  //       const data = await this.bookLikeService.addLike(dataFromBody);
  //       this.created(res, data);
  //     } catch (err) {
  //       err.name === "ValidationError"
  //         ? this.badRequest(res, err)
  //         : this.internalServerError(res, err);
  //     }
  //   };

  //   updateLike = async (req, res) => {
  //     //Update
  //     try {
  //       const id = req.params.id;
  //       const { liked, created } = req.body;
  //       const data = await this.bookLikeService.updateLike(id, liked, created);
  //       this.ok(res, { updated: data });
  //     } catch (err) {
  //       err.name === "ModelNotFound"
  //         ? this.notFound(res)
  //         : this.internalServerError(res, err);
  //     }
  //   };
  // }

  //   deleteBook = async (req,res) => {
  //     try {
  //       const id = req.params.id;
  //       const data = await this.bookService.deleteBook(id);
  //       this.ok(res, { delete: data });
  //     } catch (err) {
  //       err.name === "ModelNotFound"
  //         ? this.notFound(res)
  //         : this.internalServerError(res, err);
  //     }
  //     }
}

module.exports = CommentLikeController;
