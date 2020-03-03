const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class BookController extends BaseController {
  constructor(bookService) {
    super();
    this.path = "/books";
    this.router = express.Router();
    this.bookService = bookService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllBooks);
    this.router.get(`${this.path}/unarchived`, this.getAllUnarchivedBooks);
    this.router.get(`${this.path}/archived`, this.getAllArchivedBooks);
    this.router.get(`${this.path}/highlighted`, this.getAllHighlightedBooks);
    this.router.get(`${this.path}/:id`, this.getBookById);
    this.router.post(`${this.path}/add`, this.addBook);
    this.router.put(`${this.path}/edit/:id`, this.editBook);
    this.router.post(`${this.path}/imgUpload`, this.imgUpload);
    this.router.delete(`${this.path}/delete/:id`, this.deleteBook);
    this.router.get(`${this.path}/search/:keyword/:tag`, this.searchBook);
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllBooks = async (req, res) => {
    try {
      return this.ok(res, await this.bookService.getAllBooks());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getAllUnarchivedBooks = async (req, res) => {
    try {
      return this.ok(res, await this.bookService.getAllUnarchivedBooks());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getAllArchivedBooks = async (req, res) => {
    try {
      return this.ok(res, await this.bookService.getAllArchivedBooks());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getAllHighlightedBooks = async (req, res) => {
    try {
      return this.ok(res, await this.bookService.getAllHighlightedBooks());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getBookById = async (req, res) => {
    try {
      const id = req.params.id;
      return this.ok(res, await this.bookService.getBookById(id));
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  addBook = async (req, res) => {
    try {
      const { author, title, genre, quote, image, highlighted } = req.body;
      let dataFromBody = { author, title, genre, quote, image, highlighted };
      const data = await this.bookService.addBook(dataFromBody);
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
      `/home/luffy/www/library/front/public/books/${fullImageName}`,
      err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        res.json({
          fileName: file.name,
          fullName: fullImageName,
          filePath: `/books/${file.name}`,
          type: file.mimetype
        });
      }
    );
  };

  editBook = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        author,
        title,
        genre,
        quote,
        image,
        archived,
        highlighted
      } = req.body;
      const data = await this.bookService.editBook(
        id,
        author,
        title,
        genre,
        quote,
        image,
        archived,
        highlighted
      );
      this.ok(res, { updated: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  deleteBook = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await this.bookService.deleteBook(id);
      this.ok(res, { delete: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  searchBook = async (req, res) => {
    try {
      const keyword = req.params.keyword;
      const tag = req.params.tag;

      const data = await this.bookService.searchBook(keyword, tag);
      this.ok(res, { search: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = BookController;
