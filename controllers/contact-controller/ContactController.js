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
    this.router.post(`${this.path}/email`, this.sendContactMessage);
    this.router.post(`${this.path}/formMessage`, this.sendFormMessage);



  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

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
  }


  sendContactMessage = async (req,res) => {
    try {
      const data = await this.contactService.sendContactMessage();
      this.ok(res, { contactMessageData: data});

    }catch(err){
      err.name === "ModelNotFound"
      ? this.notFound(res)
      : this.internalServerError(res, err);
    }
  }
}

module.exports = ContactController;
