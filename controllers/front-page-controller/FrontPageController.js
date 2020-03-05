const express = require("express");
const fs = require("fs");
const BaseController = require("../base-controller/BaseController");
const publicKeyPath = `${__dirname}/../../keys/public.pem`;
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class FrontPageController extends BaseController {
  constructor() {
    super();
    this.path = "/";
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.greeting);
    this.router.get(`${this.path}key`, this.getPublicKey);
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  greeting = (req, res) => {
    this.ok(res, {
      uptime: process.uptime(),
      message: "Library Backend Online!",
      status: this.OK,
      test: res
    });
  };

  getPublicKey = (req, res) => {
    this.ok(res, { key: fs.readFileSync(publicKeyPath, { encoding: "utf8" }) });
  };
}

module.exports = FrontPageController;
