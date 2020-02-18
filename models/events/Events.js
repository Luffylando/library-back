const { Model } = require("objection");
const {
  getMYSQLFormattedJoinDate,
  getMYSQLFormattedEndDate
} = require("../../utilities/date-parser/date-parser");

class Events extends Model {
  static get tableName() {
    return "events";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["eventName", "eventDate", "eventCreator"],
      properties: {
        id: { type: "integer" },
        eventName: { type: "string", minLength: 2, maxLength: 100 },
        eventDescription: { type: "string", minLength: 2, maxLength: 100 },
        eventCreator: { type: "string", minLength: 2, maxLength: 100 },
        eventStatus: {
          type: "string",
          enum: ["comming", "finished"],
          default: "comming"
        },
        highlighted: { type: "boolean", default: false },
        eventImage: { type: "string", minLength: 0, default: "" },

        eventDate: { type: "string", default: getMYSQLFormattedJoinDate() },
        eventCreated: { type: "string", default: getMYSQLFormattedJoinDate() },
        eventUpdated: { type: "string", default: getMYSQLFormattedJoinDate() }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = Events;
