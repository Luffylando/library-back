const { Model } = require("objection");
const {
  getMYSQLFormattedJoinDate,
  getMYSQLFormattedEndDate
} = require("../../utilities/date-parser/date-parser");

class Orders extends Model {
  static get tableName() {
    return "orders";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["book_id", "user_id", "status"],
      properties: {
        id: { type: "integer" },
        book_id: { type: "integer" },
        user_id: { type: "integer" },
        status: {
          type: "string",
          enum: ["requested", "shipped", "declined"]
        },
        updated: { type: "string", default: getMYSQLFormattedJoinDate() },
        created: { type: "string", default: getMYSQLFormattedEndDate() }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = Orders;
