const { Model } = require("objection");
const {
  getMYSQLFormattedJoinDate,
  getMYSQLFormattedEndDate
} = require("../../utilities/date-parser/date-parser");

class BooksLikes extends Model {
  static get tableName() {
    return "books_likes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "book_id", "liked"],
      properties: {
        id: { type: "integer" },
        book_id: { type: "integer" },
        user_id: { type: "integer" },
        liked: {
          type: "string",
          enum: ["liked", "unliked", "neutral"]
        },
        created: { type: "string", default: getMYSQLFormattedJoinDate() }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = BooksLikes;
