const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKeyPath = `${__dirname}/../../keys/private.pem`;
const publicKeyPath = `${__dirname}/../../keys/public.pem`;

class JWT {
  setPayload(payload) {
    this.payload = payload;
  }

  signToken() {
    return jwt.sign(this.payload, fs.readFileSync(privateKeyPath), {
      algorithm: 'RS256',
      expiresIn: 60 * 60 * 24 * 2 // 2 days
    });
  }

  verifyToken(token) {
    try {
      this.decoded = jwt.verify(token, fs.readFileSync(publicKeyPath));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  throwError() {
    const error = new Error();
    error.status = 401;
    error.name = 'AuthorizationError';
    error.message = 'Authorization Required';
    error.code = 'AUTHORIZATION_REQUIRED';
    throw error;
  }

  authorize(token, allowedRoles) {
    if (!this.verifyToken(token)) {
      this.throwError();
    }
    if (!allowedRoles.includes(this.decoded.role)) {
      this.throwError();
    }
  }
}

module.exports = new JWT();
