const App = require("./server/boot");
const HOST = "https://library-back-od.herokuapp.com" || "http://localhost";
const PORT = process.env.PORT || 4000;

// const HOST = "localhost";
// const PORT = 4000;

//Bootstrap Objection

const knex = require("knex");
const { Model } = require("objection");
Model.knex(knex(require("./knexfile").development));

// Controllers
const FrontPageController = require("./controllers/front-page-controller/FrontPageController");
const UserController = require("./controllers/user-controller/UserController");
const BookController = require("./controllers/book-controller/BookController");
const ContactController = require("./controllers/contact-controller/ContactController");
const CommentController = require("./controllers/comment-controller/CommentController");
const BookLikeController = require("./controllers/book-like-controller/BookLikeController");
const OrderController = require("./controllers/order-controller/OrderController");
const BorrowController = require("./controllers/borrow-controller/BorrowController");
const EventController = require("./controllers/event-controller/EventController");
const EventInterestedController = require("./controllers/event-interested-controller/EventInterestedController");

// const CommentLikeController = require("./controllers/comment-like-controller/CommentLikeController");

// Services
const UserService = require("./services/user-service/UserService");
const BookService = require("./services/book-service/BookService");
const ContactService = require("./services/contact-service/ContactService");
const CommentService = require("./services/comment-service/CommentService");
const BookLikeService = require("./services/book-like-service/BookLikeService");
const OrderService = require("./services/order-service/OrderService");
const BorrowService = require("./services/borrow-service/BorrowService");
const EventService = require("./services/event-service/EventService");
const EventInterestedService = require("./services/event-interested-service/EventInterestedService");

// const CommentLikeService = require("./services/comment-like-service/CommentLikeService");

const app = new App(
  [
    new FrontPageController(),
    new UserController(new UserService()),
    new BookController(new BookService()),
    new ContactController(new ContactService()),
    new CommentController(new CommentService()),
    new BookLikeController(new BookLikeService()),
    new OrderController(new OrderService()),
    new BorrowController(new BorrowService()),
    new EventController(new EventService()),
    new EventInterestedController(new EventInterestedService())

    // new CommentLikeController(new CommentLikeService())
  ],
  HOST,
  PORT
);

app.listen();
