const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class ContactController extends BaseController {
  constructor(contactService) {
    super();
    this.path = "/contact";
    this.router = express.Router();
    this.contactService = contactService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllContactMessages);
    this.router.get(`${this.path}/:id`, this.getMessageById);
    this.router.post(`${this.path}/email`, this.sendContactMessage);
    this.router.post(`${this.path}/formMessage`, this.sendFormMessage);
    this.router.put(
      `${this.path}/message/update/:id`,
      this.updateContactMessage
    );

    this.router.get(
      `${this.path}/messages/:paginationNumber/:itemsPerPage`,
      this.getPaginatedMessages
    );
    this.router.get(
      `${this.path}/messages/answered`,
      this.getAllAnsweredMessages
    );
    this.router.get(
      `${this.path}/messages/answered/:paginationNumber/:itemsPerPage`,
      this.getAllAnsweredMessagesPaginated
    );
    this.router.get(
      `${this.path}/messages/archived`,
      this.getAllArchivedMessages
    );
    this.router.get(
      `${this.path}/messages/archived/:paginationNumber/:itemsPerPage`,
      this.getAllArchivedMessagesPaginated
    );
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllContactMessages = async (req, res) => {
    try {
      return this.ok(res, await this.contactService.getAllContactMessages());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getMessageById = async (req, res) => {
    try {
      const id = req.params.id;
      return this.ok(res, await this.contactService.getMessageById(id));
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  getPaginatedMessages = async (req, res) => {
    try {
      const paginationNumber = req.params.paginationNumber;
      const itemsPerPage = req.params.itemsPerPage;

      return this.ok(
        res,
        await this.contactService.getPaginatedMessages(
          paginationNumber,
          itemsPerPage
        )
      );
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  sendFormMessage = async (req, res) => {
    try {
      const { firstName, lastName, email, message } = req.body;
      let dataFromBody = { firstName, lastName, email, message };
      const data = await this.contactService.sendFormMessage(dataFromBody);
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };

  sendContactMessage = async (req, res) => {
    try {
      const { mailerTo, mailerSubject, mailerText } = req.body;

      let dataFromBody = { mailerTo, mailerSubject, mailerText };

      const data = await this.contactService.sendContactMessage(dataFromBody);

      this.ok(res, { contactMessageData: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  updateContactMessage = async (req, res) => {
    try {
      const { answered, archived } = req.body;
      const id = req.params.id;

      let dataFromBody = { id, answered, archived };

      const data = await this.contactService.updateContactMessage(dataFromBody);

      this.ok(res, { updateContactMessage: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  getAllAnsweredMessages = async (req, res) => {
    try {
      return this.ok(res, await this.contactService.getAllAnsweredMessages());
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  getAllAnsweredMessagesPaginated = async (req, res) => {
    try {
      const paginationNumber = req.params.paginationNumber;
      const itemsPerPage = req.params.itemsPerPage;

      return this.ok(
        res,
        await this.contactService.getAllAnsweredMessagesPaginated(
          paginationNumber,
          itemsPerPage
        )
      );
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  getAllArchivedMessages = async (req, res) => {
    try {
      return this.ok(res, await this.contactService.getAllArchivedMessages());
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  getAllArchivedMessagesPaginated = async (req, res) => {
    try {
      const paginationNumber = req.params.paginationNumber;
      const itemsPerPage = req.params.itemsPerPage;

      return this.ok(
        res,
        await this.contactService.getAllArchivedMessagesPaginated(
          paginationNumber,
          itemsPerPage
        )
      );
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = ContactController;
