const { Model } = require("objection");
const {
  getMYSQLFormattedJoinDate,
  getMYSQLFormattedEndDate
} = require("../../utilities/date-parser/date-parser");

class Comments extends Model {
  static get tableName() {
    return "comments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["book_id", "user_id", "comment"],
      properties: {
        id: { type: "integer" },
        book_id: { type: "integer" },
        user_id: { type: "integer" },
        comment: { type: "string", minLength: 5 },
        created: { type: "string", default: getMYSQLFormattedJoinDate() }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = Comments;
