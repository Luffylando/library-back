const { Model } = require("objection");
const {
  getMYSQLFormattedJoinDate,
  getMYSQLFormattedEndDate
} = require("../../utilities/date-parser/date-parser");

class EventsInterested extends Model {
  static get tableName() {
    return "events_interested";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "event_id", "interested"],
      properties: {
        id: { type: "integer" },
        event_id: { type: "integer" },
        user_id: { type: "integer" },
        interested: {
          type: "string",
          enum: ["interested", "neutral"]
        },
        created: { type: "string", default: getMYSQLFormattedJoinDate() }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = EventsInterested;
