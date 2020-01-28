const Contacts = require("../../models/contacts/Contacts");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");
const mailer = require("../../utilities/mailer/Mailer");

class ContactService {
  fields = [
    "id",
    "firstName",
    "lastName",
    "email",
    "message",
    "answered",
    "archived"
  ];

  async getAllContactMessages() {
    return await Contacts.query().select(...this.fields);
  }

  async getMessageById(id) {
    const data = await Contacts.query()
      .select(...this.fields)
      .findById(id);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async sendFormMessage(data) {
    let reciveDate = new Date()
      .toJSON()
      .slice(0, 19)
      .replace("T", " ");

    const formMessage = await Contacts.query().insert({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      message: data.message,
      reciveDate: reciveDate
    });
    return {
      formMessage
    };
  }

  async sendContactMessage(data) {
    const mail = await mailer.sendContactUsMessage({
      to: data.mailerTo,
      subject: data.mailerSubject,
      text: data.mailerText
    });
    return {
      mail
    };
  }

  async updateContactMessage(data) {
    let id = data.id;
    let answered = data.answered;
    let archived = data.archived;
    const update = await Contacts.query()
      .findById(id)
      .patch({ answered, archived });
    update === 0 ? modelNotFoundError() : null;
    return update;
  }

  async getPaginatedMessages(paginationNumber = 1, itemsPerPage) {
    let offset;

    paginationNumber < 2
      ? (offset = 0)
      : (offset = (paginationNumber - 1) * itemsPerPage);
    return await Contacts.query()
      .select(...this.fields)
      .from("contacts")
      .limit(itemsPerPage)
      .offset(offset)
      .orderBy("id", "desc");
  }

  async getAllAnsweredMessages() {
    return await Contacts.query()
      .select(...this.fields)
      .where({ answered: true });
  }

  async getAllAnsweredMessagesPaginated(paginationNumber = 1, itemsPerPage) {
    let offset;

    paginationNumber < 2
      ? (offset = 0)
      : (offset = (paginationNumber - 1) * itemsPerPage);
    return await Contacts.query()
      .select(...this.fields)
      .from("contacts")
      .limit(itemsPerPage)
      .offset(offset)
      .orderBy("id")
      .where({
        answered: true
      });
  }
}

module.exports = ContactService;
