const CommentLikes = require("../../models/comments_likes/CommentsLikes");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class CommentLikeService {
  fields = ["id", "book_id", "user_id", "comment_id", "liked", "created"];

  async getAllCommentLikes(book_id, comment_id, user_id, state) {
    const data = await CommentLikes.query()
      .count("liked", 1)
      .where({ book_id: book_id })
      .andWhere({ comment_id: comment_id })
      .andWhere({ user_id: user_id })
      .andWhere("liked", "=", state);
    data === undefined ? modelNotFoundError() : null;

    return Object.values(data[0]);
  }

  // async getBookLikesByUserId(book_id, user_id) {
  //   const data = await BooksLikes.query()
  //     .select(...this.fields)
  //     .where({ book_id: book_id })
  //     .andWhere({ user_id: user_id });
  //   data === undefined ? modelNotFoundError() : null;
  //   return data;
  // }

  // async addLike(data) {
  //   const like = await BooksLikes.query().insert({
  //     user_id: data.user_id,
  //     book_id: data.book_id,
  //     liked: data.liked,
  //     created: data.created
  //   });
  //   return {
  //     like
  //   };
  // }

  // async updateLike(id, liked, created) {
  //   const like = await BooksLikes.query()
  //     .findById(id)
  //     .patch({ liked, created });
  //   like === 0 ? modelNotFoundError() : null;
  //   return like;
  // }
}

module.exports = CommentLikeService;
