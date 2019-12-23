const App = require("./server/boot");
const HOST = "http://localhost";
const PORT = 4000;

//Bootstrap Objection

const knex = require("knex");
const { Model } = require("objection");
Model.knex(knex(require("./knexfile").development));

// Controllers
const FrontPageController = require("./controllers/front-page-controller/FrontPageController");
const UserController = require("./controllers/user-controller/UserController");
const BookController = require("./controllers/book-controller/BookController");

// Services
const UserService = require("./services/user-service/UserService");
const BookService = require("./services/book-service/BookService");

const app = new App(
  [
    new FrontPageController(),
    new UserController(new UserService()),
    new BookController(new BookService())
  ],
  HOST,
  PORT
);

app.listen();
