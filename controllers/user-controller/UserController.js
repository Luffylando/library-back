const BaseController = require("../base-controller/BaseController");
const express = require("express");
const extractRouterRoutes = require("../../utilities/extract-router-routes/extract-router-routes");

class UserController extends BaseController {
  constructor(userService) {
    super();
    this.path = "/users";
    this.router = express.Router();
    this.userService = userService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.post(this.path, this.createUser);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
    this.router.post(`${this.path}/imgUpload`, this.imgUpload);
    this.router.put(`${this.path}/edit/:id`, this.updateUser);
    this.router.put(`${this.path}/verify/:id/:verificationToken`, this.verify);
    this.router.post(
      `${this.path}/request-password-reset`,
      this.requestPasswordReset
    );
    this.router.put(
      `${this.path}/reset-password/:id/:resetToken`,
      this.resetPassword
    );
    this.router.put(`${this.path}/change-password`, this.changePassword);
  }

  getRoutes() {
    return extractRouterRoutes(this.router);
  }

  getAllUsers = async (req, res) => {
    try {
      return this.ok(res, await this.userService.getAllUsers());
    } catch (err) {
      this.internalServerError(res, err);
    }
  };

  getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      return this.ok(res, await this.userService.getUserById(id));
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  createUser = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        dob,
        gender,
        email,
        password,
        image
      } = req.body;
      const data = await this.userService.createUser(
        firstName,
        lastName,
        dob,
        gender,
        email,
        password,
        image
      );
      this.created(res, data);
    } catch (err) {
      err.name === "ValidationError"
        ? this.badRequest(res, err)
        : this.internalServerError(res, err);
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const { firstName, lastName, dob, gender, email, image } = req.body;
      const data = await this.userService.updateUser(
        id,
        firstName,
        lastName,
        dob,
        gender,
        email,
        image
      );
      this.ok(res, { updated: data });
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await this.userService.login(email, password);
      this.okWithCookie(res, data, "token", data.token, {
        httpOnly: true
      });
    } catch (err) {
      console.log(err);
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : err.name === "AccountNotVerified"
        ? this.forbidden(res, err)
        : err.name === "Unauthorized"
        ? this.unauthorized(res, err)
        : this.internalServerError(res, err);
    }
  };

  logout = (req, res) => {
    this.noContentClearCookie(res, "token");
  };

  verify = async (req, res) => {
    try {
      const { id, verificationToken } = req.params;
      const data = await this.userService.verify(id, verificationToken);
      this.ok(res, data);
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : err.name === "ValidationError"
        ? this.badRequest(res, err)
        : err.name === "InvalidToken"
        ? this.forbidden(res, err)
        : this.internalServerError(res, err);
    }
  };

  requestPasswordReset = async (req, res) => {
    try {
      const { email } = req.body;
      const data = await this.userService.requestPasswordReset(email);
      this.ok(res, data);
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : this.internalServerError(res, err);
    }
  };

  resetPassword = async (req, res) => {
    try {
      const { id, resetToken } = req.params;
      const { newPassword } = req.body;
      const data = await this.userService.resetPassword(
        id,
        resetToken,
        newPassword
      );
      this.ok(res, data);
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : err.name === "ValidationError"
        ? this.badRequest(res, err)
        : err.name === "InvalidToken"
        ? this.forbidden(res, err)
        : this.internalServerError(res, err);
    }
  };

  imgUpload = async (req, res) => {
    if (req.files === null) {
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
      `/home/luffy/www/library/front/public/team/${fullImageName}`,
      err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        res.json({
          fileName: file.name,
          fullName: fullImageName,
          filePath: `/team/${file.name}`,
          type: file.mimetype
        });
      }
    );
  };

  changePassword = async (req, res) => {
    try {
      const { id, oldPassword, newPassword } = req.body;
      const data = await this.userService.changePassword(
        id,
        oldPassword,
        newPassword
      );

      this.ok(res, data);
    } catch (err) {
      err.name === "ModelNotFound"
        ? this.notFound(res)
        : err.name === "Unauthorized"
        ? this.unauthorized(res, err)
        : this.internalServerError(res, err);
    }
  };
}

module.exports = UserController;
