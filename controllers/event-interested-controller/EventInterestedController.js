const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class EventInterestedController extends BaseController {
  constructor(eventInterestedService) {
    super();
    this.path = "/eventInterested";
    this.router = express.Router();
    this.eventInterestedService = eventInterestedService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/:event_id/:status`,
      this.getAllEventInterested
    );
    this.router.get(`${this.path}/:event_id`, this.getByEventId);
    this.router.get(
      `${this.path}/single/:event_id/:user_id`,
      this.getEventByIdAndByUserId
    );

    this.router.get(
      `${this.path}/check/:event_id/:user_id`,
      this.getEventsInterestedByUserId
    );
    this.router.post(`${this.path}/insert`, this.addInterested);
    this.router.put(`${this.path}/update/:id`, this.updateInterested);
    this.router.delete(`${this.path}/delete/:event_id`, this.deleteByEventId);
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllEventInterested = async (req, res) => {
    try {
      const event_id = req.params.event_id;
      const status = req.params.status;
      return this.ok(
        res,
        await this.eventInterestedService.getAllEventInterested(
          event_id,
          status
        )
      );
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getEventByIdAndByUserId = async (req, res) => {
    try {
      const event_id = req.params.event_id;
      const user_id = req.params.user_id;
      return this.ok(
        res,
        await this.eventInterestedService.getEventByIdAndByUserId(
          event_id,
          user_id
        )
      );
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getByEventId = async (req, res) => {
    try {
      const event_id = req.params.event_id;
      return this.ok(
        res,
        await this.eventInterestedService.getByEventId(event_id)
      );
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getEventsInterestedByUserId = async (req, res) => {
    try {
      const event_id = req.params.event_id;
      const user_id = req.params.user_id;

      return this.ok(
        res,
        await this.eventInterestedService.getEventsInterestedByUserId(
          event_id,
          user_id
        )
      );
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  addInterested = async (req, res) => {
    try {
      const { user_id, event_id, interested, created } = req.body;
      let dataFromBody = {
        user_id: parseInt(user_id),
        event_id: parseInt(event_id),
        interested,
        created
      };
      const data = await this.eventInterestedService.addInterested(
        dataFromBody
      );
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };

  updateInterested = async (req, res) => {
    //Update
    try {
      const id = req.params.id;
      const { interested, created } = req.body;
      const data = await this.eventInterestedService.updateInterested(
        id,
        interested,
        created
      );
      this.ok(res, { updated: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
  deleteByEventId = async (req, res) => {
    try {
      const event_id = req.params.event_id;
      const data = await this.eventInterestedService.deleteByEventId(event_id);
      this.ok(res, { delete: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = EventInterestedController;
