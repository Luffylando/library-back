const { Model } = require("objection");

class Books extends Model {
  static get tableName() {
    return "books";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "author", "genre"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 2, maxLength: 100 },
        author: { type: "string", minLength: 2, maxLength: 100 },
        quote: { type: "string", minLength: 2, maxLength: 100 },
        status: { type: "boolean", default: true },
        highlighted: { type: "boolean", default: false },
        borrowCount: { type: "integer", default: 0 },
        image: { type: "string", minLength: 0, default: "" },
        archived: { type: "boolean", default: false },
        genre: {
          type: "string",
          enum: ["Romance", "History", "Crime", "Philosophy", "Belatristics"]
        }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = Books;
