const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class EventController extends BaseController {
  constructor(eventService) {
    super();
    this.path = "/events";
    this.router = express.Router();
    this.eventService = eventService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
    this.router.get(`${this.path}/highlighted`, this.getHighlightedEvents);
    this.router.get(`${this.path}/:id`, this.getEventById);
    this.router.post(`${this.path}/add`, this.addEvent);
    this.router.post(`${this.path}/imgUpload`, this.imgUpload);
    this.router.put(`${this.path}/edit/:id`, this.editEvent);
    this.router.delete(`${this.path}/delete/:id`, this.deleteEvent);
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllEvents = async (req, res) => {
    try {
      return this.ok(res, await this.eventService.getAllEvents());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getEventById = async (req, res) => {
    try {
      const id = req.params.id;
      return this.ok(res, await this.eventService.getEventById(id));
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  getHighlightedEvents = async (req, res) => {
    try {
      return this.ok(res, await this.eventService.getHighlightedEvents());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  addEvent = async (req, res) => {
    try {
      const {
        eventName,
        eventDescription,
        eventDate,
        eventCreator,
        eventImage
      } = req.body;
      let dataFromBody = {
        eventName,
        eventDescription,
        eventDate,
        eventCreator,
        eventImage
      };
      const data = await this.eventService.addEvent(dataFromBody);
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };

  imgUpload = async (req, res) => {
    if (req.files === null || req.files === undefined) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    let imageType = file.mimetype.split("/");
    let imgType = "";
    let imgName = file.name.substring(0, file.name.length - 4);
    imageType[1] === "jpeg" ? (imgType = "jpg") : (imgType = imageType[1]);

    let timeStampString = new Date().getTime();
    let fullImageName = imgName + timeStampString + "." + imgType;
    file.mv(
      `/home/luffy/www/library/front/public/events/${fullImageName}`,
      err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        res.json({
          fileName: file.name,
          fullName: fullImageName,
          filePath: `/events/${file.name}`,
          type: file.mimetype
        });
      }
    );
  };

  editEvent = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        eventName,
        eventDescription,
        eventCreator,
        eventDate,
        eventUpdated,
        eventImage
      } = req.body;
      const data = await this.eventService.editEvent(
        id,
        eventName,
        eventDescription,
        eventCreator,
        eventDate,
        eventUpdated,
        eventImage
      );
      this.ok(res, { updated: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  deleteEvent = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await this.eventService.deleteEvent(id);
      this.ok(res, { delete: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = EventController;
