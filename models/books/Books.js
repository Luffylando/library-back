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
        image: { type: "string", minLength: 5 },
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
