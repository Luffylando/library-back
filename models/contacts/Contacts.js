const { Model } = require("objection");

class Contacts extends Model {
  static get tableName() {
    return "contacts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "email", "message"],
      properties: {
        id: { type: "integer" },
        firstName: { type: "string", minLength: 2, maxLength: 100 },
        lastName: { type: "string", minLength: 2, maxLength: 100 },
        email: { type: "string", minLength: 7 },
        message: { type: "string", minLength: 2, maxLength: 3000 },

       
      }
    };
  }

  static get relationMappings() {}
}

module.exports = Contacts;
