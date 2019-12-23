const jwt = require('../../utilities/jwt/jwt');

class BaseController {
  constructor() {
    this.OK = 200;
    this.CREATED = 201;
    this.ACCEPTED = 202;
    this.NO_CONTENT = 204;
    this.MOVED_PERMANENTLY = 301;
    this.BAD_REQUEST = 400;
    this.UNAUTHORIZED = 401;
    this.FORBIDDEN = 403;
    this.NOT_FOUND = 404;
    this.METHOD_NOT_ALLOWED = 405;
    this.INTERNAL_SERVER_ERROR = 500;
    this.BAD_GATEWAY = 502;
    this.SERVICE_UNAVAILABLE = 503;
  }

  authorizationMiddleware(options) {
    const { allowedRoles } = options;
    return (req, res, next) => {
      try {
        const { token } = req.cookies;
        jwt.authorize(token, allowedRoles);
        next();
      } catch (err) {
        err.name === 'AuthorizationError'
          ? this.unauthorized(res, err)
          : this.internalServerError(res, err);
      }
    };
  }

  ok(response, data) {
    return response.status(this.OK).send(data);
  }

  okWithCookie(response, data, name, cookie, options) {
    return response
      .status(this.OK)
      .cookie(name, cookie, options)
      .send(data);
  }

  created(response, data) {
    return response.status(this.CREATED).send(data);
  }

  accepted(response, data) {
    return response.status(this.ACCEPTED).send(data);
  }

  noContent(response) {
    return response.status(this.NO_CONTENT).send();
  }

  noContentClearCookie(response, cookie) {
    return response
      .status(this.NO_CONTENT)
      .clearCookie(cookie)
      .end();
  }

  movedPermanently(response, data) {
    return response.status(this.MOVED_PERMANENTLY).send(data);
  }

  badRequest(response, err) {
    return response.status(this.BAD_REQUEST).send(err);
  }

  unauthorized(response, data) {
    return response.status(this.UNAUTHORIZED).send(data);
  }

  forbidden(response, data) {
    console.log(data);
    return response.send(data);

    // Edited status change.
    // return response.status(this.FORBIDDEN).send(data);
  }

  notFound(response) {
    return response.status(this.NOT_FOUND).send({ message: 'Not Found.' });
  }

  methodNotAllowed(response, data) {
    return response.status(this.METHOD_NOT_ALLOWED).send(data);
  }

  internalServerError(response, err) {
    console.error(err);
    return response
      .status(this.INTERNAL_SERVER_ERROR)
      .send({ error: err.code });
  }

  badGateway(response, data) {
    return response.status(this.BAD_GATEWAY).send(data);
  }

  serviceUnavailable(response, data) {
    return response.status(this.SERVICE_UNAVAILABLE).send(data);
  }
}

module.exports = BaseController;
