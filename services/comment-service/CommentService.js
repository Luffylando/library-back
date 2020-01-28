const Comments = require("../../models/comments/Comments");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class CommentService {
  fields = ["id", "book_id", "user_id", "comment", "created"];

  async getAllComments() {
    return await Comments.query().select(...this.fields);
  }

  async getCommentsById(id) {
    const data = await Comments.query()
      .select(...this.fields)
      .findById(id);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async getCommentsByBookId(book_id) {
    const data = await Comments.query()
      .select(
        "comments.id",
        "comments.user_id",
        "comments.book_id",
        "comments.comment",
        "comments.created",
        "users.firstName",
        "users.lastName",
        "users.image"
      )
      .from("comments")
      .innerJoin("users", "comments.user_id", "users.id")
      .where({ book_id: book_id });
    data === undefined ? modelNotFoundError() : null;

    return [data];
  }

  async addComment(data) {
    const comment = await Comments.query().insert({
      book_id: data.book_id,
      user_id: data.user_id,
      comment: data.comment,
      created: data.created
    });
    return {
      comment
    };
  }
  async editComment(id, comment, created) {
    const data = await Comments.query()
      .findById(id)
      .patch({ comment, created });
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  async deleteComment(id) {
    const data = await Comments.query()
      .findById(id)
      .del();
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  //   async searchBook(keyword, tag) {
  //     let data;
  //     if (tag === "tag" && keyword === "keyword") {
  //       data = await Books.query()
  //         .where(`title`, "like", `%%`)
  //         .orWhere("author", "like", `%%`)
  //         .orWhere("genre", "like", `%%`);
  //     } else if (keyword !== "keyword" && tag === "tag") {
  //       data = await Books.query()
  //         .where(`title`, "like", `%${keyword}%`)
  //         .orWhere("author", "like", `%${keyword}%`)
  //         .orWhere("genre", "like", `%${keyword}%`);
  //     } else if (tag !== "tag" && keyword === "keyword") {
  //       data = await Books.query().where(`${tag}`, "like", `%%`);
  //     } else {
  //       data = await Books.query().where(`${tag}`, "like", `%${keyword}%`);
  //     }
  //     data === 0 ? modelNotFoundError() : null;
  //     return data;
  //   }
}

module.exports = CommentService;
