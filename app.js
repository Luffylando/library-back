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
const ContactController = require("./controllers/contact-controller/ContactController");


// Services
const UserService = require("./services/user-service/UserService");
const BookService = require("./services/book-service/BookService");
const ContactService = require("./services/contact-service/ContactService");


const app = new App(
  [
    new FrontPageController(),
    new UserController(new UserService()),
    new BookController(new BookService()),
    new ContactController(new ContactService()),

  ],
  HOST,
  PORT
);

app.listen();
