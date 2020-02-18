const { Model } = require("objection");
const {
  getMYSQLFormattedJoinDate,
  getMYSQLFormattedEndDate
} = require("../../utilities/date-parser/date-parser");
const generateToken = require("../../utilities/token-generator/token-generator");

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "firstName",
        "lastName",
        "email",
        "image",
        "dob",
        "password",
        "gender",
        "role"
      ],
      properties: {
        id: { type: "integer" },
        firstName: { type: "string", minLength: 1, maxLength: 100 },
        lastName: { type: "string", minLength: 1, maxLength: 100 },
        dob: { type: "string" },
        email: { type: "string", minLength: 1, maxLength: 100 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        image: { type: "string", default: "" },
        gender: {
          type: "string",
          enum: ["Male", "Female"]
        },
        role: {
          type: "string",
          enum: ["admin", "moderator", "user", "guest"]
        },
        joinDate: { type: "string", default: getMYSQLFormattedJoinDate() },
        endDate: { type: "string", default: getMYSQLFormattedEndDate() },
        verified: { type: "boolean", default: false },
        verificationToken: {
          type: ["string", "null"],
          default: generateToken()
        },
        resetToken: { type: "string", default: generateToken() }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = Users;
