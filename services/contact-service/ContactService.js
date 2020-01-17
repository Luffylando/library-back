const Contacts = require("../../models/contacts/Contacts");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");
const mailer = require("../../utilities/mailer/Mailer");

class ContactService {
  fields = ["id", "firstName", "lastName", "email", "message"];

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

  async getPaginatedMessages(paginationNumber = 1) {
    let offset;

    paginationNumber < 2 ? (offset = 0) : (offset = (paginationNumber - 1) * 5);
    return await Contacts.query()
      .select(...this.fields)
      .from("contacts")
      .limit(5)
      .offset(offset)
      .orderBy("id", "desc");
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
}

module.exports = ContactService;
