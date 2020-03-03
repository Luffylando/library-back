const EventInterested = require("../../models/events_interested/EventsInterested");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class EventInterestedService {
  fields = ["id", "event_id", "user_id", "interested", "created"];

  async getAllEventInterested(event_id, state) {
    const data = await EventInterested.query()
      .count("interested", 1)
      .where({ event_id: event_id })
      .andWhere("interested", "=", state);
    data === undefined ? modelNotFoundError() : null;

    return Object.values(data[0]);
  }

  async getEventByIdAndByUserId(event_id, user_id) {
    const data = await EventInterested.query()
      .select(...this.fields)
      .where({ event_id: event_id })
      .andWhere("user_id", "=", user_id);

    data === undefined ? modelNotFoundError() : null;
    return data;
  }
  async getByEventId(event_id) {
    const data = await EventInterested.query()
      .select(...this.fields)
      .where({ event_id: event_id });
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async getEventsInterestedByUserId(event_id, user_id) {
    const data = await EventInterested.query()
      .select(...this.fields)
      .where({ event_id: event_id })
      .andWhere({ user_id: user_id });
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async addInterested(data) {
    const interested = await EventInterested.query().insert({
      user_id: data.user_id,
      event_id: data.event_id,
      interested: data.interested,
      created: data.created
    });
    return {
      interested
    };
  }

  async updateInterested(id, interested, created) {
    const data = await EventInterested.query()
      .findById(id)
      .patch({ interested, created });
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  async deleteByEventId(event_id) {
    const data = await EventInterested.query()
      .where("event_id", event_id)
      .del();
    data === 0 ? modelNotFoundError() : null;
    return data;
  }
}

module.exports = EventInterestedService;
