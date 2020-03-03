const Events = require("../../models/events/Events");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");

class EventService {
  fields = [
    "id",
    "eventName",
    "eventDate",
    "eventDescription",
    "eventCreator",
    "eventStatus",
    "eventImage",
    "highlighted",
    "interestedCount",
    "eventCreated",
    "eventUpdated"
  ];

  async getAllEvents() {
    return await Events.query().select(...this.fields);
  }

  async getEventById(id) {
    const data = await Events.query()
      .select(...this.fields)
      .findById(id);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async getHighlightedEvents() {
    const data = await Events.query()
      .select(...this.fields)
      .where({ highlighted: true })
      .andWhere({ eventStatus: "comming" })
      .limit(4);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async addEvent(data) {
    const event = await Events.query().insert({
      eventName: data.eventName,
      eventDescription: data.eventDescription,
      eventCreator: data.eventCreator,
      eventDate: data.eventDate,
      eventCreated: data.eventCreated,
      eventUpdated: data.eventUpdated,
      highlighted: data.highlighted,

      eventImage: data.eventImage
    });
    return { event };
  }

  async editEvent(
    id,
    eventName,
    eventDescription,
    eventCreator,
    eventDate,
    eventUpdated,
    eventImage,
    highlighted
  ) {
    const data = await Events.query()
      .findById(id)
      .patch({
        eventName,
        eventDescription,
        eventCreator,
        eventDate,
        eventUpdated,
        eventImage,
        highlighted
      });
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  async deleteEvent(id) {
    const data = await Events.query()
      .findById(id)
      .del();
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  // async interestedCount(id) {
  //   const data = await Events.query()
  //     .findById(id)
  //     .del();
  //   data === 0 ? modelNotFoundError() : null;
  //   return data;
  // }
}

module.exports = EventService;
