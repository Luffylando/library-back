const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

class App {
  constructor(controllers, host, port) {
    this.app = express();
    this.host = host;
    this.port = port;
    this.controllers = controllers;
    this.app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));

    this.initializeMiddleware();
    this.initializeControllers();
  }

  initializeMiddleware() {
    this.app.use(cors());
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  initializeControllers() {
    this.controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  getAppRoutes() {
    const routes = [];
    this.controllers.forEach(controller =>
      controller.getRoutes().forEach(route => routes.push(route))
    );
    return routes;
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on: ${this.host}:${this.port}`);
    });
  }
}

module.exports = App;
